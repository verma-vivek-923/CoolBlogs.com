import { user } from "../models/user.model.js";

export const followAuthor = async (req, res) => {
  try {
    const follow_To = req.params?.userId;
    const follow_By = req?.users?._id;

    console.log(follow_To);
    console.log(follow_By);

    const find_Author = await user.findById(follow_To);
    const current_User = await user.findById(follow_By);

    if (!find_Author)
      return res.status(404).json({ message: "user not found" });

    if (!find_Author.followedBy) {
      find_Author.followedBy = [];
    }

    if (!current_User.followings) {
      current_User.followings = [];
    }
    console.log(find_Author);

    if (
      find_Author.followedBy.includes(follow_By) &&
      current_User.followings.includes(follow_To)
    ) {
      // console.log(find_Author.followedBy)

      find_Author.followedBy = find_Author.followedBy.filter(
        (id) => id.toString() !== follow_By.toString()
      );

      console.log(current_User.followings);
      current_User.followings = current_User.followings.filter(
        (elem) => elem.toString() !== follow_To
      );

      var message = "Unfollowed Successfull";
    } else {
      await find_Author.followedBy.push(current_User._id);
      await current_User.followings.push(find_Author._id);

      var message = "followed Successfull";
    }

    await find_Author.save();
    await current_User.save();

    // console.log(find_Author);

    res.status(200).json({ message, find_Author });
  } catch (error) {
    console.log("Internal Server Error", error);
  }
};
