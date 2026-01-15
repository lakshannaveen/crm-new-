// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// //import { getProjectDetails } from '../../actions/projectActions';
// import Header from '../../components/common/Header';
// import Sidebar from '../../components/common/Sidebar';
// import {
//   FiArrowLeft, FiCalendar, FiUsers, FiDollarSign, FiFileText,
//   FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp, FiBarChart2,
//   FiDownload, FiShare2, FiMessageSquare, FiSettings
// } from 'react-icons/fi';
// import { formatDate, formatCurrency } from '../../utils/formatters';
// import { getStatusColor, getStatusText } from '../../utils/helpers';

// const ProjectManagement = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { currentProject, loading } = useSelector(state => state.projects);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');

//   // useEffect(() => {
//   //   if (id) {
//   //     dispatch(getProjectDetails(id));
//   //   }
//   // }, [dispatch, id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   // Mock project data if API is not ready
//   const project = currentProject || {
//     id: id,
//     name: 'MV Ocean Queen - Major Repair',
//     description: 'Complete hull repair and engine overhaul with system upgrades',
//     status: 'on_track',
//     progress: 75,
//     startDate: '2024-01-10',
//     deadline: '2024-03-15',
//     budget: '2500000',
//     spent: '1875000',
//     coordinator: 'Raj Patel',
//     teamLeader: 'Anil Kumar',
//     teamSize: 45,
//     tasks: {
//       total: 20,
//       completed: 15,
//       open: 5
//     },
//     documents: [
//       { name: 'Engineering Drawings', type: 'pdf', size: '2.4 MB' },
//       { name: 'Class Approval', type: 'pdf', size: '1.1 MB' },
//       { name: 'Safety Plan', type: 'doc', size: '3.2 MB' },
//     ]
//   };

//   const statusColor = getStatusColor(project.status);
//   const statusText = getStatusText(project.status);

//   const milestones = [
//     { title: 'Project Kickoff', date: '2024-01-10', status: 'completed', progress: 100 },
//     { title: 'Hull Assessment', date: '2024-01-25', status: 'completed', progress: 100 },
//     { title: 'Engine Dismantling', date: '2024-02-10', status: 'completed', progress: 100 },
//     { title: 'Hull Repair', date: '2024-02-25', status: 'in_progress', progress: 85 },
//     { title: 'Engine Reassembly', date: '2024-03-05', status: 'pending', progress: 30 },
//     { title: 'System Testing', date: '2024-03-10', status: 'pending', progress: 0 },
//     { title: 'Final Inspection', date: '2024-03-12', status: 'pending', progress: 0 },
//     { title: 'Project Completion', date: '2024-03-15', status: 'pending', progress: 0 },
//   ];

//   const teamMembers = [
//     { name: 'Raj Patel', role: 'Project Coordinator', department: 'Management', avatar: 'RP' },
//     { name: 'Anil Kumar', role: 'Team Leader', department: 'Engineering', avatar: 'AK' },
//     { name: 'Maria Silva', role: 'Safety Officer', department: 'Safety', avatar: 'MS' },
//     { name: 'David Chen', role: 'Quality Inspector', department: 'QC', avatar: 'DC' },
//     { name: 'Sarah Johnson', role: 'Electrical Engineer', department: 'Engineering', avatar: 'SJ' },
//     { name: 'Michael Brown', role: 'Mechanical Engineer', department: 'Engineering', avatar: 'MB' },
//   ];

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
//             {/* Back Button & Breadcrumb */}
//             <div className="mb-6 flex items-center justify-between">
//               <div className="flex items-center">
//                 <Link to="/dashboard" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
//                   <FiArrowLeft className="mr-2" />
//                   Back to Dashboard
//                 </Link>
//                 <span className="mx-3 text-gray-400">/</span>
//                 <span className="text-gray-900 dark:text-white font-medium">Project Details</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
//                   {statusText}
//                 </span>
//                 <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <FiShare2 className="text-gray-400" />
//                 </button>
//               </div>
//             </div>

//             {/* Project Header */}
//             <div className="card mb-6">
//               <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
//                 <div className="mb-6 lg:mb-0 lg:mr-8">
//                   <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                     {project.name}
//                   </h1>
//                   <p className="text-gray-600 dark:text-gray-400 mb-4">
//                     {project.description}
//                   </p>
//                   <div className="flex flex-wrap gap-4">
//                     <div className="flex items-center">
//                       <FiCalendar className="text-gray-400 mr-2" />
//                       <span className="text-sm text-gray-600 dark:text-gray-400">Start: </span>
//                       <span className="ml-1 font-medium text-gray-900 dark:text-white">
//                         {formatDate(project.startDate, 'short')}
//                       </span>
//                     </div>
//                     <div className="flex items-center">
//                       <FiClock className="text-gray-400 mr-2" />
//                       <span className="text-sm text-gray-600 dark:text-gray-400">Deadline: </span>
//                       <span className="ml-1 font-medium text-gray-900 dark:text-white">
//                         {formatDate(project.deadline, 'short')}
//                       </span>
//                     </div>
//                     <div className="flex items-center">
//                       <FiUsers className="text-gray-400 mr-2" />
//                       <span className="text-sm text-gray-600 dark:text-gray-400">Team: </span>
//                       <span className="ml-1 font-medium text-gray-900 dark:text-white">
//                         {project.teamSize} members
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Progress & Budget */}
//                 <div className="lg:w-1/3">
//                   <div className="space-y-4">
//                     <div>
//                       <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
//                         <span>Project Progress</span>
//                         <span className="font-medium">{project.progress}%</span>
//                       </div>
//                       <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                         <div className="h-full bg-blue-500" style={{ width: `${project.progress}%` }} />
//                       </div>
//                       <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-500">
//                         <span>{project.tasks.completed} of {project.tasks.total} tasks completed</span>
//                         <span>{project.tasks.open} tasks remaining</span>
//                       </div>
//                     </div>

//                     <div>
//                       <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
//                         <span>Budget Utilization</span>
//                         <span className="font-medium">
//                           {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
//                         </span>
//                       </div>
//                       <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                         <div
//                           className={`h-full ${project.spent / project.budget > 0.9 ? 'bg-red-500' : 'bg-green-500'}`}
//                           style={{ width: `${(project.spent / project.budget) * 100}%` }}
//                         />
//                       </div>
//                       <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-500">
//                         <span>Spent: {formatCurrency(project.spent)}</span>
//                         <span>Remaining: {formatCurrency(project.budget - project.spent)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="mb-6">
//               <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
//                 {['overview', 'milestones', 'team', 'documents', 'communications', 'settings'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 -mb-px transition-colors ${
//                       activeTab === tab
//                         ? 'border-blue-500 text-blue-600 dark:text-blue-400'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
//                     }`}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Tab Content */}
//             <div className="card">
//               {activeTab === 'overview' && (
//                 <div className="space-y-8">
//                   {/* Key Metrics */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Metrics</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                       <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
//                         <div className="flex items-center mb-2">
//                           <FiCheckCircle className="text-blue-500 mr-3" />
//                           <div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</p>
//                             <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                               {project.tasks.completed}
//                             </p>
//                           </div>
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-500">Out of {project.tasks.total} total tasks</p>
//                       </div>
//                       <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
//                         <div className="flex items-center mb-2">
//                           <FiTrendingUp className="text-green-500 mr-3" />
//                           <div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">Progress Rate</p>
//                             <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                               {Math.round(project.progress / ((new Date(project.deadline) - new Date(project.startDate)) / (1000 * 60 * 60 * 24)) * 100)}%
//                             </p>
//                           </div>
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-500">Average daily progress</p>
//                       </div>
//                       <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
//                         <div className="flex items-center mb-2">
//                           <FiUsers className="text-purple-500 mr-3" />
//                           <div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">Team Utilization</p>
//                             <p className="text-2xl font-bold text-gray-900 dark:text-white">92%</p>
//                           </div>
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-500">{project.teamSize} active team members</p>
//                       </div>
//                       <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
//                         <div className="flex items-center mb-2">
//                           <FiAlertCircle className="text-yellow-500 mr-3" />
//                           <div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">Risk Level</p>
//                             <p className="text-2xl font-bold text-gray-900 dark:text-white">Low</p>
//                           </div>
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-500">2 minor risks identified</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Project Leads */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Leadership</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                         <div className="flex items-center mb-4">
//                           <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
//                             <span className="text-blue-600 dark:text-blue-300 font-medium">
//                               {project.coordinator.split(' ').map(n => n[0]).join('')}
//                             </span>
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-900 dark:text-white">{project.coordinator}</p>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">Project Coordinator</p>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center text-sm">
//                             <FiCalendar className="text-gray-400 mr-2" />
//                             <span className="text-gray-600 dark:text-gray-400">Overall project supervision</span>
//                           </div>
//                           <div className="flex items-center text-sm">
//                             <FiMessageSquare className="text-gray-400 mr-2" />
//                             <span className="text-gray-600 dark:text-gray-400">Primary point of contact</span>
//                           </div>
//                           <div className="flex items-center text-sm">
//                             <FiBarChart2 className="text-gray-400 mr-2" />
//                             <span className="text-gray-600 dark:text-gray-400">Progress reporting</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                         <div className="flex items-center mb-4">
//                           <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
//                             <span className="text-green-600 dark:text-green-300 font-medium">
//                               {project.teamLeader.split(' ').map(n => n[0]).join('')}
//                             </span>
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-900 dark:text-white">{project.teamLeader}</p>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">Team Leader</p>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center text-sm">
//                             <FiSettings className="text-gray-400 mr-2" />
//                             <span className="text-gray-600 dark:text-gray-400">Technical supervision</span>
//                           </div>
//                           <div className="flex items-center text-sm">
//                             <FiUsers className="text-gray-400 mr-2" />
//                             <span className="text-gray-600 dark:text-gray-400">Team management</span>
//                           </div>
//                           <div className="flex items-center text-sm">
//                             <FiCheckCircle className="text-gray-400 mr-2" />
//                             <span className="text-gray-600 dark:text-gray-400">Quality assurance</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Updates */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Updates</h3>
//                     <div className="space-y-3">
//                       {[
//                         { update: 'Hull repair phase completed ahead of schedule', time: '2 hours ago', user: 'Anil Kumar' },
//                         { update: 'New safety equipment installed and tested', time: '1 day ago', user: 'Maria Silva' },
//                         { update: 'Engine parts received from supplier', time: '2 days ago', user: 'David Chen' },
//                         { update: 'Weekly progress meeting conducted', time: '3 days ago', user: 'Raj Patel' },
//                       ].map((update, index) => (
//                         <div key={index} className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
//                           <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 mt-1">
//                             <FiMessageSquare className="text-blue-600 dark:text-blue-300" />
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-sm text-gray-900 dark:text-white">{update.update}</p>
//                             <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
//                               <span>{update.time}</span>
//                               <span className="mx-2">•</span>
//                               <span>By {update.user}</span>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'milestones' && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Project Milestones</h3>
//                   <div className="space-y-4">
//                     {milestones.map((milestone, index) => (
//                       <div key={index} className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                         <div className="mr-4">
//                           <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
//                             milestone.status === 'completed' ? 'bg-green-100 dark:bg-green-900' :
//                             milestone.status === 'in_progress' ? 'bg-blue-100 dark:bg-blue-900' :
//                             'bg-gray-100 dark:bg-gray-700'
//                           }`}>
//                             {milestone.status === 'completed' ? (
//                               <FiCheckCircle className={`text-green-600 dark:text-green-300`} />
//                             ) : milestone.status === 'in_progress' ? (
//                               <FiClock className={`text-blue-600 dark:text-blue-300`} />
//                             ) : (
//                               <FiCalendar className={`text-gray-600 dark:text-gray-300`} />
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex justify-between items-center mb-2">
//                             <p className="font-medium text-gray-900 dark:text-white">{milestone.title}</p>
//                             <span className="text-sm text-gray-600 dark:text-gray-400">
//                               {formatDate(milestone.date, 'short')}
//                             </span>
//                           </div>
//                           <div className="flex items-center">
//                             <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
//                               <div className={`h-full ${
//                                 milestone.status === 'completed' ? 'bg-green-500' :
//                                 milestone.status === 'in_progress' ? 'bg-blue-500' :
//                                 'bg-gray-400'
//                               }`} style={{ width: `${milestone.progress}%` }} />
//                             </div>
//                             <span className={`text-sm font-medium ${
//                               milestone.status === 'completed' ? 'text-green-600 dark:text-green-400' :
//                               milestone.status === 'in_progress' ? 'text-blue-600 dark:text-blue-400' :
//                               'text-gray-600 dark:text-gray-400'
//                             }`}>
//                               {milestone.progress}%
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'team' && (
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Team</h3>
//                     <div className="text-sm text-gray-600 dark:text-gray-400">
//                       {teamMembers.length} team members
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {teamMembers.map((member, index) => (
//                       <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                         <div className="flex items-start mb-4">
//                           <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
//                             <span className="text-blue-600 dark:text-blue-300 font-medium">
//                               {member.avatar}
//                             </span>
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
//                             <p className="text-xs text-gray-500 dark:text-gray-500">{member.department} Department</p>
//                           </div>
//                         </div>
//                         <div className="space-y-2">
//                           <div className="flex items-center text-sm">
//                             <FiUsers className="text-gray-400 mr-2" />
//                             <span className="text-gray-600 dark:text-gray-400">Assigned to 5 tasks</span>
//                           </div>
//                           <div className="flex items-center text-sm">
//                             <FiCheckCircle className="text-gray-400 mr-2" />
//                             <span className="text-gray-600 dark:text-gray-400">85% completion rate</span>
//                           </div>
//                         </div>
//                         <div className="flex space-x-2 mt-4">
//                           <button className="flex-1 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
//                             Message
//                           </button>
//                           <button className="flex-1 py-2 text-sm btn-primary">
//                             Profile
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'documents' && (
//                 <div>
//                   <div className="flex justify-between items-center mb-6">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Documents</h3>
//                     <button className="btn-primary flex items-center text-sm">
//                       <FiDownload className="mr-2" />
//                       Download All
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {project.documents.map((doc, index) => (
//                       <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">
//                               {doc.type.toUpperCase()} • {doc.size}
//                             </p>
//                           </div>
//                           <FiFileText className="text-gray-400" />
//                         </div>
//                         <div className="flex space-x-2">
//                           <button className="flex-1 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
//                             Preview
//                           </button>
//                           <button className="flex-1 py-2 text-sm btn-primary">
//                             Download
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'communications' && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Project Communications</h3>
//                   <div className="space-y-6">
//                     <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                       <h4 className="font-medium text-gray-900 dark:text-white mb-3">Meeting Schedule</h4>
//                       <div className="space-y-2">
//                         {[
//                           { title: 'Weekly Progress Meeting', time: 'Every Monday, 10:00 AM', attendees: 'All team leads' },
//                           { title: 'Safety Review', time: 'Every Wednesday, 2:00 PM', attendees: 'Safety team' },
//                           { title: 'Client Update', time: 'Every Friday, 11:00 AM', attendees: 'Project Coordinator + Client' },
//                         ].map((meeting, index) => (
//                           <div key={index} className="flex items-center p-3 hover:bg-white dark:hover:bg-gray-600 rounded">
//                             <FiCalendar className="text-gray-400 mr-3" />
//                             <div className="flex-1">
//                               <p className="font-medium text-gray-900 dark:text-white">{meeting.title}</p>
//                               <p className="text-sm text-gray-600 dark:text-gray-400">{meeting.time}</p>
//                             </div>
//                             <span className="text-sm text-gray-500 dark:text-gray-400">{meeting.attendees}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                       <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Message</h4>
//                       <textarea
//                         className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Type your message to the project team..."
//                       />
//                       <div className="flex justify-between items-center mt-3">
//                         <div className="flex space-x-2">
//                           <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
//                             <FiFileText className="text-gray-400" />
//                           </button>
//                           <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
//                             <FiDownload className="text-gray-400" />
//                           </button>
//                         </div>
//                         <button className="btn-primary px-6 py-2">
//                           Send Message
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'settings' && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Project Settings</h3>
//                   <div className="space-y-6">
//                     <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                       <h4 className="font-medium text-gray-900 dark:text-white mb-4">General Settings</h4>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                             Project Name
//                           </label>
//                           <input
//                             type="text"
//                             defaultValue={project.name}
//                             className="input-field"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                             Project Description
//                           </label>
//                           <textarea
//                             defaultValue={project.description}
//                             className="input-field h-32"
//                           />
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                               Start Date
//                             </label>
//                             <input
//                               type="date"
//                               defaultValue={project.startDate}
//                               className="input-field"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                               Deadline
//                             </label>
//                             <input
//                               type="date"
//                               defaultValue={project.deadline}
//                               className="input-field"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                       <h4 className="font-medium text-gray-900 dark:text-white mb-4">Notification Settings</h4>
//                       <div className="space-y-3">
//                         {[
//                           { label: 'Progress updates', enabled: true },
//                           { label: 'Milestone completion', enabled: true },
//                           { label: 'Budget alerts', enabled: true },
//                           { label: 'Team messages', enabled: false },
//                           { label: 'Document uploads', enabled: true },
//                         ].map((setting, index) => (
//                           <div key={index} className="flex items-center justify-between">
//                             <span className="text-gray-700 dark:text-gray-300">{setting.label}</span>
//                             <label className="relative inline-flex items-center cursor-pointer">
//                               <input type="checkbox" className="sr-only peer" defaultChecked={setting.enabled} />
//                               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="flex justify-end space-x-3">
//                       <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
//                         Cancel
//                       </button>
//                       <button className="px-6 py-2 btn-primary">
//                         Save Changes
//                       </button>
//                     </div>
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

// export default ProjectManagement;

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import { getShips } from "../../actions/shipActions";
import {
  FiArrowLeft,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiTrendingUp,
  FiBarChart2,
  FiDownload,
  FiMessageSquare,
  FiSettings,
  FiMenu,
  FiX,
  FiChevronRight,
  FiFlag,
  FiHome,
  FiDatabase,
} from "react-icons/fi";
import { formatDate, formatCurrency } from "../../utils/formatters";
import { getStatusColor, getStatusText } from "../../utils/helpers";

const ProjectManagement = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProject, loading, milestones, milestonesLoading } =
    useSelector((state) => state.projects);
  const { ships } = useSelector((state) => state.ships);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("milestones");
  const [isScrollUp, setIsScrollUp] = useState(false);
  const [resolvedProjectName, setResolvedProjectName] = useState("");
  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.pageYOffset : 0
  );

  // Fetch ships when component mounts to get ship names from API
  useEffect(() => {
    dispatch(getShips());
  }, [dispatch]);

  // Toggle translucent header when scrolling up
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const currentY = window.pageYOffset || 0;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isUp = currentY < lastScrollY.current;
          setIsScrollUp(isUp && currentY > 20);
          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get ship name from ships array by matching ID, or use project name
  const getShipNameFromAPI = () => {
    // Try to find matching ship from the ships array (loaded from API with SHIP_VESSEL_NAME)
    if (ships && ships.length > 0) {
      const matchingShip = ships.find((ship) => {
        const shipId = ship?.id;
        const shipJmain =
          ship?.jmainNo || ship?.raw?.SHIP_JMAIN || ship?.raw?.SHIP_JOB_NO;
        return (
          String(shipId) === String(id) || String(shipJmain) === String(id)
        );
      });
      if (matchingShip && matchingShip.name) {
        return matchingShip.name;
      }
    }
    // Use currentProject name if available
    if (currentProject?.name) {
      return currentProject.name;
    }
    // If no match found, return empty string and it will be populated once ships load
    return "";
  };

  const projectName = getShipNameFromAPI();

  useEffect(() => {
    if (projectName) {
      setResolvedProjectName(projectName);
    }
  }, [projectName]);

  const project = currentProject || {
    id: id,
    name: projectName || resolvedProjectName,
    // description:
    //   "Complete hull repair and engine overhaul with system upgrades",
    status: "on_track",
    progress: 75,
    startDate: "2024-01-10",
    deadline: "2024-03-15",
    budget: "2500000",
    spent: "1875000",
    coordinator: "Raj Patel",
    teamLeader: "Anil Kumar",
    teamSize: 45,
    tasks: {
      total: 20,
      completed: 15,
      open: 5,
    },
    documents: [
      { name: "Engineering Drawings", type: "pdf", size: "2.4 MB" },
      { name: "Class Approval", type: "pdf", size: "1.1 MB" },
      { name: "Safety Plan", type: "doc", size: "3.2 MB" },
    ],
  };

  const statusColor = getStatusColor(project.status);
  const statusText = getStatusText(project.status);

  // Use milestones from Redux
  const displayMilestones = milestones;

  const teamMembers = [
    {
      name: "Raj Patel",
      role: "Project Coordinator",
      department: "Management",
      avatar: "RP",
    },
    {
      name: "Anil Kumar",
      role: "Team Leader",
      department: "Engineering",
      avatar: "AK",
    },
    {
      name: "Maria Silva",
      role: "Safety Officer",
      department: "Safety",
      avatar: "MS",
    },
    {
      name: "David Chen",
      role: "Quality Inspector",
      department: "QC",
      avatar: "DC",
    },
    {
      name: "Sarah Johnson",
      role: "Electrical Engineer",
      department: "Engineering",
      avatar: "SJ",
    },
    {
      name: "Michael Brown",
      role: "Mechanical Engineer",
      department: "Engineering",
      avatar: "MB",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center justify-between p-4 relative">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[70%] text-center">
            {project.name}
          </h1>
          {/* removed mobile 'More' button per request */}
        </div>
        <div className="px-4 pb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
          >
            {statusText}
          </span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl flex flex-col h-full overflow-hidden z-50">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Menu
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {/* Navigation Items for Mobile */}
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <FiHome className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </Link>
              {/* <Link 
                to="/vessels" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <FiDatabase className="w-5 h-5 mr-3" />
                <span>Vessels</span>
              </Link> */}
              <Link
                to="/feedback"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <FiMessageSquare className="w-5 h-5 mr-3" />
                <span>Feedback</span>
              </Link>
              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                <FiSettings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>
      )}

      <div className="flex pt-16 md:pt-0">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 w-full">
          {/* Desktop Header */}
          <div className="hidden md:block">
            <Header />
          </div>

          <main className="p-4 sm:p-6 lg:p-8 mt-0 md:mt-0">
            {/* Back Button & Breadcrumb */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm sm:text-base"
                >
                  <FiArrowLeft className="mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Back</span>
                </Link>
                <FiChevronRight className="mx-2 sm:mx-3 text-gray-400 flex-shrink-0" />
                <span className="text-gray-900 dark:text-white font-medium truncate">
                  Project Milestones
                </span>
              </div>
              <div className="hidden sm:flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
                >
                  {statusText}
                </span>
                {/* Share button removed per request */}
              </div>
            </div>

            {/* Project Header */}
            <div
              className={`card mb-6 sticky top-16 z-40 transition-colors ${
                isScrollUp
                  ? "bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-transparent"
                  : "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="mb-6 lg:mb-0 lg:mr-8">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <div className="flex items-center text-sm">
                      <FiCalendar className="text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Start:{" "}
                      </span>
                      <span className="ml-1 font-medium text-gray-900 dark:text-white truncate">
                        {formatDate(project.startDate, "short")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiClock className="text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Deadline:{" "}
                      </span>
                      <span className="ml-1 font-medium text-gray-900 dark:text-white truncate">
                        {formatDate(project.deadline, "short")}
                      </span>
                    </div>
                    {/* <div className="flex items-center text-sm">
                      <FiUsers className="text-gray-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Team:{" "}
                      </span>
                      <span className="ml-1 font-medium text-gray-900 dark:text-white">
                        {project.teamSize} members
                      </span>
                    </div> */}
                  </div>
                </div>

                {/* Progress & Budget */}
                {/* <div className="w-full lg:w-1/3">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Project Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-500">
                        <span>
                          {project.tasks.completed} of {project.tasks.total}{" "}
                          tasks
                        </span>
                        <span>{project.tasks.open} remaining</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Budget Utilization</span>
                        <span className="font-medium">
                          {formatCurrency(project.spent)} /{" "}
                          {formatCurrency(project.budget)}
                        </span>
                      </div>
                      <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            project.spent / project.budget > 0.9
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${(project.spent / project.budget) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-500">
                        <span>Spent: {formatCurrency(project.spent)}</span>
                        <span>
                          Left: {formatCurrency(project.budget - project.spent)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Tabs - Mobile Scrollable */}
            <div className="mb-6">
              <div className="flex space-x-0 sm:space-x-4 border-b border-gray-200 dark:border-gray-700">
                {[
                  "milestones" /*'team', 'documents', 'communications', 'settings'*/,
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 sm:px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 -mb-px transition-colors flex-shrink-0 ${
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

            {/* Tab Content */}
            <div className="card">
              {activeTab === "milestones" && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Project Milestones
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Track the progress and completion of key project phases
                    </p>
                  </div>

                  {milestonesLoading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400 mb-4"></div>
                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                        Loading milestones...
                      </span>
                    </div>
                  ) : displayMilestones.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <FiCalendar className="h-14 w-14 text-gray-300 dark:text-gray-600 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        No milestones yet
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        Milestones will appear here once added
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {displayMilestones.map((milestone, index) => {
                        const isCompleted = milestone.status === "completed";
                        const isInProgress = milestone.status === "in_progress";
                        const isPending = milestone.status === "pending";
                        const isLast = index === displayMilestones.length - 1;

                        return (
                          <div
                            key={milestone.id || index}
                            className="group relative"
                          >
                            {/* Timeline connector */}
                            {!isLast && (
                              <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800" />
                            )}

                            {/* Milestone card */}
                            <div className="relative flex gap-4 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600">
                              {/* Status indicator */}
                              <div className="relative flex-shrink-0">
                                <div
                                  className={`h-12 w-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                                    isCompleted
                                      ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
                                      : isInProgress
                                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                  }`}
                                >
                                  {isCompleted ? (
                                    <FiCheckCircle className="h-6 w-6" />
                                  ) : isInProgress ? (
                                    <FiClock className="h-6 w-6 animate-pulse" />
                                  ) : (
                                    <span className="text-sm">{index + 1}</span>
                                  )}
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {milestone.title}
                                  </h4>
                                  {/* <div className="flex items-center gap-2">
                                    <span
                                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                                        isCompleted
                                          ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
                                          : isInProgress
                                          ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400"
                                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400"
                                      }`}
                                    >
                                      <span
                                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                          isCompleted
                                            ? "bg-green-600"
                                            : isInProgress
                                            ? "bg-blue-600 animate-pulse"
                                            : "bg-gray-400"
                                        }`}
                                      />
                                      {isCompleted
                                        ? "Completed"
                                        : isInProgress
                                        ? "In Progress"
                                        : "Pending"}
                                    </span>
                                  </div> */}
                                </div>

                                {/* Info grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                  <div className="flex items-center gap-2.5">
                                    <FiCalendar className="h-4 w-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                    <div className="min-w-0">
                                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-tight font-medium">
                                        Date
                                      </p>
                                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {formatDate(milestone.date, "short")}
                                      </p>
                                    </div>
                                  </div>

                                  {milestone.location && (
                                    <div className="flex items-center gap-2.5">
                                      <FiFlag className="h-4 w-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                      <div className="min-w-0">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-tight font-medium">
                                          Location
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                          {milestone.location}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Progress bar */}
                                {(isInProgress || milestone.progress > 0) && (
                                  <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-tight">
                                        Progress
                                      </span>
                                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                                        {milestone.progress}%
                                      </span>
                                    </div>
                                    <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full transition-all duration-500 ${
                                          isCompleted
                                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                            : isInProgress
                                            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                            : "bg-gradient-to-r from-gray-400 to-gray-300"
                                        }`}
                                        style={{
                                          width: `${milestone.progress}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* Remarks section */}
                                {milestone.remarks && (
                                  <div className="mt-3 p-3.5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg">
                                    <div className="flex items-start gap-2.5">
                                      <FiMessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                      <div className="min-w-0">
                                        <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-tight mb-1">
                                          Notes
                                        </p>
                                        <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                                          {milestone.remarks}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "team" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Project Team
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {teamMembers.length} team members
                    </div>
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-start mb-4">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                            <span className="text-blue-600 dark:text-blue-300 font-medium text-sm sm:text-base">
                              {member.avatar}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                              {member.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {member.role}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                              {member.department} Department
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <FiUsers className="text-gray-400 mr-2 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400 truncate">
                              Assigned to 5 tasks
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <FiCheckCircle className="text-gray-400 mr-2 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400 truncate">
                              85% completion rate
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 truncate">
                            Message
                          </button>
                          <button className="flex-1 py-2 text-xs sm:text-sm btn-primary truncate">
                            Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Project Documents
                    </h3>
                    <button className="btn-primary flex items-center justify-center text-sm py-2 px-4 w-full sm:w-auto">
                      <FiDownload className="mr-2" />
                      Download All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="min-w-0 mr-3">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                              {doc.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {doc.type.toUpperCase()} • {doc.size}
                            </p>
                          </div>
                          <FiFileText className="text-gray-400 flex-shrink-0" />
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 truncate">
                            Preview
                          </button>
                          <button className="flex-1 py-2 text-xs sm:text-sm btn-primary truncate">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
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

export default ProjectManagement;
