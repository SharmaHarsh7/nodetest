import mongoose = require("mongoose");
import { IApplicationModel } from "./../../../data/models/ApplicationModel";

interface IUserModel extends mongoose.Document {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    hashedPassword: string;
    salt: string;
    applications: Array<IApplicationModel>;
}


class UserModel {

    private _userModel: IUserModel;

    constructor(userModel: IUserModel) {
        this._userModel = userModel;
    }
    get username(): string {
        return this._userModel.username;
    }

    get email(): string {
        return this._userModel.email;
    }

    get firstName(): string {
        return this._userModel.firstName;
    }

    get hashedPassword(): string {
        return this._userModel.hashedPassword;
    }

    get salt(): string {
        return this._userModel.salt;
    }

    get applications(): Array<IApplicationModel> {
        return this._userModel.applications;
    }
}

Object.seal(UserModel);

export { IUserModel, UserModel };
