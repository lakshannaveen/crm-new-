import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">

      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-300/30 dark:bg-blue-900/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-300/20 dark:bg-purple-900/30 rounded-full blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col">

        {/* Main */}
        <main className="flex flex-1 items-center justify-center px-4 py-10">
          <LoginForm />
        </main>

        {/* Footer */}
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

export default LoginPage;
