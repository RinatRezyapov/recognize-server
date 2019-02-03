
import { Strategy } from 'passport-local';
import * as passport from 'passport';
import Auth from '../models/auth';
import UserModel from '../models/user';
import { User } from '../api/entities';
import { none } from 'fp-ts/lib/Option';

export const configPassport = () => {
  passport.use('local-signup', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
    function (req, email, password, done) {

      Auth.findOne({ 'local.email': email }, (err: any, user: any) => {
        if (err)
          return done(err);
        if (user) {
          return done(null, false);
        } else {
          const newUser = new Auth();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(async (err: any) => {
            if (err) throw err;
            const name = req.body.name;
            const joinedDate = req.body.joinedDate;
            const avatar = none;
            const courses = [];
            const followers = [];
            const following = [];
            await UserModel.create({ _id: newUser._id, data: new User({ name, email, avatar, joinedDate, courses, followers, following }) });
            return done(null, newUser);
          });
        }
      });
    }));

  passport.use('local-login', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {
      Auth.findOne({ 'local.email': email }, (err: any, user: any) => {
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
}