import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Login = () => {
 
  const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("role", role);
    formData.append("password", password);
    
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
        "http://localhost:4500/user/login",
        formData, //sending form data to /signup endpoint
        {
          withCredentials: true, // This option allows sending cookies and other credentials (like authorization tokens) along with the request.
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(data);
      toast.success("LogIn Successfull");
      window.location.pathname = "/";
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
    <div className="flex flex-col relative items-center  justify-center min-h-screen bg-slate-100">
      <Link to={"/"} className="w-full absolute top-4 left-4 px-2 md:px-10 flex  items-center space-x-1" >
            <IoHome /><span>Home</span>
        </Link>
      <h1 className="text-4xl font-bold  mb-4">Cool<span className='text-blue-600'>Blogs</span></h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full mb-10 max-w-md">
        <h2 className="text-2xl text-center font-semibold mb-1">Login to CoolBlogs</h2>
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
            className="w-full p-2 focus:bg-slate-100 border border-gray-300 rounded-md mb-4"
          />
          
          <button
            type="submit"
            className="w-full bg-green-600 mt-2 text-white py-2 rounded-md font-semibold hover:bg-green-700"
          >
           Login In
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
}

export default Login
