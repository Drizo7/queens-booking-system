import React, { useState } from 'react';
import { Button, Input } from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IoArrowBack } from 'react-icons/io5'; // Import the back icon
import axios from 'axios';

function Register() {
  // Personal Info State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Security Questions State
  
  const [securityAnswer1, setSecurityAnswer1] = useState('');
  const [securityAnswer2, setSecurityAnswer2] = useState('');
  const [securityAnswer3, setSecurityAnswer3] = useState('');

  const [activeTab, setActiveTab] = useState('personalInfo'); // Manage active tab
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        password,
        // Add security questions and answers
        security_question_1: "What is your mother's maiden name?",
        security_answer_1: securityAnswer1,
        security_question_2: "What was the name of your first school?",
        security_answer_2: securityAnswer2,
        security_question_3: "What city were you born in?",
        security_answer_3: securityAnswer3,
      });

      toast.error('Registration succesful');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed : ' + err);
      console.error('Registration failed:', err);
    }
  };

  const handleNext = () => {
    setActiveTab('securityQuestions');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-dry">
      <form className="w-full max-w-2xl p-8 rounded-2xl mx-auto bg-white" onSubmit={handleRegister}>
        <div className="flex justify-center mb-6">
          <img src="/images/gov_logo.png" alt="logo" className="w-48 h-16 object-contain" />
        </div>

        {activeTab === 'personalInfo' && (
          <div>
            <div className="flex gap-4 mb-6">
              <div className="w-full md:w-1/2">
                <Input
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  color={true}
                  placeholder={'John'}
                />
              </div>
              <div className="w-full md:w-1/2">
                <Input
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  color={true}
                  placeholder={'Doe'}
                />
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-full md:w-1/2">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  color={true}
                  placeholder={'john.doe@example.com'}
                />
              </div>
              <div className="w-full md:w-1/2">
                <Input
                  label="Phone Number"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  color={true}
                  placeholder={'123-456-7890'}
                />
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-full md:w-1/2">
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  color={true}
                  placeholder={'*********'}
                />
              </div>
              <div className="w-full md:w-1/2">
                <Input
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  color={true}
                  placeholder={'*********'}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button label="Next" onClick={handleNext} />
            </div>
          </div>
        )}

        {activeTab === 'securityQuestions' && (
          <div>
          <button 
            type="button" 
            onClick={() => setActiveTab('personalInfo')} 
            className={`tab ${activeTab === 'personalInfo' ? 'active' : ''}`}
          >
            <IoArrowBack className="inline-block mr-2" />
          </button>
          <span className='ml-6'>Remember your responses</span>
            <div className="flex gap-4 mb-6 mt-6">
              <div className="w-full">
                <Input
                  label="What is your mother's maiden name?"
                  type="text"
                  value={securityAnswer1}
                  onChange={(e) => setSecurityAnswer1(e.target.value)}
                  color={true}
                  placeholder={'Your answer'}
                />
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-full">
                
                <Input
                  label="What was the name of your first school?"
                  type="text"
                  value={securityAnswer2}
                  onChange={(e) => setSecurityAnswer2(e.target.value)}
                  color={true}
                  placeholder={'Your answer'}
                />
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-full">
                
                <Input
                  label="What city were you born in?"
                  type="text"
                  value={securityAnswer3}
                  onChange={(e) => setSecurityAnswer3(e.target.value)}
                  color={true}
                  placeholder={'Your answer'}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button label="Register" />
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            className="mt-4 text-blue-600 underline"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          
        </div>
      </form>
    </div>
  );
}

export default Register;
