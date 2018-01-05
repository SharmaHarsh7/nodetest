import mongoose = require("mongoose");

interface IClientModel extends mongoose.Document {
    clientId: string;
    name: string;
    secret: string;
}


class ClientModel {

    private _clientModel: IClientModel;

    constructor(clientModel: IClientModel) {
        this._clientModel = clientModel;
    }
    get clientId(): string {
        return this._clientModel.clientId;
    }

    get name(): string {
        return this._clientModel.name;
    }
    get secret(): string {
        return this._clientModel.secret;
    }
}

Object.seal(ClientModel);

export { IClientModel, ClientModel };
