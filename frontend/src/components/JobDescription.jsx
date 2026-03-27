// import React, { useEffect, useState } from 'react'
// import { Badge } from './ui/badge'
// import { Button } from './ui/button'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSingleJob } from '@/redux/jobSlice.js';
// import { toast } from 'sonner';


// const JobDescription = () => {
//     const { singleJob } = useSelector(store => store.job)
//     const { user } = useSelector(store => store.auth)
//     const dispatch = useDispatch()

//     const params = useParams();
//     const jobId = params.id;

//     // for apply or allready applied button
//     const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
//     const [isApplied, setIsApplied] = useState(isIntiallyApplied);

//     const applyJobHandler = async () => {
//         try {

//             const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
//             console.log(res.data)
//             if (res.data.success) {
//                 setIsApplied(true) // update the local state of apply button
//                 const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
//                 dispatch(setSingleJob(updatedSingleJob));
//                 toast.success(res.data.message)
//             }
//         } catch (error) {
//             console.error(error)
//             toast.error(error.response.data.message);
//         }
//     }

//     useEffect(() => {
//           dispatch(setSingleJob(null)); // clear old job

//         const fetchSingleJobs = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });

//                 if (res.data.success) {
//                     dispatch(setSingleJob(res.data.job))
//                      const applied = res.data.job.applications?.some(
//                     application => application.applicant === user?._id
//                 );

//                 setIsApplied(applied);
//                 }
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         fetchSingleJobs();
//     }, [jobId]);

//     return (
//         <div className='max-w-7xl mx-auto my-10'>
//             <div className='flex justify-between items-center'>
//                 <div>
//                     <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
//                     <div className='flex items-center gap-2 mt-4'>
//                         <Badge className={"text-blue-700 font-bold"} variant='ghost'>{singleJob?.position} Position</Badge>
//                         <Badge className={"text-[#F83002] font-bold"} variant='ghost'>{singleJob?.jobType}</Badge>
//                         <Badge className={"text-[#7209b7] font-bold"} variant='ghost'>{singleJob?.salary}LPA</Badge>
//                     </div>
//                 </div>
//                 <Button
//                     onClick={isApplied ? null : applyJobHandler}
//                     disabled={isApplied}
//                     className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed ' : 'bg-blue-600 hover:bg-blue-400 cursor-pointer'}`}>
//                     {isApplied ? "Already Applied" : "Apply Now"}
//                 </Button>
//             </div>
//             <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
//             <div className='my-4'>
//                 <h1 className='font-bold my-1'>Role:  <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
//                 <h1 className='font-bold my-1'>Location:  <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
//                 <h1 className='font-bold my-1'>Description:  <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
//                 <h1 className='font-bold my-1'>Experience:  <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}yrs</span></h1>
//                 <h1 className='font-bold my-1'>Salary:  <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
//                 <h1 className='font-bold my-1'>Total Applicants:  <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
//                 <h1 className='font-bold my-1'>Posted Date:  <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
//             </div>
//         </div>
//     )
// }

// export default JobDescription


import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant.js';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice.js';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';



const JobDescription = () => {

  const [showMore, setShowMore] = useState(false)
  const [jobDec, setJobDec] = useState(false)

  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const params = useParams();
  const jobId = params.id;
  const navigate = useNavigate()

  const [isApplied, setIsApplied] = useState(false);

  // ⭐ Sync isApplied when singleJob updates
  useEffect(() => {
    if (singleJob && user) {
      const applied = singleJob.applications?.some(
        application => application.applicant === user._id
      );
      setIsApplied(applied);
    }
  }, [singleJob, user]);

  // const applyJobHandler = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${APPLICATION_API_END_POINT}/apply/${jobId}`,
  //       { withCredentials: true }
  //     );

  //     if (res.data.success) {
  //       setIsApplied(true);

  //       const updatedSingleJob = {
  //         ...singleJob,
  //         applications: [
  //           ...(singleJob.applications || []),
  //           { applicant: user?._id }
  //         ]
  //       };

  //       dispatch(setSingleJob(updatedSingleJob));
  //       toast.success(res.data.message);
  //     }

  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error?.response?.data?.message || "Something went wrong");
  //   }
  // };




  //⭐ Fetch Job


  useEffect(() => {

    dispatch(setSingleJob(null));

    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );
        // console.log(res.data)
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJobs();

  }, [jobId, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 py-14 px-8">

        {/* LEFT SECTION */}
        <div className="md:col-span-2 space-y-8">
          

          {/* Job Header Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {singleJob?.title}
            </h1>

            <p className="text-gray-500 mt-2">
              {singleJob?.location}
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              <Badge className="bg-blue-100 text-blue-700">
                {singleJob?.position} Position
              </Badge>

              <Badge className="bg-red-100 text-red-600">
                {singleJob?.jobType}
              </Badge>

              <Badge className="bg-purple-100 text-purple-700">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
              Job Description
            </h2>

            <p className="text-sm text-gray-500 mt-6 leading-relaxed">
              {
                jobDec ? singleJob?.description : singleJob?.description?.slice(0, 450)
              }
              {!jobDec && singleJob?.description?.slice(0, 450) && ' ...'}
              {
                <span
                  onClick={() => setJobDec(!jobDec)}
                  className="text-blue-600 text-sm cursor-pointer hover:underline"
                >
                  {jobDec ? 'read less.' : "read more."}
                </span>
              }
            </p>
          </div>

          {/* Job Requirements */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
              Job Requirements
            </h2>

            <p className="text-gray-600 mt-6 leading-relaxed ">
              {singleJob?.requirements?.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 p-2 space-x-6 gap-11 transition"
                >
                  {skill}
                </Badge>
              ))}
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-3 mt-6 w-full"><div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
              Skills Required
            </h2>

            <div className="flex flex-wrap gap-3 mt-6">
              {singleJob?.skills?.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-green-100 text-green-700 hover:bg-green-200 p-2 transition"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div></div>
          
          {/* company  */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
              Company
            </h2>
            <div className='gap-3 my-4'>
              <div className=' flex flex-row items-center '>
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={singleJob?.company?.logo}
                    alt='logo'
                  />
                </Avatar>
                <h1 className='font-semibold text-lg text-gray-800'>
                  {singleJob?.company?.name}
                </h1>
              </div>

              <div className=' flex flex-col gap-3  '>
                <>
                  <p className='text-sm text-gray-500'>
                    <span className='font-bold text-green-700'>Description: </span>
                    {
                      showMore ? singleJob?.company?.description
                        : singleJob?.company?.description?.slice(0, 350)
                    }
                    {!showMore && singleJob?.company?.description?.slice(0, 350) && ' ...'}

                    {
                      singleJob?.company?.description?.length > 350 && (
                        <span
                          onClick={() => setShowMore(!showMore)}
                          className="text-blue-600 text-sm cursor-pointer hover:underline"
                        >
                          {showMore ? "show less." : "show more."}
                        </span>
                      )
                    }
                  </p>


                </>
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                  <p className='text-sm text-gray-500'>
                    <span className='font-bold text-green-700'>Location: </span>
                    {singleJob?.company?.location}
                  </p>
                </div>


                <div className="flex flex-col gap-2 text-sm text-gray-500">
                  <span className="font-bold text-green-700">Website:</span>

                  {singleJob?.company?.website ? (
                    <a
                      href={
                        singleJob.company.website.startsWith("http")
                          ? singleJob.company.website
                          : `https://${singleJob.company.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline break-all transition"
                    >
                      {singleJob.company.website}
                    </a>
                  ) : (
                    <span className="text-gray-400">Not Available</span>
                  )}
                </div>
              </div>
            </div>
          </div>


          {/* Recruiter */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
              Recruiter
            </h2>

            <div className="flex items-center gap-4 mt-6">
              <Avatar className="h-16 w-16">
                <AvatarImage className='object-cover'
                  src={singleJob?.created_by?.profile?.profilePhoto}
                  alt="recruiter"
                />
              </Avatar>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {singleJob?.created_by?.fullname || "Recruiter"}
                </h3>
                <p className="text-sm text-gray-500">
                  Posted this job
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">

          {/* Apply Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sticky top-24">
            <Button
              onClick={() => navigate(`/apply/${jobId}`)}
              disabled={isApplied}
              className={`w-full py-6 text-lg rounded-xl transition-all ${isApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
                }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>

            <div className="mt-6 space-y-4 text-sm text-gray-600">

              <div className="flex justify-between">
                <span>Experience</span>
                <span className="font-medium text-gray-800">
                  {singleJob?.experienceLevel} yrs
                </span>
              </div>

              <div className="flex justify-between">
                <span>Salary</span>
                <span className="font-medium text-gray-800">
                  {singleJob?.salary} LPA
                </span>
              </div>

              <div className="flex justify-between">
                <span>Total Applicants</span>
                <span className="font-medium text-gray-800">
                  {singleJob?.applications?.length || 0}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Posted Date</span>
                <span className="font-medium text-gray-800">
                  {singleJob?.createdAt?.split("T")[0]}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default JobDescription