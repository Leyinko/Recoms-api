import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const newUser = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [8, 'Password needs min 8 characters'],
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
    tokenVersion: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: 'Users',
    suppressReservedKeysWarning: true,
  }
);

// Schema Hooks Restrictions
// Password
newUser.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// Register as Admin
newUser.pre('save', function (next) {
  if (this.isNew && this.role === 'admin' && this.username !== 'admin') {
    const error = new Error('Cannot self-register as admin');
    return next(error);
  }
  //
  next();
});

const User = mongoose.model('Users', newUser);
export default User;
