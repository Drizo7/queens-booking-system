import React, { useState } from 'react';
import { Button, Input } from '../Form';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Validate passwords
  const validatePasswords = () => {
    const newErrors = {};
    if (!oldPassword) newErrors.oldPassword = 'Old Password is required';
    if (!newPassword) newErrors.newPassword = 'New Password is required';
    if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle password change submission
  const handlePasswordChange = async () => {
    if (!validatePasswords()) return;

    try {
      const response = await axios.put(
        'http://localhost:5000/api/changepassword',
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Password updated successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="flex-colo gap-4">
      <Input
        label="Old Password"
        color={true}
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        error={errors.oldPassword}
      />
      <Input
        label="New Password"
        color={true}
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        error={errors.newPassword}
      />
      <Input
        label="Confirm Password"
        color={true}
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />
      <Button
        label="Save Changes"
        Icon={HiOutlineCheckCircle}
        onClick={handlePasswordChange}
      />
    </div>
  );
}

export default ChangePassword;
