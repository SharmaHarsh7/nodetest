import express = require("express");
import * as passport from "passport";
import { ApplicationController } from "./../../controllers/ApplicationController";

const router = express.Router();
class ApplicationsRoutes {
    private _heroController: ApplicationController;

    constructor() {
        this._heroController = new ApplicationController();
    }
    get routes() {
        const controller = this._heroController;
        router.get("/application", passport.authenticate("bearer", { session: false }), controller.retrieve);
        router.post("/application", passport.authenticate("bearer", { session: false }), controller.create);
        router.put("/application/:_id", passport.authenticate("bearer", { session: false }), controller.update);
        router.get("/application/:_id", passport.authenticate("bearer", { session: false }), controller.findById);
        router.delete("/application/:_id", passport.authenticate("bearer", { session: false }), controller.delete);

        return router;
    }


}

Object.seal(ApplicationsRoutes);
export { ApplicationsRoutes };