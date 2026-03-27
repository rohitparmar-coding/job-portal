import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2, Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { motion } from 'framer-motion'
import { useState } from 'react'
import NotificationBell from './NotificationBell'
import useFetchNotifications from '@/hooks/useFetchNotifications.jsx'

const Navbar = () => {

    useFetchNotifications();

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const defaultAvatar = "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/api/v1/user/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/')
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout failed")
        }
    }

    return (
        <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg'
        >
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>

                {/* Logo */}
                <motion.h1
                    whileHover={{ scale: 1.05 }}
                    className='text-2xl font-bold'
                >
                    <Link to='/'>
                        Job <span className='text-blue-500'>Portal</span>
                    </Link>
                </motion.h1>

                {/* Desktop Menu */}
                <ul className='hidden md:flex items-center gap-8 font-medium'>
                    {
                        user && user.role === 'recruiter' ? (
                            <>
                                <li className='hover:text-blue-400 transition duration-300'>
                                    <Link to='/admin/companies'>Companies</Link>
                                </li>
                                <li className='hover:text-blue-400 transition duration-300'>
                                    <Link to='/admin/jobs'>Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover:text-indigo-600 transition">
                                        About
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='hover:text-blue-400 transition duration-300'>
                                    <Link to='/'>Home</Link>
                                </li>
                                <li className='hover:text-blue-400 transition duration-300'>
                                    <Link to='/jobs'>Jobs</Link>
                                </li>
                                <li className='hover:text-blue-400 transition duration-300'>
                                    <Link to='/browse'>Browse</Link>
                                </li>


                                {
                                    user && user.role === 'student' ? (
                                        <>
                                            <li className='hover:text-blue-400 transition duration-300'>
                                                <Link to='/save'>Save</Link>
                                            </li>
                                            <li className='hover:text-blue-400 transition duration-300'>
                                                <div className="flex items-center gap-6 transition">
                                                    <NotificationBell />
                                                </div>
                                            </li>
                                        </>

                                    ) : (<></>)
                                }

                                <li className='hover:text-blue-400 transition duration-300'>
                                    <Link to="/about">About </Link>
                                </li>
                            </>
                        )
                    }
                </ul>

                {/* Right Section */}
                <div className='flex items-center gap-4'>

                    {/* If not logged in */}
                    {
                        !user ? (
                            <div className='hidden md:flex items-center gap-3'>
                                <Link to="/login">
                                    <Button
                                        variant='outline'
                                        className='border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300'
                                    >
                                        Login
                                    </Button>
                                </Link>

                                <Link to="/signup">
                                    <Button
                                        className='bg-blue-600 hover:bg-blue-700 transition duration-300'
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-blue-500 hover:scale-105 transition duration-300">
                                        <AvatarImage className={'object-cover'}
                                            src={user?.profile?.profilePhoto || defaultAvatar}
                                        />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80 bg-slate-800 text-white border border-slate-700">

                                    <div className='flex gap-4 items-center'>
                                        <Avatar>
                                            <AvatarImage className={'object-cover'}
                                                src={user?.profile?.profilePhoto || defaultAvatar}
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-400'>
                                                {user?.profile?.bio}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col mt-4 gap-2'>
                                        <Link to='/profile'>
                                            <Button
                                                variant="ghost"
                                                className='w-full justify-start hover:bg-slate-700'
                                            >
                                                <User2 className='mr-2' size={18} />
                                                View Profile
                                            </Button>
                                        </Link>

                                        <Button
                                            onClick={logoutHandler}
                                            variant="ghost"
                                            className='w-full justify-start text-red-400 hover:bg-slate-700'
                                        >
                                            <LogOut className='mr-2' size={18} />
                                            Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                    {/* Mobile Menu Icon */}
                    <div className='md:hidden'>
                        <Menu
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className='cursor-pointer'
                        />
                    </div>
                </div>
            </div>





            {/* Mobile Dropdown */}
            {
                mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className='md:hidden bg-slate-800 px-6 py-4 space-y-3'
                    >
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <Link to='/admin/companies' className='block hover:text-blue-400'>Companies</Link>
                                    <Link to='/admin/jobs' className='block hover:text-blue-400'>Jobs</Link>
                                </>
                            ) : (
                                <>
                                    <Link to='/' className='block hover:text-blue-400'>Home</Link>
                                    <Link to='/jobs' className='block hover:text-blue-400'>Jobs</Link>
                                    <Link to='/browse' className='block hover:text-blue-400'>Browse</Link>
                                </>
                            )
                        }


                        {
                            !user ? <><Link className='block hover:text-blue-400' to='/login'>Login</Link>
                                <Link className='block hover:text-blue-400' to='/signup'>Signup</Link></>
                                : <></>
                        }
                    </motion.div>
                )
            }
        </motion.div>
    )
}

export default Navbar

