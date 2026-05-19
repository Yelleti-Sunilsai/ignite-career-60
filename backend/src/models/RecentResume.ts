import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRecentResume extends Document {
  user: Types.ObjectId;
  fileName: string;
  filePath: string;
  atsScore: number;
  openedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const recentResumeSchema = new Schema<IRecentResume>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    atsScore: {
      type: Number,
      default: 0,
    },
    openedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

recentResumeSchema.index({ user: 1, fileName: 1 }, { unique: true });

export default mongoose.model<IRecentResume>(
  "RecentResume",
  recentResumeSchema
);
