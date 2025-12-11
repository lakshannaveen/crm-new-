import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import {
  FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2,
  FiEye, FiDownload, FiPrinter, FiAnchor, FiFlag,
  FiCalendar, FiTrendingUp, FiUsers
} from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';

const VesselManagement = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const vessels = [
    {
      id: 1,
      name: 'MV Ocean Queen',
      imo: 'IMO 1234567',
      type: 'Container Ship',
      flag: 'Panama',
      owner: 'Ocean Cargo Ltd',
      dwt: '45,000',
      grossTonnage: '35,000',
      yearBuilt: '2015',
      lastDryDocking: '2022-05-15',
      nextDryDocking: '2024-11-20',
      status: 'active',
      projects: 3,
    },
    {
      id: 2,
      name: 'MV Sea Voyager',
      imo: 'IMO 2345678',
      type: 'Bulk Carrier',
      flag: 'Liberia',
      owner: 'Global Shipping',
      dwt: '82,000',
      grossTonnage: '48,000',
      yearBuilt: '2018',
      lastDryDocking: '2021-11-10',
      nextDryDocking: '2025-05-15',
      status: 'active',
      projects: 2,
    },
    {
      id: 3,
      name: 'MV Blue Wave',
      imo: 'IMO 3456789',
      type: 'Tanker',
      flag: 'Marshall Islands',
      owner: 'PetroTrans Ltd',
      dwt: '120,000',
      grossTonnage: '68,000',
      yearBuilt: '2020',
      lastDryDocking: '2023-03-20',
      nextDryDocking: '2025-09-30',
      status: 'inactive',
      projects: 1,
    },
    {
      id: 4,
      name: 'MV Starfish',
      imo: 'IMO 4567890',
      type: 'General Cargo',
      flag: 'Singapore',
      owner: 'Asia Pacific Shipping',
      dwt: '28,000',
      grossTonnage: '18,000',
      yearBuilt: '2012',
      lastDryDocking: '2023-08-05',
      nextDryDocking: '2025-02-28',
      status: 'active',
      projects: 0,
    },
    {
      id: 5,
      name: 'MV Coral Princess',
      imo: 'IMO 5678901',
      type: 'Passenger Ship',
      flag: 'Bahamas',
      owner: 'Cruise Lines Inc',
      dwt: '85,000',
      grossTonnage: '52,000',
      yearBuilt: '2019',
      lastDryDocking: '2022-12-15',
      nextDryDocking: '2024-12-15',
      status: 'maintenance',
      projects: 1,
    },
    {
      id: 6,
      name: 'MV Titan Explorer',
      imo: 'IMO 6789012',
      type: 'Offshore Vessel',
      flag: 'Norway',
      owner: 'Offshore Energy',
      dwt: '15,000',
      grossTonnage: '8,000',
      yearBuilt: '2017',
      lastDryDocking: '2023-01-30',
      nextDryDocking: '2025-01-30',
      status: 'active',
      projects: 2,
    },
  ];

  const filteredVessels = vessels.filter(vessel => {
    if (activeFilter !== 'all' && vessel.status !== activeFilter) return false;
    if (search && !vessel.name.toLowerCase().includes(search.toLowerCase()) &&
        !vessel.imo.toLowerCase().includes(search.toLowerCase()) &&
        !vessel.owner.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
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
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Vessel Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage all vessels registered with Colombo Dockyard
              </p>
            </div>

            {/* Stats - EXACTLY like OwnerDashboard */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 md:p-4">
                <div className="flex items-center">
                  <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                    <FiAnchor className="w-4 h-4 md:w-6 md:h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total Vessels</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">{vessels.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 md:p-4">
                <div className="flex items-center">
                  <div className="p-2 md:p-3 bg-green-100 dark:bg-green-900 rounded-lg flex-shrink-0">
                    <FiTrendingUp className="w-4 h-4 md:w-6 md:h-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Active Vessels</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {vessels.filter(v => v.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 md:p-4">
                <div className="flex items-center">
                  <div className="p-2 md:p-3 bg-purple-100 dark:bg-purple-900 rounded-lg flex-shrink-0">
                    <FiCalendar className="w-4 h-4 md:w-6 md:h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Due for Docking</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">3</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 md:p-4">
                <div className="flex items-center">
                  <div className="p-2 md:p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex-shrink-0">
                    <FiUsers className="w-4 h-4 md:w-6 md:h-6 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                      {vessels.reduce((sum, v) => sum + v.projects, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search vessels by name, IMO, or owner..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                  <div className="flex items-center">
                    <FiFilter className="mr-2 text-gray-400" />
                    <select
                      value={activeFilter}
                      onChange={(e) => setActiveFilter(e.target.value)}
                      className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="maintenance">Under Maintenance</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      <FiDownload className="text-gray-400" />
                    </button>
                    <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      <FiPrinter className="text-gray-400" />
                    </button>
                    <button className="btn-primary flex items-center">
                      <FiPlus className="mr-2" />
                      <span className="hidden sm:inline">Add Vessel</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vessels Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Vessel Details
                      </th>
                      <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Specifications
                      </th>
                      <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Maintenance
                      </th>
                      <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredVessels.map((vessel) => (
                      <tr key={vessel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 md:px-6 md:py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                              <FiAnchor className="text-blue-600 dark:text-blue-300" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {vessel.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {vessel.imo}
                              </div>
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-1">
                                <FiFlag className="mr-1" />
                                {vessel.flag} • {vessel.type}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {vessel.owner}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            DWT: {vessel.dwt} • GT: {vessel.grossTonnage}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            Built: {vessel.yearBuilt}
                          </div>
                        </td>
                        <td className="hidden lg:table-cell px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Last: </span>
                              <span className="text-gray-900 dark:text-white">
                                {formatDate(vessel.lastDryDocking, 'short')}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Next: </span>
                              <span className="text-gray-900 dark:text-white">
                                {formatDate(vessel.nextDryDocking, 'short')}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 md:px-6 md:py-4">
                          <div className="flex flex-col space-y-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vessel.status)}`}>
                              {getStatusText(vessel.status)}
                            </span>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {vessel.projects} active project{vessel.projects !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 md:px-6 md:py-4">
                          <div className="flex space-x-2">
                            <button
                              className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              title="View Details"
                            >
                              <FiEye />
                            </button>
                            <button
                              className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                              title="Edit"
                            >
                              <FiEdit />
                            </button>
                            <button
                              className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredVessels.length === 0 && (
                <div className="text-center py-8 md:py-12">
                  <div className="inline-block p-4 md:p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-3 md:mb-4">
                    <FiAnchor className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
                  </div>
                  <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-1 md:mb-2">
                    No vessels found
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
                    {search ? 'Try a different search term' : 'No vessels match the selected filter'}
                  </p>
                  <button className="btn-primary flex items-center mx-auto">
                    <FiPlus className="mr-2" />
                    Add First Vessel
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 md:mt-6 gap-3">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredVessels.length}</span> of{' '}
                <span className="font-medium">{vessels.length}</span> vessels
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-2 border border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Next
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VesselManagement;