import mongoose from "mongoose";

const comment_Schema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },

    blogId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "blog",
    },

    commentedBy: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "user",
    },

    parentId: {
      type: mongoose.Schema.ObjectId,
      ref: "comment",
      default: null,
    },

    replies: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "comment",
      },
    ],

    modifyAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const comment_model = mongoose.model("Comments", comment_Schema);
