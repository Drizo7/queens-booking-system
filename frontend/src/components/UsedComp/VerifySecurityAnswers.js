
import React, { useState } from 'react';
import { Button, Input } from '../Form';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const VerifySecurityAnswers = ({ onVerificationSuccess }) => {
  const [email, setEmail] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  //const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/verify-security-answers', {
        email,
        answer1,
        answer2,
        answer3,
      });

      //setMessage(response.data.message);
      toast.message(response.data.message);
      if (response.status === 200) onVerificationSuccess(email);
    } catch (error) {
        toast.error('An error occurred : ' + error.response.data.message);
      //setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="flex-colo gap-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-6">
              <div className="w-full">
                <Input label="Email" type="email" placeholder="@example.com" value={email} color={true} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        </div>
        <div className="flex gap-4 mb-6">
              <div className="w-full">
                <Input label="What is your mother's maiden name?" type="text" placeholder="Answer 1" value={answer1} color={true} onChange={(e) => setAnswer1(e.target.value)} required />
        </div>
        </div>
        <div className="flex gap-4 mb-6">
              <div className="w-full">
                <Input label="What was the name of your first school?" type="text" placeholder="Answer 2" value={answer2} color={true} onChange={(e) => setAnswer2(e.target.value)} required />
        </div>
        </div>
        <div className="flex gap-4 mb-6">
              <div className="w-full">
                <Input label="What city were you born in?" type="text" placeholder="Answer 3" value={answer3} color={true} onChange={(e) => setAnswer3(e.target.value)} required />
        </div>
        </div>
        <Button  label="Verify Answers" />
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default VerifySecurityAnswers;
