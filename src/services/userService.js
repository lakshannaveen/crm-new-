import axios from 'axios';
import config from '../config';
import { authService } from './authService';

// Mock service for user management
class UserService {
  constructor() {
    // Sync with auth service
    this.authService = {
      pendingRegistrations: [],
      users: [],
    };
  }

  async getUserRequests() {
    // Mock pending users (would come from backend)
    const pendingUsers = [
      {
        id: 101,
        name: 'Michael Johnson',
        phone: '+1 (585) 123-4567',
        email: 'michael@example.com',
        company: 'Global Shipping',
        requestedAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 102,
        name: 'Sarah Williams',
        phone: '+44 7911 123456',
        email: 'sarah@shipping.co.uk',
        company: 'UK Maritime',
        requestedAt: '2024-01-16T14:20:00Z',
      },
    ];

    const approvedUsers = [
      {
        id: 1,
        name: 'EVERGREEN MARINE CORP. (TAIWAN) LTD',
        phone: '+919899090909',
        email: 'CRYEH@EVERGREEN-MARINE.COM ',
        company: 'Ocean Shipping Ltd',
        approvedAt: '2024-01-10T09:15:00Z',
        status: 'active',
      },
    ];

    return {
      pending: pendingUsers,
      approved: approvedUsers,
    };
  }

  async approveUser(userId) {
    // Mock approval
    const user = {
      id: userId,
      name: 'Approved User',
      phone: '+1234567890',
      email: 'approved@example.com',
      status: 'active',
      approvedAt: new Date().toISOString(),
    };

    return user;
  }

  async getUserByServiceNo(serviceNo) {
    if (!serviceNo) {
      throw new Error('Service number is required');
    }
    try {
      // Use direct axios request (bypass `api` instance/interceptor) to avoid sending Authorization header
      const base = (config && config.api && config.api.baseURL) || 'https://esystems.cdl.lk/backend-test';
      const url = `${base}/CDLRequirmentManagement/Login/GetUserByServiceNo`;
      // Include auth header if available so backend endpoints that require
      // authentication (like IIS-protected APIs) receive the token.
      const headers = {
        'Content-Type': 'application/json',
        ...authService.getAuthHeader(),
      };

      const response = await axios.get(url, {
        params: {
          P_SERVICE_NO: serviceNo,
        },
        headers,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user by service number:', error);

      // If server returned 404, surface helpful message
      if (error.response && error.response.status === 404) {
        throw new Error(`API endpoint not found. Please check if the endpoint '/Login/GetUserByServiceNo' exists on the backend.`);
      }

      // If it's a network error (no response), attempt local fallback using mock users
      if (!error.response || (error.message && error.message.toLowerCase().includes('network'))) {
        console.warn('Network error while fetching user; attempting local fallback');
        try {
          const localUser = authService.users.find(u => u.serviceNo === serviceNo);
          if (localUser) return localUser;
        } catch (e) {
          // ignore
        }
        // If no local user, throw a clearer error for the UI
        throw new Error('Network Error: Unable to reach server and no local user data available.');
      }

      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch user');
    }
  }

  async uploadProfilePic(serviceNo, file) {
    if (!serviceNo) throw new Error('Service number is required to upload profile picture');
    if (!file) throw new Error('File is required');
    try {
      const base = (config && config.api && config.api.baseURL) || 'https://esystems.cdl.lk/backend-test';
      const url = `${base}/CDLRequirmentManagement/ShipDetails/UploadProfilePic`;
      const formData = new FormData();
      // backend may expect a particular field name; use generic 'file' and include serviceNo
      formData.append('file', file);
      formData.append('serviceNo', serviceNo);

      const headers = {
        ...authService.getAuthHeader(),
        // Let axios set the multipart boundary
      };

      const response = await axios.post(url, formData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  }

  getProfilePicUrl(serviceNo) {
    const base = (config && config.api && config.api.baseURL) || 'https://esystems.cdl.lk/backend-test';
    return `${base}/CDLRequirmentManagement/ShipDetails/ProfilePicPreview?serviceNo=${encodeURIComponent(serviceNo)}`;
  }

  async fetchProfilePic(serviceNo) {
    if (!serviceNo) throw new Error('Service number is required to fetch profile picture');
    try {
      const base = (config && config.api && config.api.baseURL) || 'https://esystems.cdl.lk/backend-test';
      const url = `${base}/CDLRequirmentManagement/ShipDetails/ProfilePicPreview?serviceNo=${encodeURIComponent(serviceNo)}&t=${Date.now()}`;
      const headers = {
        ...authService.getAuthHeader(),
      };
      const response = await axios.get(url, { headers, responseType: 'blob' });
      return response.data; // Blob
    } catch (error) {
      console.error('Error fetching profile picture blob:', error);
      throw error;
    }
  }

  async rejectUser(userId) {
    // Mock rejection
    return { success: true };
  }
}

export const userService = new UserService();