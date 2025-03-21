// api.js
import axios from 'axios';
//import Config from '../environments/environment';

const API_URL = 'https://localhost:44342/api/TreasureMaps';
//const API_URL = environmen t123.apiHost;

export const getTreasureMaps = async () => {
  //alert(Config)
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.get(API_URL, null, {
      headers: headers,
    });

    console.log('Response:', response.data);
    return response.data; // or return the entire response if needed

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    console.error('Axios Config:', error.config); // Useful for debugging the request
    throw error; // Re-throw the error so the caller can handle it
  }
};

export const createTreasureMap = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};
export const makePostRequest= async (headers, data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: headers,
    });

    console.log('Response:', response.data);
    return response.data; // or return the entire response if needed

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    console.error('Axios Config:', error.config); // Useful for debugging the request
    throw error; // Re-throw the error so the caller can handle it
  }
}