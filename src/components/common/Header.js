import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { toggleTheme } from '../../actions/themeActions';
import { logout } from '../../actions/authActions';
import { generateAvatar } from '../../utils/helpers';
import logo from '../../assets/image/logo512.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const avatar = generateAvatar(user?.name || 'User');

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/feedback" className="flex items-center">
            <img src={logo} alt="Colombo Dockyard" className="h-8 w-auto" />
            <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
              Colombo Dockyard
            </span>
          </Link>

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

            {/* Profile */}
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
