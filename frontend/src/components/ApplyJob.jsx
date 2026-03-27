import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ApplyJob = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  const hasResume = !!user?.profile?.resume;

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    country: "",
    postalCode: "",
    city: "Bhopal, Madhya Pradesh",
    area: "",
    address: "",
    resume: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      Object.keys(formData).forEach(key => {
        if (formData[key]) data.append(key, formData[key]);
      });

      if (!formData.resume && user?.profile?.resume) {
        data.append("resumeUrl", user.profile.resume);
      }

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        data,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Application submitted successfully 🎉");
      navigate("/application-success");
      }

    } catch (err) {
      toast.error(err?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-10"
        >

          {/* PROGRESS BAR */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
            <p className="text-center text-sm mt-2 text-gray-600">
              Step {step} of 3
            </p>
          </div>

          {/* STEP ANIMATION */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  📍 Location Details
                </h2>

                <div className="grid gap-4">
                     <input
                    type="text"
                    name="country"
                    placeholder="Country Name"
                    className="input"
                    onChange={handleChange}
                  />
                <input
                    type="text"
                    name="city"
                    placeholder="City Name"
                    className="input"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    className="input"
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="area"
                    placeholder="Area"
                    className="input"
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    className="input"
                    onChange={handleChange}
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full mt-6 bg-[#4f46e5] text-white"
                >
                  Continue → 
                </Button>
              </>
            )}

      
            {/* STEP 2 */}
              {step === 2 && (
                 <>
                        <h2 className="text-xl font-bold mb-4">Add your CV</h2>

                        {/* Existing Resume */}
                        {hasResume && (
                            <div className="mb-4 p-4 border rounded bg-green-50">
                                <p className="text-sm text-green-700 mb-2">
                                    ✅ Resume already uploaded
                                </p>

                                <a
                                     href={user?.profile?.resume}
                                    target="_blank"
                                    className="text-blue-600 underline"
                                >
                                    View Resume
                                </a>
                            </div>
                        )}

                        {/* Upload New Resume */}
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                setFormData({ ...formData, resume: e.target.files[0] })
                            }
                            className="mb-4 border p-2 cursor-pointer rounded-sm"
                        />

                       <div className="flex gap-3">
                           <Button onClick={() => setStep(1)} className='bg-[#4f46e5] text-white'>Back</Button>
                           <Button onClick={() => setStep(3)} className='bg-[#4f46e5] text-white'>Continue</Button>
                       </div>
                   </>
               )}
       
            {step === 3 && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  ✅ Review & Submit
                </h2>

                {/* DETAILS */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p><b>Country:</b> {formData.country}</p>
                  <p><b>City:</b> {formData.city}</p>
                  <p><b>Postal Code:</b> {formData.postalCode}</p>
                  <p><b>Area:</b> {formData.area}</p>
                </div>

                {/* RESUME PREVIEW */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">
                    Resume Preview
                  </h3>

                  <div className="rounded-xl overflow-hidden border">
                    {formData.resume ? (
                      <iframe
                        src={URL.createObjectURL(formData.resume)}
                        className="w-full h-72 sm:h-96"
                        title="preview"
                      />
                    ) : user?.profile?.resume ? (
                      <iframe
                        src={user.profile.resume}
                        className="w-full h-72 sm:h-96"
                        title="preview"
                      />
                    ) : (
                      <p className="p-4 text-gray-500">
                        No resume available
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button className='bg-[#4f46e5] text-white' variant="outline" onClick={() => setStep(2)}>
                    ← Back
                  </Button>
                  <Button onClick={handleSubmit} className='bg-[#4f46e5] text-white'>
                    🚀 Submit Application
                  </Button>
                </div>
              </>
            )}

          </motion.div>
        </motion.div>
      </div>

      {/* GLOBAL INPUT STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 10px 12px;
          border-radius: 10px;
          outline: none;
          transition: all 0.2s;
        }
        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ApplyJob;




// import React, { useState } from "react";
// import Navbar from "./shared/Navbar";
// import { Button } from "./ui/button";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { APPLICATION_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";
// import { Avatar, AvatarImage } from "./ui/avatar";

// const ApplyJob = () => {
//     const { id: jobId } = useParams();
//     const navigate = useNavigate();

//     const { user } = useSelector(store => store.auth);
//     const hasResume = !!user?.profile?.resume;

//     const [step, setStep] = useState(1);

//     const [formData, setFormData] = useState({
//         country: "",
//         postalCode: "",
//         city: "",
//         area: "",
//         address: "",
//         resume: null,
//     });

//     // handle change
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//     // FINAL SUBMIT
//     const handleSubmit = async () => {
//         try {
//             const data = new FormData();

//             data.append("country", formData.country);
//             data.append("postalCode", formData.postalCode);
//             data.append("city", formData.city);
//             data.append("area", formData.area);
//             data.append("address", formData.address);

//             // ✅ IMPORTANT LOGIC
//             if (formData.resume) {
//                 data.append("resume", formData.resume); // new upload
//             } else if (user?.profile?.resume) {
//                 data.append("resumeUrl", user.profile.resume); // existing resume
//             }

//             const res = await axios.post(
//                 `${APPLICATION_API_END_POINT}/apply/${jobId}`,
//                 data,
//                 { withCredentials: true }
//             );

//             if (res.data.success) {
//                 toast.success("Application submitted successfully");
//                 navigate("/jobs");
//             }

//         } catch (err) {
//             toast.error(err?.response?.data?.message || "Error");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Navbar />

//             <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded-xl shadow">

//                 {/* STEP INDICATOR */}
//                 <div className="mb-6 text-center font-semibold">
//                     Step {step} of 3
//                 </div>

//                 {/* STEP 1 */}
//                 {step === 1 && (
//                     <>
//                         <h2 className="text-xl font-bold mb-4">
//                             Review your location details
//                         </h2>

//                         <input
//                             type="text"
//                             name="postalCode"
//                             placeholder="Postal Code"
//                             className="w-full border p-2 mb-3"
//                             onChange={handleChange}
//                         />

//                         <input
//                             type="text"
//                             name="area"
//                             placeholder="Area"
//                             className="w-full border p-2 mb-3"
//                             onChange={handleChange}
//                         />

//                         <input
//                             type="text"
//                             name="address"
//                             placeholder="Street Address"
//                             className="w-full border p-2 mb-3"
//                             onChange={handleChange}
//                         />

//                         <Button onClick={() => setStep(2)} className="w-full">
//                             Continue
//                         </Button>
//                     </>
//                 )}

//                 {/* STEP 2 */}
//                 {step === 2 && (
//                     <>
//                         <h2 className="text-xl font-bold mb-4">Add your CV</h2>

//                         {/* Existing Resume */}
//                         {hasResume && (
//                             <div className="mb-4 p-4 border rounded bg-green-50">
//                                 <p className="text-sm text-green-700 mb-2">
//                                     ✅ Resume already uploaded
//                                 </p>

//                                 <a
//                                     href={user?.profile?.resume}
//                                     target="_blank"
//                                     className="text-blue-600 underline"
//                                 >
//                                     View Resume
//                                 </a>
//                             </div>
//                         )}

//                         {/* Upload New Resume */}
//                         <input
//                             type="file"
//                             accept=".pdf"
//                             onChange={(e) =>
//                                 setFormData({ ...formData, resume: e.target.files[0] })
//                             }
//                             className="mb-4 border p-2 cursor-pointer rounded-sm"
//                         />

//                         <div className="flex gap-3">
//                             <Button onClick={() => setStep(1)}>Back</Button>
//                             <Button onClick={() => setStep(3)}>Continue</Button>
//                         </div>
//                     </>
//                 )}

//                 {/* STEP 3 */}
//                 {step === 3 && (
//                     <>
//                         <h2 className="text-xl font-bold mb-4">
//                             Review & Submit
//                         </h2>

//                         <p><b>Country:</b> {formData.country}</p>
//                         <p><b>City:</b> {formData.city}</p>
//                         <p><b>Postal Code:</b> {formData.postalCode}</p>
//                         <p><b>Area:</b> {formData.area}</p>
//                         <div className="mt-6">
//                             <h3 className="font-semibold mb-2">Resume Preview:</h3>

//                             {formData.resume ? (
//                                 <iframe
//                                     src={URL.createObjectURL(formData.resume)}
//                                     title="Resume Preview"
//                                     className="w-full h-96 border rounded"
//                                 />
//                             ) : user?.profile?.resume ? (
//                                 <iframe
//                                     src={user.profile.resume}
//                                     title="Resume Preview"
//                                     className="w-full h-96 border rounded"
//                                 />
//                             ) : (
//                                 <p className="text-gray-500">No resume available</p>
//                             )}
//                         </div>
//                         <div className="flex gap-3 mt-4">
//                             <Button onClick={() => setStep(2)}>Back</Button>
//                             <Button onClick={handleSubmit}>Submit Application</Button>
//                         </div>
//                     </>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default ApplyJob;