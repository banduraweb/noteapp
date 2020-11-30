const { Schema, model, Types } = require('mongoose');

const noteSchema = new Schema({
  description: { type: String, required: true },
  status: { type: Boolean, default: false, required: true },
  img: { type: String, default: null },
  owner: { type: Types.ObjectId, ref: 'User' },
},
{
  timestamps: true,
});

module.exports = model('Note', noteSchema);
