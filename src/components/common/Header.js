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
import { shipService } from "../../services/shipService";
import { LOAD_USER_SUCCESS } from "../../constants/authActionTypes";

// Import your logo image
import logo from "../../assets/image/logo512.png"; // Make sure to add your logo file

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const fileInputRef = useRef(null);

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
      },
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const avatar = generateAvatar(user?.name || "User");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let active = true;
    const loadServerProfile = async () => {
      const serviceNo = user?.serviceNo || localStorage.getItem("serviceNo");
      if (!serviceNo) return;
      // if we already have a preview (from cache or user), skip background fetch
      const cached = (user && user.profilePic) || localStorage.getItem('profilePicData');
      if (cached) return;
      setLoadingProfile(true);
      const start = Date.now();
      console.debug('[Header] background loadServerProfile start', { serviceNo });
      try {
        const result = await shipService.getProfilePicPreviewBlob(serviceNo);
        if (!active) return;
        const elapsed = Date.now() - start;
        if (result && result.blob) {
          console.debug('[Header] background loadServerProfile got blob', { serviceNo, elapsed, size: result.blob.size });
          const reader = new FileReader();
          reader.onload = () => {
            if (!active) return;
            const dataUrl = reader.result;
            try {
              localStorage.setItem('profilePicData', dataUrl);
            } catch (e) {
              console.warn('Failed to store profilePicData in localStorage', e);
            }
            setProfilePreview(dataUrl);
          };
          reader.onerror = (e) => console.warn('FileReader error', e);
          reader.readAsDataURL(result.blob);
        } else {
          console.debug('[Header] background loadServerProfile no image returned', { serviceNo, elapsed });
        }
      } catch (err) {
        const elapsed = Date.now() - start;
        console.warn('[Header] background loadServerProfile failed', { serviceNo, elapsed, err: err?.message || err });
      } finally {
        setLoadingProfile(false);
      }
    };

    // run once on mount or when user changes
    loadServerProfile();

    return () => {
      active = false;
    };
  }, [user]);

  // Use cached data URL from localStorage or user object on mount for immediate display
  useEffect(() => {
    const cached = (user && user.profilePic) || localStorage.getItem('profilePicData');
    if (cached) setProfilePreview(cached);
  }, [user]);
  

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

            {/* Profile Button with upload */}
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="relative">
                {profilePreview || user?.profilePic ? (
                  <div className="relative">
                    <img
                      src={profilePreview || user.profilePic}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    {loadingProfile && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full text-white text-xs">...</span>
                    )}
                  </div>
                ) : (
                  <div
                    className={`h-8 w-8 rounded-full ${avatar.color} flex items-center justify-center`}>
                    <span className="text-white font-medium text-sm">
                      {avatar.initials}
                    </span>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (!file) return;
                    // set selected file and preview only; upload on submit
                    setSelectedFile(file);
                    try {
                      const url = URL.createObjectURL(file);
                      setSelectedPreviewUrl(url);
                    } catch (err) {
                      setSelectedPreviewUrl(null);
                    }
                  }}
                />
              </div>
              <div className="hidden md:block text-left relative">
                <div
                  onClick={() => setShowProfileMenu((s) => !s)}
                  className="cursor-pointer"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role === "admin" ? "Administrator" : "Employee"}
                  </p>
                </div>

                {showProfileMenu && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div
                      className="relative w-11/12 max-w-md bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-col items-center">
                        <div className="mb-3">
                          {selectedPreviewUrl || profilePreview || user?.profilePic ? (
                            <img
                              src={selectedPreviewUrl || profilePreview || user.profilePic}
                              alt="Preview"
                              className="h-28 w-28 rounded-full object-cover"
                            />
                          ) : (
                            <div className={`h-28 w-28 rounded-full ${avatar.color} flex items-center justify-center`}>
                              <span className="text-white text-2xl font-medium">{avatar.initials}</span>
                            </div>
                          )}
                        </div>

                        <div className="w-full text-center mb-3">
                          <button
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                          >
                            Choose file
                          </button>
                        </div>

                        {selectedFile && (
                          <div className="w-full mb-3 text-center text-sm text-gray-700 dark:text-gray-300">
                            <div className="truncate">{selectedFile.name}</div>
                          </div>
                        )}

                        <div className="w-full flex gap-3">
                          <button
                            onClick={async () => {
                              if (!selectedFile) {
                                toast.error('Please choose an image first');
                                return;
                              }
                              try {
                                setUploading(true);
                                const tId = toast.loading('Uploading profile image...');
                                const resp = await shipService.uploadProfilePic(
                                  user?.serviceNo || user?.id || null,
                                  selectedFile
                                );
                                toast.dismiss(tId);
                                toast.success('Profile image uploaded successfully');

                                const url =
                                  (resp && (resp.url || resp.profilePic || resp.fileUrl || resp.FilePath)) ||
                                  null;
                                const objectUrl = url || selectedPreviewUrl || URL.createObjectURL(selectedFile);
                                setProfilePreview(objectUrl);

                                const updatedUser = { ...(user || {}), profilePic: objectUrl };
                                try {
                                  localStorage.setItem('user', JSON.stringify(updatedUser));
                                  dispatch({ type: LOAD_USER_SUCCESS, payload: updatedUser });
                                } catch (err) {
                                  // ignore
                                }

                                setSelectedFile(null);
                                if (selectedPreviewUrl) {
                                  try { URL.revokeObjectURL(selectedPreviewUrl); } catch(e){}
                                  setSelectedPreviewUrl(null);
                                }
                                setShowProfileMenu(false);
                              } catch (err) {
                                toast.error(err?.message || 'Failed to upload image');
                              } finally {
                                setUploading(false);
                              }
                            }}
                            disabled={uploading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-60"
                          >
                            {uploading ? 'Uploading...' : 'Upload'}
                          </button>

                          <button
                            onClick={() => {
                              if (selectedPreviewUrl) {
                                try { URL.revokeObjectURL(selectedPreviewUrl); } catch(e){}
                              }
                              setSelectedFile(null);
                              setSelectedPreviewUrl(null);
                              setShowProfileMenu(false);
                            }}
                            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
