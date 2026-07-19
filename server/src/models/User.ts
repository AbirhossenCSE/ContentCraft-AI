import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  credits: number;
  lastCreditReset: Date;
  createdAt: Date;
  checkAndResetCredits: () => Promise<void>;
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 5,
  },
  lastCreditReset: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.checkAndResetCredits = async function (
  this: IUser
): Promise<void> {
  const now = new Date();
  const lastReset = new Date(this.lastCreditReset);

  // Compare calendar date in server's local timezone (UTC+6 for Bangladesh user base)
  const isDifferentDay =
    now.getFullYear() !== lastReset.getFullYear() ||
    now.getMonth() !== lastReset.getMonth() ||
    now.getDate() !== lastReset.getDate();

  if (isDifferentDay && now.getTime() > lastReset.getTime()) {
    this.credits = 5;
    this.lastCreditReset = now;
    await this.save();
  }
};

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
