import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as _mongoose from "mongoose";

import { DataAccess } from "./../../../framework/data/data.access";
import { IClientModel } from "./../../models/Users/ClientModel";
import { Schema } from "mongoose";

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class ClientSchemaP {

    static get schema() {
        const schema = mongoose.Schema({
            clientId: { type: String, unique: true, required: true },
            name: { type: String, unique: true, required: true },
            secret: { type: String, required: true }
        }, { timestamps: true });

        return schema;
    }

}

const ClientSchema = mongooseConnection.model<IClientModel>("Clients", ClientSchemaP.schema);

export { ClientSchema };