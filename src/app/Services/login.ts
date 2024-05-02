import { authProps } from '@/Utils/types'
import axios from 'axios'

export async function login(registerProps: authProps) {
    let url = `${process.env.NEXT_PUBLIC_API_URL}user/login`

    return axios.post(
        url,
        {
            email: registerProps.email,
            password: registerProps.password,
        }
    )
}