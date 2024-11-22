import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="border py-10">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 hover:underline hover:tracking-wider duration-200">
                  Flutter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 hover:underline hover:tracking-wider duration-200">
                  React
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 hover:underline hover:tracking-wider duration-200">
                  Android
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 hover:underline hover:tracking-wider duration-200">
                  iOS
                </a>
              </li>
            </ul>
          </div>

          <div className=" text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 hover:underline hover:tracking-wider duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 hover:underline hover:tracking-wider duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 hover:underline hover:tracking-wider duration-200">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 hover:underline hover:tracking-wider duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 hover:underline hover:tracking-wider duration-200">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center col-span-2">
            <h6 className="text-xl text-center font-semibold mb-4">Social</h6>
            <div className="grid grid-cols-3 w-max gap-8">
              <a>
                <FaGithub size={40} />
              </a>
              <a>
                <FaLinkedin size={40} />
              </a>
              <a>
                <FaInstagram size={40} />
              </a>
            </div>
          </div>
        </div>
      </footer>
      
    </>
  );
};

export default Footer