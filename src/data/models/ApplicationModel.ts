import mongoose = require("mongoose");
import { ApplicationStatus } from "./../../framework/enums/enum";

interface IApplicationModel extends mongoose.Document {
    name: string;
    status: ApplicationStatus;
    logEnabled: boolean;
}

class ApplicationModel {

    private _applicationModel: IApplicationModel;

    constructor(applicationModel: IApplicationModel) {
        this._applicationModel = applicationModel;
    }
    get name(): string {
        return this._applicationModel.name;
    }

    get status(): ApplicationStatus {
        return this._applicationModel.status;
    }

    get logEnabled(): boolean {
        return this._applicationModel.logEnabled;
    }
}

Object.seal(ApplicationModel);

export { IApplicationModel, ApplicationModel };
