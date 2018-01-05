import * as passport from "passport";
import * as crypto from "crypto";

import { UserModel, IUserModel } from "./../data/models/Users/UserModel";
import { AccessTokenModel, IAccessTokenModel } from "./../data/models/Users/AccessTokenModel";
import { ClientModel, IClientModel } from "./../data/models/Users/ClientModel";
import { RefreshTokenModel, IRefreshTokenModel } from "./../data/models/Users/RefreshTokenModel";

import { UserSchema } from "./../data/schema/Users/UserSchema";
import { AccessTokenSchema } from "./../data/schema/Users/AccessTokenSchema";
import { ClientSchema } from "./../data/schema/Users/ClientSchema";
import { RefreshTokenSchema } from "./../data/schema/Users/RefreshTokenSchema";


import { ServiceBase } from "./../framework/service/base/ServiceBase";

const refreshTokenService = new ServiceBase(RefreshTokenSchema);
const userService = new ServiceBase(UserSchema);
const accessTokenService = new ServiceBase(AccessTokenSchema);
const clientService = new ServiceBase(ClientSchema);

const oauth2orize = require("oauth2orize");

// create OAuth 2.0 server
const server = oauth2orize.createServer();

// Exchange username & password for an access token.
server.exchange(oauth2orize.exchange.password(function (client: any, username: string, password: string, scope: any, done: any) {
    userService.findOne({ username: username }, function (err, user: any) {
        if (err) { return done(err); }
        if (!user) { return done(undefined, false); }
        if (!user.checkPassword(password)) { return done(undefined, false); }

        refreshTokenService.deleteMatched({ userId: user.userId, clientId: client.clientId }, function (err) {
            if (err) return done(err);
        });
        accessTokenService.deleteMatched({ userId: user.userId, clientId: client.clientId }, function (err) {
            if (err) return done(err);
        });

        const tokenValue = crypto.randomBytes(32).toString("hex");
        const refreshTokenValue = crypto.randomBytes(32).toString("hex");

        const accessToken: IAccessTokenModel = <IAccessTokenModel>{ token: tokenValue, clientId: client.clientId, userId: user.userId };
        const refreshToken: IRefreshTokenModel = <IRefreshTokenModel>{ token: refreshTokenValue, clientId: client.clientId, userId: user.userId };

        refreshTokenService.create(refreshToken, (err: any) => {
            if (err) { return done(err); }
        });

        const info = { scope: "*" };

        accessTokenService.create(accessToken, (err: any, token: any) => {
            if (err) { return done(err); }
            done(undefined, tokenValue, refreshTokenValue, { "expires_in": process.env.ACCESS_TOKEN_LIFE });
        });
    });
}));

// Exchange refreshToken for an access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client: any, refreshToken: string, scope: any, done: any) {
    refreshTokenService.findOne({ token: refreshToken }, function (err, token: any) {
        if (err) { return done(err); }
        if (!token) { return done(undefined, false); }
        if (!token) { return done(undefined, false); }

        userService.findById(token.userId, function (err, user: any) {
            if (err) { return done(err); }
            if (!user) { return done(undefined, false); }

            refreshTokenService.deleteMatched({ userId: user.userId, clientId: client.clientId }, function (err) {
                if (err) return done(err);
            });
            accessTokenService.deleteMatched({ userId: user.userId, clientId: client.clientId }, function (err) {
                if (err) return done(err);
            });

            const tokenValue = crypto.randomBytes(32).toString("hex");
            const refreshTokenValue = crypto.randomBytes(32).toString("hex");

            const accessToken: IAccessTokenModel = <IAccessTokenModel>{ token: tokenValue, clientId: client.clientId, userId: user.userId };
            const refreshToken: IRefreshTokenModel = <IRefreshTokenModel>{ token: refreshTokenValue, clientId: client.clientId, userId: user.userId };

            refreshTokenService.create(refreshToken, (err: any) => {
                if (err) { return done(err); }
            });

            const info = { scope: "*" };

            accessTokenService.create(accessToken, (err: any, token: any) => {
                if (err) { return done(err); }
                done(undefined, tokenValue, refreshTokenValue, { "expires_in": process.env.ACCESS_TOKEN_LIFE });
            });
        });
    });
}));

export let token = [
    passport.authenticate(["basic"
        , "oauth2-client-password"
    ], { session: false })
    ,
    server.token()
    , server.errorHandler()
];
