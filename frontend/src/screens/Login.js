import React, { useState } from 'react';
import { Button, Input } from '../components/Form';
import { BiLogInCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      
      console.error('Both email and password must be provided.');
      toast.error('Both email and password must be provided.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      toast.error('Login failed: '+ err.response?.data?.message);
      console.error('Login failed:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="w-full h-screen flex-colo bg-dry">
      <form className="w-2/5 p-8 rounded-2xl mx-auto bg-white flex-colo" onSubmit={handleLogin}>
        <img src="/images/gov_logo.png" alt="logo" className="w-48 h-16 object-contain" />
        <div className="flex flex-col gap-4 w-full mb-6">
          <Input
            label="Email"
            type="email"
            value={email} // Controlled value
            onChange={(e) => setEmail(e.target.value)} // Controlled change handler
            color={true}
            placeholder={'admin@gmail.com'}
          />
          <Input
            label="Password"
            type="password"
            value={password} // Controlled value
            onChange={(e) => setPassword(e.target.value)} // Controlled change handler
            color={true}
            placeholder={'*********'}
          />
        </div>
        <Button label="Login" Icon={BiLogInCircle} />
        {/* Add Register Button */}
        <button
          type="button"
          className="mt-4 text-blue-600 underline"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
