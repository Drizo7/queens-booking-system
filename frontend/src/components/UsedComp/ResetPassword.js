
import React, { useState } from 'react';
import { Button, Input } from '../Form';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ResetPassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
      //setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', {
        email,
        newPassword,
      });

        toast.message(response.data.message);
      //setMessage(response.data.message);
    } catch (error) {
        toast.error('An error occurred : ' + error.response.data.message);
      //setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="flex-colo gap-4">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" Reset Password />
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default ResetPassword;
