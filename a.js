const axios = require('axios');

const sendSms = async (message, numbers) => {
  const apikey = 'NDE3NDM0NzkzMDdhNzc0YTQyNjQ3NzU2NTEzMzc2NDM=';
  const sender = 'TXTLCL';
  const url = 'https://api.textlocal.in/send/';

  try {
    const response = await axios.post(url, null, {
      params: {
        apikey,
        message,
        numbers,
        sender
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Example usage:
const message = 'Your approved template message here'; // Replace with your approved template message
const numbers = '+919481090986';

sendSms(message, numbers)
  .then(response => {
    console.log('SMS sent successfully:', response);
  })
  .catch(error => {
    console.error('Failed to send SMS:', error);
  });