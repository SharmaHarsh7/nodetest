import mongoose = require("mongoose");



interface IServiceBase<T extends mongoose.Document> {

    query(): mongoose.Model<T>;
    retrieve: (callback: (error: any, result: Array<T>) => void) => void;
    findById: (_id: string, callback: (error: any, result: T) => void) => void;
    findOne: (condition: Object, callback: (error: any, result: T) => void) => void;
    create: (item: T, callback: (error: any, result: any) => void) => void;
    update: (_id: string, item: T, callback: (error: any, result: any) => void) => void;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
    deleteMatched: (condition: Object, callback: (error: any, result: any) => void) => void;
}

export { IServiceBase };