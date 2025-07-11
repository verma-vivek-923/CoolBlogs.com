import React from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Creators from "./pages/Creators";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Update_Blog from "./dashboard/Update_Blog";
import Update_user from "./dashboard/Update_user";
import Detail from "./pages/Blog_Detail";
import ForgotPassword from "./pages/ForgotPassword";
import SearchBlogs from "./pages/SearchBlogs";

function App() {
  const location = useLocation();
  const hideNavFoot = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  const { blogs } = useAuth();
  return (
    <div className=" bg-blue-50">
      {!hideNavFoot && <Navbar />}
      {/* defining routes */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />

        <Route exact path="/blog/:id" element={<Detail />} />
        <Route exact path="/blog/update/:id" element={<Update_Blog />} />
        <Route exact path="/user/update/:id" element={<Update_user />} />
        <Route eaxct path="/blog/search" element={<SearchBlogs />} />
      </Routes>
      <Toaster />

      {!hideNavFoot && <Footer />}
    </div>
  );
}

export default App;
