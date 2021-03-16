"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configPassport = void 0;
const passport_local_1 = require("passport-local");
const passport = require("passport");
const auth_1 = require("../models/auth");
const user_1 = require("../models/user");
const entities_1 = require("../api/entities");
const Option_1 = require("fp-ts/lib/Option");
const configPassport = () => {
    passport.use('local-signup', new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, function (req, email, password, done) {
        auth_1.default.findOne({ 'local.email': email }, (err, user) => {
            if (err)
                return done(err);
            if (user) {
                return done(null, false);
            }
            else {
                const newUser = new auth_1.default();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(async (err) => {
                    if (err)
                        throw err;
                    const name = req.body.name;
                    const joinedDate = req.body.joinedDate;
                    const avatar = Option_1.none;
                    const courses = [];
                    const followers = [];
                    const following = [];
                    await user_1.default.create({ _id: newUser._id, data: new entities_1.User({ name, email, avatar, joinedDate, courses, followers, following }) });
                    return done(null, newUser);
                });
            }
        });
    }));
    passport.use('local-login', new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        auth_1.default.findOne({ 'local.email': email }, (err, user) => {
            if (err)
                return done(err);
            if (!user)
                return done(null, false);
            if (!user.validPassword(password))
                return done(null, false);
            return done(null, user);
        });
    }));
    return passport;
};
exports.configPassport = configPassport;
//# sourceMappingURL=configPassport.js.map