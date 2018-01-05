import * as passport from "passport";

const BasicStrategy = require("passport-http").BasicStrategy;
const ClientPasswordStrategy = require("passport-oauth2-client-password").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;

import { UserModel, IUserModel } from "./../data/models/Users/UserModel";
import { AccessTokenModel, IAccessTokenModel } from "./../data/models/Users/AccessTokenModel";
import { ClientModel, IClientModel } from "./../data/models/Users/ClientModel";

import { UserSchema } from "./../data/schema/Users/UserSchema";
import { AccessTokenSchema } from "./../data/schema/Users/AccessTokenSchema";
import { ClientSchema } from "./../data/schema/Users/ClientSchema";
import { RefreshTokenSchema } from "./../data/schema/Users/RefreshTokenSchema";


import { ServiceBase } from "./../framework/service/base/ServiceBase";

const userService = new ServiceBase(UserSchema);
const accessTokenService = new ServiceBase(AccessTokenSchema);
const clientService = new ServiceBase(ClientSchema);


passport.use(new BasicStrategy(
    function (username: string, password: string, done: any) {
        console.log("Basic Authentication Called");
        clientService.findOne({ clientId: username }, function (err, client: any) {
            if (err) { return done(err); }
            if (!client) { return done(undefined, false); }
            if (client.secret != password) { return done(undefined, false); }

            return done(undefined, client);
        });
    }
));

passport.use(new ClientPasswordStrategy(
    function (clientId: string, clientSecret: string, done: any) {
        console.log("Client Password Authentication Called");
        clientService.findOne({ clientId: clientId }, function (err, client: any) {
            if (err) { return done(err); }
            if (!client) { return done(undefined, false); }
            if (client.secret != clientSecret) { return done(undefined, false); }

            return done(undefined, client);
        });
    }
));

passport.use(new
    BearerStrategy(
    function (accessToken: string, done: any) {

        console.log("Bearer Authentication Called");
        accessTokenService.findOne({ token: accessToken }, function (err: any, token: any) {
            if (err) { return done(err); }
            if (!token) { return done(undefined, false); }

            if (Math.round((Date.now() - token.created) / 1000) > process.env.ACCESS_TOKEN_LIFE) {
                accessTokenService.deleteMatched({ token: accessToken }, function (err: any) {
                    if (err) return done(err);
                });
                return done(undefined, false, { message: "Token expired" });
            }

            userService.findById(token.userId, function (err, user: any) {
                if (err) { return done(err); }
                if (!user) { return done(undefined, false, { message: "Unknown user" }); }

                const info = { scope: "*" };
                done(undefined, user, info);
            });
        });
    })
);
