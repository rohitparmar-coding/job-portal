

// import React from "react";

// const Loader = () => {
//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-white relative overflow-hidden">
      
//       {/* background glow */}
//       <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 blur-[120px] animate-pulse"></div>

//       <div className="flex flex-col items-center gap-8 z-10">

//         {/* spinning gradient ring */}
//         <div className="relative flex items-center justify-center">

//           <div className="absolute w-28 h-28 rounded-full border-4 border-transparent 
//           border-t-blue-600 border-r-blue-400 animate-spin"></div>

//           {/* logo */}
//           <img
//             src="/jobportal.jpeg"
//             alt="loading"
//             className="w-16 h-16 animate-[logoPulse_2s_ease-in-out_infinite]"
//           />
//         </div>

//         {/* loading text */}
//         <p className="text-gray-500 text-sm tracking-widest animate-pulse">
//           Preparing your dashboard...
//         </p>

//         {/* animated progress bar */}
//         <div className="w-64 h-1 bg-gray-200 rounded overflow-hidden">
//           <div className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 animate-loadingBar"></div>
//         </div>

//       </div>

//       <style>
//         {`
//         @keyframes loadingBar {
//           0% { width: 0%; }
//           50% { width: 70%; }
//           100% { width: 100%; }
//         }

//         .animate-loadingBar {
//           animation: loadingBar 2s ease-in-out infinite;
//         }

//         @keyframes logoPulse {
//           0%,100% { transform: scale(1); }
//           50% { transform: scale(1.15); }
//         }
//         `}
//       </style>

//     </div>
//   );
// };

// export default Loader;


import React from "react";

const Loader = () => {
  return (
<div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">

      {/* background gradient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full animate-pulse"></div>
      </div>

      <div className="flex flex-col items-center gap-6 z-10">

        {/* Logo container */}
        <div className="relative flex items-center justify-center">

          {/* animated ring */}
          <div className="absolute w-24 h-24 rounded-full border-[3px] border-gray-200"></div>

          <div className="absolute w-24 h-24 rounded-full border-[3px] border-transparent border-t-blue-600 animate-spin"></div>

          {/* logo */}
          <img
            src="/jobportal.jpeg"
            alt="logo"
            className="w-14 h-14 rounded-xl shadow-md"
          />
        </div>

        {/* loading text */}
        <p className="text-gray-600 text-sm tracking-wide font-medium">
          Loading Job Portal
        </p>

        {/* shimmer progress bar */}
        <div className="w-56 h-[6px] bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer"></div>
        </div>

      </div>

      <style>
        {`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        .animate-shimmer {
          animation: shimmer 1.8s infinite;
        }
        `}
      </style>

    </div>
  );
};

export default Loader;