import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByServiceNo } from '../../actions/userActions';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiGlobe,
  FiCalendar, FiLock, FiBell, FiShield, FiSave,
  FiCamera, FiUpload, FiCheckCircle
} from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';

const ProfilePage = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [serviceNo, setServiceNo] = useState('');
  const { serviceUser, serviceUserLoading, serviceUserError } = useSelector(state => state.user);
    // Handler for fetching user by service number
    const handleFetchServiceUser = () => {
      if (serviceNo) {
        dispatch(getUserByServiceNo(serviceNo));
      }
    };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

 
  const profileData = {
    personal: {
      name: user?.name || 'EVERGREEN MARINE CORP. (TAIWAN) LTD',
      email: user?.email || 'john@oceancargolt.com',
      phone: '+886 033123831',
      position: 'Ship Owner',
      company: 'Ocean Cargo Ltd',
      location: 'LUCHU TAOYUAN COUNTY ,TAIWAN',
      website: 'www.oceancargolt.com',
      joinedDate: '2023-06-15',
      language: 'English',
      timezone: 'Asia/Colombo (GMT+5:30)',
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: '2024-01-15',
      activeSessions: 2,
      loginHistory: [
        { device: 'Chrome on Windows', location: 'Colombo, LK', time: '2024-01-20 14:30' },
        { device: 'Safari on iPhone', location: 'Colombo, LK', time: '2024-01-20 10:15' },
      ],
    },
    notifications: {
      email: {
        projectUpdates: true,
        tenderUpdates: true,
        securityAlerts: true,
        newsletter: false,
      },
      push: {
        newMessages: true,
        deadlineReminders: true,
        systemAlerts: true,
      },
    },
  };

  const [formData, setFormData] = useState(profileData.personal);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to API
    console.log('Saving profile data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      {/* Service Number Fetch UI */}
      <div className="max-w-xl mx-auto mt-6 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Enter Service Number (e.g. O0204)"
          value={serviceNo}
          onChange={e => setServiceNo(e.target.value)}
          className="input-field flex-1 min-w-0"
        />
        <button
          onClick={handleFetchServiceUser}
          className="btn-primary px-4 py-2"
          disabled={!serviceNo || serviceUserLoading}
        >
          {serviceUserLoading ? 'Loading...' : 'Fetch User By Service No'}
        </button>
      </div>
      {/* Show result or error */}
      <div className="max-w-xl mx-auto mb-8">
        {serviceUserError && (
          <div className="p-3 bg-red-100 text-red-700 rounded mb-2">{serviceUserError}</div>
        )}
        {serviceUser && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2 text-blue-900 dark:text-blue-200">Service User Data</h3>
            <pre className="text-xs whitespace-pre-wrap break-all text-gray-800 dark:text-gray-100 bg-transparent">{JSON.stringify(serviceUser, null, 2)}</pre>
          </div>
        )}
      </div>
       
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
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Profile Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Column - Profile Card */}
              <div className="lg:col-span-1">
                <div className="card sticky top-8">
                  {/* Profile Photo */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                                    flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-4xl font-bold">
                          {profileData.personal.name.charAt(0)}
                        </span>
                      </div>
                      <button className="absolute bottom-4 right-4 h-10 w-10 bg-white dark:bg-gray-800 
                                       rounded-full border border-gray-300 dark:border-gray-600 
                                       flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700">
                        <FiCamera className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {profileData.personal.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {profileData.personal.position}
                    </p>
                  </div>
                  
                  {/* Stats */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatDate(profileData.personal.joinedDate, 'short')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Account Status</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 
                                    rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-1">
                    {[
                      { id: 'personal', label: 'Personal Information', icon: FiUser },
                      { id: 'security', label: 'Security', icon: FiShield },
                      { id: 'notifications', label: 'Notifications', icon: FiBell },
                      { id: 'preferences', label: 'Preferences', icon: FiCheckCircle },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        <item.icon className="mr-3" />
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="lg:col-span-3">
                <div className="card">
                  {/* Tab Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                        {activeTab.replace('_', ' ')} Settings
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {activeTab === 'personal' && 'Update your personal information and contact details'}
                        {activeTab === 'security' && 'Manage your account security and privacy settings'}
                        {activeTab === 'notifications' && 'Configure how you receive notifications'}
                        {activeTab === 'preferences' && 'Set your application preferences'}
                      </p>
                    </div>
                    {activeTab === 'personal' && (
                      <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="btn-primary flex items-center"
                      >
                        {isEditing ? (
                          <>
                            <FiSave className="mr-2" />
                            Save Changes
                          </>
                        ) : (
                          'Edit Profile'
                        )}
                      </button>
                    )}
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'personal' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              disabled={!isEditing}
                              className={`input-field pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              disabled={!isEditing}
                              className={`input-field pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              disabled={!isEditing}
                              className={`input-field pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Position
                          </label>
                          <input
                            type="text"
                            value={formData.position}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                            disabled={!isEditing}
                            className={`input-field ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            disabled={!isEditing}
                            className={`input-field ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location
                          </label>
                          <div className="relative">
                            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={formData.location}
                              onChange={(e) => handleInputChange('location', e.target.value)}
                              disabled={!isEditing}
                              className={`input-field pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Website
                          </label>
                          <div className="relative">
                            <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="url"
                              value={formData.website}
                              onChange={(e) => handleInputChange('website', e.target.value)}
                              disabled={!isEditing}
                              className={`input-field pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Language Preference
                          </label>
                          <select
                            value={formData.language}
                            onChange={(e) => handleInputChange('language', e.target.value)}
                            disabled={!isEditing}
                            className={`input-field ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                          >
                            <option value="English">English</option>
                            <option value="Sinhala">Sinhala</option>
                            <option value="Tamil">Tamil</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <div className="flex items-center">
                          <FiCalendar className="text-blue-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Account Created
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(profileData.personal.joinedDate, 'long')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Password</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Current Password
                            </label>
                            <div className="relative">
                              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                type="password"
                                className="input-field pl-10"
                                placeholder="Enter current password"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                type="password"
                                className="input-field pl-10"
                                placeholder="Enter new password"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Confirm New Password
                            </label>
                            <div className="relative">
                              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input
                                type="password"
                                className="input-field pl-10"
                                placeholder="Confirm new password"
                              />
                            </div>
                          </div>
                          <button className="btn-primary">
                            Update Password
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={profileData.security.twoFactorEnabled} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Active Sessions</h4>
                        <div className="space-y-3">
                          {profileData.security.loginHistory.map((session, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{session.device}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{session.location} • {session.time}</p>
                              </div>
                              <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm">
                                Revoke
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h4>
                        <div className="space-y-4">
                          {Object.entries(profileData.notifications.email).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Receive email notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked={value} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Push Notifications</h4>
                        <div className="space-y-4">
                          {Object.entries(profileData.notifications.push).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Receive push notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked={value} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'preferences' && (
                    <div className="space-y-6">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Display Preferences</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Default Dashboard View
                            </label>
                            <select className="input-field">
                              <option value="overview">Overview</option>
                              <option value="ships">My Ships</option>
                              <option value="projects">Projects</option>
                              <option value="tenders">Tenders</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Items Per Page
                            </label>
                            <select className="input-field">
                              <option value="10">10 items</option>
                              <option value="25">25 items</option>
                              <option value="50">50 items</option>
                              <option value="100">100 items</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Compact Mode</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Show more content in less space
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Data Preferences</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Auto-save Changes</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Automatically save form changes
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Show Analytics</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Display analytics and statistics on dashboard
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button className="btn-primary">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;