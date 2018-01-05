import express = require("express");
import { ApplicationService } from "./../services/ApplicationService";
import { BaseController } from "./base/IBaseController";
import { IApplicationModel } from "./../data/models/ApplicationModel";
import { create } from "domain";
import { RepositoryBase } from "./../framework/repository/base/RepositoryBase";
import * as Rx from "rxjs/Rx";
class ApplicationController extends BaseController {

    constructor() {
        super();
    }

    create(req: express.Request, res: express.Response): void {
        try {
            const user: IApplicationModel = <IApplicationModel>req.body;
            const userBusiness = new ApplicationService();

            userBusiness.create(user, (error: any, result: any) => {
                if (error) res.send({ "error": error });
                else res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    update(req: express.Request, res: express.Response): void {
        try {
            const user: IApplicationModel = <IApplicationModel>req.body;
            const _id: string = req.params._id;
            const userBusiness = new ApplicationService();
            userBusiness.update(_id, user, (error: any, result: any) => {
                if (error) res.send({ "error": "error" });
                else res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    delete(req: express.Request, res: express.Response): void {
        try {

            const _id: string = req.params._id;
            const userBusiness = new ApplicationService();
            userBusiness.delete(_id, (error: any, result: any) => {
                if (error) res.send({ "error": "error" });
                else res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    retrieve(req: express.Request, res: express.Response): void {
        try {

            const userBusiness = new ApplicationService();
            userBusiness.retrieve((error: any, result: Array<IApplicationModel>) => {
                if (error) res.send({ "error": error });
                else {
                    res.send(result);
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    findById(req: express.Request, res: express.Response): void {
        try {

            const _id: string = req.params._id;
            const userBusiness = new ApplicationService();
            userBusiness.findById(_id, (error: any, result: any) => {
                if (error) res.send({ "error": "error" });
                else res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
}
export { ApplicationController };