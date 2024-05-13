import axios from 'axios';
import { authProps } from '@/Utils/types';

export async function login(loginProps: authProps) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}api/login`;

  try {
    const response = await axios.post(url, {
      email: loginProps.email,
      password: loginProps.password,
    });

    console.log(response.data);
    
    const token = response.data.token;
    localStorage.setItem('token', token);

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}