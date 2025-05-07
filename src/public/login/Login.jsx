import React, { useState } from 'react'
import ThemeToggle from '../../common/ThemeToggle'
import { PiKeyholeLight } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { loginUser } from '../../apis/authActions'

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loggingIn, setLoggingIn] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email, password
        };
        loginUser(data, setSuccess, setError, setLoggingIn);
    }

    if(success !== null){
        localStorage.setItem('token', JSON.stringify(success?.token));
        localStorage.setItem('user', JSON.stringify(success?.user))
        navigate('/dashboard')
        location.reload();
    }

    return (
        <div className='w-full h-screen overflow-hidden bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white'>
            <div className='fixed top-0 right-0 p-4'>
                <ThemeToggle />
            </div>
            <div className='w-full '>
                <div className='flex justify-center items-center bg-[url("/assets/bg.png")] max-h-max bg-contain'>
                    <div className="w-full h-screen justify-center bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80">
                        <div className='md:h-screen flex items-center py-4 px-4 md:px-16'> 
                            <div className='w-full py-0 grid md:flex md:justify-around md:items-center'>                          
                                <div className='w-full flex flex-col gap-4 md:w-[50%]'>
                                    <div className='w-full flex items-end'>
                                        <img src='/assets/dctms-logo.png' alt='app brand' width='46' />
                                        <span className='text-5xl italic text-[#54c5d0] py-1 border-b-2 border-[#54c5d0] font-extralight ml-[-3px]'>ctms</span>
                                    </div>
                                    <div className='md:my-6'>
                                        <span 
                                            className='text-3xl md:text-7xl font-extralight capitalize dark:text-white text-[#004e71] leading-12'
                                        >
                                            data collection tools management system
                                        </span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span className='md:text-xl text-[#54c5d0]'>&copy;</span>
                                        <span className='md:text-xl text-[#54c5d0]'>APIN Public Health Initiatives.</span>
                                    </div>
                                </div>
                                <div className='w-full md:w-[40%] mt-10 md:mt-0'>
                                    <div className='flex gap-1 items-center md:mt-24'>
                                        <PiKeyholeLight size={40} className='dark:text-white text-[#004e71]' />
                                        <span className='text-3xl dark:text-white text-[#004e71]'>Login</span>
                                    </div>
                                    <span className='text-red-600'>{error !== null && error?.error}</span>
                                    <form onSubmit={handleLogin} className='grid space-y-8 my-4'>
                                        <input 
                                            type='email'
                                            className='w-full p-2 rounded-md border bg-transparent'
                                            placeholder='email'
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <input 
                                            type='password'
                                            className='w-full p-2 rounded-md border bg-transparent'
                                            placeholder='password'
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            className={`w-full flex justify-center p-2 rounded-md bg-[#a8d13a] hover:bg-[#85a62a] text-black`}
                                        >
                                            {
                                                loggingIn ? 
                                                    <AiOutlineLoading3Quarters size={24} className='animate-spin' /> : 'Login'
                                                }
                                        </button>
                                        <div className='flex justify-end'>
                                            <Link className='text-sm text-[#004e71] dark:text-white' to="/">Forgot your password ?</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login