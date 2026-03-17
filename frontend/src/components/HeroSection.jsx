
// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Search } from 'lucide-react'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice.js'
// import { useNavigate } from 'react-router-dom'

// const HeroSection = () => {
//     const [query, setQuery] = useState("")
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const searchJobHandler = () => {
//         dispatch(setSearchedQuery(query))
//         navigate('/browse')
//     }
//     return (
//         <div className='text-center'>
//             <div className='flex flex-col gap-5 my-10'>
//                 <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
//                 <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs </span> </h1>
//                 <p>Your gateway to better career opportunities. Our platform connects talented job seekers with trusted companies across various industries. Whether you're a fresher looking for your first opportunity or an experienced professional seeking growth, we make the hiring process simple, fast, and efficient.</p>
//                 <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
//                     <input
//                         type="text"
//                         placeholder='Find your dream jobs'
//                         onChange={(e) => setQuery(e.target.value)}
//                         className='outline-none border-none w-full'
//                     />
//                     <Button onClick={searchJobHandler} className="rounded-r-full cursor-pointer">
//                         <Search className='h-5 w-5'></Search>
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeroSection

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice.js'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import CountUp from 'react-countup'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate('/browse')
    }

    return (
        <div className="relative overflow-hidden text-center py-20 px-4">

            {/* ✨ Animated Gradient Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 animate-gradient bg-[length:400%_400%]" />

            {/* 💫 Floating Shapes */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 8 }}
                className="absolute bottom-20 right-10 w-28 h-28 bg-white/20 rounded-full blur-xl"
            />

            <div className="flex flex-col gap-8 max-w-4xl mx-auto">

                {/* 🎯 Typing Animation */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-5xl md:text-6xl font-bold text-white"
                >
                    Find Your{" "}
                    <span className="text-yellow-300">
                        <TypeAnimation
                            sequence={[
                                "Dream Job 💼",
                                2000,
                                "Perfect Career 🚀",
                                2000,
                                "Future Opportunity 🌟",
                                2000
                            ]}
                            speed={50}
                            repeat={Infinity}
                        />
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/90 text-sm sm:text-lg"
                >
                    Connecting talented professionals with top companies worldwide.
                </motion.p>

                {/* 🌈 Glassmorphism Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex w-full sm:w-[80%] md:w-[60%] mx-auto backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-full px-4 py-2 items-center gap-3"
                >
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-transparent outline-none text-white placeholder-white/70"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-full bg-white text-black hover:bg-gray-200"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </motion.div>

                {/* 📊 Animated Counters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center gap-10 text-white mt-10 flex-wrap"
                >
                    <div>
                        <h2 className="text-3xl font-bold">
                            <CountUp end={1000} duration={3} />+
                        </h2>
                        <p className="text-sm">Active Jobs</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">
                            <CountUp end={500} duration={3} />+
                        </h2>
                        <p className="text-sm">Companies</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">
                            <CountUp end={10000} duration={3} />+
                        </h2>
                        <p className="text-sm">Candidates</p>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

export default HeroSection