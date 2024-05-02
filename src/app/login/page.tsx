'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../Services/login'
import toast from 'react-hot-toast'

export default function Login (){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { push } = useRouter()

    const handleLogin = async () => {
        const loginData = {
            email,
            password,
        };
    
        try {
            const res = await login(loginData);
            toast.success('Connection Successfully');

            if (res.status === 200) {
                const token = res.data.token;
                localStorage.setItem('token', token);
                toast.success('Connection Successfully');
            
                setTimeout(() => {
                    push('/user');
                }, 900);
            } else {
                toast.error('Another Error !! Another One Again !! WTF!!!!');
            }
        } catch (error) {
            toast.error('Identifications Errors');
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleLogin}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

