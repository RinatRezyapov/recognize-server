const mongoose = require('mongoose');
import * as bcrypt from 'bcrypt-nodejs';

let authSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

authSchema.methods.generateHash = function (password: any) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

authSchema.methods.validPassword = function (password: any) {
  return bcrypt.compareSync(password, this.local.password);
};

export default mongoose.model('Auth', authSchema);