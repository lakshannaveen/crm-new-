import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">

      {/* Background Blobs - Same as login page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-300/30 dark:bg-blue-900/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-300/20 dark:bg-purple-900/30 rounded-full blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col">

        {/* Main - Same container as login page */}
        <main className="flex flex-1 items-center justify-center px-4 py-10">
          <div className="w-full max-w-md rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <RegisterForm />
          </div>
        </main>

        {/* Footer - Same as login page */}
        <footer className="px-6 py-6 text-center text-xs text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Colombo Dockyard PLC. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white">
              Privacy
            </Link>
            <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default RegisterPage;