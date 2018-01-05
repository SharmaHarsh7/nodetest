import { IServiceBase } from "./IServiceBase";
import { IRepositoryBase } from "./../../repository/base/IRepositoryBase";
import mongoose = require("mongoose");
import { RepositoryBase } from "./../../repository/base/RepositoryBase";
import { Model } from "mongoose";

class ServiceBase<T extends mongoose.Document> implements IServiceBase<T> {

    private _repository: IRepositoryBase<T>;

    constructor(model: Model<T>) {
        this._repository = new RepositoryBase(model);
    }

    query() {
        return this._repository.query();
    }

    create(item: T, callback: (error: any, result: T) => void) {
        this._repository.create(item, callback);
    }

    retrieve(callback: (error: any, result: Array<T>) => void) {
        this._repository.retrieve(callback);
    }

    update(_id: string, item: T, callback: (error: any, result: T) => void) {

        this._repository.findById(_id, (err, res) => {
            if (err) callback(err, res);

            else
                this._repository.update(res._id, item, callback);

        });
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._repository.delete(_id, callback);
    }

    findById(_id: string, callback: (error: any, result: T) => void) {
        this._repository.findById(_id, callback);
    }

    findOne(condition: Object, callback: (error: any, result: T) => void) {
        this._repository.findOne(condition, callback);
    }

    deleteMatched(condition: Object, callback: (error: any, result: any) => void) {
        this._repository.deleteMatched(condition, (err) => callback(err, undefined));
    }

}

export { ServiceBase };