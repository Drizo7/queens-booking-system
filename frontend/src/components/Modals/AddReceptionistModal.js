import React, { useState } from 'react';
import Modal from './Modal';
import { Button, Input, Select } from '../Form';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import Access from '../Access';
import Uploader from '../Uploader';

function AddReceptionistModal({ closeModal, isOpen, datas }) {
  const [instraction, setInstraction] = useState(sortsDatas.title[0]);
  const [access, setAccess] = useState({});

  const onSubmit = () => {
    toast.error('This feature is not available yet');
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
          <Input label="First Name" color={true} placeholder="John" />
          <Input label="Last Name" color={true} placeholder="Doe" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input label="Email" color={true} />
          <Input label="Phone Number" color={true} />
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
