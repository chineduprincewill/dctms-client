import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TbLayoutDashboardFilled, TbSettings } from 'react-icons/tb';
import { AiOutlineSend, AiOutlineUser } from 'react-icons/ai';
import { PiWarehouse } from 'react-icons/pi';
import { LuGitPullRequest } from 'react-icons/lu';
import { AppContext } from '../../context/AppContext';

const Navlinks2 = () => {

    const locatn = useLocation();
    const { user } = useContext(AppContext);

    let navlinks;

    user && JSON.parse(user)?.groupname === 'APIN' ?
        navlinks = [
            {
                id: 1,
                title: "Dashboard",
                url: "/dashboard",
                icon: <TbLayoutDashboardFilled size={17} />
            },
            {
                id: 2,
                title: "Warehouse",
                url: "/warehouse",
                icon: <PiWarehouse size={17} />
            },
            {
                id: 3,
                title: "Dispatches",
                url: "/dispatches",
                icon: <AiOutlineSend size={17} />
            },
            {
                id: 4,
                title: "Requests",
                url: "/requests",
                icon: <LuGitPullRequest size={17} />
            },
            {
                id: 5,
                title: "Users",
                url: "/users",
                icon: <AiOutlineUser size={17} />
            },
            {
                id: 6,
                title: "Settings",
                url: "/settings",
                icon: <TbSettings size={17} />
            },
        ]
        :
        navlinks = [
            {
                id: 1,
                title: "Dashboard",
                url: "/dashboard",
                icon: <TbLayoutDashboardFilled size={17} />
            },
            {
                id: 2,
                title: "Warehouse",
                url: "/warehouse",
                icon: <PiWarehouse size={17} />
            },
            {
                id: 3,
                title: "Dispatches",
                url: "/dispatches",
                icon: <AiOutlineSend size={17} />
            },
            {
                id: 4,
                title: "Requests",
                url: "/requests",
                icon: <LuGitPullRequest size={17} />
            },
            {
                id: 5,
                title: "Users",
                url: "/users",
                icon: <AiOutlineUser size={17} />
            },
        ]

    return (
        <ul className='w-full mt-2 space-y-1'>
            {
                (navlinks !== null) && navlinks.map(nav => {
                    return (
                        <li key={nav.id} className={`px-3 py-1.5 md:py-2.5 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${nav.url === locatn.pathname && 'bg-gray-200 dark:bg-gray-700'}`}>
                            <Link to={nav.url} key={nav.id} className='flex justify-start items-center space-x-3 my-1 hover:text-[#a6ce39]'>
                                {nav.icon}
                                <span>{nav.title}</span>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Navlinks2
