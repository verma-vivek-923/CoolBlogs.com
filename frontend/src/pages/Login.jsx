import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { IoHome } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("role", role);
    formData.append("password", password);

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        formData, //sending form data to /signup endpoint
        {
          withCredentials: true, // This option allows sending cookies and other credentials (like authorization tokens) along with the request.
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      // setIsAuthenticated(true);
      toast.success("LogIn Successfull", { duration: 3000 });
      localStorage.setItem("user","loggedIn");
      navigateTo("/");
      setRole("");
      setPassword("");
      setEmail("");
      setTimeout(() => {
        window.location.pathname = "/";
      }, 1500);
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
    <div className="flex flex-col relative items-center  justify-center min-h-screen bg-slate-100">
      <Link
        to={"/"}
        className=" absolute top-4 left-4 px-2 md:px-10 flex  items-center space-x-1"
      >
        <IoHome />
        <span>Home</span>
      </Link>
      <h1 className="text-4xl font-bold  mb-4">
        Cool<span className="text-blue-600">Blogs</span>
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full mb-10 max-w-md">
        <h2 className="text-2xl text-center font-semibold mb-1">
          Login to Found-Hub
        </h2>
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
          </div>

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
            className="w-full p-2 focus:bg-slate-100 border border-gray-300 rounded-md mb-2"
          />
          <div className="flex justify-end px-6 mb-4">
            <Link to={"/forgot-password"}  className="text-sm cursor-pointer hover:underline hover:tracking-tight duration-300 text-blue-700" >
              Forgot Password ?
            </Link>
          </div>
          <button
          disabled={loading}
            type="submit"
            className="w-full bg-green-600 mt-2 text-white py-2 rounded-md md:font-semibold hover:bg-green-700"
          >
            {!loading ? (
              "Log In"
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
                <span>Loging In...</span>
              </div>
            )}
          </button>
          <p className="text-center mt-4">
            Not registered yet ?{" "}
            <Link to={"/register"} className="text-blue-600 hover:underline ">
              Sign Up Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
