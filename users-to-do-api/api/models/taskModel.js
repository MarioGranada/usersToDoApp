const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: {
    type: String,
    required: 'description is required'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  state: {
    type: [
      {
        type: String,
        enum: ['to do', 'done']
      }
    ],
    default: 'to do'
  }
});

module.exports = mongoose.model('Tasks', taskSchema);
