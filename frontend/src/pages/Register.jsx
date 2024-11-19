import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { IoHome } from "react-icons/io5";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const changephotoHandler = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const reader = new FileReader(); // object is created to read the contents of the file
    // console.log(reader);

    reader.readAsDataURL(file); //reads the file and converts it to a data URL (base64-encoded string). Used to display the image before it is uploaded
    reader.onload = () => {
      //triggered when the file reading is completed.
      setImagePreview(reader.result); //reader.result contains the data URL (the base64-encoded image).
      setPhoto(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", mobile);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
//     const formData = new FormData();
// const fields = { name, email, password, phone: mobile, role, education, photo };

// Object.entries(fields).forEach(([key, value]) => {
//   formData.append(key, value);
// });
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);

    // }
    console.log(formData);
    try {
      const {data} = await axios.post(
        "http://localhost:4500/user/register",
        formData, //sending form data to /signup endpoint
        {
          withCredentials: true, // This option allows sending cookies and other credentials (like authorization tokens) along with the request.
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(data);
      toast.success("Sign Up Successfull");
      // window.location.pathname = "/";
      // console.log(window.location());
      

      
    } catch (error) {
      const err=error.response.data.message;
      if (err) {
        toast.error(err+"!")
      } else {
        
      }
      // alert("sign in error")
    }
  };

  return (
    <div className="flex flex-col relative items-center justify-center min-h-screen bg-slate-100">
      
        <Link to={"/"} className="w-full absolute top-4 left-4 px-2 md:px-10 flex items-center space-x-1" >
            <IoHome /><span>Home</span>
        </Link>
             
      <h1 className="text-4xl font-bold text-blue-600 mb-4">CoolBlogs</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl text-center font-semibold mb-1">Create a new account</h2>
        <p className="text-gray-600 text-center mb-4">It's quick and easy.</p>
        <form onSubmit={handleSubmit}>

        <div className="flex gap-2 mb-3 justify-between">
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 focus:bg-slate-100 border border-gray-300 rounded-md w-1/2"
            >
             <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            </select>

            <select
              name="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="p-2 border focus:bg-slate-100 border-gray-300 rounded-md w-1/2"
            >
             <option value="">Your Education</option>
            <option value="Graduate">Graduate</option>
            <option value="Post_Graduate"> Post Graduate</option>
            <option value="Ph.D."> Ph.D.</option>
            <option value="Higher_secondary_Education"> Higher secondary Education</option>
            <option value="secondary_Education"> secondary Education</option>
            </select>
          </div> 

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              name={name}
              placeholder="Your Full Name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 focus:bg-slate-100 border border-gray-300 rounded-md"
            />
          </div>

          <input
            type="text"
            name={mobile}
            autoComplete="off"
            placeholder="Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full p-2 border focus:bg-slate-100 border-gray-300 rounded-md mb-3"
          />
          <input
            type="text"
            name={email}
            autoComplete="off"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border focus:bg-slate-100 border-gray-300 rounded-md mb-3"
          />

          <input
            type="password"
            name={password}
            autoComplete="off"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 focus:bg-slate-100 border border-gray-300 rounded-md mb-4"
          />
          <div   className="flex justify-between items-center ">
            <div className="w-14 h-14 rounded-full flex justify-center items-center overflow-hidden photo">
              <img className="object-cover object-center w-full h-full"
                src={imagePreview ? `${imagePreview}` : "Image Preview"}
                alt="Img"
              />
            </div>

            <div className="w-max">
              <input
                type="file"
                className="w-full p-2 px-4 focus:bg-slate-100 focus:outline-none"
                onChange={changephotoHandler}
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 mt-2 text-white py-2 rounded-md font-semibold hover:bg-green-700"
          >
            Sign Up
          </button>
          <p className="text-center mt-4">
              Already registered?{" "}
              <Link to={"/login"} className="text-blue-600 hover:underline">
                Login Now
              </Link>
            </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
