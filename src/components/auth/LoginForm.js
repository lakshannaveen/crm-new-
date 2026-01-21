import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CountryCodeSelect from "./CountryCodeSelect";
import { login, verifyOTP } from "../../actions/authActions";
import { validatePhoneNumber, validateOTP } from "../../utils/validators";
import { countryCodes } from "../../constants/countries";
import { RESET_OTP_STATE } from "../../constants/authActionTypes";
import { FiSmartphone, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import dockyardLogo from "../../assets/image/logo512.png";

const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    otpSent,
    phoneNumber: storedPhone,
    loading,
  } = useSelector((state) => state.auth);

  const [countryCode, setCountryCode] = useState("+94");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [otpResent, setOtpResent] = useState(false);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const cleaned = phoneNumber.replace(/\D/g, "");
    let fullPhoneNumber = cleaned;

    // If user entered leading 0 (local format), send as-is (backend expects 0-prefixed)
    if (!cleaned.startsWith("0") && !cleaned.startsWith("+")) {
      // Prepend country code if provided (remove +)
      if (countryCode && countryCode.startsWith("+")) {
        fullPhoneNumber = countryCode + cleaned;
      } else {
        fullPhoneNumber = cleaned;
      }
    }

    if (!validatePhoneNumber(fullPhoneNumber)) {
      setErrors({ phone: "Please enter a valid phone number" });
      return;
    }

    dispatch(login(fullPhoneNumber));
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const otpString = otp.join("");
    if (!validateOTP(otpString)) {
      setErrors({ otp: "Please enter a valid 5-digit OTP" });
      return;
    }
    dispatch(verifyOTP(otpString, storedPhone));
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleResendOTP = () => {
    dispatch(login(storedPhone));
    setOtpResent(true);
    setTimeout(() => setOtpResent(false), 30000);
  };

  const handleBackToPhone = () => {
    // Reset local state immediately for smooth transition
    setOtp(["", "", "", "", ""]);
    setErrors({});
    setOtpResent(false);

    // Dispatch action to reset the Redux auth state
    dispatch({ type: RESET_OTP_STATE });
  };

  const getPhonePlaceholder = () => {
    const country = countryCodes.find((c) => c.code === countryCode);
    return country?.placeholder || "77 123 4567";
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="mx-auto w-20 h-20 mb-4 flex items-center justify-center">
          <img
            src={dockyardLogo}
            alt="Colombo Dockyard"
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {otpSent ? "Verify OTP" : "Welcome Back"}
        </h1>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {otpSent
            ? `Code sent to ${storedPhone}`
            : "Sign in using your mobile number"}
        </p>
      </div>

      {/* Errors */}
      {errors.phone && (
        <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-600 dark:text-red-300">
          {errors.phone}
        </div>
      )}
      {errors.otp && (
        <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-600 dark:text-red-300">
          {errors.otp}
        </div>
      )}

      {/* Phone Form */}
      {!otpSent && (
        <form onSubmit={handlePhoneSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone number
            </label>

            <div className="mt-2 flex gap-2">
              <div className="w-28">
                <CountryCodeSelect
                  value={countryCode}
                  onChange={setCountryCode}
                />
              </div>

              <div className="relative flex-1">
                <FiSmartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setPhoneNumber(value);
                  }}
                  placeholder={getPhonePlaceholder()}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="h-11 w-full pl-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary h-11 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? "Sending OTP..." : "Send code"}
            {!loading && <FiArrowRight />}
          </button>

          {/* <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors">
              Sign up
            </Link>
          </p> */}
        </form>
      )}

      {/* OTP Form */}
      {otpSent && (
        <form onSubmit={handleOTPSubmit} className="space-y-6">
          <div className="grid grid-cols-5 gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                inputMode="numeric"
                className="h-12 rounded-xl border border-gray-300 dark:border-gray-700 text-center text-xl font-bold bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary h-11 rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>

          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={otpResent || loading}
                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 disabled:opacity-50 transition-colors"
              >
                {otpResent ? "OTP sent" : "Resend code"}
              </button>
              <span className="text-gray-500">
                {otpResent ? "Wait 30s" : "Check SMS"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleBackToPhone}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Phone Number
            </button>
          </div>
        </form>
      )}

      {/* <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 text-center">
        <Link to="/admin" className="text-xs text-gray-600 hover:text-gray-900">
          Admin access
        </Link>
      </div> */}
    </div>
  );
};

export default LoginForm;
