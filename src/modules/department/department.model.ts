import { Schema, model, Document, Model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { NextFunction } from 'express';
import slug from "slug";
import * as cache from '../../services/cache.service'

declare interface IDepartment extends Document{
    name: string;
    slug: string;
    description: string;
    createdAt?: Date;
}

interface _Model extends Model<IDepartment> {
  fetch(args: any, page: number, limit: number): any;
}

class DepartmentModel {

    private _model: _Model;

    constructor() {
        const schema = new Schema({
            name: {
                type: String,
                trim: true,
                required: [true, "Title is required!"],
                unique: true
            },
            slug: {
                type: String,
                trim: true,
                lowercase: true
            },
            description: {
                type: String,
                trim: true,
                required: false
            }
        },
        {   timestamps: true,
            autoIndex: true
        });

        schema.plugin(uniqueValidator, {
            message: "{VALUE} already taken!"
        });

        schema.pre('validate', function (this: IDepartment, next: NextFunction) {
            this.slug = slug(this.name);
            next();
        });

        schema.methods = {
            toJSON() {
              return {
                _id: this._id,
                name: this.name,
                slug: this.slug,
                description: this.description,
                createdAt: this.createdAt
              };
            }
        };

        schema.statics = {
           async fetch (args: any, page: number, limit: number) {

              let departments: any = {};

              const promise = await Promise.all([
                this.countDocuments(args),
                this.find(args).skip((page - 1) * limit).limit(limit),
                cache.exists(`departments`)
              ]);

              if(promise[2] === 1) {
                 departments = await cache.getData(`departments`);
              }

              const results = {
                docs: promise[1],
                page: page,
                limit: limit,
                total: promise[0],
                pages: Math.ceil(promise[0] / limit) || 1,
              }
              departments[`${page}-${limit}`] = JSON.stringify(results);
              await cache.saveData(`departments`, departments);
              return results;
           }
        }

        this._model = model<IDepartment, _Model>('Department', schema);
    }

    public get model(): _Model {
        return this._model
    }
}

export default new DepartmentModel().model
