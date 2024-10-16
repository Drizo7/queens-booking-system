import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Input } from '../Form';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import Access from '../Access';
import Uploader from '../Uploader';
import axios from 'axios';

function AddReceptionistModal({ closeModal, isOpen, datas }) {
  const [instraction, setInstraction] = useState(sortsDatas.title[0]);
  const [access, setAccess] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState(''); // Include a password field for registration

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        password,
        role: 'receptionist', // Explicitly set role as receptionist
      });

      if (response.status === 201) {
        toast.success('Receptionist created successfully');
        //closeModal(); // Close the modal after success
      }
    } catch (error) {
      toast.error('Error creating receptionist');
      console.log('Error creating receptionist:', error);

  // Optionally, log specific error details if you want to see more context
  if (error.response) {
    console.log('Response data:', error.response.data);
    console.log('Response status:', error.response.status);
  }
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={'Add Receptionist'}
      width={'max-w-3xl'}
    >
      <div className="flex gap-3 flex-col col-span-6 mb-6">
        <p className="text-sm">Profile Image</p>
        <Uploader />
      </div>

      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} color={true} placeholder="Enter first name" />
          <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} color={true} placeholder="Enter last name"/>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} color={true} placeholder="Enter email" />
          <Input label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} color={true} placeholder="Enter phone number" /> 
        </div>
        <div className="grid sm:grid-cols-1 gap-4 w-full">
          <Input label="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} color={true} placeholder="********"/>
        </div>


        {/* table access */}
        <div className="w-full">
          <Access setAccess={setAccess} />
        </div>

        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            Cancel
          </button>
          <Button label="Save" Icon={HiOutlineCheckCircle} onClick={onSubmit} />
        </div>
      </div>
    </Modal>
  );
}

export default AddReceptionistModal;
