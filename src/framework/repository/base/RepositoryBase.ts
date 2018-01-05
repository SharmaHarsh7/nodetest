import { IRepositoryBase } from "./IRepositoryBase";

import mongoose = require("mongoose");

class RepositoryBase<T extends mongoose.Document> implements IRepositoryBase<T> {

    public _model: mongoose.Model<T>;

    constructor(schemaModel: mongoose.Model<T>) {
        this._model = schemaModel;
    }

    query() {
        return this._model;
    }

    create(item: T, callback: (error: any, result: Array<T>) => void) {
        this._model.create(item, callback);

    }

    retrieve(callback: (error: any, result: Array<T>) => void) {
        this._model.find({}, callback);
    }

    update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, undefined));
    }

    deleteMatched(condition: Object, callback: (error: any, result: any) => void) {
        this._model.remove(condition, (err) => callback(err, undefined));
    }

    findById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(_id, callback);
    }

    findOne(condition: Object, callback: (error: any, result: T) => void) {
        this._model.findOne(condition, callback);
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }

}

export { RepositoryBase };