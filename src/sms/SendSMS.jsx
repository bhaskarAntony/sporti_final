import React, { useState } from 'react';
import axios from 'axios';

const SendSMS = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleSendSMS = async () => {
    try {
      const res = await axios.post('http://localhost:5000/send-sms', {
        mobileNumber,
        message,
      });

      setResponse(res.data.message);
    } catch (error) {
      setResponse('Failed to send SMS');
    }
  };

  return (
    <div>
      <h1>Send SMS</h1>
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendSMS}>Send SMS</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default SendSMS;
