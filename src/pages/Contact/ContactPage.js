import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import dockyardLogo from '../../assets/image/logo512.png';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/login" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6"
          >
            <FiArrowLeft className="mr-2" />
            Back to Login
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <img 
              src={dockyardLogo} 
              alt="Colombo Dockyard" 
              className="h-16 w-16 object-contain"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Get in touch with our team. We're here to help!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Have questions about our services or need assistance with the CRM system? Our team is ready to help you.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <FiMail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">info@colombodockyard.com</p>
                  <p className="text-gray-600 dark:text-gray-400">support@colombodockyard.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <FiPhone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+94 11 2 522 861</p>
                  <p className="text-gray-600 dark:text-gray-400">+94 11 2 522 862</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <FiMapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Colombo Dockyard PLC<br />
                    Port of Colombo<br />
                    Sri Lanka
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Business Hours</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">8:00 AM - 5:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">8:00 AM - 1:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">Closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <div className="flex justify-center gap-6 text-sm">
            <Link 
              to="/terms" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/login" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Login
            </Link>
            {/* <Link 
              to="/register" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Register
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
