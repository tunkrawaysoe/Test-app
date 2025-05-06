import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: { 
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: {
      type:String,
      default : "",
    },
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
      default: {}, 
    },
    comments: {
      type: [], // Array of strings for simple comments
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
