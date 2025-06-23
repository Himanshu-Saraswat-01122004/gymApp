import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['USER', 'TRAINER'],
    default: 'USER'
  },
  age: { type: Number },
  gender: { type: String },
  height: { type: Number },
  weight: { type: Number },
  goals: { type: String },
  benchPress: { type: String },
  squat: { type: String },
  deadlift: { type: String },
  membershipType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
