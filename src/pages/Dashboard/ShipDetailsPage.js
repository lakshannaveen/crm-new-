// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useParams, Link } from 'react-router-dom';
// // import { getShipDetails } from '../../actions/shipActions';
// // import Header from '../../components/common/Header';
// // import Sidebar from '../../components/common/Sidebar';
// // import {
// //   FiArrowLeft, FiCalendar, FiAnchor, FiFlag, FiNavigation,
// //   FiTrendingUp, FiFileText, FiMapPin, FiUsers, FiTool,
// //   FiClipboard, FiCheckCircle, FiAlertCircle, FiClock
// // } from 'react-icons/fi';
// // import { formatDate } from '../../utils/formatters';
// // import { getStatusColor, getStatusText } from '../../utils/helpers';

// // const ShipDetailsPage = () => {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const { currentShip, loading } = useSelector(state => state.ships);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [activeTab, setActiveTab] = useState('overview');

// //   useEffect(() => {
// //     if (id) {
// //       dispatch(getShipDetails(id));
// //     }
// //   }, [dispatch, id]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //       </div>
// //     );
// //   }

// //   if (!currentShip) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
// //         <div className="text-center">
// //           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
// //             Ship Not Found
// //           </h2>
// //           <Link to="/dashboard" className="btn-primary inline-flex items-center">
// //             <FiArrowLeft className="mr-2" />
// //             Back to Dashboard
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const statusColor = getStatusColor(currentShip.status);
// //   const statusText = getStatusText(currentShip.status);

// //   const specifications = [
// //     { label: 'IMO Number', value: currentShip.imoNumber, icon: FiAnchor },
// //     { label: 'Ship Type', value: currentShip.type, icon: FiNavigation },
// //     { label: 'Flag', value: currentShip.flag, icon: FiFlag },
// //     { label: 'DWT', value: currentShip.dwt, unit: 'tons' },
// //     { label: 'Gross Tonnage', value: currentShip.grossTonnage, unit: 'tons' },
// //     { label: 'Length', value: currentShip.length, unit: 'm' },
// //     { label: 'Beam', value: currentShip.beam, unit: 'm' },
// //     { label: 'Draft', value: currentShip.draft, unit: 'm' },
// //     { label: 'Year Built', value: currentShip.yearBuilt },
// //   ];

// //   const maintenance = [
// //     { label: 'Last Dry Docking', value: currentShip.lastDryDocking, icon: FiCalendar },
// //     { label: 'Next Dry Docking', value: currentShip.nextDryDocking, icon: FiTrendingUp },
// //     { label: 'Class Survey Due', value: currentShip.classSurveyDue, icon: FiCheckCircle },
// //   ];

// //   const tasks = [
// //     { id: 1, title: 'Hull Cleaning & Painting', status: 'completed', progress: 100 },
// //     { id: 2, title: 'Engine Overhaul', status: 'in_progress', progress: 75 },
// //     { id: 3, title: 'Navigation System Update', status: 'in_progress', progress: 60 },
// //     { id: 4, title: 'Safety Equipment Inspection', status: 'pending', progress: 30 },
// //     { id: 5, title: 'Cargo Hold Maintenance', status: 'pending', progress: 10 },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
// //       {/* Mobile Menu Button */}
// //       <button
// //         onClick={() => setMobileMenuOpen(true)}
// //         className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
// //       >
// //         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //         </svg>
// //       </button>

// //       {/* Mobile Sidebar Overlay */}
// //       {mobileMenuOpen && (
// //         <div className="fixed inset-0 z-40">
// //           <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
// //           <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800">
// //             <Sidebar />
// //           </div>
// //         </div>
// //       )}

// //       <div className="flex">
// //         {/* Desktop Sidebar */}
// //         <div className="hidden md:block">
// //           <Sidebar />
// //         </div>

// //         <div className="flex-1">
// //           <Header />

// //           <main className="p-4 sm:p-6 lg:p-8">
// //             {/* Back Button & Breadcrumb */}
// //             <div className="mb-6 flex items-center justify-between">
// //               <div className="flex items-center">
// //                 <Link to="/dashboard" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
// //                   <FiArrowLeft className="mr-2" />
// //                   Back to Dashboard
// //                 </Link>
// //                 <span className="mx-3 text-gray-400">/</span>
// //                 <span className="text-gray-900 dark:text-white font-medium">Ship Details</span>
// //               </div>
// //               <div className="flex items-center space-x-4">
// //                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
// //                   {statusText}
// //                 </span>
// //                 <Link to={`/projects/${id}`} className="btn-primary text-sm">
// //                   View Project
// //                 </Link>
// //               </div>
// //             </div>

// //             {/* Ship Header */}
// //             <div className="card mb-6">
// //               <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
// //                 {/* Ship Image */}
// //                 <div className="mb-6 md:mb-0 md:w-1/3">
// //                   <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
// //                     <img src={currentShip.image} alt={currentShip.name} className="w-full h-full object-cover" />
// //                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
// //                     <div className="absolute bottom-4 left-4 right-4">
// //                       <h1 className="text-2xl font-bold text-white mb-1">{currentShip.name}</h1>
// //                       <p className="text-gray-200 text-sm">{currentShip.imoNumber} • {currentShip.flag}</p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Quick Stats */}
// //                 <div className="flex-1">
// //                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
// //                     <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
// //                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Repair Progress</p>
// //                       <div className="flex items-center justify-between">
// //                         <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentShip.progress}%</p>
// //                         <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
// //                           <div className="h-full bg-blue-500" style={{ width: `${currentShip.progress}%` }} />
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
// //                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Days Remaining</p>
// //                       <div className="flex items-center">
// //                         <FiClock className="text-green-500 mr-2" />
// //                         <p className="text-2xl font-bold text-gray-900 dark:text-white">
// //                           {Math.ceil((new Date(currentShip.endDate) - new Date()) / (1000 * 60 * 60 * 24))}
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
// //                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Project Budget</p>
// //                       <p className="text-2xl font-bold text-gray-900 dark:text-white">$2.5M</p>
// //                     </div>
// //                   </div>

// //                   {/* Timeline */}
// //                   <div className="space-y-4">
// //                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Timeline</h3>
// //                     <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
// //                       <div>
// //                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</p>
// //                         <div className="flex items-center">
// //                           <FiCalendar className="mr-2 text-gray-400" />
// //                           <span className="font-medium text-gray-900 dark:text-white">
// //                             {formatDate(currentShip.startDate, 'short')}
// //                           </span>
// //                         </div>
// //                       </div>
// //                       <div className="text-center">
// //                         <div className="h-1 w-24 bg-gray-300 dark:bg-gray-600 relative">
// //                           <div className="absolute inset-0 bg-blue-500" style={{ width: `${currentShip.progress}%` }} />
// //                         </div>
// //                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Progress</p>
// //                       </div>
// //                       <div className="text-right">
// //                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expected Completion</p>
// //                         <div className="flex items-center justify-end">
// //                           <FiCalendar className="mr-2 text-gray-400" />
// //                           <span className="font-medium text-gray-900 dark:text-white">
// //                             {formatDate(currentShip.endDate, 'short')}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Tabs */}
// //             <div className="mb-6">
// //               <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
// //                 {['overview', 'specifications', 'tasks', 'documents', 'team'].map((tab) => (
// //                   <button
// //                     key={tab}
// //                     onClick={() => setActiveTab(tab)}
// //                     className={`px-4 py-2 font-medium text-sm border-b-2 -mb-px transition-colors ${
// //                       activeTab === tab
// //                         ? 'border-blue-500 text-blue-600 dark:text-blue-400'
// //                         : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
// //                     }`}
// //                   >
// //                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Tab Content */}
// //             <div className="card">
// //               {activeTab === 'overview' && (
// //                 <div className="space-y-6">
// //                   <div>
// //                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Maintenance Schedule</h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                       {maintenance.map((item, index) => (
// //                         <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
// //                           <div className="flex items-center mb-2">
// //                             {item.icon && <item.icon className="mr-3 text-gray-400" />}
// //                             <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
// //                           </div>
// //                           <p className="font-medium text-gray-900 dark:text-white">
// //                             {formatDate(item.value, 'short')}
// //                           </p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dock Information</h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
// //                         <div className="flex items-center mb-3">
// //                           <FiMapPin className="text-gray-400 mr-3" />
// //                           <div>
// //                             <p className="font-medium text-gray-900 dark:text-white">Dock Location</p>
// //                             <p className="text-sm text-gray-600 dark:text-gray-400">Colombo Dockyard, Sri Lanka</p>
// //                           </div>
// //                         </div>
// //                         <div className="space-y-2">
// //                           <div className="flex justify-between">
// //                             <span className="text-sm text-gray-600 dark:text-gray-400">Dock Number:</span>
// //                             <span className="font-medium">Dock 3</span>
// //                           </div>
// //                           <div className="flex justify-between">
// //                             <span className="text-sm text-gray-600 dark:text-gray-400">Berth:</span>
// //                             <span className="font-medium">B-12</span>
// //                           </div>
// //                           <div className="flex justify-between">
// //                             <span className="text-sm text-gray-600 dark:text-gray-400">Superintendent:</span>
// //                             <span className="font-medium">Capt. R. Perera</span>
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
// //                         <div className="flex items-center mb-3">
// //                           <FiUsers className="text-gray-400 mr-3" />
// //                           <div>
// //                             <p className="font-medium text-gray-900 dark:text-white">Project Team</p>
// //                             <p className="text-sm text-gray-600 dark:text-gray-400">45 crew members assigned</p>
// //                           </div>
// //                         </div>
// //                         <div className="space-y-2">
// //                           <div className="flex justify-between">
// //                             <span className="text-sm text-gray-600 dark:text-gray-400">Project Coordinator:</span>
// //                             <span className="font-medium">Raj Patel</span>
// //                           </div>
// //                           <div className="flex justify-between">
// //                             <span className="text-sm text-gray-600 dark:text-gray-400">Team Leader:</span>
// //                             <span className="font-medium">Anil Kumar</span>
// //                           </div>
// //                           <div className="flex justify-between">
// //                             <span className="text-sm text-gray-600 dark:text-gray-400">Safety Officer:</span>
// //                             <span className="font-medium">Maria Silva</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {activeTab === 'specifications' && (
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Ship Specifications</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                     {specifications.map((spec, index) => (
// //                       <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
// //                         <div className="flex items-center mb-2">
// //                           {spec.icon && <spec.icon className="mr-3 text-gray-400" />}
// //                           <span className="text-sm text-gray-600 dark:text-gray-400">{spec.label}</span>
// //                         </div>
// //                         <p className="text-lg font-medium text-gray-900 dark:text-white">
// //                           {spec.value} {spec.unit && <span className="text-sm text-gray-500">{spec.unit}</span>}
// //                         </p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {activeTab === 'tasks' && (
// //                 <div>
// //                   <div className="flex justify-between items-center mb-6">
// //                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Tasks</h3>
// //                     <div className="flex items-center space-x-2">
// //                       <span className="text-sm text-gray-600 dark:text-gray-400">3 of 5 tasks completed</span>
// //                       <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
// //                         <div className="h-full bg-green-500" style={{ width: '60%' }} />
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="space-y-3">
// //                     {tasks.map((task) => (
// //                       <div key={task.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
// //                         <div className="flex items-center justify-between">
// //                           <div className="flex items-center">
// //                             {task.status === 'completed' ? (
// //                               <FiCheckCircle className="text-green-500 mr-3" />
// //                             ) : task.status === 'in_progress' ? (
// //                               <FiClock className="text-blue-500 mr-3" />
// //                             ) : (
// //                               <FiAlertCircle className="text-yellow-500 mr-3" />
// //                             )}
// //                             <div>
// //                               <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
// //                               <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
// //                                 {task.status.replace('_', ' ')}
// //                               </p>
// //                             </div>
// //                           </div>
// //                           <div className="flex items-center">
// //                             <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
// //                               <div className="h-full bg-blue-500" style={{ width: `${task.progress}%` }} />
// //                             </div>
// //                             <span className="text-sm font-medium text-gray-900 dark:text-white">{task.progress}%</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {activeTab === 'documents' && (
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Documents & Approvals</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                     {[
// //                       { name: 'Engineering Drawings', type: 'PDF', size: '2.4 MB', status: 'approved' },
// //                       { name: 'Class Approval Certificate', type: 'PDF', size: '1.1 MB', status: 'approved' },
// //                       { name: 'Safety Plan', type: 'DOC', size: '3.2 MB', status: 'pending' },
// //                       { name: 'Inspection Reports', type: 'PDF', size: '4.7 MB', status: 'approved' },
// //                       { name: 'Quality Control Documents', type: 'XLS', size: '2.8 MB', status: 'in_review' },
// //                       { name: 'Final Survey Report', type: 'PDF', size: '5.3 MB', status: 'pending' },
// //                     ].map((doc, index) => (
// //                       <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
// //                         <div className="flex items-start justify-between mb-3">
// //                           <div>
// //                             <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
// //                             <p className="text-sm text-gray-600 dark:text-gray-400">
// //                               {doc.type} • {doc.size}
// //                             </p>
// //                           </div>
// //                           <span className={`px-2 py-1 rounded text-xs font-medium ${
// //                             doc.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
// //                             doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
// //                             'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
// //                           }`}>
// //                             {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
// //                           </span>
// //                         </div>
// //                         <div className="flex space-x-2">
// //                           <button className="flex-1 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
// //                             Download
// //                           </button>
// //                           <button className="flex-1 py-2 text-sm btn-primary">
// //                             View
// //                           </button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {activeTab === 'team' && (
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Project Team</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                     {[
// //                       { name: 'Raj Patel', role: 'Project Coordinator', department: 'Management', contact: '+886 033123831' },
// //                       { name: 'Anil Kumar', role: 'Team Leader', department: 'Engineering', contact: '+94 77 234 5678' },
// //                       { name: 'Maria Silva', role: 'Safety Officer', department: 'Safety', contact: '+94 77 345 6789' },
// //                       { name: 'David Chen', role: 'Quality Inspector', department: 'Quality Control', contact: '+94 77 456 7890' },
// //                       { name: 'Sarah Johnson', role: 'Electrical Engineer', department: 'Engineering', contact: '+94 77 567 8901' },
// //                       { name: 'Michael Brown', role: 'Mechanical Engineer', department: 'Engineering', contact: '+94 77 678 9012' },
// //                     ].map((member, index) => (
// //                       <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
// //                         <div className="flex items-start mb-4">
// //                           <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
// //                             <span className="text-blue-600 dark:text-blue-300 font-medium">
// //                               {member.name.split(' ').map(n => n[0]).join('')}
// //                             </span>
// //                           </div>
// //                           <div>
// //                             <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
// //                             <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
// //                             <p className="text-xs text-gray-500 dark:text-gray-500">{member.department}</p>
// //                           </div>
// //                         </div>
// //                         <div className="space-y-2">
// //                           <div className="flex items-center text-sm">
// //                             <FiTool className="text-gray-400 mr-2" />
// //                             <span className="text-gray-600 dark:text-gray-400">{member.role}</span>
// //                           </div>
// //                           <div className="flex items-center text-sm">
// //                             <FiUsers className="text-gray-400 mr-2" />
// //                             <span className="text-gray-600 dark:text-gray-400">{member.department} Department</span>
// //                           </div>
// //                           <div className="flex items-center text-sm">
// //                             <FiClipboard className="text-gray-400 mr-2" />
// //                             <span className="text-gray-600 dark:text-gray-400">{member.contact}</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </main>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ShipDetailsPage;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import { getShipDetails } from '../../actions/shipActions';
// import Header from '../../components/common/Header';
// import Sidebar from '../../components/common/Sidebar';
// import {
//   FiArrowLeft, FiCalendar, FiAnchor, FiFlag, FiNavigation,
//   FiTrendingUp, FiFileText, FiMapPin, FiUsers, FiTool,
//   FiClipboard, FiCheckCircle, FiAlertCircle, FiClock,
//   FiMenu, FiX
// } from 'react-icons/fi';
// import { formatDate } from '../../utils/formatters';
// import { getStatusColor, getStatusText } from '../../utils/helpers';

// const ShipDetailsPage = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { currentShip, loading } = useSelector(state => state.ships);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     if (id) {
//       dispatch(getShipDetails(id));
//     }

//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [dispatch, id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!currentShip) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
//         <div className="text-center max-w-md">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             Ship Not Found
//           </h2>
//           <Link to="/dashboard" className="btn-primary inline-flex items-center justify-center px-4 py-2">
//             <FiArrowLeft className="mr-2" />
//             Back to Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const statusColor = getStatusColor(currentShip.status);
//   const statusText = getStatusText(currentShip.status);

//   const specifications = [
//     { label: 'IMO Number', value: currentShip.imoNumber, icon: FiAnchor },
//     { label: 'Ship Type', value: currentShip.type, icon: FiNavigation },
//     { label: 'Flag', value: currentShip.flag, icon: FiFlag },
//     { label: 'DWT', value: currentShip.dwt, unit: 'tons' },
//     { label: 'Gross Tonnage', value: currentShip.grossTonnage, unit: 'tons' },
//     { label: 'Length', value: currentShip.length, unit: 'm' },
//     { label: 'Beam', value: currentShip.beam, unit: 'm' },
//     { label: 'Draft', value: currentShip.draft, unit: 'm' },
//     { label: 'Year Built', value: currentShip.yearBuilt },
//   ];

//   const maintenance = [
//     { label: 'Last Dry Docking', value: currentShip.lastDryDocking, icon: FiCalendar },
//     { label: 'Next Dry Docking', value: currentShip.nextDryDocking, icon: FiTrendingUp },
//     { label: 'Class Survey Due', value: currentShip.classSurveyDue, icon: FiCheckCircle },
//   ];

//   const tasks = [
//     { id: 1, title: 'Hull Cleaning & Painting', status: 'completed', progress: 100 },
//     { id: 2, title: 'Engine Overhaul', status: 'in_progress', progress: 75 },
//     { id: 3, title: 'Navigation System Update', status: 'in_progress', progress: 60 },
//     { id: 4, title: 'Safety Equipment Inspection', status: 'pending', progress: 30 },
//     { id: 5, title: 'Cargo Hold Maintenance', status: 'pending', progress: 10 },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setMobileMenuOpen(true)}
//         className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-all ${
//           isScrolled ? 'shadow-lg' : 'shadow'
//         }`}
//       >
//         <FiMenu className="w-6 h-6" />
//       </button>

//       {/* Mobile Sidebar Overlay */}
//       <div className={`fixed inset-0 z-50 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
//         <div
//           className="absolute inset-0 bg-black/50"
//           onClick={() => setMobileMenuOpen(false)}
//         />
//         <div className={`absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ${
//           mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}>
//           <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
//             <span className="font-semibold text-gray-900 dark:text-white">Navigation</span>
//             <button
//               onClick={() => setMobileMenuOpen(false)}
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
//             >
//               <FiX className="w-5 h-5" />
//             </button>
//           </div>
//           <Sidebar />
//         </div>
//       </div>

//       <div className="flex">
//         {/* Desktop Sidebar */}
//         <div className="hidden md:block">
//           <Sidebar />
//         </div>

//         <div className="flex-1 w-full md:w-auto">
//           <Header />

//           <main className="p-4 sm:p-6 lg:p-8 pt-20 md:pt-0">
//             {/* Back Button & Breadcrumb - Mobile Optimized */}
//             <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//               <div className="flex items-center">
//                 <Link
//                   to="/dashboard"
//                   className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
//                 >
//                   <FiArrowLeft className="mr-2" />
//                   <span className="hidden sm:inline">Back to Dashboard</span>
//                   <span className="sm:hidden">Back</span>
//                 </Link>
//                 <span className="mx-3 text-gray-400 hidden sm:inline">/</span>
//                 <span className="text-gray-900 dark:text-white font-medium truncate max-w-[150px] sm:max-w-none">
//                   {currentShip.name}
//                 </span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${statusColor}`}>
//                   {statusText}
//                 </span>
//                 <Link
//                   to={`/projects/${id}`}
//                   className="btn-primary text-sm px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap"
//                 >
//                   View Project
//                 </Link>
//               </div>
//             </div>

//             {/* Ship Header - Mobile Optimized */}
//             <div className="card mb-6 overflow-hidden">
//               <div className="flex flex-col space-y-6">
//                 {/* Ship Image */}
//                 <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden -mx-4 sm:mx-0 -mt-4 sm:mt-0">
//                   <img
//                     src={currentShip.image}
//                     alt={currentShip.name}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
//                   <div className="absolute bottom-4 left-4 right-4">
//                     <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 truncate">{currentShip.name}</h1>
//                     <p className="text-gray-200 text-xs sm:text-sm truncate">
//                       {currentShip.imoNumber} • {currentShip.flag}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Quick Stats - Mobile Grid */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
//                   <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
//                     <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">Repair Progress</p>
//                     <div className="flex items-center justify-between">
//                       <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
//                         {currentShip.progress}%
//                       </p>
//                       <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-blue-500"
//                           style={{ width: `${currentShip.progress}%` }}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
//                     <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">Days Remaining</p>
//                     <div className="flex items-center">
//                       <FiClock className="text-green-500 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
//                       <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
//                         {Math.max(0, Math.ceil((new Date(currentShip.endDate) - new Date()) / (1000 * 60 * 60 * 24)))}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg col-span-2 sm:col-span-1">
//                     <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">Project Budget</p>
//                     <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">$2.5M</p>
//                   </div>
//                 </div>

//                 {/* Timeline - Mobile Optimized */}
//                 <div className="space-y-3 sm:space-y-4">
//                   <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
//                     Project Timeline
//                   </h3>
//                   <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4 sm:space-y-0">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
//                       <div className="flex-1">
//                         <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</p>
//                         <div className="flex items-center">
//                           <FiCalendar className="mr-2 text-gray-400 w-4 h-4" />
//                           <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
//                             {formatDate(currentShip.startDate, 'short')}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex-1 text-center">
//                         <div className="hidden sm:block h-1 w-24 bg-gray-300 dark:bg-gray-600 relative mx-auto">
//                           <div
//                             className="absolute inset-0 bg-blue-500"
//                             style={{ width: `${currentShip.progress}%` }}
//                           />
//                         </div>
//                         <div className="sm:hidden h-1 w-full bg-gray-300 dark:bg-gray-600 relative">
//                           <div
//                             className="absolute inset-0 bg-blue-500"
//                             style={{ width: `${currentShip.progress}%` }}
//                           />
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Progress</p>
//                       </div>

//                       <div className="flex-1 text-right sm:text-left">
//                         <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Expected Completion</p>
//                         <div className="flex items-center justify-end sm:justify-start">
//                           <FiCalendar className="mr-2 text-gray-400 w-4 h-4" />
//                           <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
//                             {formatDate(currentShip.endDate, 'short')}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs - Mobile Scrollable */}
//             <div className="mb-6">
//               <div className="relative">
//                 <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
//                   {['overview', 'specifications', 'tasks', 'documents', 'team'].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${
//                         activeTab === tab
//                           ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                           : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
//                       }`}
//                     >
//                       {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Tab Content */}
//             <div className="card">
//               {activeTab === 'overview' && (
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                       Maintenance Schedule
//                     </h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                       {maintenance.map((item, index) => (
//                         <div key={index} className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                           <div className="flex items-center mb-2">
//                             {item.icon && <item.icon className="mr-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />}
//                             <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
//                               {item.label}
//                             </span>
//                           </div>
//                           <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
//                             {formatDate(item.value, 'short')}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                       Dock Information
//                     </h3>
//                     <div className="grid grid-cols-1 gap-4 sm:gap-6">
//                       <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                         <div className="flex items-start mb-3">
//                           <FiMapPin className="text-gray-400 mr-3 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
//                           <div className="flex-1 min-w-0">
//                             <p className="font-medium text-gray-900 dark:text-white truncate">Dock Location</p>
//                             <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
//                               Colombo Dockyard, Sri Lanka
//                             </p>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           {[
//                             { label: 'Dock Number', value: 'Dock 3' },
//                             { label: 'Berth', value: 'B-12' },
//                             { label: 'Superintendent', value: 'Capt. R. Perera' }
//                           ].map((item, idx) => (
//                             <div key={idx} className="flex justify-between">
//                               <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
//                                 {item.label}:
//                               </span>
//                               <span className="font-medium text-sm sm:text-base truncate ml-2">{item.value}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                         <div className="flex items-start mb-3">
//                           <FiUsers className="text-gray-400 mr-3 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
//                           <div className="flex-1 min-w-0">
//                             <p className="font-medium text-gray-900 dark:text-white truncate">Project Team</p>
//                             <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
//                               45 crew members assigned
//                             </p>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           {[
//                             { label: 'Project Coordinator', value: 'Raj Patel' },
//                             { label: 'Team Leader', value: 'Anil Kumar' },
//                             { label: 'Safety Officer', value: 'Maria Silva' }
//                           ].map((item, idx) => (
//                             <div key={idx} className="flex justify-between">
//                               <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
//                                 {item.label}:
//                               </span>
//                               <span className="font-medium text-sm sm:text-base truncate ml-2">{item.value}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'specifications' && (
//                 <div>
//                   <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-6">
//                     Ship Specifications
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                     {specifications.map((spec, index) => (
//                       <div key={index} className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                         <div className="flex items-center mb-2">
//                           {spec.icon && <spec.icon className="mr-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />}
//                           <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
//                             {spec.label}
//                           </span>
//                         </div>
//                         <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white truncate">
//                           {spec.value} {spec.unit && (
//                             <span className="text-xs sm:text-sm text-gray-500">{spec.unit}</span>
//                           )}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'tasks' && (
//                 <div>
//                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
//                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
//                       Project Tasks
//                     </h3>
//                     <div className="flex items-center space-x-2">
//                       <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
//                         3 of 5 tasks completed
//                       </span>
//                       <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                         <div className="h-full bg-green-500" style={{ width: '60%' }} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="space-y-3">
//                     {tasks.map((task) => (
//                       <div key={task.id} className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
//                           <div className="flex items-center flex-1 min-w-0">
//                             {task.status === 'completed' ? (
//                               <FiCheckCircle className="text-green-500 mr-3 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
//                             ) : task.status === 'in_progress' ? (
//                               <FiClock className="text-blue-500 mr-3 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
//                             ) : (
//                               <FiAlertCircle className="text-yellow-500 mr-3 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
//                             )}
//                             <div className="flex-1 min-w-0">
//                               <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">
//                                 {task.title}
//                               </p>
//                               <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 capitalize truncate">
//                                 {task.status.replace('_', ' ')}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-center justify-between sm:justify-end">
//                             <div className="w-24 sm:w-32 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-3 sm:mr-4">
//                               <div
//                                 className="h-full bg-blue-500"
//                                 style={{ width: `${task.progress}%` }}
//                               />
//                             </div>
//                             <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
//                               {task.progress}%
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'documents' && (
//                 <div>
//                   <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-6">
//                     Documents & Approvals
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                     {[
//                       { name: 'Engineering Drawings', type: 'PDF', size: '2.4 MB', status: 'approved' },
//                       { name: 'Class Approval Certificate', type: 'PDF', size: '1.1 MB', status: 'approved' },
//                       { name: 'Safety Plan', type: 'DOC', size: '3.2 MB', status: 'pending' },
//                       { name: 'Inspection Reports', type: 'PDF', size: '4.7 MB', status: 'approved' },
//                       { name: 'Quality Control Documents', type: 'XLS', size: '2.8 MB', status: 'in_review' },
//                       { name: 'Final Survey Report', type: 'PDF', size: '5.3 MB', status: 'pending' },
//                     ].map((doc, index) => (
//                       <div key={index} className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                         <div className="flex items-start justify-between mb-3 space-x-2">
//                           <div className="flex-1 min-w-0">
//                             <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">
//                               {doc.name}
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
//                               {doc.type} • {doc.size}
//                             </p>
//                           </div>
//                           <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${
//                             doc.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
//                             doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
//                             'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
//                           }`}>
//                             {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
//                           </span>
//                         </div>
//                         <div className="flex space-x-2">
//                           <button className="flex-1 py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap">
//                             Download
//                           </button>
//                           <button className="flex-1 py-2 text-xs sm:text-sm btn-primary whitespace-nowrap">
//                             View
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'team' && (
//                 <div>
//                   <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-6">
//                     Project Team
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                     {[
//                       { name: 'Raj Patel', role: 'Project Coordinator', department: 'Management', contact: '+886 033123831' },
//                       { name: 'Anil Kumar', role: 'Team Leader', department: 'Engineering', contact: '+94 77 234 5678' },
//                       { name: 'Maria Silva', role: 'Safety Officer', department: 'Safety', contact: '+94 77 345 6789' },
//                       { name: 'David Chen', role: 'Quality Inspector', department: 'Quality Control', contact: '+94 77 456 7890' },
//                       { name: 'Sarah Johnson', role: 'Electrical Engineer', department: 'Engineering', contact: '+94 77 567 8901' },
//                       { name: 'Michael Brown', role: 'Mechanical Engineer', department: 'Engineering', contact: '+94 77 678 9012' },
//                     ].map((member, index) => (
//                       <div key={index} className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                         <div className="flex items-start mb-4">
//                           <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
//                             <span className="text-blue-600 dark:text-blue-300 font-medium text-sm sm:text-base">
//                               {member.name.split(' ').map(n => n[0]).join('')}
//                             </span>
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">
//                               {member.name}
//                             </p>
//                             <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
//                               {member.role}
//                             </p>
//                             <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
//                               {member.department}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center text-xs sm:text-sm">
//                             <FiTool className="text-gray-400 mr-2 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//                             <span className="text-gray-600 dark:text-gray-400 truncate">{member.role}</span>
//                           </div>
//                           <div className="flex items-center text-xs sm:text-sm">
//                             <FiUsers className="text-gray-400 mr-2 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//                             <span className="text-gray-600 dark:text-gray-400 truncate">{member.department} Department</span>
//                           </div>
//                           <div className="flex items-center text-xs sm:text-sm">
//                             <FiClipboard className="text-gray-400 mr-2 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//                             <span className="text-gray-600 dark:text-gray-400 truncate">{member.contact}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShipDetailsPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getShipDetails } from "../../actions/shipActions";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import {
  FiArrowLeft,
  FiCalendar,
  FiAnchor,
  FiFlag,
  FiNavigation,
  FiTrendingUp,
  FiFileText,
  FiMapPin,
  // FiUsers,
  FiTool,
  // FiClipboard,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiMenu,
  FiX,
  FiDollarSign,
  FiGlobe,
  FiUser,
  FiBriefcase,
  FiPercent,
  FiCreditCard,
  FiPackage,
  FiBarChart2,
  FiServer,
  FiCpu,
  FiShield,
  // FiMail,
  // FiPhone,
  FiBook,
  FiLayers,
  FiTarget,
  FiActivity,
  FiArchive,
} from "react-icons/fi";
import { formatDate } from "../../utils/formatters";
import { getStatusColor, getStatusText } from "../../utils/helpers";

const ShipDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentShip, loading } = useSelector((state) => state.ships);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getShipDetails(id));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentShip) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ship Not Found
          </h2>
          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center justify-center px-4 py-2"
          >
            <FiArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const statusColor = getStatusColor(currentShip.status);
  const statusText = getStatusText(currentShip.status);

  // Basic Specifications
  const basicSpecifications = [
    {
      label: "IMO Number",
      value: currentShip.imoNumber || "N/A",
      icon: FiAnchor,
    },
    { label: "Ship Type", value: currentShip.type, icon: FiNavigation },
    { label: "Flag", value: currentShip.flag, icon: FiFlag },
    { label: "DWT", value: currentShip.dwt, unit: "tons" },
    { label: "Gross Tonnage", value: currentShip.grossTonnage, unit: "tons" },
    { label: "Length", value: currentShip.length, unit: "m" },
    { label: "Beam", value: currentShip.beam, unit: "m" },
    { label: "Draft", value: currentShip.draft, unit: "m" },
    { label: "Year Built", value: currentShip.yearBuilt, icon: FiCalendar },
    { label: "Depth", value: currentShip.depth || "N/A", unit: "m" },
    {
      label: "Displacement",
      value: currentShip.displacement || "N/A",
      unit: "tons",
    },
    { label: "Speed", value: currentShip.speed || "N/A", unit: "knots" },
  ];

  // Financial Information
  const financialInfo = [
    {
      label: "Currency",
      value: currentShip.currency ?? "N/A",
      icon: FiDollarSign,
    },
    {
      label: "Currency Rate",
      value: currentShip.currencyRate ?? "N/A",
      icon: FiPercent,
    },
    {
      label: "Foreign Value",
      value: currentShip.foreignValue ?? "N/A",
      icon: FiDollarSign,
    },
    {
      label: "Local Value",
      value: currentShip.localValue ?? "N/A",
      icon: FiDollarSign,
    },
    {
      label: "Expected Revenue",
      value:
        currentShip.expectedRevenue != null &&
        currentShip.expectedRevenue !== ""
          ? `$${currentShip.expectedRevenue}`
          : "N/A",
      icon: FiBarChart2,
    },
  ];

  // Management Information
  const managementInfo = [
    {
      label: "Ship Manager",
      value: currentShip.shipManager || "N/A",
      icon: FiUser,
    },
    {
      label: "Estimate Engineer",
      value: currentShip.estimateEngineer || "N/A",
      icon: FiTool,
    },
    {
      label: "Project Manager",
      value: currentShip.projectManager || "N/A",
      icon: FiBriefcase,
    },
    {
      label: "Invoice Engineer",
      value: currentShip.invoiceEngineer || "N/A",
      icon: FiCreditCard,
    },
    {
      label: "Project Engineer",
      value: currentShip.projectEngineer || "N/A",
      icon: FiServer,
    },
  ];

  // Project Details
  const projectDetails = [
    {
      label: "Job Category",
      value: currentShip.shipCategory || "N/A",
      icon: FiPackage,
    },
    { label: "Job Main", value: currentShip.jobMain || "N/A", icon: FiLayers },
    {
      label: "Project Name",
      value: currentShip.projectName || currentShip.name,
      icon: FiTarget,
    },
    {
      label: "Repair Summary",
      value: currentShip.repairSummary || "N/A",
      icon: FiFileText,
    },
    {
      label: "Vessel History",
      value: currentShip.vesselHistory || "N/A",
      icon: FiArchive,
    },
  ];

  // Duration Information
  const durationInfo = [
    {
      label: "Afloat Duration",
      value: currentShip.afloatDuration
        ? `${currentShip.afloatDuration} days`
        : "N/A",
      icon: FiClock,
    },
    {
      label: "In Dock Duration",
      value: currentShip.inDockDuration
        ? `${currentShip.inDockDuration} days`
        : "N/A",
      icon: FiCalendar,
    },
  ];

  // Classification & Survey
  const classificationInfo = [
    {
      label: "Class Notation",
      value: currentShip.classNotation || "N/A",
      icon: FiShield,
    },
    {
      label: "Classification Dual",
      value: currentShip.classificationDual || "N/A",
      icon: FiCpu,
    },
    {
      label: "Estimate Labor Rate",
      value: currentShip.estimateLaborRate || "N/A",
      icon: FiPercent,
    },
  ];

  // Code Information
  const codeInfo = [
    {
      label: "Agent Code",
      value: currentShip.agentCode || "N/A",
      icon: FiUser,
    },
    {
      label: "Owner Code",
      value: currentShip.ownerCode || "N/A",
      icon: FiBriefcase,
    },
    {
      label: "Payment Code",
      value: currentShip.paymentCode || "N/A",
      icon: FiCreditCard,
    },
  ];

  // Coating Information
  const coatingInfo = [
    {
      label: "Coating Inspector",
      value: currentShip.coatingInspector || "N/A",
      icon: FiCheckCircle,
    },
    {
      label: "Coating Provider",
      value: currentShip.coatingProvider || "N/A",
      icon: FiPackage,
    },
  ];

  // Status Information
  const statusInfo = [
    {
      label: "Work Done Status",
      value: currentShip.workDoneStatus || "N/A",
      icon: FiActivity,
    },
    {
      label: "Bill Status",
      value: currentShip.billStatus || "N/A",
      icon: FiFileText,
    },
    {
      label: "Invoice Status",
      value: currentShip.invoiceStatus || "N/A",
      icon: FiCreditCard,
    },
    {
      label: "Dock Number",
      value: currentShip.dockNumber || "N/A",
      icon: FiMapPin,
    },
    {
      label: "Completion Date",
      value: currentShip.completionDate || "N/A",
      icon: FiCalendar,
    },
  ];

  // Contact Information
  const contactInfo = [
    { label: "Country", value: currentShip.country || "N/A", icon: FiGlobe },
    { label: "PPD Site", value: currentShip.ppdSite || "N/A", icon: FiMapPin },
    {
      label: "Previous Name",
      value: currentShip.previousName || "N/A",
      icon: FiBook,
    },
  ];

  const maintenance = [
    {
      label: "Last Dry Docking",
      value: currentShip.lastDryDocking,
      icon: FiCalendar,
    },
    {
      label: "Next Dry Docking",
      value: currentShip.nextDryDocking,
      icon: FiTrendingUp,
    },
    {
      label: "Class Survey Due",
      value: currentShip.classSurveyDue,
      icon: FiCheckCircle,
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Hull Cleaning & Painting",
      status: "completed",
      progress: 100,
    },
    { id: 2, title: "Engine Overhaul", status: "in_progress", progress: 75 },
    {
      id: 3,
      title: "Navigation System Update",
      status: "in_progress",
      progress: 60,
    },
    {
      id: 4,
      title: "Safety Equipment Inspection",
      status: "pending",
      progress: 30,
    },
    { id: 5, title: "Cargo Hold Maintenance", status: "pending", progress: 10 },
  ];

  const renderInfoSection = (title, items, columns = 3) => {
    return (
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
          {title}
        </h4>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-3`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center mb-1">
                {item.icon && (
                  <item.icon className="mr-2 text-gray-400 w-4 h-4" />
                )}
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {item.label}
                </span>
              </div>
              <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                {item.value}{" "}
                {item.unit && (
                  <span className="text-xs text-gray-500">{item.unit}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-all ${
          isScrolled ? "shadow-lg" : "shadow"
        }`}
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="font-semibold text-gray-900 dark:text-white">
              Navigation
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <Sidebar />
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 w-full md:w-auto">
          <Header />

          <main className="p-4 sm:p-6 lg:p-8 pt-20 md:pt-0">
            {/* Back Button & Breadcrumb */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
                >
                  <FiArrowLeft className="mr-2" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Back</span>
                </Link>
                <span className="mx-3 text-gray-400 hidden sm:inline">/</span>
                <span className="text-gray-900 dark:text-white font-medium truncate max-w-[150px] sm:max-w-none">
                  {currentShip.name}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${statusColor}`}
                >
                  {statusText}
                </span>
                <Link
                  to={`/projects/${id}`}
                  className="btn-primary text-sm px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap"
                >
                  View Project
                </Link>
              </div>
            </div>

            {/* Ship Header */}
            <div className="card mb-6 overflow-hidden">
              <div className="flex flex-col space-y-6">
                {/* Ship Image */}
                <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden -mx-4 sm:mx-0 -mt-4 sm:mt-0">
                  <img
                    src={currentShip.image}
                    alt={currentShip.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 truncate">
                      {currentShip.name}
                    </h1>
                    <p className="text-gray-200 text-xs sm:text-sm truncate">
                      {currentShip.imoNumber || "No IMO"} • {currentShip.flag} •{" "}
                      {currentShip.type}
                    </p>
                    {currentShip.previousName && (
                      <p className="text-gray-300 text-xs mt-1">
                        Previous: {currentShip.previousName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
                      Repair Progress
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {currentShip.progress}%
                      </p>
                      <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${currentShip.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
                      Days in Dock
                    </p>
                    <div className="flex items-center">
                      <FiCalendar className="text-green-500 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                      <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {currentShip.inDockDuration || "0"}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
                      Expected Revenue
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                      ${currentShip.expectedRevenue ?? "0"}
                    </p>
                  </div>

                  <div className="p-3 sm:p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
                      Job Category
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {currentShip.shipCategory || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    Project Timeline
                  </h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Start Date
                        </p>
                        <div className="flex items-center">
                          <FiCalendar className="mr-2 text-gray-400 w-4 h-4" />
                          <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                            {formatDate(currentShip.startDate, "short")}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 text-center">
                        <div className="hidden sm:block h-1 w-24 bg-gray-300 dark:bg-gray-600 relative mx-auto">
                          <div
                            className="absolute inset-0 bg-blue-500"
                            style={{ width: `${currentShip.progress}%` }}
                          />
                        </div>
                        <div className="sm:hidden h-1 w-full bg-gray-300 dark:bg-gray-600 relative">
                          <div
                            className="absolute inset-0 bg-blue-500"
                            style={{ width: `${currentShip.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Progress
                        </p>
                      </div>

                      <div className="flex-1 text-right sm:text-left">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Expected Completion
                        </p>
                        <div className="flex items-center justify-end sm:justify-start">
                          <FiCalendar className="mr-2 text-gray-400 w-4 h-4" />
                          <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                            {formatDate(currentShip.endDate, "short")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="relative">
                <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                  {[
                    "overview",
                    "specifications",
                    "financial",
                    "management",
                    "project",
                    "status",
                    "documents",
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-600 dark:text-blue-400"
                          : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="card">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {renderInfoSection(
                    "Basic Information",
                    basicSpecifications.slice(0, 6),
                    3
                  )}
                  {renderInfoSection("Financial Overview", financialInfo, 3)}
                  {renderInfoSection("Management Team", managementInfo, 3)}

                  <div className="space-y-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                      Maintenance Schedule
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {maintenance.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center mb-1">
                            <item.icon className="mr-2 text-gray-400 w-4 h-4" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {item.label}
                            </span>
                          </div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">
                            {formatDate(item.value, "short")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="space-y-8">
                  {renderInfoSection(
                    "Ship Specifications",
                    basicSpecifications,
                    3
                  )}
                  {renderInfoSection("Contact Information", contactInfo, 2)}
                  {renderInfoSection("Duration Information", durationInfo, 2)}
                </div>
              )}

              {activeTab === "financial" && (
                <div className="space-y-8">
                  {renderInfoSection("Financial Details", financialInfo, 2)}
                  {renderInfoSection("Code Information", codeInfo, 3)}
                  <div className="space-y-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                      Currency Information
                    </h4>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Currency
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {currentShip.currency || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Exchange Rate
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {currentShip.currencyRate ?? "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "management" && (
                <div className="space-y-8">
                  {renderInfoSection("Management Team", managementInfo, 2)}
                  {renderInfoSection("Coating Information", coatingInfo, 2)}
                  {renderInfoSection("Code Information", codeInfo, 3)}
                </div>
              )}

              {activeTab === "project" && (
                <div className="space-y-8">
                  {renderInfoSection("Project Details", projectDetails, 2)}
                  {renderInfoSection(
                    "Classification & Survey",
                    classificationInfo,
                    2
                  )}
                  {renderInfoSection("Duration Information", durationInfo, 2)}

                  <div className="space-y-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                      Project Tasks
                    </h4>
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <div className="flex items-center flex-1 min-w-0">
                              {task.status === "completed" ? (
                                <FiCheckCircle className="text-green-500 mr-3 w-4 h-4" />
                              ) : task.status === "in_progress" ? (
                                <FiClock className="text-blue-500 mr-3 w-4 h-4" />
                              ) : (
                                <FiAlertCircle className="text-yellow-500 mr-3 w-4 h-4" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                  {task.title}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end">
                              <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-3">
                                <div
                                  className="h-full bg-blue-500"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {task.progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "status" && (
                <div className="space-y-8">
                  {renderInfoSection("Status Information", statusInfo, 2)}

                  <div className="space-y-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                      Current Status
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Work Status
                        </p>
                        <div className="flex items-center">
                          <FiActivity className="text-blue-500 mr-2" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {currentShip.workDoneStatus || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Billing Status
                        </p>
                        <div className="flex items-center">
                          <FiFileText className="text-green-500 mr-2" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {currentShip.billStatus || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-6">
                      Documents & Approvals
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        {
                          name: "Engineering Drawings",
                          type: "PDF",
                          size: "2.4 MB",
                          status: "approved",
                        },
                        {
                          name: "Class Approval Certificate",
                          type: "PDF",
                          size: "1.1 MB",
                          status: "approved",
                        },
                        {
                          name: "Safety Plan",
                          type: "DOC",
                          size: "3.2 MB",
                          status: "pending",
                        },
                        {
                          name: "Inspection Reports",
                          type: "PDF",
                          size: "4.7 MB",
                          status: "approved",
                        },
                        {
                          name: "Quality Control Documents",
                          type: "XLS",
                          size: "2.8 MB",
                          status: "in_review",
                        },
                        {
                          name: "Final Survey Report",
                          type: "PDF",
                          size: "5.3 MB",
                          status: "pending",
                        },
                      ].map((doc, index) => (
                        <div
                          key={index}
                          className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                {doc.name}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                {doc.type} • {doc.size}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                doc.status === "approved"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : doc.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              }`}
                            >
                              {doc.status}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="flex-1 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                              Download
                            </button>
                            <button className="flex-1 py-2 text-xs btn-primary">
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShipDetailsPage;
