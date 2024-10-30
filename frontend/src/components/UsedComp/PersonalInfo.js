import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Uploder from '../Uploader';
import { Button, Input } from '../Form';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';

function PersonalInfo({ userData, onUpdateUserData }) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  // Populate initial values from userData prop
  useEffect(() => {
    setFirstName(userData.first_name || '');
    setLastName(userData.last_name || '');
    setPhoneNumber(userData.phone_number || '');
    setEmail(userData.email || '');
  }, [userData]);

  const validateForm = () => {
    const newErrors = {};
    if (!first_name.trim()) newErrors.first_name = 'First Name is required';
    if (!last_name.trim()) newErrors.last_name = 'Last Name is required';
    //if (!phone_number.trim()) newErrors.phone_number = 'Phone Number is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email format is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/api/profile',
        { first_name, last_name, phone_number, email }, // request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // separate headers object
          },
        }
      );

      if (response.status === 201) {
        toast.success('Profile updated successfully');
        const updatedUser = { first_name, last_name, email, phone_number };
        onUpdateUserData(updatedUser); // Update parent component state
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };


  return (
    <div className="flex-colo gap-4">
      {/* uploader */}
      <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Profile Image (Optional)</p>
        <Uploder />
      </div>

      {/* fullName */}
      <div className="grid sm:grid-cols-2 gap-4 w-full">
        <div>
          <Input
            label="First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.first_name}
            color={true}
            placeholder="John"
          />
          {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name}</p>}
        </div>

        <div>
          <Input
            label="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.last_name}
            color={true}
            placeholder="Doe"
          />
          {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name}</p>}
        </div>
      </div>

      {/* phone */}
      <div className="flex w-full flex-col gap-3">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
        
      <div>
        <Input
          label="Phone Number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={errors.phone_number}
          color={true}
          type="number"
        />
        {errors.phone_number && <p className="text-red-500 text-xs">{errors.phone_number}</p>}
      </div>

      {/* email */}
      <div>
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          color={true}
          type="email"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>
      </div>

      </div>

      
      {/* submit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <Button
          label={'Delete Account'}
          Icon={RiDeleteBin5Line}
          onClick={() => {
            toast.error('This feature is not available yet');
          }}
        />
        <Button
          label={'Save Changes'}
          Icon={HiOutlineCheckCircle}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;
