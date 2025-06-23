import mongoose from "mongoose";

const comment_Schema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },

  blogId: {
    type : mongoose.Schema.ObjectId,
    required: true,
    ref: "blog",
  },

  commmentedBy: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "user",
  },

  parentCommentId:{
     type: mongoose.Schema.ObjectId,
    ref: "comment",
    default:null
  },

  nextedComment:[{
    type: mongoose.Schema.ObjectId,
    ref: "comment",
    default:null
  }]

},{timestamps:true});

export const comment_model = mongoose.model("Comments", comment_Schema);
