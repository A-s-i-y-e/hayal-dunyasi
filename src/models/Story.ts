import mongoose, { Schema, Document } from "mongoose";

export interface IStory extends Document {
  title: string;
  content: string;
  authorId: mongoose.Types.ObjectId;
  drawings: {
    imageUrl: string;
    description: string;
    pageNumber: number;
  }[];
  audioUrl?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StorySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    drawings: [
      {
        imageUrl: { type: String, required: true },
        description: { type: String, required: true },
        pageNumber: { type: Number, required: true },
      },
    ],
    audioUrl: { type: String },
    isPublic: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStory>("Story", StorySchema);
