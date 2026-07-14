import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContent extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'blog' | 'caption' | 'description' | 'newsletter';
  topic: string;
  tone: string;
  length: 'short' | 'medium' | 'long';
  generatedText: string;
  isFavorite: boolean;
  createdAt: Date;
}

const ContentSchema: Schema<IContent> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['blog', 'caption', 'description', 'newsletter'],
    required: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  tone: {
    type: String,
    required: true,
    trim: true,
  },
  length: {
    type: String,
    enum: ['short', 'medium', 'long'],
    required: true,
  },
  generatedText: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index on userId for faster content retrieval by user
ContentSchema.index({ userId: 1 });

const Content: Model<IContent> = mongoose.model<IContent>(
  'Content',
  ContentSchema
);

export default Content;
