import React, { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';
import { Button, Input, Textarea } from '../Form';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';

function AddEditClinicModal({ closeModal, isOpen }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [operating_hours, setOperatingHours] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Clinic Name is required';
    }
    if (!location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!operating_hours.trim()) {
      newErrors.operating_hours = 'Operating Hours are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    console.log({
    name,
    description,
    location,
    operating_hours,
    });

    try {
      const response = await axios.post('http://localhost:5000/api/clinic', {
        name,
        description,
        location,
        operating_hours,
      });

      if (response.status === 201) {
        toast.success('Clinic created successfully');
        // Reset form after successful submission
        setName('');
        setDescription('');
        setLocation('');
        setOperatingHours('');
        //closeModal();
      }
    } catch (error) {
      console.error('Error creating clinic:', error);
      toast.error('Failed to create clinic');
    }
  };

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} title="Add/Edit Clinic" width={'max-w-3xl'}>
      <div className="flex-colo gap-6">
        {/* Clinic Name */}
        <Input
          label="Clinic Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          color={true}
          placeholder="Enter clinic name"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        {/* Location */}
        <Input
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          error={errors.location}
          color={true}
          placeholder="Enter clinic location"
        />
        {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}

        {/* Operating Hours */}
        <Input
          label="Operating Hours"
          value={operating_hours}
          onChange={(e) => setOperatingHours(e.target.value)}
          error={errors.operating_hours}
          color={true}
          placeholder="Enter operating hours"
        />
        {errors.operating_hours && <p className="text-red-500 text-xs">{errors.operating_hours}</p>}

        {/* Description */}
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          color={true}
          placeholder="Write description here..."
        />
        {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}

        {/* Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            Cancel
          </button>
          <Button
            label="Save"
            Icon={HiOutlineCheckCircle}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddEditClinicModal;
