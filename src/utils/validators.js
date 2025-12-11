// Phone number validation
export const validatePhoneNumber = (phone) => {
  if (!phone) return false;
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid length (usually 10-15 digits)
  return cleaned.length >= 10 && cleaned.length <= 15;
};

// OTP validation
export const validateOTP = (otp) => {
  if (!otp) return false;
  
  // OTP should be exactly 6 digits
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};

// Email validation
export const validateEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Required field validation
export const validateRequired = (value) => {
  return value !== undefined && value !== null && value.toString().trim().length > 0;
};

// Name validation
export const validateName = (name) => {
  if (!name) return false;
  
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
};

// IMO number validation
export const validateIMO = (imo) => {
  if (!imo) return false;
  
  const imoRegex = /^IMO\s?\d{7}$/i;
  return imoRegex.test(imo);
};

// Date validation
export const validateDate = (date) => {
  if (!date) return false;
  
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj);
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return false;
  
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// URL validation
export const validateURL = (url) => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Number validation
export const validateNumber = (number, min = null, max = null) => {
  if (number === undefined || number === null || number === '') return false;
  
  const num = parseFloat(number);
  if (isNaN(num)) return false;
  
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
  
  return true;
};

// Positive number validation
export const validatePositiveNumber = (number) => {
  return validateNumber(number, 0);
};

// Integer validation
export const validateInteger = (number) => {
  if (!validateNumber(number)) return false;
  return Number.isInteger(parseFloat(number));
};

// Percentage validation
export const validatePercentage = (percentage) => {
  return validateNumber(percentage, 0, 100);
};

// Currency validation
export const validateCurrency = (amount) => {
  if (!amount) return false;
  
  // Remove currency symbols and commas
  const cleaned = amount.toString().replace(/[$,]/g, '');
  return validateNumber(cleaned, 0);
};

// Phone number formatting
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
};

// Export all validators
export default {
  validatePhoneNumber,
  validateOTP,
  validateEmail,
  validateRequired,
  validateName,
  validateIMO,
  validateDate,
  validatePassword,
  validateURL,
  validateNumber,
  validatePositiveNumber,
  validateInteger,
  validatePercentage,
  validateCurrency,
  formatPhoneNumber,
};