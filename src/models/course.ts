const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

export default mongoose.model('Course', courseSchema);