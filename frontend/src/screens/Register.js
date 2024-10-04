import React, { useState } from 'react';
import { Button, Input } from '../components/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        password,
      });

      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

return (
  <div className="w-full h-screen flex items-center justify-center bg-dry">
    <form className="w-full max-w-2xl p-8 rounded-2xl mx-auto bg-white" onSubmit={handleRegister}>
      <div className="flex justify-center mb-6">
        <img src="/images/gov_logo.png" alt="logo" className="w-48 h-16 object-contain" />
      </div>

      <div className="flex gap-4 mb-6 mt-6">
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

      {/* Register Button */}
      <div className="flex justify-center">
        <Button label="Register" />
      </div>
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
