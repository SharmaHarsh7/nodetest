import mongoose = require("mongoose");

interface IRefreshTokenModel extends mongoose.Document {
    userId: string;
    clientId: string;
    token: string;
}


class RefreshTokenModel {

    private _refreshTokenModel: IRefreshTokenModel;

    constructor(refreshTokenModel: IRefreshTokenModel) {
        this._refreshTokenModel = refreshTokenModel;
    }
    get userId(): string {
        return this._refreshTokenModel.userId;
    }

    get token(): string {
        return this._refreshTokenModel.token;
    }

    get clientId(): string {
        return this._refreshTokenModel.clientId;
    }
}

Object.seal(RefreshTokenModel);

export { IRefreshTokenModel, RefreshTokenModel };
