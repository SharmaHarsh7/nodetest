import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as _mongoose from "mongoose";

import { DataAccess } from "./../../framework/data/data.access";
import { IApplicationModel } from "./../models/ApplicationModel";
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from "constants";
import { ApplicationStatus } from "./../../framework/enums/enum";

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class ApplicationSchemaP {

    static get schema() {
        const ApplicationSchema = new mongoose.Schema({
            name: { type: String, unique: true, required: true },
            status: { type: Number, required: true, default: ApplicationStatus.InActive },
            logEnabled: { type: Boolean, required: true, default: false }

        }, { timestamps: true });

        /**
         * Password hash middleware.
         */

        return ApplicationSchema;
    }

}

const ApplicationSchema = mongooseConnection.model<IApplicationModel>("Applications", ApplicationSchemaP.schema);

export { ApplicationSchema };