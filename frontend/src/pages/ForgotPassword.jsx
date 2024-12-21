import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../components/loading";

import { IoHome } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [new_password, setNew_password] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [show, setShow] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoadingSend(true);

    const form_data = new FormData();
    form_data.append("email", email);

    try {
      const { data } = await axios.post(
        "http://localhost:4500/user/forgot-password",
        form_data,
        {
          withCredentials: true,
          header: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("OTP Send to your Email");
      setLoadingSend(false);
      setDisabled(false);
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message) {
        console.log(error);
        console.log(message);
        toast.error("Error : " + message);
      }
      setLoadingSend(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoadingVerify(true);

    const form_data = new FormData();
    form_data.append("email", email);
    form_data.append("otp", otp);

    try {
      const { data } = await axios.post(
        "http://localhost:4500/user/verifyotp",
        form_data,
        {
          header: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // toast.success("Validate Succesfully");
      setLoadingVerify(false);
      setDisabled(true);
      setShow(true);
    } catch (error) {
      setLoadingVerify(false);
      const message = error?.response?.data.message;
      toast.error(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    const form_data = new FormData();

    form_data.append("email", email);
    form_data.append("new_password", new_password);
    form_data.append("cpassword", cpassword);

    try {
      const { data } = await axios.post(
        "http://localhost:4500/user/reset-password",
        form_data,
        {
          header: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingSubmit(false);
      toast.success("Passsword Changed Successfully");
    } catch (error) {
      setLoadingSubmit(false);
      const msg = error?.response?.data?.message;
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col relative items-center  justify-start  min-h-screen bg-slate-100">
      <Link
        to={"/"}
        className=" absolute top-4 left-4 px-2 md:px-10 flex hover:text-blue-800 hover:underline items-center space-x-1"
      >
        <IoHome />
        <span>Home</span>
      </Link>
      <h1 className="text-4xl font-bold mt-12  mb-4">
        Cool<span className="text-blue-600">Blogs</span>
      </h1>
      <div className="relative overflow-hidden bg-white rounded-lg shadow-lg  w-full  mb-10 max-w-md">
        <div
          className={` relative transition-all duration-700 ${
            show ? "-translate-x-full opacity-100" : "translate-x-0 opacity-100"
          }  `}
        >
          {!show && (
            <div className="space-y-4 px-6 py-2 pb-6">
              <h2 className="text-2xl mt-4 text-center font-semibold ">
                Forgot Password
              </h2>
              <form onSubmit={handleSendOtp}>
                <div className="flex items-center gap-1 mb-3 min-w-full justify-center">
                  <input
                    type="text"
                    aria-label="Search"
                    disabled={!disabled}
                    name={email}
                    autoComplete="off"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-grow p-2  border focus:bg-slate-100 border-gray-300 rounded-md"
                  />
                  <button
                    disabled={loadingSend}
                    type="submit"
                    className="bg-green-600 h-full  rounded-md px-2 py-2 border-2 text-sm md:text-base text-white hover:bg-green-700"
                  >
                    {!loadingSend ? (
                      "Send OTP"
                    ) : (
                      <div className="flex justify-center items-center space-x-2">
                        <Loading />
                        {/* <span className="hidden md:flex text-sm">Sending...</span> */}
                      </div>
                    )}
                  </button>
                </div>
              </form>

              <form onSubmit={handleVerify}>
                <input
                  type="text"
                  disabled={disabled}
                  name={otp}
                  autoComplete="off"
                  placeholder="Enter 6 digit OTP Here"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full p-2 tracking-widest focus:bg-slate-100 border border-gray-300 rounded-md mb-2"
                />
                <button
                  disabled={loadingVerify || disabled}
                  type="submit"
                  className={`${
                    show ? "hidden" : "flex"
                  } w-full bg-green-600 mt-2 justify-center items-center text-white py-2 rounded-md md:font-semibold hover:bg-green-700`}
                >
                  {!loadingVerify ? (
                    "Verify"
                  ) : (
                    <div className="flex justify-center items-center space-x-2">
                      <Loading />
                      <span>Verifying...</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
        <div
          className={`relative transition-all duration-700  ${
            show ? "translate-x-0 opacity-100" : "translate-x-full opacity-100"
          }`}
        >
          {show && (
            <div className="space-y-4  pt-4">
              <button
                onClick={() => setShow(!show)}
                className="absolute top-2 hover:bg-slate-200 rounded-full duration-300 p-2 left-2"
              >
                <FaArrowLeft />
              </button>
              <h2 className="text-2xl  text-center font-semibold ">
                Set New Password
              </h2>
              <form
                onSubmit={handleSubmit}
                className="px-6 space-y-6 py-2 pb-6"
              >
                <div className="flex flex-col  gap-1 mb-3 min-w-full ">
                  <label>New Password :</label>
                  <input
                    type="password"
                    aria-label="Search"
                    name={new_password}
                    autoComplete="off"
                    placeholder="Enter New Password"
                    value={new_password}
                    onChange={(e) => setNew_password(e.target.value)}
                    required
                    className="flex-grow p-2 outline-1 focus:bg-slate-200 border focus:outline-green-700 focus:ring-1 border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex flex-col  gap-1 mb-3 min-w-full ">
                  <label>Comfirm New Password</label>
                  <input
                    type="password"
                    name={cpassword}
                    autoComplete="off"
                    placeholder="Enter Password Again"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    required
                    className="w-full p-2 tracking-widest focus:bg-slate-200 border focus:outline-green-700 border-gray-300 rounded-md mb-2"
                  />
                </div>
                <button
                  disabled={loadingSubmit}
                  type="submit"
                  className="w-full bg-green-600 mt-2 text-white py-2 rounded-md md:font-semibold hover:bg-green-700"
                >
                  {!loadingSubmit ? (
                    "Submit"
                  ) : (
                    <div className="flex justify-center items-center space-x-2">
                      <Loading />
                      <span>Applying...</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
