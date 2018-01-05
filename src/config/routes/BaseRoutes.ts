import express = require("express");
const app = express();

import { UsersRoutes } from "./UsersRoutes";
import { ApplicationsRoutes } from "./ApplicationRoutes";


class BaseRoutes {

    get routes() {
        app.use("/api/", new UsersRoutes().routes);
        app.use("/api/", new ApplicationsRoutes().routes);

        return app;
    }
}
export { BaseRoutes };