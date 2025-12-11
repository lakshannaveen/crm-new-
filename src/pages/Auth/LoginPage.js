import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { FiArrowLeft } from 'react-icons/fi';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 
                   dark:from-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 
                      dark:bg-blue-900 rounded-full mix-blend-multiply 
                      filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 
                      dark:bg-purple-900 rounded-full mix-blend-multiply 
                      filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center text-gray-900 dark:text-white"
            >
              <div className="h-10 w-10 bg-dockyard-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CD</span>
              </div>
              <span className="ml-3 text-xl font-semibold hidden sm:inline">
                Colombo Dockyard
              </span>
            </Link>
            <Link
              to="/"
              className="flex items-center text-gray-600 dark:text-gray-400 
                       hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg">
            {/* Card Container */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg 
                          rounded-2xl shadow-2xl p-8">
              <LoginForm />
            </div>

            {/* Demo Credentials
            <div className="mt-8 text-center">
              <div className="inline-block bg-white/80 dark:bg-gray-800/80 
                            backdrop-blur-lg rounded-xl p-4 shadow-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Demo Credentials:</strong>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Phone: +919899090909 • OTP: 123456
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Admin: +94123456789 • OTP: 123456
                </p>
              </div>
            </div> */}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-4 py-6 text-center text-sm text-gray-600 
                         dark:text-gray-400">
          <p>© {new Date().getFullYear()} Colombo Dockyard PLC. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white">
              Contact Us
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;