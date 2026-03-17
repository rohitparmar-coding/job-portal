// import React from 'react'
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
// import { Button } from './ui/button'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice.js'

// const category = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Data Science",
//     "Graphic Designer",
//     "FullStack Developer"
// ]


// const CategoryCarousel = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const searchJobHandler = (query) => {
//         dispatch(setSearchedQuery(query))
//         navigate('/browse')
//     }
//     return (
//         <div>
//             <Carousel className='w-full max-w-xl mx-auto my-20'>
//                 <CarouselContent>
//                     {
//                         category.map((cat, index) => (
//                             <CarouselItem className="md:basis-1/2 lg-basis-1/3">
//                                 <Button
//                                   onClick={()=> searchJobHandler(cat)}
//                                  variant='outline' key={index}>{cat}</Button>
//                             </CarouselItem>
//                         ))
//                     }

//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//             </Carousel>
//         </div>
//     )
// }

// export default CategoryCarousel




import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice.js'
import { motion } from 'framer-motion'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "DevOps Engineer",
    "Mobile App Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate('/browse')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="my-20 px-4"
        >
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
                Browse by Category
            </h2>

            <Carousel className='w-full max-w-5xl mx-auto'>
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-full sm:basis-1/2 lg:basis-1/3 px-2"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white shadow-lg rounded-2xl p-6 text-center cursor-pointer
                                           hover:shadow-2xl transition duration-300
                                           border border-gray-100"
                                onClick={() => searchJobHandler(cat)}
                            >
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {cat}
                                </h3>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </motion.div>
    )
}

export default CategoryCarousel