import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiSun,
  FiMoon,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { toggleTheme } from "../../actions/themeActions";
import { logout } from "../../actions/authActions";
import { generateAvatar } from "../../utils/helpers";
import toast from "react-hot-toast";
import { useSidebar } from "../../context/SidebarContext";
import { getShips } from "../../actions/shipActions";
import { setSelectedShipJmain } from "../../actions/shipActions";
import { getMilestonesByShip } from "../../actions/projectActions";

// Import your logo image
import logo from "../../assets/image/logo512.png"; // Make sure to add your logo file

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  // Use sidebar context
  const { mobileOpen, toggleMobileSidebar } = useSidebar();

  const handleLogout = () => {
    toast(
      (t) => (
        <div className="flex items-center gap-4">
          <div>Are you sure you want to logout?</div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm"
            >
              Logout
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
        // style overrides to center the toast in the viewport
        style: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "auto",
          minWidth: "320px",
          zIndex: 99999,
        },
      }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const avatar = generateAvatar(user?.name || "User");

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

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center">
              {logo ? (
                <img src={logo} alt="Colombo Dockyard" className="h-8 w-auto" />
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

          {/* Center - Logo Area */}

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {mode === "light" ? (
                <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <FiSun className="w-5 h-5 text-gray-300" />
              )}
            </button>

            {/* Profile Button */}
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div
                className={`h-8 w-8 rounded-full ${avatar.color} flex items-center justify-center`}
              >
                <span className="text-white font-medium text-sm">
                  {avatar.initials}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role === "admin" ? "Administrator" : "Employee"}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Logout"
            >
              <FiLogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;