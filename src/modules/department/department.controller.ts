import { Request, Response } from "express";
import status from "http-status-codes";
import DepartmentModel from "./department.model";
import * as cache from '../../services/cache.service'


export class DepartmentController {

    public async addNewDepartment (req: Request, res: Response) {
        try {
            const newDepartment = new DepartmentModel(req.body);

            const promise = await Promise.all([
              newDepartment.save(),
              cache.remove(`departments`)
            ]);
            res
            .status(status.CREATED)
            .json(promise[0]);
        } catch (e) {
             res.status(status.BAD_REQUEST).json(e);
        }
    }

    public async getDepartments (req: Request, res: Response) {

      const limit = req.query.limit ? parseInt(req.query.limit, 0) : 5;
      const page = req.query.page ? parseInt(req.query.page, 0) : 1;

      try {

        let departments = null;
        const exists = await cache.exists(`departments`)
        if(exists === 1) {
            const data: any = await cache.getData(`departments`);
            Object.keys(data).forEach(key => {
              if(key === `${page}-${limit}`) {
                departments = JSON.parse(data[key]);
              }
           });

           if (!departments) {
             departments = await DepartmentModel.fetch({}, page, limit);
           }

        } else {
           departments = await DepartmentModel.fetch({}, page, limit);
        }
        return res.status(status.OK).json(departments)
      } catch (e) {
        res.status(status.BAD_REQUEST).json(e);
      }
    }

    public async getDepartment (req: Request, res: Response) {
      try {
        const data = await cache.getItem(`department${req.params.id}`);
        if (data) {
          return res.status(status.OK).json(data)
        } else {
          const department = await DepartmentModel.findById(req.params.id);
          await cache.saveItem(`department${req.params.id}`, department);
          return res.status(status.OK).json(department);
        }
      } catch (e) {
        res.status(status.BAD_REQUEST).json(e);
      }
    }

    public async updateDepartment (req: Request, res: Response) {
      try {
        const department: any = await DepartmentModel.findById(req.params.id);

        Object.keys(req.body).forEach(key => {
          department[key] = req.body[key];
        });

        const promise = await Promise.all([
          department.save(),
          cache.remove(`departments`),
          cache.remove(`department${req.params.id}`)
        ]);

        return res.status(status.OK).json(promise[0]);
      } catch (e) {
        res.status(status.BAD_REQUEST).json(e);
      }
    }

    public async deleteDepartment (req: Request, res: Response) {
      try {
        const department: any = await DepartmentModel.findById(req.params.id);

        await Promise.all([
          department.remove(),
          cache.remove(`departments`),
          cache.remove(`department${req.params.id}`)
        ]);
        return res.sendStatus(status.OK);

      } catch (e) {
        res.status(status.BAD_REQUEST).json(e);
      }
    }

}
