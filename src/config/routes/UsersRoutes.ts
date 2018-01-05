import express = require("express");
import * as passport from "passport";
import { UserController } from "./../..//controllers/users/UserController";

const router = express.Router();
class UsersRoutes {
    private _heroController: UserController;

    constructor() {
        this._heroController = new UserController();
    }
    get routes() {
        const controller = this._heroController;
        router.get("/user", controller.retrieve);
        router.get("/user/current", passport.authenticate("bearer", { session: false }), controller.current);
        router.post("/user", controller.create);
        router.put("/user/:_id", controller.update);
        router.get("/user/:_id", controller.findById);
        router.delete("/user/:_id", controller.delete);

        return router;
    }


}

Object.seal(UsersRoutes);
export { UsersRoutes };