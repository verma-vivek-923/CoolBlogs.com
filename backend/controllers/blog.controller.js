import { user } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { blog } from "../models/blog.model.js";
import mongoose from "mongoose";

export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length == 0) {
      return res.status(400).json({ message: "No File uploaded" });
    }
    const { blogImage } = req.files;
    const allowed_formats = ["image/jpeg", "image/png"];
    if (!allowed_formats.includes(blogImage.mimetype)) {
      return res.status(400).json({ message: "Invalid Photo Format" });
    }

    const { tittle, category, about } = req.body;
    const adminName = req?.users?.name;
    const adminPhoto = req?.users?.image?.url;
    const createdBy = req?.users?._id;

    if (!category || !tittle || !about) {
      return res.status(400).json({ message: "Fill All Fields" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath,
      {
        folder: "Blog_web/blogs/new_blogs",
      }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log("cloud error");
    }


    console.log(cloudinaryResponse);
    const create_blog = {
      tittle,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    };
    const blog_data = await blog.create(create_blog);
    res.status(200).json({ message: "Blog created Successfully", blog_data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  const find_blog = await blog.findById(id);

  if (!find_blog) {
    return res.status(400).json({ message: "Blog Not Found" });
  }
  await find_blog.deleteOne();
  res.status(200).json({ message: "Blog deleted Successfully" });
};

export const getAllBlogs = async (req, res) => {
  const all_blogs = await blog.find();
  // console.log(all_blogs)

  res.status(200).json(all_blogs);
};

export const singleBlog = async (req, res) => {
  const { id } = req.params;

  const find_blog = await blog.findById(id);

  if (!find_blog) {
    return res.status(400).json({ message: "Blog Not Found" });
  }

  res.status(200).json({ message: "blog are :-", find_blog });
};

export const getMyBlog = async (req, res) => {
  const created_by = req.users._id;
  const find_user = await blog.find({ createdBy: created_by });

  if (!find_user) {
    return res.status(500).json({ message: "No blog Found" });
  }
  res.status(200).json(find_user);
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  // check object id is valid or not (it check only format not value)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Object Id" });
  }

  const old_data = await blog.findById(id);
  console.log(old_data);
  if (!old_data) {
    return res.status(400).json({ message: "No Such Blog Found" });
  }

  if (req.files && req.files.blogImage) {
    const new_image = req.files.blogImage;

    const cloudinary_response = await cloudinary.uploader.upload(
      new_image.tempFilePath,
      {
        folder: "Blog_web/blogs/updated_blogs",
      }
    );

    if (!cloudinary_response && cloudinary_response.error) {
      console.log("clous error");
    }

    if (cloudinary_response) {
      updatedData.blogImage = {
        public_id: cloudinary_response.public_id,
        url: cloudinary_response.secure_url,
      };
    }
  } else if (req.body.blogImage) {
    updatedData.blogImage = old_data.blogImage;
  }

  const updated_blog = await blog.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true ,runValidators:true }
  );

       res.status(200).json({message:"Blog updated Successfully",updated_blog})
};
