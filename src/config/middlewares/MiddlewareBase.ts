import express = require("express");
import bodyParser = require("body-parser");

import { MethodOverride } from "./MethodOverride";
import { BaseRoutes } from "./../routes/BaseRoutes";

class MiddlewaresBase {

    static get configuration() {
        const app = express();
        app.use(bodyParser.json());
        app.use(MethodOverride.configuration());
        app.use(new BaseRoutes().routes);

        return app;
    }
}

Object.seal(MiddlewaresBase);

export { MiddlewaresBase };