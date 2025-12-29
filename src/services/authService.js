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
    const url = `${config.api.baseURL}/CDLRequirmentManagement/Login/Login`;

    // Try multiple possible payload field names in case backend expects different key
    const phoneKeys = [
      'P_PHONE_NO',
      'PHONE',
      'P_PHONE',
      'P_MOBILE',
      'MOBILE',
      'MSISDN',
      'P_MOB',
    ];

    const headers = {
      'Content-Type': 'application/json',
    };
    let lastError = null;
    let lastResponse = null;

    for (const key of phoneKeys) {
      const body = {};
      body[key] = phoneNumber;

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

        console.debug('requestOTPBackend try', { url, key, body, status: res.status, data });

        lastResponse = data;

        // If backend returned a successful StatusCode, return parsed data
        if (data && (data.StatusCode === 200 || res.ok)) {
          data._requestedPhoneKey = key;
          data._requestedPhone = phoneNumber;
          return data;
        }

        // If not 200, continue trying other keys
      } catch (err) {
        console.warn('requestOTPBackend fetch failed for key', key, err && err.message);
        lastError = err;
        continue;
      }
    }

    // If we reach here, none of the payload keys produced a success response
    if (lastResponse) return lastResponse;
    throw lastError || new Error('Failed to request OTP from backend');
  }

  // Verify OTP with remote backend
  async verifyOTPBackend(phoneNumber, otp) {
    const url = `${config.api.baseURL}/CDLRequirmentManagement/Login/Login`;

    // Try multiple field name combinations for phone and otp
    const phoneKeys = ['P_PHONE_NO', 'PHONE', 'P_PHONE', 'P_MOBILE', 'MOBILE', 'MSISDN', 'P_MOB'];
    const otpKeys = ['P_OTP', 'OTP', 'CODE', 'P_CODE'];

    const headers = {
      'Content-Type': 'application/json',
    };

    let lastError = null;
    let lastResponse = null;

    for (const pKey of phoneKeys) {
      for (const oKey of otpKeys) {
        const body = {};
        body[pKey] = phoneNumber;
        body[oKey] = otp;

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

          console.debug('verifyOTPBackend try', { url, pKey, oKey, body, status: res.status, data });

          lastResponse = data;

          if (data && (data.StatusCode === 200 || res.ok)) {
            data._requestedPhoneKey = pKey;
            data._requestedOtpKey = oKey;
            return data;
          }
        } catch (err) {
          console.warn('verifyOTPBackend fetch failed for', pKey, oKey, err && err.message);
          lastError = err;
          continue;
        }
      }
    }

    if (lastResponse) return lastResponse;
    throw lastError || new Error('Verify request failed');
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
