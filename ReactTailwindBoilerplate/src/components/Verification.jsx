import React, { useState, useEffect } from "react";
import axios from "axios";

const Verification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const name = localStorage.getItem("name");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const isVerifiedFromStorage = localStorage.getItem("isVerified") === "true";

  useEffect(() => {
    setIsVerified(isVerifiedFromStorage);
  }, [isVerifiedFromStorage]);

  const email = localStorage.getItem("email");
  const profilePic = localStorage.getItem("profilePicUrl");
  const location = localStorage.getItem("userLocation");
  const role = localStorage.getItem("selectedRoles");
  console.log("role:", role);

  const verifyEmail = async () => {
    try {
      const response = await axios.post(
        "https://dribbble-api.vercel.app/api/verify-email",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        await submitProfile();
        console.log("Email verification successful");
      } else {
        console.error("Failed to verify email");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  const submitProfile = async () => {
    try {
      const response = await axios.post(
        "https://dribbble-api.vercel.app/api/profiles",
        {
          email,
          profilePic,
          location,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Profile submitted successfully");
      } else {
        console.error("Failed to submit profile");
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  const handleVerify = async () => {
    try {
      await verifyEmail();
      setIsEmailSent(true);
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4">
        <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-2xl font-bold text-pink-600">dribbble.</div>
            <div className="ml-8 flex space-x-6 text-gray-600 hidden md:flex">
              <div className="hover:text-pink-600 cursor-pointer">
                Inspiration
              </div>
              <div className="hover:text-pink-600 cursor-pointer">
                Find Work
              </div>
              <div className="hover:text-pink-600 cursor-pointer">
                Learn Design
              </div>
              <div className="hover:text-pink-600 cursor-pointer">Go Pro</div>
              <div className="hover:text-pink-600 cursor-pointer">
                Hire Designers
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 mb-4 md:mb-0"
              placeholder="Search..."
            />
            <div className="text-gray-600 hover:text-pink-600 cursor-pointer">
              <i className="fas fa-shopping-cart"></i>
            </div>
            {profilePic && (
              <div className="relative">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            )}
            <div className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 cursor-pointer">
              Upload
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {isVerified ? (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
              Welcome to Dribbble!
              <h1>{name} 👋</h1>
            </h1>
          </div>
        ) : isEmailSent ? (
          <div className="max-w-md mx-auto text-center">
            <p className="text-gray-600 mb-4">
              A verification email has been sent to your inbox. Please check
              your email and follow the instructions to verify your account.
            </p>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">
              Please verify your email...
            </h1>
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <i className="fas fa-envelope text-5xl text-pink-600 mb-4"></i>
              <p className="text-gray-600 mb-4">
                Please verify your email address. We've sent a confirmation
                email to:
              </p>
              <p className="font-bold">{email}</p>
              <div
                onClick={handleVerify}
                className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 cursor-pointer"
              >
                Verify
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Click the confirmation link in that email to begin using Dribbble.
            </p>
          </div>
        )}
      </main>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">For designers</h4>
              <ul className="text-gray-600">
                <li className="hover:text-pink-600 cursor-pointer">Go Pro!</li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Explore design work
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Design blog
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Overtime podcast
                </li>
                <li className="hover:text-pink-600 cursor-pointer">Playoffs</li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Weekly Warm-Up
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Refer a Friend
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Code of conduct
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Hire designers</h4>
              <ul className="text-gray-600">
                <li className="hover:text-pink-600 cursor-pointer">
                  Post a job opening
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Post a freelance project
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Search for designers
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="text-gray-600">
                <li className="hover:text-pink-600 cursor-pointer">About</li>
                <li className="hover:text-pink-600 cursor-pointer">Careers</li>
                <li className="hover:text-pink-600 cursor-pointer">Support</li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Media kit
                </li>
                <li className="hover:text-pink-600 cursor-pointer">Brands</li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Advertise with us
                </li>
                <li className="hover:text-pink-600 cursor-pointer">API</li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Testimonials
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Terms of service
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Privacy policy
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Cookie policy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Verification;
