import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { IoHome } from "react-icons/io5";
function SignupForm() {
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const changephotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(); // object is
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result); //reader.
      setPhoto(file);
    };
  };

  const handleVerify = async (e) => {
    e.preventDefault();
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

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4500/user/register",
        formData, //sending form data to /signup endpoint
        {
          withCredentials: true, // This option allows sending cookies and other credentials (like authorization tokens) along with the request.
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Sign Up Successfull");
      console.log(data.create_user);
      setProfile(data.create_user);
      setLoading(false);
      navigateTo("/");
      // window.location.pathname = "/";
    } catch (error) {
      const err = error?.response?.data?.message;
      if (err) {
        toast.error(err + "!");
      } else {
        toast.error("sign in error");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col relative items-center justify-center min-h-screen bg-slate-100">
      <Link
        to={"/"}
        className=" absolute top-4 left-4 px-2 md:px-10 flex items-center space-x-1"
      >
        <IoHome />
        <span>Home</span>
      </Link>

      <h1 className="text-4xl font-bold  mb-4">
        Cool<span className="text-blue-600">Blogs</span>
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl text-center font-semibold mb-1">
          Create a new account
        </h2>
        <p className="text-gray-600 text-center mb-4">It's quick and easy.</p>
        <form onSubmit={handleVerify}>
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
              <option value="bca">BCA</option>
              <option value="bsc">B.Sc.</option>
              <option value="ba">BA</option>
              <option value="mca"> MCA</option>
              <option value="ma">MA</option>
              <option value="msc">M.Sc.</option>
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
          <div className="flex  items-center ">
            <div className="w-14 h-14 rounded-full flex justify-center items-center overflow-hidden photo">
              {
                <img
                  className={`${
                    imagePreview ? "block" : "hidden"
                  } object-cover  object-center w-full h-full`}
                  src={imagePreview ? `${imagePreview}` : "Image Preview"}
                  alt="Img"
                />
              }
            </div>

            <div className="w-4/5">
              <input
                type="file"
                className="w-full p-2 px-4 focus:bg-slate-100 focus:outline-none"
                onChange={changephotoHandler}
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 mt-2 text-white py-2 rounded-md font-semibold hover:bg-green-700"
          >
            {!loading ? (
              "SignUp"
            ) : (
              <div className="flex justify-center items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.28.805 4.373 2.143 6.027l1.857-1.736z"
                  ></path>
                </svg>
                <span>Registering...</span>
              </div>
            )}
          </button>
          <p className="text-center mt-4">
            Already registered?{" "}
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Login Now
            </Link>
          </p>
        </form>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button> */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Verify OTP</h3>
          <p className="py-4">OTP has been sent to your registered email. Please enter the OTP below.</p>
          <div className="modal-action">
            <form >
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => handleSubmit}
                className="px-4 py-1 bg-red-700 text-white rounded-lg hover:bg-red-900 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
              >
               Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default SignupForm;
