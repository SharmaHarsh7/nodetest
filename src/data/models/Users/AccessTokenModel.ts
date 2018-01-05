import mongoose = require("mongoose");

interface IAccessTokenModel extends mongoose.Document {
    userId: string;
    clientId: string;
    token: string;
}

class AccessTokenModel {

    private _accessTokenModel: IAccessTokenModel;

    constructor(accessTokenModel: IAccessTokenModel) {
        this._accessTokenModel = accessTokenModel;
    }

    get clientId(): string {
        return this._accessTokenModel.clientId;
    }


    get userId(): string {
        return this._accessTokenModel.userId;
    }

    get token(): string {
        return this._accessTokenModel.token;
    }
}

Object.seal(AccessTokenModel);

export { IAccessTokenModel, AccessTokenModel };
