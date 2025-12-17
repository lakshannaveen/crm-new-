import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import dockyardLogo from '../../assets/image/logo512.png';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/register" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6"
          >
            <FiArrowLeft className="mr-2" />
            Back to Register
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <img 
              src={dockyardLogo} 
              alt="Colombo Dockyard" 
              className="h-16 w-16 object-contain"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose prose-blue dark:prose-invert max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing and using the Colombo Dockyard Customer Relationship Management (CRM) system, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Use License</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Permission is granted to temporarily access the CRM system for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained in the CRM system</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Account</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                To use certain features of the CRM system, you must register for an account. When you register, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                <li>Notify us immediately if you discover or suspect any security breaches</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. User Conduct</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                You agree not to use the CRM system to:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Distribute spam, chain letters, or other unsolicited communications</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the system</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Data and Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your use of the CRM system is also governed by our Privacy Policy. We collect, use, and protect your personal information in accordance with applicable data protection laws and our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The CRM system and its original content, features, and functionality are owned by Colombo Dockyard PLC and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Termination</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                In no event shall Colombo Dockyard PLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-3 text-gray-700 dark:text-gray-300">
                <p className="font-medium">Colombo Dockyard PLC</p>
                <p>Email: info@colombodockyard.com</p>
                <p>Phone: +94 11 2 522 861</p>
                <p>Address: Port of Colombo, Sri Lanka</p>
              </div>
            </section>

          </div>
        </div>

        {/* Footer Links */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <div className="flex justify-center gap-6 text-sm">
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
            <Link 
              to="/register" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
