import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { FiArrowLeft } from 'react-icons/fi';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 
                   dark:from-gray-900 dark:to-blue-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 
                      dark:bg-purple-800 rounded-full mix-blend-multiply 
                      filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 
                      dark:bg-blue-800 rounded-full mix-blend-multiply 
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
              to="/login"
              className="flex items-center text-gray-600 dark:text-gray-400 
                       hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Login
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
          <div className="w-full max-w-lg">
            {/* Card Container */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg 
                          rounded-2xl shadow-2xl p-5 sm:p-8">
              <RegisterForm />
            </div>

            {/* Information Box */}
            <div className="mt-8 text-center">
              <div className="inline-block bg-white/80 dark:bg-gray-800/80 
                            backdrop-blur-lg rounded-xl p-4 shadow-lg max-w-md">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Note:</strong> Registration requests require admin approval.
                  You will be able to access the system once your request is approved.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  For immediate access during demo, use the demo credentials on login page.
                </p>
              </div>
            </div>
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

export default RegisterPage;