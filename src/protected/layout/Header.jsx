import React, { useContext, useEffect, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ThemeToggle from '../../common/ThemeToggle';
import { TbLayoutDashboardFilled, TbVirusSearch } from 'react-icons/tb';
import { HiBell, HiUser } from 'react-icons/hi';

const Header = ({ toggleSidebar }) => {

    const { user } = useContext(AppContext);

    return (
        <header className='sticky w-full top-0 z-40 bg-[#005072] h-[50px] py-2'>
            <div className='flex flex-grow items-center justify-between p-2 md:px-3 2xl:px-11'>
                <div className='flex items-center space-x-3'>   
                    <RxHamburgerMenu size={25} className='text-gray-100 cursor-pointer' onClick={toggleSidebar} />
                    <div className='text-xl font-bold hidden md:block md:pl-[180px] capitalize'>{}</div>
                </div>
                <div className='flex items-center space-x-4 md:space-x-8'>
                    <div className='flex justify-end items-center text-white space-x-4 text-sm'>
                        <div className='flex gap-1 items-center'>
                            <span className='font-semibold'>
                                {user && JSON.parse(user)?.facility_name}
                            </span>
                            <span className='font-semibold'>
                                {user && JSON.parse(user)?.lga_name}
                            </span>
                            <span className='font-semibold'>
                                {user && JSON.parse(user)?.state_name}
                            </span>
                        </div>
                        <div className='h-6 border-x border-gray-400'></div>
                        <img src='/assets/dctms-logo.png' alt='brand logo' width="25px" className='block md:hidden' />
                        <div className='h-6 border-x border-gray-400 block md:hidden'></div>
                        <HiBell size={20} />
                        <div className='h-6 border-x border-gray-400'></div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header