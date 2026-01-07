<<<<<<< HEAD
import React, { useState } from 'react';
=======
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiSearch, FiBell, FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi';
// import { toggleTheme } from '../../actions/themeActions';
// import { logout } from '../../actions/authActions';
// import { generateAvatar } from '../../utils/helpers';

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector(state => state.auth);
//   const { mode } = useSelector(state => state.theme);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Implement search functionality
//     console.log('Searching for:', searchQuery);
//   };

//   const avatar = generateAvatar(user?.name || 'User');

//   return (
//     <header className="bg-white dark:bg-gray-800 shadow-sm">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Left side - Logo/Brand */}
//           <div className="flex items-center">
//             <Link to="/dashboard" className="flex items-center">
//               <div className="h-8 w-8 bg-dockyard-blue rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">CD</span>
//               </div>
//               <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
//                 Colombo Dockyard
//               </span>
//             </Link>
//           </div>

//           {/* Center - Search */}
//           <div className="flex-1 max-w-2xl mx-4">
//             <form onSubmit={handleSearch} className="relative">
//               <div className="relative">
//                 <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search ships, projects, or documents..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
//                            bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 
//                            focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </form>
//           </div>

//           {/* Right side - Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Theme Toggle */}
//             <button
//               onClick={() => dispatch(toggleTheme())}
//               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               aria-label="Toggle theme"
//             >
//               {mode === 'light' ? (
//                 <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//               ) : (
//                 <FiSun className="w-5 h-5 text-gray-300" />
//               )}
//             </button>

//             {/* Notifications */}
//             <button
//               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors"
//               aria-label="Notifications"
//             >
//               <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//               <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//             </button>

//             {/* Profile Menu */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowProfileMenu(!showProfileMenu)}
//                 className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 
//                          dark:hover:bg-gray-700 transition-colors"
//               >
//                 <div className={`h-8 w-8 rounded-full ${avatar.color} flex items-center justify-center`}>
//                   <span className="text-white font-medium text-sm">{avatar.initials}</span>
//                 </div>
//                 <div className="hidden md:block text-left">
//                   <p className="text-sm font-medium text-gray-900 dark:text-white">
//                     {user?.name || 'User'}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     {user?.role === 'admin' ? 'Administrator' : 'Ship Owner'}
//                   </p>
//                 </div>
//               </button>

//               {/* Profile Dropdown */}
//               {showProfileMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg 
//                               shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
//                   <Link
//                     to="/profile"
//                     className="flex items-center px-4 py-2 text-sm text-gray-700 
//                              dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     onClick={() => setShowProfileMenu(false)}
//                   >
//                     <FiUser className="mr-3" />
//                     Your Profile
//                   </Link>
//                   <Link
//                     to="/settings"
//                     className="flex items-center px-4 py-2 text-sm text-gray-700 
//                              dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                     onClick={() => setShowProfileMenu(false)}
//                   >
//                     <FiSun className="mr-3" />
//                     Settings
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center w-full px-4 py-2 text-sm text-red-600 
//                              dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   >
//                     <FiLogOut className="mr-3" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;




import React, { useState, useEffect, useRef } from 'react';
>>>>>>> feedback-form-
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { toggleTheme } from '../../actions/themeActions';
import { logout } from '../../actions/authActions';
import { generateAvatar } from '../../utils/helpers';
<<<<<<< HEAD
import logo from '../../assets/image/logo512.png';
=======
import { useSidebar } from '../../context/SidebarContext';
import { getShips } from '../../actions/shipActions';
import { setSelectedShipJmain } from '../../actions/shipActions';
import { getMilestonesByShip } from '../../actions/projectActions';

// Import your logo image
import logo from '../../assets/image/logo512.png'; // Make sure to add your logo file
>>>>>>> feedback-form-

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const [open, setOpen] = useState(false);
=======
  const { user } = useSelector(state => state.auth);
  const { mode } = useSelector(state => state.theme);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  
  // Use sidebar context
  const { mobileOpen, toggleMobileSidebar, desktopCollapsed, toggleDesktopSidebar } = useSidebar();
>>>>>>> feedback-form-

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

<<<<<<< HEAD
=======
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  // load ships for search (if not already loaded)
  const shipsState = useSelector((state) => state.ships);
  const shipsList = shipsState?.ships || [];

  useEffect(() => {
    if (!shipsList || shipsList.length === 0) {
      dispatch(getShips()).catch(() => {});
    }
    // close dropdown on outside click
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []); // run once

  const filteredShips = searchQuery
    ? shipsList.filter((s) => {
        const q = searchQuery.toString().toLowerCase();
        return (
          (s.name || '').toString().toLowerCase().includes(q) ||
          (s.imoNumber || '').toString().toLowerCase().includes(q) ||
          (s.jmainNo || '').toString().toLowerCase().includes(q)
        );
      })
    : [];

>>>>>>> feedback-form-
  const avatar = generateAvatar(user?.name || 'User');

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

<<<<<<< HEAD
          {/* Logo */}
          <Link to="/feedback" className="flex items-center">
            <img src={logo} alt="Colombo Dockyard" className="h-8 w-auto" />
            <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
              Colombo Dockyard
            </span>
          </Link>
=======
          {/* Center - Search (hidden on mobile) */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block" ref={inputRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ships, projects, or documents..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
                  onFocus={() => setShowResults(true)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:border-transparent"
                />

                {/* Dropdown results */}
                {showResults && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-72 overflow-auto">
                    {filteredShips.length > 0 ? (
                      filteredShips.map((ship) => (
                        <Link
                          key={ship.id}
                          to={`/projects/${ship.id}`}
                          className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b last:border-b-0"
                          onClick={() => {
                            setShowResults(false);
                            setSearchQuery('');
                            const jobCategory = ship.raw?.SHIP_JCAT || ship.SHIP_JCAT || ship.JCAT || ship.jcat;
                            const jmain = ship.raw?.SHIP_JMAIN || ship.jmainNo || ship.SHIP_JMAIN || ship.id;
                            if (jmain) dispatch(setSelectedShipJmain(jmain));
                            if (jobCategory && jmain) dispatch(getMilestonesByShip(jobCategory, jmain));
                          }}
                        >
                          <img src={ship.image} alt={ship.name} className="h-12 w-16 object-cover rounded mr-3" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{ship.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{ship.imoNumber} • {ship.type}</p>
                          </div>
                          <div className="ml-3 text-sm text-gray-600 dark:text-gray-300">{ship.progress ?? 0}%</div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-gray-500">No ships found</div>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
>>>>>>> feedback-form-

          {/* Right Actions */}
          <div className="flex items-center space-x-4">

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {mode === 'light' ? (
                <FiMoon className="w-5 h-5 text-gray-600" />
              ) : (
                <FiSun className="w-5 h-5 text-gray-300" />
              )}
            </button>

<<<<<<< HEAD
            {/* Profile */}
=======
            {/* Notifications
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors"
              aria-label="Notifications"
            >
              <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button> */}

            {/* Profile Menu */}
>>>>>>> feedback-form-
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className={`h-9 w-9 rounded-full ${avatar.color} flex items-center justify-center`}>
                  <span className="text-white text-sm font-medium">
                    {avatar.initials}
                  </span>
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {user?.name || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
