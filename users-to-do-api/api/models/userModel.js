const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: 'Username is required'
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Users', userSchema);
