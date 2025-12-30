// Application configuration
const config = {
  api: {
    baseURL: 'https://esystems.cdl.lk/backend-test',
  },
  // Authentication
  auth: {
    tokenKey: 'cd_crm_token',
    refreshTokenKey: 'cd_crm_refresh_token',
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
    otpLength: 5,
    otpExpiry: 5 * 60 * 1000, // 5 minutes
  },

  // Application
  app: {
    name: 'Colombo Dockyard CRM',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    defaultLanguage: 'en',
    defaultTimezone: 'Asia/Colombo',
    itemsPerPage: 25,
  },

  // Features
  features: {
    enableNotifications: true,
    enableDarkMode: true,
    enableExport: true,
    enablePrint: true,
    enableAnalytics: false,
  },

  // Validation Rules
  validation: {
    phone: {
      minLength: 10,
      maxLength: 15,
      pattern: /^\+?[1-9]\d{1,14}$/,
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    name: {
      minLength: 2,
      maxLength: 100,
    },
    imo: {
      pattern: /^IMO\s?\d{7}$/i,
    },
  },

  // Colors
  colors: {
    primary: '#1e40af',
    secondary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Date Formats
  dateFormats: {
    short: 'DD/MM/YYYY',
    long: 'DD MMMM YYYY',
    time: 'HH:mm',
    datetime: 'DD/MM/YYYY HH:mm',
  },

  // Currency
  currency: {
    symbol: '$',
    code: 'USD',
    locale: 'en-US',
    format: {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },

  // Local Storage Keys
  storage: {
    theme: 'cd_crm_theme',
    language: 'cd_crm_language',
    user: 'cd_crm_user',
    settings: 'cd_crm_settings',
    recentSearches: 'cd_crm_recent_searches',
  },

  // Routes (for navigation)
  routes: {
    public: ['/login', '/register', '/forgot-password'],
    protected: ['/dashboard', '/profile', '/settings', '/ships', '/projects'],
    admin: ['/admin', '/users', '/companies', '/system-settings'],
  },

  // Notification Settings
  notifications: {
    position: 'top-right',
    duration: 5000,
    maxNotifications: 3,
  },
};

export default config;