import Mongoose = require("mongoose");
import * as dotenv from "dotenv";


class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor() {
        DataAccess.connect();
    }

    static connect(): Mongoose.Connection {
        dotenv.config({ path: ".env.dev" });

        if (this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection = Mongoose.connection;

        this.mongooseConnection.once("open", () => {
            console.log("Successfully connected to MongoDB.");
        });

        this.mongooseConnection.on("error", (err: any) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running.", process.env.MONGODB_URI, err);
            process.exit();
        });

        console.log("Mongo URL - " + process.env.MONGODB_URI);
        this.mongooseInstance = Mongoose.connect(process.env.MONGODB_URI);




        return this.mongooseInstance;
    }

}

DataAccess.connect();
export { DataAccess };