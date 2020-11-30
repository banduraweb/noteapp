const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [{ type: Types.ObjectId, ref: 'Note' }],
}, {
  timestamps: true,
});

module.exports = model('User', userSchema);
