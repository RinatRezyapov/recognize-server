const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  _id: String,
  data: mongoose.Schema.Types.Mixed,
}, { _id: false });

export default mongoose.model('User', userSchema);