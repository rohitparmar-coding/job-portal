// import React, { useEffect, useState } from 'react'
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// import { Label } from './ui/label'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice.js'

// const filterData = [
//     {
//         filterType: "Location",
//         array: ["Delhi NCR", "Bangalore", "Hydrabad", "Pune", "Mumbai", "Chanai"]
//     },
//     {
//         filterType: "Industry",
//         array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "AI/ML Developer", "SQL Developer", "Mern Developer"]
//     },
//     {
//         filterType: "Salary",
//         array: ["0-10k", "10-20k", "20-50k", "1LPA"]
//     },
// ]
// const FilterCard = () => {

//     const [selectedValue, setSelectedValue] = useState('');
//     const dispatch = useDispatch()
//     const ChangeHandler = (value) => {
//         setSelectedValue(value)
//     }
//     useEffect(() => {
//         // console.log(selectedValue)
//         dispatch(setSearchedQuery(selectedValue))
//     }, [selectedValue])

//     return (
//         <div className='w-full bg-white p-3 rounded-md'>
//             <h1 className='font-bold text-lg text-blue-600'>Filter Jobs</h1>
//             <hr className='mt-3' />
//             <RadioGroup value={selectedValue} onValueChange={ChangeHandler}>
//                 {
//                     filterData.map((data, index) => (
//                         <div>
//                             <h1 className='font-bold text-lg'>{data.filterType}</h1>
//                             {
//                                 data.array.map((item, idx) => {
//                                     const itemId = `id${index}-${idx}`
//                                     return (
//                                         <div className='flex items-center space-x-2 my-2 '>
//                                             <RadioGroupItem value={item} id={itemId} />
//                                             <Label htmlFor={itemId} className="cursor-pointer">{item} </Label>
//                                         </div>
//                                     )
//                                 })
//                             }
//                         </div>
//                     ))
//                 }
//             </RadioGroup>
//         </div>
//     )
// }

// export default FilterCard



import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice.js'
import { Filter } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "AI/ML Developer", "SQL Developer", "MERN Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-10k", "10-20k", "20-50k", "1 LPA+"]
    },
]

const FilterCard = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue, dispatch])

    return (
        <div className='w-full bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-700'>

            {/* Header */}
            <div className='flex items-center gap-2 mb-4'>
                <Filter className='text-blue-500' size={20} />
                <h1 className='font-semibold text-lg text-white tracking-wide'>
                    Filter Jobs
                </h1>
            </div>

            <div className='h-[1px] bg-slate-700 mb-4'></div>

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>

                {filterData.map((data, index) => (
                    <div key={index} className='mb-6'>

                        {/* Section Title */}
                        <h2 className='text-sm uppercase text-slate-400 font-semibold tracking-wider mb-3'>
                            {data.filterType}
                        </h2>

                        <div className='space-y-2'>
                            {data.array.map((item, idx) => {
                                const itemId = `id-${index}-${idx}`

                                return (
                                    <div
                                        key={itemId}
                                        className='flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800 transition-all duration-200'
                                    >
                                        <RadioGroupItem
                                            value={item}
                                            id={itemId}
                                            className='border-slate-500 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500'
                                        />
                                        <Label
                                            htmlFor={itemId}
                                            className='text-slate-300 cursor-pointer text-sm'
                                        >
                                            {item}
                                        </Label>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                ))}

            </RadioGroup>

        </div>
    )
}

export default FilterCard