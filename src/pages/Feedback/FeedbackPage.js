// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import Header from '../../components/common/Header';
// import Sidebar from '../../components/common/Sidebar';
// import FeedbackForm from '../../components/feedback/FeedbackForm';
// import { FiArrowLeft, FiFileText, FiAlertCircle } from 'react-icons/fi';

// const FeedbackPage = () => {
//   const { shipId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useSelector(state => state.auth);
//   const { ships } = useSelector(state => state.ships);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [selectedVessel, setSelectedVessel] = useState(null);

//   useEffect(() => {
//     if (shipId) {
//       const vessel = ships.find(ship => ship.id === parseInt(shipId));
//       setSelectedVessel(vessel);
//     } else if (ships.length > 0) {
//       setSelectedVessel(ships[0]);
//     }
//   }, [shipId, ships]);

//   if (!user) {
//     navigate('/login');
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setMobileMenuOpen(true)}
//         className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Mobile Sidebar Overlay */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-40">
//           <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
//           <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800">
//             <Sidebar />
//           </div>
//         </div>
//       )}

//       <div className="flex">
//         {/* Desktop Sidebar */}
//         <div className="hidden md:block">
//           <Sidebar />
//         </div>

//         <div className="flex-1">
//           <Header />
          
//           <main className="p-4 sm:p-6 lg:p-8">
//             {/* Breadcrumb */}
//             <div className="mb-6 flex items-center">
//               <Link to="/dashboard" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
//                 <FiArrowLeft className="mr-2" />
//                 Back to Dashboard
//               </Link>
//               <span className="mx-3 text-gray-400">/</span>
//               <span className="text-gray-900 dark:text-white font-medium">Service Feedback</span>
//             </div>

//             {/* Header */}
//             <div className="mb-8">
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
//                 Service Feedback Questionnaire
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Please complete this questionnaire to help us improve our service and provide you with our best services.
//               </p>
//             </div>

//             {/* Info Banner */}
//             <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
//               <div className="flex items-start">
//                 <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
//                   <FiAlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-300" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                     Important Instructions
//                   </h3>
//                   <ul className="text-gray-600 dark:text-gray-400 space-y-1">
//                     <li>• Rate each criteria on a scale of 0-100 (0 = Poor, 100 = Excellent)</li>
//                     <li>• Use the slider or quick-select buttons to assign ratings</li>
//                     <li>• If you select "Poor" or "Average", please provide details in section 18.0</li>
//                     <li>• Your feedback is anonymous and will be used for service improvement only</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Vessel Selection */}
//             {ships.length > 1 && (
//               <div className="card mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                   Select Vessel for Feedback
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {ships.map(ship => (
//                     <button
//                       key={ship.id}
//                       onClick={() => setSelectedVessel(ship)}
//                       className={`p-4 border rounded-lg transition-all ${
//                         selectedVessel?.id === ship.id
//                           ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
//                           : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
//                       }`}
//                     >
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
//                           <FiFileText className="text-blue-600 dark:text-blue-300" />
//                         </div>
//                         <div className="text-left">
//                           <p className="font-medium text-gray-900 dark:text-white">{ship.name}</p>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">{ship.imoNumber}</p>
//                         </div>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Feedback Form */}
//             {selectedVessel && (
//               <div className="mb-8">
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
//                   <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
//                         {selectedVessel.name}
//                       </h2>
//                       <div className="flex items-center text-gray-600 dark:text-gray-400">
//                         <span className="mr-4">{selectedVessel.imoNumber}</span>
//                         <span>{selectedVessel.type}</span>
//                       </div>
//                     </div>
//                     <div className="mt-4 md:mt-0">
//                       <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
//                         Active Project
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                       <strong>Note:</strong> This feedback will be associated with your recent repair project on this vessel.
//                     </p>
//                   </div>
//                 </div>

//                 <FeedbackForm vessel={selectedVessel} />
//               </div>
//             )}

//             {/* Help Section */}
//             <div className="card">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                 Need Help?
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Rating Guidelines</h4>
//                   <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
//                     <li>• 0-25: Poor (Significant issues)</li>
//                     <li>• 26-50: Average (Needs improvement)</li>
//                     <li>• 51-75: Good (Met expectations)</li>
//                     <li>• 76-100: Excellent (Exceeded expectations)</li>
//                   </ul>
//                 </div>
                
//                 <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Confidentiality</h4>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     All feedback is treated confidentially and used only for service improvement purposes.
//                   </p>
//                 </div>
                
//                 <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Contact Support</h4>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     For assistance with the feedback form, contact our support team at feedback-support@colombodockyard.lk
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedbackPage;

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import Header from '../../components/common/Header';
// import Sidebar from '../../components/common/Sidebar';
// import FeedbackForm from '../../components/feedback/FeedbackForm';
// import { FiArrowLeft, FiFileText, FiAlertCircle, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
// import useMobile from '../../hooks/useMobile';

// const FeedbackPage = () => {
//   const { shipId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useSelector(state => state.auth);
//   const { ships } = useSelector(state => state.ships);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [selectedVessel, setSelectedVessel] = useState(null);
//   const [showVesselDropdown, setShowVesselDropdown] = useState(false);
//   const isMobile = useMobile();

//   useEffect(() => {
//     if (shipId) {
//       const vessel = ships.find(ship => ship.id === parseInt(shipId));
//       setSelectedVessel(vessel);
//     } else if (ships.length > 0) {
//       setSelectedVessel(ships[0]);
//     }
//   }, [shipId, ships]);

//   if (!user) {
//     navigate('/login');
//     return null;
//   }

//   // Mobile Vessel Selector Dropdown
//   const MobileVesselSelector = () => (
//     <div className="md:hidden mb-6">
//       <div className="relative">
//         <button
//           onClick={() => setShowVesselDropdown(!showVesselDropdown)}
//           className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-between"
//         >
//           <div className="flex items-center">
//             <FiFileText className="text-gray-400 mr-3" />
//             <div className="text-left">
//               <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
//                 {selectedVessel?.name || 'Select Vessel'}
//               </div>
//               <div className="text-xs text-gray-500 dark:text-gray-400">
//                 {selectedVessel ? selectedVessel.imoNumber : 'Choose a vessel'}
//               </div>
//             </div>
//           </div>
//           <FiChevronDown className={`text-gray-400 transition-transform ${showVesselDropdown ? 'rotate-180' : ''}`} />
//         </button>
        
//         {showVesselDropdown && (
//           <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//             {ships.map(ship => (
//               <button
//                 key={ship.id}
//                 onClick={() => {
//                   setSelectedVessel(ship);
//                   setShowVesselDropdown(false);
//                 }}
//                 className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
//               >
//                 <div className="font-medium text-gray-900 dark:text-white">{ship.name}</div>
//                 <div className="text-xs text-gray-500 dark:text-gray-400">{ship.imoNumber}</div>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Desktop Vessel Selection
//   const DesktopVesselSelector = () => (
//     <div className="hidden md:block card mb-8">
//       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//         Select Vessel for Feedback
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {ships.map(ship => (
//           <button
//             key={ship.id}
//             onClick={() => setSelectedVessel(ship)}
//             className={`p-4 border rounded-lg transition-all ${
//               selectedVessel?.id === ship.id
//                 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
//                 : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
//             }`}
//           >
//             <div className="flex items-center">
//               <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
//                 <FiFileText className="text-blue-600 dark:text-blue-300" />
//               </div>
//               <div className="text-left">
//                 <p className="font-medium text-gray-900 dark:text-white">{ship.name}</p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{ship.imoNumber}</p>
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Mobile Header */}
//       <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center justify-between p-4">
//           <div className="flex items-center">
//             <button
//               onClick={() => navigate('/dashboard')}
//               className="mr-3 text-gray-600 dark:text-gray-400"
//             >
//               <FiArrowLeft className="w-5 h-5" />
//             </button>
//             <div>
//               <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
//                 Service Feedback
//               </h1>
//               {selectedVessel && (
//                 <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
//                   {selectedVessel.name}
//                 </p>
//               )}
//             </div>
//           </div>
          
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="p-2"
//           >
//             {mobileMenuOpen ? (
//               <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//             ) : (
//               <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {mobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 z-40" onClick={() => setMobileMenuOpen(false)}>
//           <div className="absolute inset-0 bg-black bg-opacity-50" />
//           <div className="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
//             <Sidebar />
//           </div>
//         </div>
//       )}

//       {/* Desktop Sidebar */}
//       <div className="hidden md:block">
//         <Sidebar />
//       </div>

//       <div className="flex-1 pt-16 md:pt-0">
//         <div className="hidden md:block">
//           <Header />
//         </div>
        
//         <main className="p-4 md:p-6 lg:p-8">
//           {/* Desktop Breadcrumb */}
//           <div className="hidden md:flex items-center mb-6">
//             <Link to="/dashboard" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
//               <FiArrowLeft className="mr-2" />
//               Back to Dashboard
//             </Link>
//             <span className="mx-3 text-gray-400">/</span>
//             <span className="text-gray-900 dark:text-white font-medium">Service Feedback</span>
//           </div>

//           {/* Mobile Vessel Selector */}
//           {ships.length > 1 && <MobileVesselSelector />}

//           {/* Desktop Vessel Selector */}
//           {ships.length > 1 && <DesktopVesselSelector />}

//           {/* Header */}
//           <div className="mb-6">
//             <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 dark:text-white mb-2`}>
//               Service Feedback Questionnaire
//             </h1>
//             <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 dark:text-gray-400`}>
//               Please complete this questionnaire to help us improve our service
//             </p>
//           </div>

//           {/* Info Banner */}
//           <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 md:p-6 mb-6">
//             <div className="flex items-start">
//               <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4 flex-shrink-0">
//                 <FiAlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-300" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                   Important Instructions
//                 </h3>
//                 <ul className="text-gray-600 dark:text-gray-400 space-y-1">
//                   <li>• Rate each criteria on a scale of 0-100 (0 = Poor, 100 = Excellent)</li>
//                   <li>• Use the slider or quick-select buttons to assign ratings</li>
//                   <li>• If you select "Poor" or "Average", please provide details in section 18.0</li>
//                   {!isMobile && <li>• Your feedback is anonymous and will be used for service improvement only</li>}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Vessel Info Card */}
//           {selectedVessel && (
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
//               <div className={`flex ${isMobile ? 'flex-col' : 'items-center justify-between'}`}>
//                 <div className={`${isMobile ? 'mb-4' : ''}`}>
//                   <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900 dark:text-white mb-1`}>
//                     {selectedVessel.name}
//                   </h2>
//                   <div className={`flex items-center ${isMobile ? 'text-sm' : 'text-base'} text-gray-600 dark:text-gray-400`}>
//                     <span className="mr-4">{selectedVessel.imoNumber}</span>
//                     <span>{selectedVessel.type}</span>
//                   </div>
//                 </div>
//                 <div>
//                   <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
//                     Active Project
//                   </span>
//                 </div>
//               </div>
              
//               <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   <strong>Note:</strong> This feedback will be associated with your recent repair project on this vessel.
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Feedback Form */}
//           {selectedVessel && (
//             <div className="mb-6">
//               <FeedbackForm vessel={selectedVessel} />
//             </div>
//           )}

//           {/* Help Section */}
//           <div className="card">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//               Need Help?
//             </h3>
//             <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-6'}`}>
//               <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Rating Guidelines</h4>
//                 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
//                   <li>• 0-25: Poor (Significant issues)</li>
//                   <li>• 26-50: Average (Needs improvement)</li>
//                   <li>• 51-75: Good (Met expectations)</li>
//                   <li>• 76-100: Excellent (Exceeded expectations)</li>
//                 </ul>
//               </div>
              
//               <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Confidentiality</h4>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   All feedback is treated confidentially and used only for service improvement.
//                 </p>
//               </div>
              
//               <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Contact Support</h4>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   For assistance, contact: feedback-support@colombodockyard.lk
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Bottom Spacing */}
//           {isMobile && <div className="h-16" />}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default FeedbackPage;


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import Header from '../../components/common/Header';
// import Sidebar from '../../components/common/Sidebar';
// import FeedbackForm from '../../components/feedback/FeedbackForm';
// import { FiArrowLeft, FiFileText, FiAlertCircle } from 'react-icons/fi';

// const FeedbackPage = () => {
//   const { shipId } = useParams();
//   const navigate = useNavigate();
//   const { user } = useSelector(state => state.auth);
//   const { ships } = useSelector(state => state.ships);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [selectedVessel, setSelectedVessel] = useState(null);

//   useEffect(() => {
//     if (shipId) {
//       const vessel = ships.find(ship => ship.id === parseInt(shipId));
//       setSelectedVessel(vessel);
//     } else if (ships.length > 0) {
//       setSelectedVessel(ships[0]);
//     }
//   }, [shipId, ships]);

//   if (!user) {
//     navigate('/login');
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setMobileMenuOpen(true)}
//         className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Mobile Sidebar Overlay */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-40">
//           <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
//           <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800">
//             <Sidebar />
//           </div>
//         </div>
//       )}

//       <div className="flex">
//         {/* Desktop Sidebar */}
//         <div className="hidden md:block">
//           <Sidebar />
//         </div>

//         <div className="flex-1">
//           <Header />
          
//           <main className="p-4 sm:p-6 lg:p-8">
//             {/* Breadcrumb */}
//             <div className="mb-6 flex items-center">
//               <Link to="/dashboard" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
//                 <FiArrowLeft className="mr-2" />
//                 Back to Dashboard
//               </Link>
//               <span className="mx-3 text-gray-400">/</span>
//               <span className="text-gray-900 dark:text-white font-medium">Service Feedback</span>
//             </div>

//             {/* Header */}
//             <div className="mb-8">
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
//                 Service Feedback Questionnaire
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Please complete this questionnaire to help us improve our service and provide you with our best services.
//               </p>
//             </div>

//             {/* Info Banner */}
//             <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
//               <div className="flex items-start">
//                 <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
//                   <FiAlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-300" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                     Important Instructions
//                   </h3>
//                   <ul className="text-gray-600 dark:text-gray-400 space-y-1">
//                     <li>• Rate each criteria on a scale of 0-100 (0 = Poor, 100 = Excellent)</li>
//                     <li>• Use the slider or quick-select buttons to assign ratings</li>
//                     <li>• If you select "Poor" or "Average", please provide details in section 18.0</li>
//                     <li>• Your feedback is anonymous and will be used for service improvement only</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Vessel Selection */}
//             {ships.length > 1 && (
//               <div className="card mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                   Select Vessel for Feedback
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {ships.map(ship => (
//                     <button
//                       key={ship.id}
//                       onClick={() => setSelectedVessel(ship)}
//                       className={`p-4 border rounded-lg transition-all ${
//                         selectedVessel?.id === ship.id
//                           ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
//                           : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
//                       }`}
//                     >
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
//                           <FiFileText className="text-blue-600 dark:text-blue-300" />
//                         </div>
//                         <div className="text-left">
//                           <p className="font-medium text-gray-900 dark:text-white">{ship.name}</p>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">{ship.imoNumber}</p>
//                         </div>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Vessel Info Card */}
//             {selectedVessel && (
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between">
//                   <div className="mb-4 md:mb-0">
//                     <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
//                       {selectedVessel.name}
//                     </h2>
//                     <div className="flex items-center text-gray-600 dark:text-gray-400">
//                       <span className="mr-4">{selectedVessel.imoNumber}</span>
//                       <span>{selectedVessel.type}</span>
//                     </div>
//                   </div>
//                   <div>
//                     <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
//                       Active Project
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     <strong>Note:</strong> This feedback will be associated with your recent repair project on this vessel.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Feedback Form */}
//             {selectedVessel && (
//               <div className="mb-6">
//                 <FeedbackForm vessel={selectedVessel} />
//               </div>
//             )}

//             {/* Help Section */}
//             <div className="card">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                 Need Help?
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Rating Guidelines</h4>
//                   <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
//                     <li>• 0-25: Poor (Significant issues)</li>
//                     <li>• 26-50: Average (Needs improvement)</li>
//                     <li>• 51-75: Good (Met expectations)</li>
//                     <li>• 76-100: Excellent (Exceeded expectations)</li>
//                   </ul>
//                 </div>
                
//                 <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Confidentiality</h4>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     All feedback is treated confidentially and used only for service improvement purposes.
//                   </p>
//                 </div>
                
//                 <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Contact Support</h4>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     For assistance with the feedback form, contact our support team at feedback-support@colombodockyard.lk
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedbackPage;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import FeedbackForm from '../../components/feedback/FeedbackForm';
import FeedbackHistory from '../../components/feedback/FeedbackHistory';
import FeedbackDetailModal from '../../components/feedback/FeedbackDetailModal';
import FeedbackConfirmation from '../../components/feedback/FeedbackConfirmation';
import { FiArrowLeft, FiFileText, FiAlertCircle, FiList, FiMessageSquare, FiBarChart2, FiStar } from 'react-icons/fi';
import { getShips } from '../../actions/shipActions';

// Sample feedback data
const SAMPLE_FEEDBACKS = [
  {
    id: 'fb-2024-001',
    vesselName: 'M.V. SSL THAMIRABARANI',
    vesselIMO: 'IMO: 9312468',
    vesselSR: 'SR/4354',
    ownerRep: 'MR. KABILAN SADASIVAM - FLEET MANAGEMENT INDIA PVT LTD (INDIA)',
    shipManager: 'MR. SAMPATH WIJESINGHE',
    feedbackRef: 'FB-2024-001ABC',
    submittedBy: 'Captain EVERGREEN MARINE CORP. (TAIWAN) LTD',
    submittedAt: '2024-01-15T10:30:00',
    overallScore: 85,
    valueForMoney: true,
    recommend: true,
    observations: 'Excellent service throughout the repair period. Team was very professional and completed work ahead of schedule. Special thanks to the engine department for their expertise.',
    poorAverageDetails: '',
    shipManagerComments: 'Customer was very satisfied with the turnaround time.',
    ratings: {
      responsiveness: 90,
      publicRelations: 85,
      deckPlanning: 80,
      deckPipesQuality: 85,
      deckPipesTimely: 90,
      enginePlanning: 75,
      enginePipesQuality: 80,
      enginePipesTimely: 85,
      steelPlanning: 70,
      steelWorkQuality: 75,
      steelWorkTimely: 80,
      generalServices: 90,
      materialsQuality: 85,
      materialsDelivery: 80,
      overallQuality: 85,
      safetyEnvironment: 90,
      competitorPerformance: 80
    }
  },
  {
    id: 'fb-2024-002',
    vesselName: 'M.V. OCEAN SPIRIT',
    vesselIMO: 'IMO: 9456789',
    vesselSR: 'SR/5678',
    ownerRep: 'MS. LISA WANG - PACIFIC SHIPPING CO.',
    shipManager: 'MR. DAVID JOHNSON',
    feedbackRef: 'FB-2024-002DEF',
    submittedBy: 'Maria Rodriguez',
    submittedAt: '2024-01-10T14:45:00',
    overallScore: 65,
    valueForMoney: true,
    recommend: true,
    observations: 'Good overall service but some delays in material delivery affected the schedule. Communication was good throughout.',
    poorAverageDetails: 'Material delivery was delayed by 2 days which caused schedule adjustments. Painting quality could be improved.',
    shipManagerComments: 'Working on improving material supply chain.',
    ratings: {
      responsiveness: 70,
      publicRelations: 75,
      deckPlanning: 65,
      deckPipesQuality: 70,
      deckPipesTimely: 60,
      enginePlanning: 65,
      enginePipesQuality: 70,
      enginePipesTimely: 65,
      steelPlanning: 60,
      steelWorkQuality: 65,
      steelWorkTimely: 60,
      generalServices: 70,
      materialsQuality: 65,
      materialsDelivery: 50,
      overallQuality: 65,
      safetyEnvironment: 80,
      competitorPerformance: 70
    }
  }
];

const FeedbackPage = () => {
  const { shipId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { ships } = useSelector(state => state.ships);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();
  const [recentFeedback, setRecentFeedback] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load feedbacks from localStorage on component mount
  useEffect(() => {
    const savedFeedbacks = localStorage.getItem('cdplc_feedbacks');
    if (savedFeedbacks) {
      try {
        const parsedFeedbacks = JSON.parse(savedFeedbacks);
        // Combine sample feedbacks with saved ones (remove duplicates by id)
        const allFeedbacks = [...SAMPLE_FEEDBACKS];
        parsedFeedbacks.forEach(fb => {
          if (!allFeedbacks.find(existing => existing.id === fb.id)) {
            allFeedbacks.push(fb);
          }
        });
        setFeedbacks(allFeedbacks);
      } catch (error) {
        console.error('Error loading feedbacks:', error);
        setFeedbacks(SAMPLE_FEEDBACKS);
      }
    } else {
      setFeedbacks(SAMPLE_FEEDBACKS);
    }
  }, []);

  // Ensure ships are loaded so vessel selector and feedback form have data
  useEffect(() => {
    // only dispatch if user is present and ships not yet loaded
    if (user && (!ships || ships.length === 0)) {
      dispatch(getShips());
    }
  }, [dispatch, user, ships]);

  // Save feedbacks to localStorage whenever they change
  useEffect(() => {
    // Filter out sample feedbacks (they have id starting with 'fb-2024-')
    const userFeedbacks = feedbacks.filter(fb => !fb.id.startsWith('fb-2024-'));
    localStorage.setItem('cdplc_feedbacks', JSON.stringify(userFeedbacks));
  }, [feedbacks]);

  useEffect(() => {
    if (shipId) {
      const vessel = ships.find(ship => ship.id === parseInt(shipId));
      setSelectedVessel(vessel);
    } else if (ships.length > 0) {
      setSelectedVessel(ships[0]);
    }
  }, [shipId, ships]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleFeedbackSubmit = (feedbackData) => {
    // Create new feedback object
    const newFeedback = {
      ...feedbackData,
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      submittedBy: user.name || 'Anonymous',
      submittedAt: new Date().toISOString(),
      vesselName: selectedVessel?.name || feedbackData.vesselName,
      vesselIMO: selectedVessel?.imoNumber || feedbackData.vesselIMO,
      overallScore: calculateOverallScore(feedbackData.ratings)
    };

    // Add to feedbacks list (at the beginning)
    setFeedbacks(prev => [newFeedback, ...prev]);
    
    // Set recent feedback for confirmation
    setRecentFeedback(newFeedback);
    setShowConfirmation(true);
    setShowHistory(false);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Show success message
    console.log('Feedback saved successfully:', newFeedback);
  };

  const calculateOverallScore = (ratings) => {
    if (!ratings || typeof ratings !== 'object') return 0;
    const ratingValues = Object.values(ratings).filter(r => r > 0);
    if (ratingValues.length === 0) return 0;
    return Math.round(ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length);
  };

  const handleDeleteFeedback = (feedbackToDelete) => {
    if (window.confirm('Are you sure you want to delete this feedback? This action cannot be undone.')) {
      setFeedbacks(prev => prev.filter(fb => fb.id !== feedbackToDelete.id));
    }
  };

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleViewHistory = () => {
    setShowHistory(true);
    setShowConfirmation(false);
  };

  const handleNewFeedback = () => {
    setShowHistory(false);
    setShowConfirmation(false);
  };

  const handleResetForm = () => {
    setShowConfirmation(false);
    setRecentFeedback(null);
  };

  // Calculate stats from feedbacks
  const userFeedbacks = feedbacks.filter(fb => fb.submittedBy === user.name);
  const stats = {
    totalResponses: feedbacks.length,
    userResponses: userFeedbacks.length,
    averageRating: feedbacks.length > 0 
      ? parseFloat((feedbacks.reduce((sum, fb) => fb.overallScore || 0, 0) / feedbacks.length).toFixed(1))
      : 0,
    userAverageRating: userFeedbacks.length > 0
      ? parseFloat((userFeedbacks.reduce((sum, fb) => fb.overallScore || 0, 0) / userFeedbacks.length).toFixed(1))
      : 0
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1">
          <Header />
          
          <main className="p-4 sm:p-6 lg:p-8">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center">
              <Link to="/dashboard" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <FiArrowLeft className="mr-2" />
                Back to Dashboard
              </Link>
              <span className="mx-3 text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white font-medium">Service Feedback</span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Service Feedback System
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Share your experience and view feedback history. All data is saved locally.
                  </p>
                </div>
                
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button
                    onClick={handleNewFeedback}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                      !showHistory 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FiMessageSquare className="mr-2" />
                    New Feedback
                  </button>
                  <button
                    onClick={handleViewHistory}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                      showHistory 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FiList className="mr-2" />
                    View History ({feedbacks.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <FiMessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.totalResponses}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <FiBarChart2 className="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.averageRating}/100
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <FiList className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your Submissions</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.userResponses}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <FiStar className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your Avg. Score</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.userAverageRating}/100
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Message */}
            {showConfirmation && recentFeedback && (
              <div className="mb-8 animate-fade-in">
                <FeedbackConfirmation formData={recentFeedback} />
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={handleViewHistory}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View All Feedback
                  </button>
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            )}

            {/* Feedback History Section */}
            {showHistory ? (
              <div className="mb-8">
                <FeedbackHistory
                  feedbacks={feedbacks}
                  onDelete={handleDeleteFeedback}
                  onViewDetails={handleViewDetails}
                />
                
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleNewFeedback}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit New Feedback
                  </button>
                </div>
              </div>
            ) : !showConfirmation && (
              <>
                {/* Info Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                      <FiAlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Important Information
                      </h3>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• All feedback is saved locally in your browser (localStorage)</li>
                        <li>• You can view, delete, or download your feedback anytime</li>
                        <li>• Sample feedbacks are pre-loaded for demonstration</li>
                        <li>• Your data is private and only visible to you</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Vessel Selection */}
                {ships.length > 1 && (
                  <div className="card mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Select Vessel for Feedback
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ships.map(ship => (
                        <button
                          key={ship.id}
                          onClick={() => setSelectedVessel(ship)}
                          className={`p-4 border rounded-lg transition-all ${
                            selectedVessel?.id === ship.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                              <FiFileText className="text-blue-600 dark:text-blue-300" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-gray-900 dark:text-white">{ship.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{ship.imoNumber}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vessel Info Card */}
                {selectedVessel && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {selectedVessel.name}
                        </h2>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <span className="mr-4">{selectedVessel.imoNumber}</span>
                          <span>{selectedVessel.type}</span>
                        </div>
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                          Ready for Feedback
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Note:</strong> Your feedback will be automatically saved to your browser's local storage.
                      </p>
                    </div>
                  </div>
                )}

                {/* Feedback Form */}
                {selectedVessel && !showConfirmation && (
                  <div className="mb-6">
                    <FeedbackForm 
                      vessel={selectedVessel} 
                      onSubmit={handleFeedbackSubmit}
                    />
                  </div>
                )}

                {/* Recent Feedback Preview */}
                {feedbacks.length > 0 && (
                  <div className="card mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Feedback Submissions
                      </h3>
                      <button
                        onClick={handleViewHistory}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        View All →
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {feedbacks.slice(0, 3).map((feedback, index) => (
                        <div
                          key={feedback.id}
                          className={`p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                            index === 0 ? 'border-blue-300 dark:border-blue-700' : 'border-gray-200 dark:border-gray-700'
                          }`}
                          onClick={() => handleViewDetails(feedback)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {feedback.vesselName}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(feedback.submittedAt).toLocaleDateString()} • Score: {feedback.overallScore}/100
                              </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              feedback.overallScore >= 75 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : feedback.overallScore >= 50
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {feedback.overallScore >= 75 ? 'Excellent' : 
                               feedback.overallScore >= 50 ? 'Good' : 'Needs Improvement'}
                            </div>
                          </div>
                          {feedback.observations && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                              {feedback.observations}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Local Storage Info */}
                <div className="card">
                  <div className="flex items-start">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
                      <FiFileText className="w-6 h-6 text-green-600 dark:text-green-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        About Local Storage
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        Your feedback is stored locally in your browser. This means:
                      </p>
                      <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                        <li>• Data persists even when you close the browser</li>
                        <li>• Only you can see your feedback on this device</li>
                        <li>• You can export your feedback as JSON files</li>
                        <li>• Clear browser data to remove all saved feedback</li>
                      </ul>
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Storage used: {JSON.stringify(feedbacks).length} bytes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Feedback Detail Modal */}
      <FeedbackDetailModal
        feedback={selectedFeedback}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FeedbackPage;