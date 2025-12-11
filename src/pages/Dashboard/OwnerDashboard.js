// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getShips } from '../../actions/shipActions';
// import Header from '../../components/common/Header';
// import Sidebar from '../../components/common/Sidebar';
// import ProfileSection from '../../components/dashboard/ProfileSection';
// import ShipCard from '../../components/dashboard/ShipCard';
// import { FiAnchor, FiClock, FiCheckCircle, FiAlertCircle, FiPlus } from 'react-icons/fi';

// const OwnerDashboard = () => {
//   const dispatch = useDispatch();
//   const { ships, loading } = useSelector(state => state.ships);
//   const { user } = useSelector(state => state.auth);
  
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('all');

//   useEffect(() => {
//     dispatch(getShips());
//   }, [dispatch]);

//   const filteredShips = ships.filter(ship => {
//     if (activeFilter === 'all') return true;
//     if (activeFilter === 'active') return ship.status === 'under_repair' || ship.status === 'in_dock';
//     if (activeFilter === 'planned') return ship.status === 'planned';
//     return true;
//   });

//   const stats = {
//     total: ships.length,
//     active: ships.filter(s => s.status === 'under_repair' || s.status === 'in_dock').length,
//     completed: ships.filter(s => s.progress === 100).length,
//     delayed: ships.filter(s => s.progress < 50 && new Date(s.endDate) < new Date()).length,
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setMobileMenuOpen(true)}
//         className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white 
//                  dark:bg-gray-800 shadow-lg"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                 d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Mobile Sidebar Overlay */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 z-40">
//           <div className="absolute inset-0 bg-black bg-opacity-50" 
//                onClick={() => setMobileMenuOpen(false)} />
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
//             {/* Welcome Banner */}
//             <div className="mb-8">
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
//                 Welcome back, {user?.name}!
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-2">
//                 Here's an overview of your vessels and projects at Colombo Dockyard
//               </p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//               <div className="card">
//                 <div className="flex items-center">
//                   <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
//                     <FiAnchor className="w-6 h-6 text-blue-600 dark:text-blue-300" /> {/* Changed from FiShip */}
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Total Ships</p>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                       {stats.total}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="flex items-center">
//                   <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
//                     <FiClock className="w-6 h-6 text-green-600 dark:text-green-300" />
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                       {stats.active}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="flex items-center">
//                   <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
//                     <FiCheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-300" />
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                       {stats.completed}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="flex items-center">
//                   <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
//                     <FiAlertCircle className="w-6 h-6 text-red-600 dark:text-red-300" />
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Delayed</p>
//                     <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                       {stats.delayed}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Profile Section */}
//             <div className="mb-8">
//               <ProfileSection />
//             </div>

//             {/* Ships Section */}
//             <div className="card">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
//                             mb-6 gap-4">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                     My Ships
//                   </h2>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Manage and monitor all your vessels
//                   </p>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     onClick={() => setActiveFilter('all')}
//                     className={`px-4 py-2 rounded-lg transition-colors ${
//                       activeFilter === 'all'
//                         ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
//                         : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     All Ships
//                   </button>
//                   <button
//                     onClick={() => setActiveFilter('active')}
//                     className={`px-4 py-2 rounded-lg transition-colors ${
//                       activeFilter === 'active'
//                         ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
//                         : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     Active
//                   </button>
//                   <button
//                     onClick={() => setActiveFilter('planned')}
//                     className={`px-4 py-2 rounded-lg transition-colors ${
//                       activeFilter === 'planned'
//                         ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
//                         : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     Planned
//                   </button>
//                   {/* <button className="px-4 py-2 btn-primary flex items-center">
//                     <FiPlus className="mr-2" />
//                     Add New Ship
//                   </button> */}
//                 </div>
//               </div>

//               {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 
//                                 border-blue-600"></div>
//                 </div>
//               ) : filteredShips.length > 0 ? (
//                 <div className="space-y-6">
//                   {filteredShips.map((ship) => (
//                     <ShipCard key={ship.id} ship={ship} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 
//                                 rounded-full mb-4">
//                     <FiAnchor className="w-12 h-12 text-gray-400" /> {/* Changed from FiShip */}
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                     No ships found
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400 mb-6">
//                     {activeFilter === 'all' 
//                       ? "You don't have any ships registered yet."
//                       : `No ships match the "${activeFilter}" filter.`}
//                   </p>
//                   <button className="px-6 py-3 btn-primary flex items-center mx-auto">
//                     <FiPlus className="mr-2" />
//                     Register Your First Ship
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Quick Actions */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//               <div className="card">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                   Quick Actions
//                 </h3>
//                 <div className="space-y-3">
//                   <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 
//                                    dark:hover:bg-gray-700 transition-colors">
//                     View Maintenance Schedule
//                   </button>
//                   <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 
//                                    dark:hover:bg-gray-700 transition-colors">
//                     Download Reports
//                   </button>
//                   <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 
//                                    dark:hover:bg-gray-700 transition-colors">
//                     Contact Dockyard
//                   </button>
//                 </div>
//               </div>
//               <div className="card md:col-span-2">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                   Recent Activities
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 
//                                 rounded-lg">
//                     <div className="h-10 w-10 bg-blue-100 dark:bg-blue-800 rounded-full 
//                                   flex items-center justify-center mr-3">
//                       <FiCheckCircle className="text-blue-600 dark:text-blue-300" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-900 dark:text-white">
//                         MV Ocean Queen repair progress updated to 75%
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         2 hours ago
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 
//                                 rounded-lg">
//                     <div className="h-10 w-10 bg-gray-100 dark:bg-gray-600 rounded-full 
//                                   flex items-center justify-center mr-3">
//                       <FiAlertCircle className="text-gray-600 dark:text-gray-300" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-900 dark:text-white">
//                         MV Sea Voyager survey due in 30 days
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         Yesterday
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboard;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShips } from '../../actions/shipActions';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import ProfileSection from '../../components/dashboard/ProfileSection';
import ShipCard from '../../components/dashboard/ShipCard';
import StatsCard from '../../components/dashboard/StatsCard';
import { FiAnchor, FiClock, FiCheckCircle, FiAlertCircle, FiPlus } from 'react-icons/fi';

const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const { ships, loading } = useSelector(state => state.ships);
  const { user } = useSelector(state => state.auth);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    dispatch(getShips());
  }, [dispatch]);

  const filteredShips = ships.filter(ship => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return ship.status === 'under_repair' || ship.status === 'in_dock';
    if (activeFilter === 'planned') return ship.status === 'planned';
    return true;
  });

  const stats = {
    total: ships.length,
    active: ships.filter(s => s.status === 'under_repair' || s.status === 'in_dock').length,
    completed: ships.filter(s => s.progress === 100).length,
    delayed: ships.filter(s => s.progress < 50 && new Date(s.endDate) < new Date()).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white 
                 dark:bg-gray-800 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black bg-opacity-50" 
               onClick={() => setMobileMenuOpen(false)} />
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
            {/* Welcome Banner */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, <br></br>{user?.name}!
              </h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 md:mt-2">
                Here's an overview of your vessels and projects at Colombo Dockyard
              </p>
            </div>

            {/* Stats Cards - Updated for mobile responsiveness */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 md:p-4">
                <div className="flex items-center">
                  <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                    <FiAnchor className="w-4 h-4 md:w-6 md:h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total Ships</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.total}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 md:p-4">
                <div className="flex items-center">
                  <div className="p-2 md:p-3 bg-green-100 dark:bg-green-900 rounded-lg flex-shrink-0">
                    <FiClock className="w-4 h-4 md:w-6 md:h-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.active}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 md:p-4">
                <div className="flex items-center">
                  <div className="p-2 md:p-3 bg-purple-100 dark:bg-purple-900 rounded-lg flex-shrink-0">
                    <FiCheckCircle className="w-4 h-4 md:w-6 md:h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Completed</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.completed}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 md:p-4">
                <div className="flex items-center">
                  <div className="p-2 md:p-3 bg-red-100 dark:bg-red-900 rounded-lg flex-shrink-0">
                    <FiAlertCircle className="w-4 h-4 md:w-6 md:h-6 text-red-600 dark:text-red-300" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Delayed</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.delayed}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Section */}
            <div className="mb-6 md:mb-8">
              <ProfileSection />
            </div>

            {/* Ships Section */}
            <div className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
                            mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    My Ships
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage and monitor all your vessels
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors text-sm ${
                      activeFilter === 'all'
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    All Ships
                  </button>
                  <button
                    onClick={() => setActiveFilter('active')}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors text-sm ${
                      activeFilter === 'active'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setActiveFilter('planned')}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors text-sm ${
                      activeFilter === 'planned'
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Planned
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 
                                border-blue-600"></div>
                </div>
              ) : filteredShips.length > 0 ? (
                <div className="space-y-6">
                  {filteredShips.map((ship) => (
                    <ShipCard key={ship.id} ship={ship} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 
                                rounded-full mb-4">
                    <FiAnchor className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No ships found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {activeFilter === 'all' 
                      ? "You don't have any ships registered yet."
                      : `No ships match the "${activeFilter}" filter.`}
                  </p>
                  <button className="px-6 py-3 btn-primary flex items-center mx-auto">
                    <FiPlus className="mr-2" />
                    Register Your First Ship
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 
                                   dark:hover:bg-gray-700 transition-colors">
                    View Maintenance Schedule
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 
                                   dark:hover:bg-gray-700 transition-colors">
                    Download Reports
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 
                                   dark:hover:bg-gray-700 transition-colors">
                    Contact Dockyard
                  </button>
                </div>
              </div>
              <div className="card md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activities
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 
                                rounded-lg">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-800 rounded-full 
                                  flex items-center justify-center mr-3">
                      <FiCheckCircle className="text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        MV Ocean Queen repair progress updated to 75%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 
                                rounded-lg">
                    <div className="h-10 w-10 bg-gray-100 dark:bg-gray-600 rounded-full 
                                  flex items-center justify-center mr-3">
                      <FiAlertCircle className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        MV Sea Voyager survey due in 30 days
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Yesterday
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;