import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { toggleTheme, setTheme } from '../../actions/themeActions';
import {
  FiMoon, FiSun, FiBell, FiLock, FiGlobe,
  FiDatabase, FiUsers, FiShield, FiSave,
  FiRefreshCw, FiTrash2, FiDownload
} from 'react-icons/fi';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector(state => state.theme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      language: 'English',
      timezone: 'Asia/Colombo (GMT+5:30)',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24-hour',
      itemsPerPage: 25,
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
      frequency: 'immediate',
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginNotifications: true,
      ipWhitelist: [],
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      retentionPeriod: 90,
      auditLogs: true,
    },
  });

  const handleSettingChange = (category, subcategory, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category][subcategory],
          [key]: value,
        },
      },
    }));
  };

  const handleSaveSettings = () => {
    // In real app, save to API
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default
      setSettings({
        general: {
          language: 'English',
          timezone: 'Asia/Colombo (GMT+5:30)',
          dateFormat: 'DD/MM/YYYY',
          timeFormat: '24-hour',
          itemsPerPage: 25,
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
          frequency: 'immediate',
        },
        security: {
          twoFactorAuth: false,
          sessionTimeout: 30,
          loginNotifications: true,
          ipWhitelist: [],
        },
        system: {
          autoBackup: true,
          backupFrequency: 'daily',
          backupTime: '02:00',
          retentionPeriod: 90,
          auditLogs: true,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
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
                System Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Configure system preferences and application settings
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Column - Settings Navigation */}
              <div className="lg:col-span-1">
                <div className="card sticky top-8">
                  <nav className="space-y-1">
                    {[
                      { id: 'general', label: 'General', icon: FiGlobe },
                      { id: 'appearance', label: 'Appearance', icon: mode === 'dark' ? FiMoon : FiSun },
                      { id: 'notifications', label: 'Notifications', icon: FiBell },
                      { id: 'security', label: 'Security', icon: FiShield },
                      { id: 'system', label: 'System', icon: FiDatabase },
                      { id: 'users', label: 'User Management', icon: FiUsers },
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

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <button
                      onClick={handleSaveSettings}
                      className="w-full btn-primary flex items-center justify-center"
                    >
                      <FiSave className="mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleResetSettings}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg 
                               py-2 flex items-center justify-center hover:bg-gray-50 
                               dark:hover:bg-gray-700"
                    >
                      <FiRefreshCw className="mr-2" />
                      Reset to Default
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Settings Content */}
              <div className="lg:col-span-3">
                <div className="card">
                  {/* Tab Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                        {activeTab.replace('_', ' ')} Settings
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {activeTab === 'general' && 'Configure general application settings'}
                        {activeTab === 'appearance' && 'Customize the look and feel of the application'}
                        {activeTab === 'notifications' && 'Manage notification preferences'}
                        {activeTab === 'security' && 'Configure security and privacy settings'}
                        {activeTab === 'system' && 'System configuration and maintenance'}
                        {activeTab === 'users' && 'Manage user access and permissions'}
                      </p>
                    </div>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Language
                          </label>
                          <select
                            value={settings.general.language}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              general: { ...prev.general, language: e.target.value }
                            }))}
                            className="input-field"
                          >
                            <option value="English">English</option>
                            <option value="Sinhala">Sinhala</option>
                            <option value="Tamil">Tamil</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Timezone
                          </label>
                          <select
                            value={settings.general.timezone}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              general: { ...prev.general, timezone: e.target.value }
                            }))}
                            className="input-field"
                          >
                            <option value="Asia/Colombo (GMT+5:30)">Asia/Colombo (GMT+5:30)</option>
                            <option value="UTC (GMT+0)">UTC (GMT+0)</option>
                            <option value="Asia/Dubai (GMT+4)">Asia/Dubai (GMT+4)</option>
                            <option value="Asia/Singapore (GMT+8)">Asia/Singapore (GMT+8)</option>
                            <option value="Europe/London (GMT+0)">Europe/London (GMT+0)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date Format
                          </label>
                          <select
                            value={settings.general.dateFormat}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              general: { ...prev.general, dateFormat: e.target.value }
                            }))}
                            className="input-field"
                          >
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Time Format
                          </label>
                          <select
                            value={settings.general.timeFormat}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              general: { ...prev.general, timeFormat: e.target.value }
                            }))}
                            className="input-field"
                          >
                            <option value="24-hour">24-hour</option>
                            <option value="12-hour">12-hour</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Items Per Page
                          </label>
                          <select
                            value={settings.general.itemsPerPage}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              general: { ...prev.general, itemsPerPage: e.target.value }
                            }))}
                            className="input-field"
                          >
                            <option value="10">10 items</option>
                            <option value="25">25 items</option>
                            <option value="50">50 items</option>
                            <option value="100">100 items</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <div className="flex items-center">
                          <FiGlobe className="text-blue-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Regional Settings
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              These settings affect how dates, times, and numbers are displayed throughout the application.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'appearance' && (
                    <div className="space-y-6">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Theme</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <button
                            onClick={() => dispatch(setTheme('light'))}
                            className={`p-4 border rounded-lg text-left transition-all ${
                              mode === 'light'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            <div className="flex items-center mb-3">
                              <FiSun className={`mr-3 ${mode === 'light' ? 'text-blue-500' : 'text-gray-400'}`} />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Light Theme</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Clean and bright interface</p>
                              </div>
                            </div>
                            <div className="h-20 bg-gradient-to-br from-gray-100 to-white rounded"></div>
                          </button>
                          <button
                            onClick={() => dispatch(setTheme('dark'))}
                            className={`p-4 border rounded-lg text-left transition-all ${
                              mode === 'dark'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            <div className="flex items-center mb-3">
                              <FiMoon className={`mr-3 ${mode === 'dark' ? 'text-blue-500' : 'text-gray-400'}`} />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Dark Theme</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Easier on the eyes in low light</p>
                              </div>
                            </div>
                            <div className="h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded"></div>
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Interface Preferences</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Compact Mode</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Show more content in less space</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Animations</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Enable interface animations</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">High Contrast</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Increase contrast for better visibility</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h4>
                        <div className="space-y-4">
                          {Object.entries(settings.notifications.email).map(([key, value]) => (
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
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={value}
                                  onChange={(e) => handleSettingChange('notifications', 'email', key, e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Push Notifications</h4>
                        <div className="space-y-4">
                          {Object.entries(settings.notifications.push).map(([key, value]) => (
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
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={value}
                                  onChange={(e) => handleSettingChange('notifications', 'push', key, e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Notification Frequency
                        </label>
                        <select
                          value={settings.notifications.frequency}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, frequency: e.target.value }
                          }))}
                          className="input-field"
                        >
                          <option value="immediate">Immediate</option>
                          <option value="hourly">Hourly Digest</option>
                          <option value="daily">Daily Digest</option>
                          <option value="weekly">Weekly Digest</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={settings.security.twoFactorAuth}
                              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <select
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="input-field"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                          <option value="0">Never (not recommended)</option>
                        </select>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Automatically log out after period of inactivity
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Login Notifications</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Get notified when someone logs into your account from a new device
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={settings.security.loginNotifications}
                              onChange={(e) => handleSettingChange('security', 'loginNotifications', e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'system' && (
                    <div className="space-y-6">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Automatic Backups</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Automatically backup system data
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={settings.system.autoBackup}
                              onChange={(e) => handleSettingChange('system', 'autoBackup', e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Backup Frequency
                            </label>
                            <select
                              value={settings.system.backupFrequency}
                              onChange={(e) => handleSettingChange('system', 'backupFrequency', e.target.value)}
                              className="input-field"
                              disabled={!settings.system.autoBackup}
                            >
                              <option value="hourly">Hourly</option>
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Backup Time
                            </label>
                            <input
                              type="time"
                              value={settings.system.backupTime}
                              onChange={(e) => handleSettingChange('system', 'backupTime', e.target.value)}
                              className="input-field"
                              disabled={!settings.system.autoBackup}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Data Retention Period (days)
                        </label>
                        <select
                          value={settings.system.retentionPeriod}
                          onChange={(e) => handleSettingChange('system', 'retentionPeriod', parseInt(e.target.value))}
                          className="input-field"
                        >
                          <option value="30">30 days</option>
                          <option value="90">90 days</option>
                          <option value="180">180 days</option>
                          <option value="365">1 year</option>
                          <option value="730">2 years</option>
                        </select>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          How long to keep backup data before automatic deletion
                        </p>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Audit Logs</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Record all system activities and user actions
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={settings.system.auditLogs}
                              onChange={(e) => handleSettingChange('system', 'auditLogs', e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">System Maintenance</h4>
                        <div className="space-y-4">
                          <button className="w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center">
                            <FiDownload className="mr-2" />
                            Download System Logs
                          </button>
                          <button className="w-full py-3 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center justify-center">
                            <FiTrash2 className="mr-2" />
                            Clear Cache & Temporary Files
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'users' && (
                    <div className="space-y-6">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">User Roles & Permissions</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Default User Role
                            </label>
                            <select className="input-field">
                              <option value="viewer">Viewer</option>
                              <option value="editor">Editor</option>
                              <option value="admin">Administrator</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Allow User Registration</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Allow new users to register accounts
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Require Admin Approval</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                New users require admin approval
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Access Control</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">IP Restriction</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Restrict access to specific IP addresses
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Time-Based Access</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Restrict access to specific time periods
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
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

export default SettingsPage;