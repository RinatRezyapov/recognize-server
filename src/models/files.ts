const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  data: String, 
  contentType: String
});

export default mongoose.model('Files', schema);