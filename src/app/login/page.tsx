'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../Services/login'
import toast from 'react-hot-toast'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Hero from '../Components/Hero'

export default function Login() {
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
        <div>
            <Header />
            <Hero
                title="Login"
                image="/login.jpg"
                fullHeight
            />
            <div className="container mx-auto py-12">
                <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center text-primary">Sign in to your account</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-button-start">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-button-start"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-button-start">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-button-start"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                className="w-full px-4 py-2 font-bold text-bg bg-primary rounded-md hover:bg-button-end focus:outline-none focus:ring-2 focus:ring-button-start"
                                onClick={handleLogin}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}