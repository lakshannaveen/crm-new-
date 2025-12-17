import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CountryCodeSelect from './CountryCodeSelect';
import { register } from '../../actions/authActions';
import { validatePhoneNumber, validateName, validateEmail } from '../../utils/validators';
import { FiUser, FiSmartphone, FiMail, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    countryCode: '+94',
  });
  const [errors, setErrors] = useState({});
  const [requestSent, setRequestSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleCountryCodeChange = (code) => {
    setFormData(prev => ({
      ...prev,
      countryCode: code,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name (min 2 characters)';
    }

    const fullPhone = formData.countryCode + formData.phone.replace(/\D/g, '');
    if (!validatePhoneNumber(fullPhone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      ...formData,
      phone: fullPhone,
    };

    dispatch(register(userData));
    setRequestSent(true);
    
    // Show success message
    toast.success('Registration request sent successfully!');
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  if (requestSent) {
    return (
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-900 rounded-full 
                      flex items-center justify-center mb-4 sm:mb-6">
          <FiUser className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-300" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Request Submitted!
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
          Your registration request has been sent for admin approval. 
          You will be notified once your account is approved.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-left">
            <strong>Note:</strong> This is a demo system. In a real application, 
            you would receive an email or SMS notification when approved.
          </p>
        </div>
        <Link
          to="/login"
          className="inline-block btn-primary px-6 py-3 text-sm sm:text-base"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900 rounded-full 
                      flex items-center justify-center mb-3 sm:mb-4">
          <FiUser className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-300" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create Account
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4">
          Register for access to Colombo Dockyard CRM
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 
                             text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`input-field pl-10 ${errors.name ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="w-full sm:w-32">
              <CountryCodeSelect
                value={formData.countryCode}
                onChange={handleCountryCodeChange}
              />
            </div>
            <div className="flex-1">
              <div className="relative">
                <FiSmartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                       text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`input-field pl-10 w-full ${errors.phone ? 'border-red-500' : ''}`}
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 
                             text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        {/* Company Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Name *
          </label>
          <div className="relative">
            <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                  text-gray-400" />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className={`input-field pl-10 ${errors.company ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.company && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.company}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            required
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center py-3 
                   text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 
                            border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              Submit Request
              <FiArrowRight className="ml-2" />
            </>
          )}
        </button>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 
                       dark:hover:text-blue-300 font-medium transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          * Required fields
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-2">
          Your registration request will be reviewed by an administrator.
          You will be notified once approved.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;