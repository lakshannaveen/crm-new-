import api from './api';
import { BACKEND_BASE_URL } from '../index';

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
      // Use the backend base URL from index.js
      const response = await api.get(`${BACKEND_BASE_URL}/CDLRequirmentManagement/Login/GetUserByServiceNo`, {
        params: {
          P_SERVICE_NO: serviceNo,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user by service number:', error);
      
      // Check if it's a 404 error
      if (error.response && error.response.status === 404) {
        throw new Error(`API endpoint not found. Please check if the endpoint '/Login/GetUserByServiceNo' exists on the backend.`);
      }
      
      // Check if it's a network error
      if (error.message.includes('Network Error')) {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch user');
    }
  }

  async rejectUser(userId) {
    // Mock rejection
    return { success: true };
  }
}

export const userService = new UserService();