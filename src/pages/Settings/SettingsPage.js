import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import { setTheme } from '../../actions/themeActions';
import { FiMoon, FiSun, FiSave, FiRefreshCw } from 'react-icons/fi';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector(state => state.theme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSetTheme = (theme) => {
    dispatch(setTheme(theme));
    localStorage.setItem('theme_mode', theme);
  };

  const handleSave = () => {
    alert('Appearance settings saved successfully');
  };

  const handleReset = () => {
    if (window.confirm('Reset theme to default (Light)?')) {
      handleSetTheme('light');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-gray-800 shadow"
      >
        ☰
      </button>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1">
          <Header />

          <main className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Appearance Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Choose your preferred theme
            </p>

            <div className="mt-6 max-w-3xl card p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Theme
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Light */}
                <button
                  onClick={() => handleSetTheme('light')}
                  className={`p-4 border rounded-lg text-left ${
                    mode === 'light'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <FiSun className="mb-2 text-xl text-yellow-500" />
                  <p className="font-semibold">Light Mode</p>
                  <p className="text-sm text-gray-500">
                    Bright and clean UI
                  </p>
                </button>

                {/* Dark */}
                <button
                  onClick={() => handleSetTheme('dark')}
                  className={`p-4 border rounded-lg text-left ${
                    mode === 'dark'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <FiMoon className="mb-2 text-xl text-blue-500" />
                  <p className="font-semibold">Dark Mode</p>
                  <p className="text-sm text-gray-500">
                    Comfortable for night use
                  </p>
                </button>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center"
                >
                  <FiSave className="mr-2" />
                  Save
                </button>

                <button
                  onClick={handleReset}
                  className="border px-4 py-2 rounded flex items-center"
                >
                  <FiRefreshCw className="mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
