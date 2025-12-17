import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CountryCodeSelect from './CountryCodeSelect';
import { login, verifyOTP } from '../../actions/authActions';
import { validatePhoneNumber, validateOTP } from '../../utils/validators';
import { FiSmartphone, FiArrowRight } from 'react-icons/fi';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { otpSent, phoneNumber: storedPhone, loading } = useSelector(state => state.auth);
  
  const [countryCode, setCountryCode] = useState('+94');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [otpResent, setOtpResent] = useState(false);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const fullPhoneNumber = countryCode + phoneNumber.replace(/\D/g, '');

    if (!validatePhoneNumber(fullPhoneNumber)) {
      setErrors({ phone: 'Please enter a valid phone number' });
      return;
    }

    dispatch(login(fullPhoneNumber));
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const otpString = otp.join('');

    if (!validateOTP(otpString)) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }

    dispatch(verifyOTP(otpString, storedPhone));
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleResendOTP = () => {
    dispatch(login(storedPhone));
    setOtpResent(true);
    setTimeout(() => setOtpResent(false), 30000); // 30 seconds cooldown
  };

  if (otpSent) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900 rounded-full 
                        flex items-center justify-center mb-3 sm:mb-4">
            <FiSmartphone className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-300" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Verify OTP
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Enter the 6-digit OTP sent to
          </p>
          <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mt-1">
            {storedPhone}
          </p>
        </div>

        <form onSubmit={handleOTPSubmit} className="space-y-5 sm:space-y-6">
          {errors.otp && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 
                          dark:text-red-300 rounded-lg text-sm">
              {errors.otp}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
              Enter OTP
            </label>
            <div className="flex justify-between gap-1.5 sm:gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-full h-12 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 
                           border-gray-300 dark:border-gray-600 rounded-lg
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                           dark:focus:ring-blue-800 outline-none
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           transition-all duration-150"
                  inputMode="numeric"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={otpResent || loading}
              className={`text-blue-600 dark:text-blue-400 hover:text-blue-800 
                       dark:hover:text-blue-300 transition-colors
                       ${otpResent || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {otpResent ? 'OTP Sent' : 'Resend OTP'}
            </button>
            <span className="text-gray-500 dark:text-gray-400">
              {otpResent ? 'Wait 30 seconds' : ''}
            </span>
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
                Verifying...
              </>
            ) : (
              <>
                Verify & Continue
                <FiArrowRight className="ml-2" />
              </>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 
                       dark:hover:text-gray-300 transition-colors"
            >
              ← Back to phone number
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900 rounded-full 
                      flex items-center justify-center mb-3 sm:mb-4">
          <FiSmartphone className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-300" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4">
          Enter your phone number to sign in to your account
        </p>
      </div>

      <form onSubmit={handlePhoneSubmit} className="space-y-5 sm:space-y-6">
        {errors.phone && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 
                        dark:text-red-300 rounded-lg text-sm">
            {errors.phone}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="w-full sm:w-32">
              <CountryCodeSelect
                value={countryCode}
                onChange={setCountryCode}
              />
            </div>
            <div className="flex-1">
              <div className="relative">
                <FiSmartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                       text-gray-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="input-field pl-10 w-full"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 text-blue-600 rounded border-gray-300 
                     focus:ring-blue-500"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-700 
                                             dark:text-gray-300">
            Keep me logged in
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
              Sending OTP...
            </>
          ) : (
            <>
              Send OTP
              <FiArrowRight className="ml-2" />
            </>
          )}
        </button>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 
                       dark:hover:text-blue-300 font-medium transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <Link
            to="/admin"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 
                     dark:hover:text-gray-300 transition-colors"
          >
            Admin Access
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;