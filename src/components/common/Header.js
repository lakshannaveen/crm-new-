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




import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiSun, FiMoon, FiUser, FiLogOut, FiMenu, FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { toggleTheme } from '../../actions/themeActions';
import { logout } from '../../actions/authActions';
import { generateAvatar } from '../../utils/helpers';
import { useSidebar } from '../../context/SidebarContext';

// Import your logo image
import logo from '../../assets/image/logo512.png'; // Make sure to add your logo file

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { mode } = useSelector(state => state.theme);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use sidebar context
  const { mobileOpen, toggleMobileSidebar, desktopCollapsed, toggleDesktopSidebar } = useSidebar();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const avatar = generateAvatar(user?.name || 'User');

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Brand & Mobile Menu */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
              aria-label="Open menu"
            >
              <FiMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            
            {/* Desktop Minimize/Expand Button */}
            <button
              onClick={toggleDesktopSidebar}
              className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
              aria-label={desktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={desktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {desktopCollapsed ? (
                <FiMaximize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <FiMinimize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center">
              {logo ? (
                <img 
                  src={logo} 
                  alt="Colombo Dockyard" 
                  className="h-8 w-auto"
                />
              ) : (
                <div className="h-8 w-8 bg-dockyard-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CD</span>
                </div>
              )}
              <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
                Colombo Dockyard
              </span>
            </Link>
          </div>

          {/* Center - Search (hidden on mobile) */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ships, projects, or documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Search button for mobile */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiSearch className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {mode === 'light' ? (
                <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <FiSun className="w-5 h-5 text-gray-300" />
              )}
            </button>

            {/* Notifications */}
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors"
              aria-label="Notifications"
            >
              <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100
                         dark:hover:bg-gray-700 transition-colors"
              >
                <div className={`h-8 w-8 rounded-full ${avatar.color} flex items-center justify-center`}>
                  <span className="text-white font-medium text-sm">{avatar.initials}</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role === 'admin' ? 'Administrator' : 'Ship Owner'}
                  </p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg
                             shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700
                             dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <FiUser className="mr-3" />
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700
                             dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <FiSun className="mr-3" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600
                             dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiLogOut className="mr-3" />
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







// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiSearch, FiBell, FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi';
// import { toggleTheme } from '../../actions/themeActions';
// import { logout } from '../../actions/authActions';
// import { generateAvatar } from '../../utils/helpers';

// const Header = ({ onMenuClick }) => {
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
//     console.log('Searching for:', searchQuery);
//   };

//   const avatar = generateAvatar(user?.name || 'User');

//   return (
//     <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Left side - Logo/Brand & Mobile Menu */}
//           <div className="flex items-center">
//             {/* Mobile Menu Button */}
//             <button
//               onClick={onMenuClick}
//               className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
//               aria-label="Open menu"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
            
//             {/* Logo */}
//             <Link to="/dashboard" className="flex items-center">
//               <div className="h-8 w-8 bg-dockyard-blue rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">CD</span>
//               </div>
//               <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
//                 Colombo Dockyard
//               </span>
//             </Link>
//           </div>

//           {/* Center - Search (hidden on mobile) */}
//           <div className="flex-1 max-w-2xl mx-4 hidden md:block">
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
//             {/* Search button for mobile */}
//             <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
//               <FiSearch className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//             </button>

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
//                              shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
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