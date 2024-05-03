import axios from 'axios'

export async function getAllTrips() {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }
    let url = `${process.env.NEXT_PUBLIC_API_URL}trips`
    return axios.get(url, axiosConfig).then((res) => {
        return res
    })
}

export async function searchTrips(category: string, country: string, duration: number) {
    let url = `${process.env.NEXT_PUBLIC_API_URL}trips/search?`;
    
    if (category) url += `category=${category}&`;
    if (country) url += `country=${country}&`;
    if (duration) url += `duration=${duration}&`;
    
    return axios.get(url).then(res => res.data);
  }
  
export async function getTripsByCategory(categoryName: string) {

    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }
    let url = `${process.env.NEXT_PUBLIC_API_URL}trips/category/${categoryName}`
    return axios.get(url, axiosConfig).then((res) => {
        return res
    })
}
