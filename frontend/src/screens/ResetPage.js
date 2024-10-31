import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import VerifySecurityAnswers from '../components/UsedComp/VerifySecurityAnswers';
import ResetPassword from '../components/UsedComp/ResetPassword';

const ResetPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleVerificationSuccess = (verifiedEmail) => {
    setIsVerified(true);
    setEmail(verifiedEmail);
  };

  const handleBackToLogin = () => {
    navigate('/login'); // Navigate back to the login page
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-dry">
      <div className="w-2/5 p-8 rounded-2xl mx-auto bg-white flex-col" >
        <div className="flex justify-center mb-2">
          <img src="/images/gov_logo.png" alt="logo" className="w-48 h-16 object-contain" />
        </div>
      <div>
        {!isVerified ? (
          <>
            <VerifySecurityAnswers onVerificationSuccess={handleVerificationSuccess} />
            <div className="flex justify-center">
            <button onClick={handleBackToLogin} className="mt-4 text-blue-600 underline">
              Back to Login
            </button>
            </div>
          </>
        ) : (
          <>
            <ResetPassword email={email} />
            <div className="flex justify-center">
            <button onClick={handleBackToLogin} className="mt-4 text-blue-600 underline">
              Back to Login
            </button>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default ResetPage;
