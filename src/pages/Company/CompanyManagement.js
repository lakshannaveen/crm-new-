import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import {
  FiSearch, FiFilter, FiPlus, FiEdit, FiTrash2,
  FiEye, FiUsers, FiPhone, FiMail, FiGlobe,
  FiTrendingUp, FiCheckCircle, FiXCircle
} from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';

const CompanyManagement = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const companies = [
    {
      id: 1,
      name: 'Ocean Cargo Ltd',
      type: 'Shipping Company',
      industry: 'Maritime Transport',
      contactPerson: 'EVERGREEN MARINE CORP. (TAIWAN) LTD',
      email: 'john@oceancargo.com',
      phone: '+886 033123831',
      website: 'www.oceancargo.com',
      location: 'LUCHU TAOYUAN COUNTY ,TAIWAN',
      vessels: 5,
      activeProjects: 3,
      status: 'active',
      joinedDate: '2020-03-15',
      lastContact: '2024-01-20',
    },
    {
      id: 2,
      name: 'Global Shipping Corp',
      type: 'Ship Management',
      industry: 'Vessel Management',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@globalshipping.com',
      phone: '+44 7911 123456',
      website: 'www.globalshipping.com',
      location: 'London, UK',
      vessels: 12,
      activeProjects: 5,
      status: 'active',
      joinedDate: '2019-07-22',
      lastContact: '2024-01-18',
    },
    {
      id: 3,
      name: 'PetroTrans Ltd',
      type: 'Oil & Gas',
      industry: 'Energy Transport',
      contactPerson: 'Michael Chen',
      email: 'michael@petrotrans.com',
      phone: '+65 9123 4567',
      website: 'www.petrotrans.com',
      location: 'Singapore',
      vessels: 8,
      activeProjects: 2,
      status: 'active',
      joinedDate: '2021-01-10',
      lastContact: '2024-01-15',
    },
    {
      id: 4,
      name: 'Asia Pacific Shipping',
      type: 'Logistics',
      industry: 'Freight Forwarding',
      contactPerson: 'David Kim',
      email: 'david@asiapacific.com',
      phone: '+82 10 1234 5678',
      website: 'www.asiapacific.com',
      location: 'Seoul, South Korea',
      vessels: 3,
      activeProjects: 1,
      status: 'inactive',
      joinedDate: '2022-05-30',
      lastContact: '2023-12-05',
    },
    {
      id: 5,
      name: 'Mediterranean Lines',
      type: 'Cruise Operator',
      industry: 'Tourism',
      contactPerson: 'Maria Rossi',
      email: 'maria@medlines.com',
      phone: '+39 345 678 9012',
      website: 'www.medlines.com',
      location: 'Genoa, Italy',
      vessels: 4,
      activeProjects: 0,
      status: 'active',
      joinedDate: '2023-02-14',
      lastContact: '2024-01-10',
    },
    {
      id: 6,
      name: 'Arctic Shipping Co',
      type: 'Specialized Transport',
      industry: 'Polar Logistics',
      contactPerson: 'Anders Berg',
      email: 'anders@arcticshipping.no',
      phone: '+47 412 34 567',
      website: 'www.arcticshipping.no',
      location: 'Oslo, Norway',
      vessels: 2,
      activeProjects: 1,
      status: 'pending',
      joinedDate: '2023-11-05',
      lastContact: '2024-01-05',
    },
  ];

  const filteredCompanies = companies.filter(company => {
    if (activeFilter !== 'all' && company.status !== activeFilter) return false;
    if (search && !company.name.toLowerCase().includes(search.toLowerCase()) &&
        !company.contactPerson.toLowerCase().includes(search.toLowerCase()) &&
        !company.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FiCheckCircle className="text-green-500" />;
      case 'inactive': return <FiXCircle className="text-gray-500" />;
      case 'pending': return <FiTrendingUp className="text-yellow-500" />;
      default: return <FiCheckCircle className="text-gray-500" />;
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
                Company Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage all companies and their relationships with Colombo Dockyard
              </p>
            </div>

           {/* Stats */}
<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <div className="card">
    <div className="flex items-center">
      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
        <FiUsers className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-300" />
      </div>
      <div className="ml-3 sm:ml-4">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Companies</p>
        <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{companies.length}</p>
      </div>
    </div>
  </div>
  <div className="card">
    <div className="flex items-center">
      <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
        <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-300" />
      </div>
      <div className="ml-3 sm:ml-4">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Active Companies</p>
        <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
          {companies.filter(c => c.status === 'active').length}
        </p>
      </div>
    </div>
  </div>
  <div className="card">
    <div className="flex items-center">
      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
        <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-300" />
      </div>
      <div className="ml-3 sm:ml-4">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Vessels</p>
        <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
          {companies.reduce((sum, c) => sum + c.vessels, 0)}
        </p>
      </div>
    </div>
  </div>
  <div className="card">
    <div className="flex items-center">
      <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
        <FiUsers className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-300" />
      </div>
      <div className="ml-3 sm:ml-4">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
        <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
          {companies.reduce((sum, c) => sum + c.activeProjects, 0)}
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
                      placeholder="Search companies by name, contact, or location..."
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
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  {/* <button className="btn-primary flex items-center">
                    <FiPlus className="mr-2" />
                    Add Company
                  </button> */}
                </div>
              </div>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="card hover:shadow-lg transition-shadow">
                  {/* Company Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                          <span className="text-blue-600 dark:text-blue-300 font-medium">
                            {company.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {company.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {company.type} • {company.industry}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(company.status)}
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(company.status)}`}>
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <FiUsers className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Contact Person</p>
                        <p className="font-medium text-gray-900 dark:text-white">{company.contactPerson}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{company.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="font-medium text-gray-900 dark:text-white">{company.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiGlobe className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p className="font-medium text-gray-900 dark:text-white">{company.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vessels</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{company.vessels}</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Projects</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{company.activeProjects}</p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                    <div>
                      <p>Joined: {formatDate(company.joinedDate, 'short')}</p>
                    </div>
                    <div>
                      <p>Last Contact: {formatDate(company.lastContact, 'short')}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex-1 py-2 btn-primary text-sm">
                      <FiEye className="inline mr-2" />
                      View
                    </button>
                    <button className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">
                      <FiEdit className="inline mr-2" />
                      Edit
                    </button>
                    <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      <FiTrash2 className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCompanies.length === 0 && (
              <div className="card text-center py-12">
                <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <FiUsers className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No companies found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {search ? 'Try a different search term' : 'No companies match the selected filter'}
                </p>
                <button className="btn-primary inline-flex items-center">
                  <FiPlus className="mr-2" />
                  Add First Company
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CompanyManagement;