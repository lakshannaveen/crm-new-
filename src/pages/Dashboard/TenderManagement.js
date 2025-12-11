import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import {
  FiFileText, FiCalendar, FiDollarSign, FiClock,
  FiCheckCircle, FiAlertCircle, FiPlus, FiSearch,
  FiFilter, FiDownload, FiEye
} from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';

const TenderManagement = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const tenders = [
    {
      id: 1,
      reference: 'TDR-2024-001',
      title: 'MV Ocean Queen Annual Repair',
      description: 'Complete annual maintenance and repair works',
      ship: 'MV Ocean Queen',
      imo: 'IMO 1234567',
      status: 'open',
      budget: '$500,000',
      deadline: '2024-02-28',
      submissions: 5,
      created: '2024-01-15',
      priority: 'high'
    },
    {
      id: 2,
      reference: 'TDR-2024-002',
      title: 'MV Sea Voyager Dry Docking',
      description: 'Dry docking and hull maintenance',
      ship: 'MV Sea Voyager',
      imo: 'IMO 2345678',
      status: 'in_progress',
      budget: '$750,000',
      deadline: '2024-03-15',
      submissions: 3,
      created: '2024-01-20',
      priority: 'medium'
    },
    {
      id: 3,
      reference: 'TDR-2024-003',
      title: 'MV Blue Wave Engine Overhaul',
      description: 'Complete engine overhaul and system upgrade',
      ship: 'MV Blue Wave',
      imo: 'IMO 3456789',
      status: 'closed',
      budget: '$1,200,000',
      deadline: '2024-01-31',
      submissions: 8,
      created: '2024-01-05',
      priority: 'high'
    },
    {
      id: 4,
      reference: 'TDR-2024-004',
      title: 'MV Starfish Electrical System',
      description: 'Electrical system modernization',
      ship: 'MV Starfish',
      imo: 'IMO 4567890',
      status: 'open',
      budget: '$300,000',
      deadline: '2024-03-31',
      submissions: 2,
      created: '2024-01-25',
      priority: 'low'
    },
  ];

  const filteredTenders = tenders.filter(tender => {
    if (activeFilter !== 'all' && tender.status !== activeFilter) return false;
    if (search && !tender.title.toLowerCase().includes(search.toLowerCase()) &&
        !tender.reference.toLowerCase().includes(search.toLowerCase()) &&
        !tender.ship.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusText = (status) => {
    return status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1">
          <Header />

          <main className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Tender Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage repair tenders, submissions, and approvals
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="card p-3 sm:p-4">
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <FiFileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Tenders</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{tenders.length}</p>
                  </div>
                </div>
              </div>
              <div className="card p-3 sm:p-4">
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <FiClock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Open Tenders</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {tenders.filter(t => t.status === 'open').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card p-3 sm:p-4">
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <FiDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Budget</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">$2.75M</p>
                  </div>
                </div>
              </div>
              <div className="card p-3 sm:p-4">
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Urgent Tenders</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {tenders.filter(t => t.priority === 'high').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="card mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tenders by title, reference, or ship..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <FiFilter className="mr-2 text-gray-400" />
                    <select
                      value={activeFilter}
                      onChange={(e) => setActiveFilter(e.target.value)}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  {/* <button className="btn-primary flex items-center">
                    <FiPlus className="mr-2" />
                    New Tender
                  </button> */}
                </div>
              </div>
            </div>

            {/* Tenders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTenders.map((tender) => (
                <div key={tender.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tender.status)} mr-3`}>
                          {getStatusText(tender.status)}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(tender.priority)}`}>
                          {tender.priority.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {tender.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {tender.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                        <span className="mr-4">Ref: {tender.reference}</span>
                        <span>Ship: {tender.ship}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <FiEye className="text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Budget</p>
                      <div className="flex items-center">
                        <FiDollarSign className="text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900 dark:text-white">{tender.budget}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Deadline</p>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatDate(tender.deadline, 'short')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Submissions</p>
                      <div className="flex items-center">
                        <FiFileText className="text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900 dark:text-white">{tender.submissions}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Created</p>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatDate(tender.created, 'short')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex-1 py-2 btn-primary text-sm">
                      View Details
                    </button>
                    <button className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
                      Download Tender
                    </button>
                    <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      <FiDownload className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTenders.length === 0 && (
              <div className="card text-center py-12">
                <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <FiFileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No tenders found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {search ? 'Try a different search term' : 'No tenders match the selected filter'}
                </p>
                <button className="btn-primary inline-flex items-center">
                  <FiPlus className="mr-2" />
                  Create New Tender
                </button>
              </div>
            )}

            {/* Recent Activity */}
            <div className="card mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Tender Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'New submission received for TDR-2024-001', time: '2 hours ago', user: 'Marine Solutions Ltd' },
                  { action: 'TDR-2024-002 evaluation completed', time: '1 day ago', user: 'Technical Committee' },
                  { action: 'TDR-2024-003 awarded to Ocean Engineering', time: '2 days ago', user: 'Management' },
                  { action: 'TDR-2024-004 published for bidding', time: '3 days ago', user: 'Procurement Dept' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <FiFileText className="text-blue-600 dark:text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>{activity.time}</span>
                        <span className="mx-2">•</span>
                        <span>By {activity.user}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TenderManagement;