import axios from 'axios';

export async function getCategories() {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}api/categories`;
    return axios.get(url).then(res => res);
} catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}