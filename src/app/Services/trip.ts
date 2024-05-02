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
