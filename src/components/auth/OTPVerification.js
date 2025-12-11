import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, resendOTP } from '../../actions/authActions';
import { validateOTP } from '../../utils/validators';
import { FiLock, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

const OTPVerification = ({ phoneNumber, onBack }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef([]);

  useEffect(() => {
    // Start countdown timer
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error
    if (errors.otp) {
      setErrors({});
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const otpArray = pastedData.split('');
      const newOtp = [...otp];
      
      otpArray.slice(0, 6).forEach((digit, index) => {
        newOtp[index] = digit;
      });
      
      setOtp(newOtp);
      
      // Focus last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const otpString = otp.join('');

    if (!validateOTP(otpString)) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }

    dispatch(verifyOTP(otpString, phoneNumber));
  };

  const handleResendOTP = () => {
    if (!canResend) return;

    dispatch(resendOTP(phoneNumber));
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    
    // Focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    toast.success('OTP resent successfully!');
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{3})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phone;
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full 
                      flex items-center justify-center mb-4">
          <FiLock className="w-8 h-8 text-blue-600 dark:text-blue-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Verify OTP
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Enter the 6-digit OTP sent to
        </p>
        <p className="font-medium text-gray-900 dark:text-white mt-1">
          {formatPhoneNumber(phoneNumber)}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {errors.otp && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 
                        dark:text-red-300 rounded-lg text-sm">
            {errors.otp}
          </div>
        )}

        {/* OTP Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Enter 6-digit OTP
          </label>
          <div className="flex justify-between space-x-2 md:space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-full h-14 md:h-16 text-center text-2xl md:text-3xl 
                         font-bold border-2 border-gray-300 dark:border-gray-600 
                         rounded-lg focus:border-blue-500 focus:ring-2 
                         focus:ring-blue-200 dark:focus:ring-blue-800 
                         outline-none bg-white dark:bg-gray-800
                         transition-colors"
                inputMode="numeric"
                autoComplete="one-time-code"
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
            Click to paste or type the 6-digit code
          </p>
        </div>

        {/* Timer and Resend */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-400">Didn't receive OTP? </span>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={!canResend || loading}
              className={`font-medium ${
                canResend 
                  ? 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300' 
                  : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
              } transition-colors`}
            >
              {canResend ? (
                <span className="flex items-center">
                  <FiRefreshCw className="mr-1" />
                  Resend OTP
                </span>
              ) : (
                `Resend in ${timer}s`
              )}
            </button>
          </div>
          {timer > 0 && (
            <div className="flex items-center">
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000"
                  style={{ width: `${(timer / 60) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || otp.some(digit => !digit)}
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
            'Verify & Continue'
          )}
        </button>

        {/* Back Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 
                     dark:hover:text-gray-300 transition-colors flex items-center 
                     justify-center mx-auto"
          >
            <FiArrowLeft className="mr-2" />
            Back to phone number
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Note:</strong> The OTP is valid for 5 minutes. 
          If you don't receive it, check your spam folder or request a new OTP.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          For demo purposes, use OTP: <strong>123456</strong>
        </p>
      </div>

      {/* Terms */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          By verifying, you agree to our{' '}
          <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;