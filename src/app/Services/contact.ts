import { ContactData } from '@/Utils/types';
import axios from 'axios';

export async function createContact(contactData: ContactData) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }
  const url = `${process.env.NEXT_PUBLIC_API_URL}api/contact/new`;

  return axios.post(url, contactData,axiosConfig);
}

