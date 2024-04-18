import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = new URLSearchParams(location.search).get('token');
        const response = await axios.post('/api/verify-token', { token });

        if (response.status === 200) {
          setIsVerified(true);
          localStorage.setItem('isVerified','true');
          navigate('/verification');
        } else {
          console.error('Failed to verify email');
          navigate('/verification');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        navigate('/verification');
      }
    };

    verifyEmail();
  }, [location.search, navigate]);

  return (
    <div>
      {isVerified ? (
        <h1>Email verification successful</h1>
      ) : (
        <p>Verifying your email address...</p>
      )}
    </div>
  );
};

export default VerifyEmail;