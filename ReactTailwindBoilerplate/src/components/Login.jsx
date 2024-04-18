import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import i1 from "../image/i1.jpg";

const Login = () => {
  localStorage.clear();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { email, password });
      if (res.data.success) {
        const { name, email_validated, profilePic, userLocation, selectedRoles } = res.data;
        localStorage.setItem("name", name);
        localStorage.setItem("isVerified", email_validated);
        localStorage.setItem("profilePicUrl", profilePic);
        localStorage.setItem("userLocation", userLocation);
        localStorage.setItem("selectedRoles", selectedRoles);
        navigate("/verification");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
   
    <div className="flex gap-4 items-center justify-center min-h-screen bg-yellow-100 ">
  
      <div className="hidden sm:block w-2/3">
        <img src={i1} alt="img-1" className="object-cover h-screen inset-0" />
      </div>

      <div className="flex-cols p-8 sm:mr-8">
        <h1 className="text-3xl font-bold mb-4 sm:w-[700px]">
        Welcome Back to dribbble !
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="account@refero.design"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="6+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
