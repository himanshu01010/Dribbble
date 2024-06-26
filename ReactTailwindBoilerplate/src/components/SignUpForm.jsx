import React, { useState } from "react";
import i1 from "../image/i1.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  localStorage.clear();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handler = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (!name.trim()) {
      setNameError("Name is required");
    }

    if (!username.trim()) {
      setUsernameError("Username is required");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
    }

    if (name.trim() && username.trim() && email.trim() && password.trim()) {
      try {
        const res = await axios.post("https://dribbble-api.vercel.app/api/signup", {
          name,
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
        if (res.data.message === "exist") {
          setUsernameError("User already exist");
        } else if (res.data.message === "success") {
          localStorage.setItem("email", email);
          localStorage.setItem("name", name);
          navigate("/profile");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert("Wrong details or server error");
      }
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center min-h-screen bg-yellow-100">
      <div className="hidden sm:block w-2/3">
        <img src={i1} alt="img-1" className="object-cover h-screen inset-0" />
      </div>

      <div className="flex-cols p-8">
        <h1 className="text-3xl font-bold mb-4">Sign up to Dribbble</h1>
        {usernameError && <p className="text-red-500 mb-4">{usernameError}</p>}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError && <p className="text-red-500 mt-2">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            {usernameError && <p className="text-red-500 mt-2">{usernameError}</p>}
          </div>
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
            {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
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
            {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox mr-2" />
              <span className="text-gray-600">
                Creating an account means you're okay with our Terms of Service,
                Privacy Policy, and our default Notification Settings.
              </span>
            </label>
          </div>
          <button
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors duration-300"
            onClick={handler}
          >
            Create Account
          </button>
          <p className="text-gray-400 text-sm mt-4">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
        </div>
        <p className="text-gray-600 text-sm mt-4">
          Already a member?{" "}
          <Link to="/login" className="text-pink-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;