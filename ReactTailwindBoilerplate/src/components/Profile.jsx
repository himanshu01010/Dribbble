import React, { useState } from 'react';
import p1 from "../image/p1.jpg";
import p2 from "../image/p2.jpg";
import p3 from "../image/p3.jpg";
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [userLocation, setUserLocation] = useState('');
  const [showDefaultOptions, setShowDefaultOptions] = useState(false);

  const handleProfilePicChange = async (event) => {
    const cloudinary_name = "dvsdok7uq";
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ir1ock8m');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`, {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });

      const data = await response.json();
      if (response.ok) {
        setProfilePicUrl(data.secure_url);
        localStorage.setItem("profilePicUrl", data.secure_url); 
      } else {
        console.error('Error uploading image:', data.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDefaultProfilePic = (picUrl) => {
    setProfilePicUrl(picUrl);
    localStorage.setItem("profilePicUrl", picUrl); 
    setShowDefaultOptions(false);
  };

  const toggleDefaultOptions = () => {
    setShowDefaultOptions(!showDefaultOptions);
  };

  const handleLocationChange = (e) => {
    setUserLocation(e.target.value);
    localStorage.setItem("userLocation", e.target.value); 
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome! Let's create your profile</h1>
        <p className="text-gray-600">Let others get to know you better! You can do these later</p>
      </div>
      <div className="flex flex-col items-center w-full max-w-md mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add an avatar</h2>
        <div className="flex items-center mb-4">
          {profilePicUrl ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden mr-4">
              <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow">
                <i className="text-green-500 text-2xl fas fa-camera"></i>
              </div>
            </div>
          ) : (
            <div className="w-24 h-24 flex items-center justify-center mr-4 bg-gray-200 rounded-full">
              <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-dotted border-gray-400">
                <i className="text-gray-400 text-4xl fas fa-user"></i>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <input
              type="file"
              accept="image/*"
              id="profile-pic-input"
              className="hidden"
              onChange={handleProfilePicChange}
            />
            <label htmlFor="profile-pic-input" className="px-4 py-2 bg-white text-black rounded-md cursor-pointer border border-gray-300 font-bold hover:bg-gray-50">
              Choose Image
            </label>
            <div className="mt-2 cursor-pointer" onClick={toggleDefaultOptions}>
              <i className={`text-gray-400 text-2s fas fa-chevron-${showDefaultOptions ? 'up' : 'down'}`}>defaults avatar</i>
            </div>
          </div>
        </div>
        {showDefaultOptions && (
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 mr-4" onClick={() => handleDefaultProfilePic(p1)}>
              <img src={p1} alt="Default Pic 1" className="w-full h-full rounded-full object-cover cursor-pointer" />
            </div>
            <div className="w-20 h-20 mr-4" onClick={() => handleDefaultProfilePic(p2)}>
              <img src={p2} alt="Default Pic 2" className="w-full h-full rounded-full object-cover cursor-pointer" />
            </div>
            <div className="w-20 h-20" onClick={() => handleDefaultProfilePic(p3)}>
              <img src={p3} alt="Default Pic 3" className="w-full h-full rounded-full object-cover cursor-pointer" />
            </div>
          </div>
        )}
      </div>
      <div className="w-full max-w-md text-left mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add your location</h2>
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-pink-600"
            placeholder="Enter a location"
            value={userLocation}
            onChange={handleLocationChange}
          />
        </div>
      </div>
      <Link to="/role" className="px-6 py-3 bg-pink-600 text-white rounded-md font-medium text-lg focus:outline-none hover:bg-pink-700">
        Submit
      </Link>
    </div>
  );
};

export default UserProfile;
