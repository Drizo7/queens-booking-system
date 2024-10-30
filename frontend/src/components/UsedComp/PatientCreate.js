import React, { useState } from 'react';
import axios from 'axios';
import Uploder from '../Uploader';
import { sortsDatas } from '../Datas';
import { Button, DatePickerComp, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiDeleteBin5Line } from 'react-icons/ri';

function PatientCreate({ titles }) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [date_of_birth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!first_name.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    if (!last_name.trim()) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!phone_number.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/patient', {
        first_name,
        last_name,
        gender: gender.name,
        date_of_birth,
        email,
        phone_number,
        address,
      });

      if (response.status === 201) {
        toast.success('Patient created successfully');
        // Reset form after successful submission
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
        setAddress('');
        setGender(sortsDatas.genderFilter[0]);
        setDateOfBirth(new Date());
      }
    } catch (error) {
      console.error('Error details:', error); // Logs the full error object
      console.log('Request data:', {
        first_name,
        last_name,
        gender: gender.name,
        date_of_birth,
        email,
        phone_number,
        address,
      }); // Logs the data being sent
      toast.error('Failed to create patient');
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

      {!titles && (
        <>
          {/* gender */}
          <div className="flex w-full flex-col gap-3">
            <div className="grid sm:grid-cols-2 gap-4 w-full">
            <div>
              <p className="text-black text-sm mb-3">Gender</p>
            <Select
              selectedPerson={gender}
              setSelectedPerson={setGender}
              datas={sortsDatas.genderFilter}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {gender?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
            {/* date */}
          <DatePickerComp
            label="Date of Birth"
            startDate={date_of_birth}
            onChange={setDateOfBirth}
          />
          </div>
          </div>

          {/* address */}
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={errors.address}
              color={true}
              type="text"
            />
            {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
          </div>
        </>
      )}

      {/* submit */}
      <div className="grid grid-cols-1 sm:grid-cols-1 w-full">
        
        <Button
          label={'Create Patient'}
          Icon={HiOutlineCheckCircle}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default PatientCreate;
