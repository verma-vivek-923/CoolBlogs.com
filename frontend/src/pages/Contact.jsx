
import React, { useState } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import toast from "react-hot-toast"

function Contact() {
  




  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
  
    const formData = new FormData(e.target); // Creates a FormData object from the form
    const data = Object.fromEntries(formData); // Converts FormData to a plain object
    console.log(data)

    const userData={
      // access_key:"abc-def-ghi",
      name:data.name,
      email:data.email,
      message:data.message
    }
    // try {
    //   await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully");
    // } catch (error) {
    //   toast.error("An error occurred");
    // }


  };
  return (
    <div >
      <div className='w-full  flex min-h-screen justify-center items-start md:py-12'>
        <div className='max-w-4xl w-full flex flex-col shadow-2xl  rounded-lg overflow-hidden p-10 mx-auto  bg-white'>
          <h1 className='text-center text-3xl font-semibold mb-1'>Contact Us</h1>
          <p className="text-gray-600 text-center mb-4">Get in Touch – We're Here to Help!</p>
          <div className='flex flex-col md:flex-row justify-between '>
            <div className='w-full md:w-1/2 mb-8 md:mb-0 md:pr-4'>
              <form onSubmit={handleSubmit}>

                <label >Full Name</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  placeholder="Your Full Name"
                  required
                  className="w-full px-4 py-2 mb-6 border focus:bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 "
                />
                <label >Email :-</label>
                <input
                  type="text"
                  name="email"
                  autoComplete="off"
                  placeholder="Email address"
                  required
                  className="w-full px-4 py-2 mb-6 border focus:bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 "
                />

                <label >Message :-</label>
                <textarea
                  name="message"
                  autoComplete="off"
                  placeholder="Write your query or feedback here !!"
                  required
                  className="w-full px-4 py-2 border mb-6 focus:bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 mt-2 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Send Message
                </button>
               
              </form>
            </div>
            <div className='w-full md:w-1/2 md:pl-4'> 
            <h3 className="text-lg font-medium text-gray-700 mb-4">
                Contact Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-red-500" />
                  <span>+91 9399863365</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEnvelope className="text-pink-500" />
                  <span>vivek90203@gmail.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-green-500" />
                  <span>Indore, Madhya Pradesh, India</span>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
