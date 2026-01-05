// Mock service for authentication
import config from '../config';
class AuthService {
  // Mock users database
  users = [
    {
      id: 1,
      name: "EVERGREEN MARINE CORP. (TAIWAN) LTD",
      phone: "+94778005569",
      email: "CRYEH@EVERGREEN-MARINE.COM ",
      role: "owner",
      company: "Ocean Shipping Ltd",
      status: "active",
      serviceNo: "O0077", // Service number for API calls
      ships: [1, 2],
      createdAt: "2023-06-15T10:30:00Z",
      lastLogin: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Admin User",
      phone: "+91778005569",
      email: "admin@dockyard.com",
      role: "admin",
      status: "active",
      serviceNo: "ADMIN001", // Service number for API calls
      createdAt: "2023-01-01T09:00:00Z",
      lastLogin: new Date().toISOString(),
    },
    // Hardcoded user based on provided response
    {
      id: 3,
      name: "THE SHIPPING CORPORATION OF INDIA",
      phone: "+912222026666", // Derived from telno: 0912222026666
      email: "SM.RAI@SCI.CO.IN",
      role: "owner",
      company: "THE SHIPPING CORPORATION OF INDIA",
      status: "active",
      serviceNo: "O0204", // Service number for API calls      createdAt: "2024-12-01T09:00:00Z",
      lastLogin: new Date().toISOString(),
    },
  ];

  // Mock pending registrations
  pendingRegistrations = [];

  // Mock OTPs storage
  otpStore = {};

  async sendOTP(phoneNumber) {
    // sendOTP (mock) is deprecated in API-only mode. Use requestOTPBackend instead.
    throw new Error('sendOTP is disabled. Use requestOTPBackend(phoneNumber) for API OTP flow');
  }

  // Request OTP from remote backend
  async requestOTPBackend(phoneNumber) {
    const url = `${config.api.baseURL}/CDLRequirmentManagement/Login/EMPLogin`;

    // Use single expected payload key `P_PHONE_NO` when requesting OTP
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = { P_PHONE_NO: phoneNumber };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        data = { raw: text };
      }

      console.debug('requestOTPBackend', { url, body, status: res.status, data });

      if (data) {
        data._requestedPhoneKey = 'P_PHONE_NO';
        data._requestedPhone = phoneNumber;
      }

      if (data && (data.StatusCode === 200 || res.ok)) return data;

      return data;
    } catch (err) {
      console.warn('requestOTPBackend fetch failed', err && err.message);
      throw err;
    }
  }

  // Verify OTP by calling EMPLogin (final login). Use only `P_PHONE_NO` and `P_OTP`.
  async verifyOTPBackend(phoneNumber, otp) {
    const url = `${config.api.baseURL}/CDLRequirmentManagement/Login/EMPLogin`;

    const headers = { 'Content-Type': 'application/json' };

    const body = {
      P_PHONE_NO: phoneNumber,
      P_OTP: otp,
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        data = { raw: text };
      }

      console.debug('verifyOTPBackend', { url, body, status: res.status, data });

      // Persist session if Token present
      if (data && (data.StatusCode === 200 || res.ok)) {
        if (data.Token) {
          const user = data.UserDetails || null;
          try {
            this.setSession(data.Token, user);
          } catch (e) {
            console.warn('setSession failed', e && e.message);
          }
        }
        if (data) {
          data._requestedPhoneKey = 'P_PHONE_NO';
          data._requestedOtpKey = 'P_OTP';
        }
        return data;
      }

      return data;
    } catch (err) {
      console.warn('verifyOTPBackend fetch failed', err && err.message);
      throw err;
    }
  }

  // Login using remote EMPLogin endpoint. Use the single expected payload
  // keys `P_PHONE_NO` and `P_OTP` exclusively (no fallback keys).
  async login(username, password) {
    const url = `${config.api.baseURL}/CDLRequirmentManagement/Login/EMPLogin`;

    const headers = {
      'Content-Type': 'application/json',
    };

    const body = {
      P_PHONE_NO: username,
      P_OTP: password,
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        data = { raw: text };
      }

      console.debug('login', { url, body, status: res.status, data });

      // If backend indicates success, optionally save session
      if (data && (data.StatusCode === 200 || res.ok)) {
        // If backend returns Token and UserDetails, persist them
        if (data.Token) {
          // attempt to set session; UserDetails may vary in shape
          const user = data.UserDetails || null;
          try {
            this.setSession(data.Token, user);
          } catch (e) {
            console.warn('setSession failed', e && e.message);
          }
        }
        return data;
      }

      // Return parsed response even if not success for callers to handle
      return data;
    } catch (err) {
      console.warn('login fetch failed', err && err.message);
      throw err;
    }
  }

  async verifyOTP(phoneNumber, otp) {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if OTP exists and is valid
    const storedOtp = this.otpStore[phoneNumber];

    if (!storedOtp) {
      throw new Error("OTP not found. Please request a new OTP.");
    }

    if (Date.now() > storedOtp.expiresAt) {
      delete this.otpStore[phoneNumber];
      throw new Error("OTP has expired. Please request a new OTP.");
    }

    if (storedOtp.otp !== otp) {
      throw new Error("Invalid OTP. Please try again.");
    }

    // Find user
    const user = this.users.find((u) => u.phone === phoneNumber);

    if (!user) {
      throw new Error("User not found. Please register first.");
    }

    // Clear OTP after successful verification
    delete this.otpStore[phoneNumber];

    // Mock token generation
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({
        userId: user.id,
        phone: user.phone,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
      })
    )}.mock-signature`;

    return {
      success: true,
      token,
      user,
      message: "OTP verified successfully",
    };
  }

  async register(userData) {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if user already exists
    const existingUser = this.users.find((u) => u.phone === userData.phone);
    if (existingUser) {
      throw new Error("User already exists with this phone number.");
    }

    // Check if already pending
    const pendingUser = this.pendingRegistrations.find(
      (u) => u.phone === userData.phone
    );
    if (pendingUser) {
      throw new Error("Registration request already pending.");
    }

    // Add to pending registrations
    const newUser = {
      id: Date.now(),
      ...userData,
      role: "owner",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    this.pendingRegistrations.push(newUser);

    return {
      success: true,
      message: "Registration request submitted for admin approval",
      data: newUser,
    };
  }

  async getCurrentUser(token) {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock token validation
    if (!token || !token.startsWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")) {
      throw new Error("Invalid token");
    }

    // For demo, return first user
    const user = this.users[0];

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  // Session helpers ------------------------------------------------------
  // Try to parse a JWT token and return payload if possible
  parseJwt(token) {
    if (!token || typeof token !== 'string') return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1];
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(json)));
    } catch (e) {
      return null;
    }
  }

  // Save session to localStorage. If expiresInSeconds provided, save expiry timestamp.
  setSession(token, user, expiresInSeconds = null) {
    if (token) localStorage.setItem('token', token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      // Persist service number separately for service-only API calls
      if (user.serviceNo) localStorage.setItem('serviceNo', user.serviceNo);
    }

    if (expiresInSeconds && Number.isFinite(Number(expiresInSeconds))) {
      localStorage.setItem('tokenExpiry', String(Date.now() + Number(expiresInSeconds) * 1000));
    } else {
      // Try to infer expiry from JWT exp claim
      const payload = this.parseJwt(token);
      if (payload && payload.exp) {
        localStorage.setItem('tokenExpiry', String(payload.exp * 1000));
      } else {
        localStorage.removeItem('tokenExpiry');
      }
    }
  }

  // Clear session
  clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('serviceNo');
  }

  // Is token expired?
  isTokenExpired() {
    const expiry = localStorage.getItem('tokenExpiry');
    if (!expiry) return false; // no expiry recorded
    const expiryMs = Number(expiry);
    if (!expiryMs) return false;
    return Date.now() > expiryMs;
  }

  // Is user logged in (has token and not expired)
  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    return !this.isTokenExpired();
  }

  // Get auth header for API calls
  getAuthHeader() {
    const token = localStorage.getItem('token');
    if (!token) return {};
    // The backend expects the token in `auth-key` header (no Bearer prefix).
    // Return the header object so callers can spread it into request headers.
    return { 'auth-key': token };
  }

  async updateProfile(userId, userData) {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userIndex = this.users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    // Update user
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    return this.users[userIndex];
  }

  async getUserByPhone(phoneNumber) {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = this.users.find((u) => u.phone === phoneNumber);

    if (!user) {
      return null;
    }

    return user;
  }

  async checkUserExists(phoneNumber) {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const user = this.users.find((u) => u.phone === phoneNumber);
    const pending = this.pendingRegistrations.find(
      (u) => u.phone === phoneNumber
    );

    return {
      exists: !!user,
      pending: !!pending,
      user: user || null,
    };
  }

  // Admin methods
  async getPendingRegistrations() {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return [...this.pendingRegistrations];
  }

  async approveRegistration(userId) {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const pendingIndex = this.pendingRegistrations.findIndex(
      (u) => u.id === userId
    );

    if (pendingIndex === -1) {
      throw new Error("Registration request not found");
    }

    const user = this.pendingRegistrations[pendingIndex];

    // Move from pending to active users
    this.pendingRegistrations.splice(pendingIndex, 1);
    this.users.push({
      ...user,
      status: "active",
      approvedAt: new Date().toISOString(),
    });

    return {
      success: true,
      user: this.users[this.users.length - 1],
      message: "User approved successfully",
    };
  }

  async rejectRegistration(userId) {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const pendingIndex = this.pendingRegistrations.findIndex(
      (u) => u.id === userId
    );

    if (pendingIndex === -1) {
      throw new Error("Registration request not found");
    }

    this.pendingRegistrations.splice(pendingIndex, 1);

    return {
      success: true,
      message: "Registration request rejected",
    };
  }
}

export const authService = new AuthService();
