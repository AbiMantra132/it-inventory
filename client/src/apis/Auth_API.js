import axios from 'axios';
import { Endpoints } from './Endpoints'; 

export const sendCredentials = async (username, password) => {
  const { postUser } = Endpoints;
  const config = {
    url: postUser,
    data: {
      username: username,
      password: password
    }
  }
  try {
    const response = await axios.post(config.url, config.data, {
      withCredentials: true
    });
    
    return {
      valid: response.data.validInfo,
      user: response.data?.user
    }
  } catch (err) {
    console.error("Error during login request:", err);
    throw err;
  }
}


export const checkCookie = async () => {
  try {
    const response = await axios.get(Endpoints.getCookies, {
      withCredentials: true
    })
    return response.data
  } catch (err) {
    throw err;
  }
}