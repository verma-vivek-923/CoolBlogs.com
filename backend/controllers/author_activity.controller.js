import { user } from "../models/user.model.js";

export const followAuthor = async (req, res) => {
  try {
    const follow_To = req.params?.userId;
    const follow_By = req?.users?._id;

    // console.log(follow_To);
    // console.log(follow_By);

    const find_Author = await user.findById(follow_To);

    if (!find_Author)
      return res.status(404).json({ message: "user not found" });

    if (!find_Author.followedBy) {
      find_Author.followedBy = [];
    }

    if (find_Author.followedBy.includes(follow_By)) {
      // console.log(find_Author.followedBy)

      find_Author.followedBy = find_Author.followedBy.filter((id) => {
        id.toString() !== follow_By;
      });

      var message = "Unfollowed Successfull";
    } else {
      await find_Author.followedBy.push(follow_By);

      var message = "followed Successfull";
    }

    await find_Author.save();

    // console.log(find_Author);

    res.status(200).json({ message, find_Author });
  } catch (error) {
    console.log("Internal Server Error", error);
  }
};
