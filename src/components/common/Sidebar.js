// No-op Sidebar component: keep imports valid but render nothing
import React from 'react';

const Sidebar = () => null;

<<<<<<< HEAD
export default Sidebar;
=======
const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  
  // Use sidebar context
  const { 
    mobileOpen, 
    desktopCollapsed,
    closeMobileSidebar,
    toggleDesktopSidebar 
  } = useSidebar();

  // Rename this function to avoid conflict with NavLink's isActive prop
  const checkActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <FiHome className="w-5 h-5" />,
      allowedRoles: ['owner', 'admin'],
    },
    // {
    //   title: 'Tenders',
    //   path: '/tenders',
    //   icon: <FiCalendar className="w-5 h-5" />,
    //   allowedRoles: ['owner', 'admin'],
    // },
    {
      title: 'Vessels',
      path: '/vessels',
      icon: <FiDatabase className="w-5 h-5" />,
      allowedRoles: ['admin'],
    },
    {
      title: 'Companies',
      path: '/companies',
      icon: <FiUsers className="w-5 h-5" />,
      allowedRoles: ['admin'],
    },
    {
      title: 'Feedback',
      path: '/feedback',
      icon: <FiMessageSquare className="w-5 h-5" />,
      allowedRoles: ['owner'],
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <FiSettings className="w-5 h-5" />,
      allowedRoles: ['owner', 'admin'],
    },
  ];

  const filteredNavItems = navItems.filter(item =>
    item.allowedRoles.includes(user?.role || 'owner')
  );

  const handleNavClick = () => {
    // Close mobile sidebar when a nav item is clicked
    closeMobileSidebar();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block ${desktopCollapsed ? 'w-16' : 'w-64'}`}>
        <aside className={`
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transition-all duration-300 ease-in-out
          ${desktopCollapsed ? 'w-16' : 'w-64'}
          flex flex-col
          h-screen
          fixed left-0 top-0 z-30
        `}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!desktopCollapsed && (
              <div className="flex items-center">
                {/* {sidebarLogo ? (
                  <img 
                    src={sidebarLogo} 
                    alt="Dockyard CRM" 
                    className="h-8 w-auto mr-2"
                  />
                ) : (
                  <FiAnchor className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-2" />
                )} */}
               
              </div>
            )}
            
            {/* Desktop Collapse/Expand Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDesktopSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                         transition-colors group relative"
                aria-label={desktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={desktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {desktopCollapsed ? (
                  <FiMaximize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <FiMinimize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
                {/* Tooltip for collapsed state */}
                {desktopCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 
                                bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 
                                transition-opacity whitespace-nowrap pointer-events-none">
                    Expand
                  </div>
                )}
              </button>
              
              {/* Alternative Chevron Button */}
              <button
                onClick={toggleDesktopSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                         transition-colors"
                aria-label={desktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {desktopCollapsed ? (
                  <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive: navLinkIsActive }) => `
                  flex items-center px-3 py-3 text-sm font-medium rounded-lg
                  transition-colors duration-200 group
                  ${navLinkIsActive || checkActivePath(item.path)
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                  ${desktopCollapsed ? 'justify-center' : ''}
                `}
                title={desktopCollapsed ? item.title : ''}
              >
                <span className={desktopCollapsed ? '' : 'mr-3'}>{item.icon}</span>
                {!desktopCollapsed && <span>{item.title}</span>}
                
                {/* Tooltip for collapsed nav items */}
                {desktopCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white 
                                text-xs rounded opacity-0 group-hover:opacity-100 
                                transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {item.title}
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User Profile (only when expanded) */}
          {!desktopCollapsed && user && (
            <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 
                              flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-medium">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.role === 'admin' ? 'Administrator' : 'Ship Owner'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Minimized User Profile */}
          {desktopCollapsed && user && (
            <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 
                            flex items-center justify-center group relative">
                <span className="text-blue-600 dark:text-blue-300 font-medium">
                  {user.name?.charAt(0) || 'U'}
                </span>
                
                {/* Tooltip for minimized user profile */}
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 
                              bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 
                              transition-opacity whitespace-nowrap pointer-events-none z-50">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-gray-300 text-xs">
                    {user.role === 'admin' ? 'Administrator' : 'Ship Owner'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={closeMobileSidebar}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
            <aside className="h-full flex flex-col">
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  {sidebarLogo ? (
                    <img 
                      src={sidebarLogo} 
                      alt="Dockyard CRM" 
                      className="h-8 w-auto mr-2"
                    />
                  ) : (
                    <FiAnchor className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-2" />
                  )}
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Dockyard CRM
                  </span>
                </div>
                
                {/* Mobile Close Button */}
                <button
                  onClick={closeMobileSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                           transition-colors"
                  aria-label="Close menu"
                >
                  <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                {filteredNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    className={({ isActive: navLinkIsActive }) => `
                      flex items-center px-3 py-3 text-sm font-medium rounded-lg
                      transition-colors duration-200
                      ${navLinkIsActive || checkActivePath(item.path)
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Mobile User Profile */}
              {user && (
                <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 
                                  flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-300 font-medium">
                        {user.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.role === 'admin' ? 'Administrator' : 'Ship Owner'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
>>>>>>> feedback-form-
