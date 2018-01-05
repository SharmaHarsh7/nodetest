import express = require("express");
import { UserService } from "./../../services/UserService";
import { BaseController } from "./../base/IBaseController";
import { IUserModel } from "./../../data/models/Users/UserModel";
import { create } from "domain";
import { UserInfoVM } from "./../../data/view-models/UserInfo";
import { RepositoryBase } from "./../../framework/repository/base/RepositoryBase";

class UserController extends BaseController {

    constructor() {
        super();
    }

    create(req: express.Request, res: express.Response): void {
        try {
            const user: IUserModel = <IUserModel>req.body;
            const userBusiness = new UserService();

            userBusiness.create(user, (error: any, result: any) => {
                if (error) res.send({ "error": "error" });
                else res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });

        }
    }
    update(req: express.Request, res: express.Response): void {
        try {
            const user: IUserModel = <IUserModel>req.body;
            const _id: string = req.params._id;
            const userBusiness = new UserService();
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
            const userBusiness = new UserService();
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
            const userBusiness = new UserService();
            userBusiness.userList((error: any, result: any) => {
                if (error) res.send({ "error": error });
                else res.send(result);
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
            const userBusiness = new UserService();
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

    current(req: express.Request, res: express.Response): void {
        try {
            const authData = { user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope };
            const userBusiness = new UserService();
            userBusiness.GetCurrentUserInfo(authData.name, (error: any, result: UserInfoVM) => {
                if (error) res.send({ "error": error });
                else res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": e });

        }
    }


}
export { UserController };