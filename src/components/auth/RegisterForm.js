import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CountryCodeSelect from './CountryCodeSelect';
import { register } from '../../actions/authActions';
import { validatePhoneNumber, validateName, validateEmail } from '../../utils/validators';
import { FiUser, FiSmartphone, FiMail, FiBriefcase, FiArrowRight } from 'react-icons/fi';

const RegisterForm = () => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    countryCode: '+94',
  });
  const [errors, setErrors] = useState({});
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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
    setLoading(true);

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
      setLoading(false);
      return;
    }

    const userData = {
      ...formData,
      phone: fullPhone,
    };

    try {
      await dispatch(register(userData));
      setRequestSent(true);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (requestSent) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-3">
          <FiUser className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Request Submitted!
        </h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your registration request has been sent for admin approval.
          You will be notified once your account is approved.
        </p>
        
        <div className="mt-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 p-3">
          <p className="text-xs text-gray-700 dark:text-gray-300 text-left">
            <strong>Note:</strong> This is a demo system. In a real application, 
            you would receive an email or SMS notification when approved.
          </p>
        </div>
        
        <Link
          to="/login"
          className="inline-block w-full h-11 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-4"
        >
          Back to Login
          <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="mx-auto w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-3">
          <FiUser className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Create Account
        </h1>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Register for access to Colombo Dockyard CRM
        </p>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-600 dark:text-red-300">
          {errors.submit}
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name *
          </label>
          <div className="mt-2 relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`h-11 w-full pl-10 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800`}
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
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number *
          </label>
          <div className="mt-2 flex gap-2">
            <div className="w-28">
              <CountryCodeSelect
                value={formData.countryCode}
                onChange={handleCountryCodeChange}
              />
            </div>
            <div className="relative flex-1">
              <FiSmartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="77 123 4567"
                inputMode="numeric"
                className={`h-11 w-full pl-10 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800`}
              />
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
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <div className="mt-2 relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`h-11 w-full pl-10 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800`}
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
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Company Name *
          </label>
          <div className="mt-2 relative">
            <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className={`h-11 w-full pl-10 rounded-xl border ${errors.company ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800`}
            />
          </div>
          {errors.company && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.company}
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            required
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <Link to="/terms" className="font-semibold text-blue-600 hover:text-blue-800">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="font-semibold text-blue-600 hover:text-blue-800">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              Submit Request
              <FiArrowRight />
            </>
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800">
            Sign in here
          </Link>
        </p>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-500">
          * Required fields. Your registration request will be reviewed by an administrator.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;