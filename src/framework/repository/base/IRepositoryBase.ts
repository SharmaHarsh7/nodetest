import mongoose = require("mongoose");
import { Model } from "mongoose";

interface IRepositoryBase<T extends mongoose.Document> {

    query: () => Model<T>;
    retrieve: (callback: (error: any, result: Array<T>) => void) => void;
    findById: (id: string, callback: (error: any, result: T) => void) => void;
    findOne: (condition: Object, callback: (error: any, result: T) => void) => void;

    create: (item: T, callback: (error: any, result: any) => void) => void;
    update: (_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
    deleteMatched: (condition: Object, callback: (error: any, result: any) => void) => void;
}

export { IRepositoryBase };