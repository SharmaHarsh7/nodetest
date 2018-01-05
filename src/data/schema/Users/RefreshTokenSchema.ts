import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as _mongoose from "mongoose";

import { DataAccess } from "./../../../framework/data/data.access";
import { IRefreshTokenModel } from "./../../models/Users/RefreshTokenModel";
import { Schema } from "mongoose";

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class RefreshTokenSchemaP {

    static get schema() {
        const schema = mongoose.Schema({
            userId: { type: String, required: true },
            clientId: { type: String, required: true },
            token: { type: String, unique: true, required: true }
        }, { timestamps: true });

        return schema;
    }

}

const RefreshTokenSchema = mongooseConnection.model<IRefreshTokenModel>("RefreshTokens", RefreshTokenSchemaP.schema);

export { RefreshTokenSchema };