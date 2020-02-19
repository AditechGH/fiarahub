import { Request, Response } from "express";
import status from "http-status-codes";


export class AdminController {

    public async register (req: Request, res: Response) {
        try {
          const body = req.body;
          return res.status(status.OK).json(body)
        } catch (e) {
          return res.status(status.BAD_REQUEST).json(e);
        }
    }

    public async login (req: Request, res: Response) {
      try {
        const body = req.body;
        return res.status(status.OK).json(body)
      } catch (e) {
        res.status(status.BAD_REQUEST).json(e);
      }
    }

    public async getAdmins (req: Request, res: Response) {

      const limit = req.query.limit ? parseInt(req.query.limit, 0) : 5;
      const page = req.query.page ? parseInt(req.query.page, 0) : 1;

      try {
        const body = req.body;
        return res.status(status.OK).json(body)
      } catch (e) {
        res.status(status.BAD_REQUEST).json(e);
      }
    }

    public async getAdmin (req: Request, res: Response) {
      try {
        const params = req.params.id;
        return res.status(status.OK).json(params)
      } catch (e) {
        res.status(status.BAD_REQUEST).json(e);
      }
    }

    public async changePassword (req: Request, res: Response) {
      try {
        const params = req.params.id;
        return res.status(status.OK).json(params)
      } catch (e) {
        res.status(status.BAD_REQUEST).json(e);
      }
    }

    public async updateAdmin (req: Request, res: Response) {
      try {

        Object.keys(req.body).forEach(key => {
          // admin[key] = req.body[key];
        });

        return res.status(status.OK).json();
      } catch (e) {
        res.status(status.BAD_REQUEST).json(e);
      }
    }

    public async deleteAdmin (req: Request, res: Response) {
      try {

        return res.sendStatus(status.OK);

      } catch (e) {
        res.status(status.BAD_REQUEST).json(e);
      }
    }

}
