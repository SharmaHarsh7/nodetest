import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as _mongoose from "mongoose";

import { DataAccess } from "./../../../framework/data/data.access";
import { IUserModel } from "./../../models/Users/UserModel";
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from "constants";
import { Schema } from "mongoose";

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class UserSchemaP {

    static get schema() {
        const UserSchema = new mongoose.Schema({
            username: { type: String, unique: true },
            email: { type: String, unique: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            hashedPassword: { type: String, required: true },
            salt: { type: String, required: true },
            applications: [{ type: Schema.Types.ObjectId, ref: "Applications" }]
        }, { timestamps: true });

        /**
         * Password hash middleware.
         */
        UserSchema.pre("save", function save(next: any) {
            const user = this;
            if (!user.isModified("password")) { return next(); }
            bcrypt.genSalt(10, (err, salt) => {
                if (err) { return next(err); }
                bcrypt.hash(user.password, salt, undefined, (err: _mongoose.Error, hash) => {
                    if (err) { return next(err); }
                    user.password = hash;
                    next();
                });
            });
        });

        UserSchema.methods.encryptPassword = function (password: string) {
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
            // more secure – return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
        };

        UserSchema.virtual("userId")
            .get(function () {
                return this.id;
            });

        UserSchema.virtual("fullName")
            .get(function () {
                return this.firstName + " " + this.lastName;
            });

        UserSchema.virtual("password")
            .set(function (password: string) {
                this._plainPassword = password;
                this.salt = crypto.randomBytes(32).toString("hex");
                // more secure - this.salt = crypto.randomBytes(128).toString('hex');
                this.hashedPassword = this.encryptPassword(password);
            })
            .get(function () { return this._plainPassword; });


        UserSchema.methods.checkPassword = function (password: string) {
            return this.encryptPassword(password) === this.hashedPassword;
        };

        return UserSchema;
    }

}

const UserSchema = mongooseConnection.model<IUserModel>("Users", UserSchemaP.schema);

export { UserSchema };