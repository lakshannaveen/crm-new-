import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getShipDetails } from '../../actions/shipActions';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import {
  FiArrowLeft, FiCalendar, FiAnchor, FiFlag, FiNavigation,
  FiTrendingUp, FiFileText, FiMapPin, FiUsers, FiTool,
  FiClipboard, FiCheckCircle, FiAlertCircle, FiClock,
  FiEdit, FiDownload, FiPrinter, FiShare2, FiDatabase
} from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';
import { getStatusColor, getStatusText } from '../../utils/helpers';
import ProgressBar from '../../components/common/ProgressBar';
import Card from '../../components/common/Card';

const VesselDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentShip, loading } = useSelector(state => state.ships);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      dispatch(getShipDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentShip) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Vessel Not Found
          </h2>
          <Link to="/vessels" className="btn-primary inline-flex items-center">
            <FiArrowLeft className="mr-2" />
            Back to Vessels
          </Link>
        </div>
      </div>
    );
  }

  const statusColor = getStatusColor(currentShip.status);
  const statusText = getStatusText(currentShip.status);

  const specifications = [
    { label: 'IMO Number', value: currentShip.imoNumber, icon: FiAnchor },
    { label: 'Ship Type', value: currentShip.type, icon: FiNavigation },
    { label: 'Flag', value: currentShip.flag, icon: FiFlag },
    { label: 'DWT', value: currentShip.dwt, unit: 'tons' },
    { label: 'Gross Tonnage', value: currentShip.grossTonnage, unit: 'tons' },
    { label: 'Length', value: currentShip.length, unit: 'm' },
    { label: 'Beam', value: currentShip.beam, unit: 'm' },
    { label: 'Draft', value: currentShip.draft, unit: 'm' },
    { label: 'Year Built', value: currentShip.yearBuilt },
    { label: 'Builder', value: currentShip.builder || 'Hyundai Heavy Industries' },
    { label: 'Engine Type', value: currentShip.engineType || 'MAN B&W 7S80ME-C9.2' },
    { label: 'Engine Power', value: currentShip.enginePower || '27,480 kW' },
  ];

  const maintenance = [
    { label: 'Last Dry Docking', value: currentShip.lastDryDocking, icon: FiCalendar },
    { label: 'Next Dry Docking', value: currentShip.nextDryDocking, icon: FiTrendingUp },
    { label: 'Class Survey Due', value: currentShip.classSurveyDue, icon: FiCheckCircle },
    { label: 'Special Survey Due', value: currentShip.specialSurveyDue || '2025-08-15', icon: FiCalendar },
    { label: 'Annual Survey Due', value: currentShip.annualSurveyDue || '2024-12-31', icon: FiCalendar },
  ];

  const certificates = [
    { name: 'International Tonnage Certificate', issued: '2023-05-20', expiry: '2028-05-20', status: 'valid' },
    { name: 'International Load Line Certificate', issued: '2023-05-20', expiry: '2028-05-20', status: 'valid' },
    { name: 'Safety Construction Certificate', issued: '2023-06-15', expiry: '2028-06-15', status: 'valid' },
    { name: 'Safety Equipment Certificate', issued: '2023-06-15', expiry: '2028-06-15', status: 'valid' },
    { name: 'Safety Radio Certificate', issued: '2023-06-15', expiry: '2028-06-15', status: 'valid' },
    { name: 'International Air Pollution Certificate', issued: '2023-07-10', expiry: '2028-07-10', status: 'valid' },
  ];

  const projects = [
    { id: 1, name: 'Major Repair 2024', type: 'Repair', status: 'in_progress', start: '2024-01-10', end: '2024-03-15', budget: '$2.5M' },
    { id: 2, name: 'Annual Maintenance 2023', type: 'Maintenance', status: 'completed', start: '2023-05-15', end: '2023-06-30', budget: '$1.2M' },
    { id: 3, name: 'Hull Cleaning', type: 'Service', status: 'completed', start: '2023-11-20', end: '2023-11-25', budget: '$150K' },
  ];

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
            {/* Back Button & Breadcrumb */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/vessels" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <FiArrowLeft className="mr-2" />
                  Back to Vessels
                </Link>
                <span className="mx-3 text-gray-400">/</span>
                <span className="text-gray-900 dark:text-white font-medium">Vessel Details</span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FiPrinter className="text-gray-400" />
                </button>
                <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FiShare2 className="text-gray-400" />
                </button>
                <Link to={`/vessels/${id}/edit`} className="btn-primary flex items-center">
                  <FiEdit className="mr-2" />
                  Edit Vessel
                </Link>
              </div>
            </div>

            {/* Vessel Header */}
            <Card className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                {/* Vessel Image */}
                <div className="mb-6 lg:mb-0 lg:w-1/3">
                  <div className="relative h-64 lg:h-full rounded-xl overflow-hidden">
                    <img src={currentShip.image} alt={currentShip.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h1 className="text-2xl font-bold text-white mb-1">{currentShip.name}</h1>
                      <p className="text-gray-200 text-sm">{currentShip.imoNumber} • {currentShip.flag}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <div className="flex items-center mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor} mr-3`}>
                          {statusText}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Owner: {currentShip.owner || 'Ocean Cargo Ltd'}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Vessel Information</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type</p>
                          <p className="font-medium text-gray-900 dark:text-white">{currentShip.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Year Built</p>
                          <p className="font-medium text-gray-900 dark:text-white">{currentShip.yearBuilt}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">DWT</p>
                          <p className="font-medium text-gray-900 dark:text-white">{currentShip.dwt} tons</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Gross Tonnage</p>
                          <p className="font-medium text-gray-900 dark:text-white">{currentShip.grossTonnage} tons</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Project */}
                  {currentShip.status === 'under_repair' && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-6">
                      <div className="flex items-center mb-3">
                        <FiTool className="text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Current Project</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {currentShip.name} - Major Repair
                          </p>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Repair Progress</span>
                          <span className="font-medium">{currentShip.progress}%</span>
                        </div>
                        <ProgressBar progress={currentShip.progress} size="small" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Start: {formatDate(currentShip.startDate, 'short')}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          Target: {formatDate(currentShip.endDate, 'short')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                      <FiFileText className="mr-2" />
                      View Documents
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                      <FiDownload className="mr-2" />
                      Download Certificates
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                      <FiDatabase className="mr-2" />
                      View History
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                {['overview', 'specifications', 'maintenance', 'certificates', 'projects', 'history'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 -mb-px transition-colors ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <Card>
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Maintenance Schedule */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Maintenance Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {maintenance.map((item, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center mb-2">
                            {item.icon && <item.icon className="mr-3 text-gray-400" />}
                            <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                          </div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatDate(item.value, 'short')}
                          </p>
                          <div className="flex items-center mt-2">
                            <FiClock className="text-gray-400 mr-2" />
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {(() => {
                                const days = Math.ceil((new Date(item.value) - new Date()) / (1000 * 60 * 60 * 24));
                                return days > 0 ? `Due in ${days} days` : `Overdue by ${Math.abs(days)} days`;
                              })()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Specifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {specifications.slice(0, 6).map((spec, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center mb-2">
                            {spec.icon && <spec.icon className="mr-3 text-gray-400" />}
                            <span className="text-sm text-gray-600 dark:text-gray-400">{spec.label}</span>
                          </div>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {spec.value} {spec.unit && <span className="text-sm text-gray-500">{spec.unit}</span>}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
                    <div className="space-y-3">
                      {[
                        { activity: 'Annual survey completed', date: '2024-01-15', user: 'Class Surveyor' },
                        { activity: 'Engine maintenance performed', date: '2024-01-10', user: 'Technical Team' },
                        { activity: 'Safety equipment inspected', date: '2024-01-05', user: 'Safety Officer' },
                        { activity: 'Hull cleaning completed', date: '2023-12-20', user: 'Maintenance Team' },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                            <FiClipboard className="text-blue-600 dark:text-blue-300" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.activity}</p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <span>{formatDate(activity.date, 'short')}</span>
                              <span className="mx-2">•</span>
                              <span>By {activity.user}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Complete Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center mb-2">
                          {spec.icon && <spec.icon className="mr-3 text-gray-400" />}
                          <span className="text-sm text-gray-600 dark:text-gray-400">{spec.label}</span>
                        </div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          {spec.value} {spec.unit && <span className="text-sm text-gray-500">{spec.unit}</span>}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'maintenance' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Maintenance History</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Maintenance Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Cost
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {[
                          { type: 'Dry Docking', date: '2023-05-15', location: 'Colombo Dockyard', cost: '$1,200,000', status: 'completed' },
                          { type: 'Hull Cleaning', date: '2023-11-20', location: 'Singapore Port', cost: '$150,000', status: 'completed' },
                          { type: 'Engine Overhaul', date: '2022-08-10', location: 'Dubai Drydocks', cost: '$850,000', status: 'completed' },
                          { type: 'Annual Survey', date: '2024-01-15', location: 'Colombo Port', cost: '$75,000', status: 'completed' },
                          { type: 'Major Repair', date: '2024-01-10', location: 'Colombo Dockyard', cost: '$2,500,000', status: 'in_progress' },
                        ].map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{item.type}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">{formatDate(item.date, 'short')}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 dark:text-white">{item.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">{item.cost}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                item.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                item.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {item.status === 'in_progress' ? 'In Progress' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'certificates' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certificates & Documents</h3>
                    <button className="btn-primary flex items-center">
                      <FiDownload className="mr-2" />
                      Download All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.map((cert, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                              <FiCalendar className="mr-2" />
                              <span>Issued: {formatDate(cert.issued, 'short')}</span>
                              <span className="mx-2">•</span>
                              <span>Expires: {formatDate(cert.expiry, 'short')}</span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            cert.status === 'valid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            cert.status === 'expired' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                            View
                          </button>
                          <button className="flex-1 py-2 text-sm btn-primary">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Project History</h3>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="flex items-center mb-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                project.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              } mr-3`}>
                                {project.status === 'in_progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{project.type}</span>
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              {project.name}
                            </h4>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <FiCalendar className="mr-2" />
                              <span>{formatDate(project.start, 'short')} - {formatDate(project.end, 'short')}</span>
                              <span className="mx-3">•</span>
                              <span>Budget: {project.budget}</span>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <Link
                              to={`/projects/${project.id}`}
                              className="btn-primary text-sm"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Vessel History</h3>
                  <div className="space-y-6">
                    <div className="relative">
                      {/* Timeline */}
                      {[
                        { year: '2015', event: 'Vessel built at Hyundai Heavy Industries', description: 'Completed construction and delivered to owner' },
                        { year: '2016', event: 'First major service', description: 'Initial maintenance and system checks' },
                        { year: '2018', event: 'Special survey completed', description: 'Full classification society survey' },
                        { year: '2020', event: 'Major engine upgrade', description: 'Engine retrofit for better efficiency' },
                        { year: '2022', event: 'Last dry docking', description: 'Complete hull and machinery overhaul' },
                        { year: '2023', event: 'Current ownership transfer', description: 'Transferred to current owner' },
                        { year: '2024', event: 'Major repair project', description: 'Ongoing extensive repair works' },
                      ].map((item, index, array) => (
                        <div key={index} className="flex mb-8">
                          {/* Timeline line */}
                          <div className="flex flex-col items-center mr-4">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              index === array.length - 1 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'
                            }`}>
                              <div className={`h-4 w-4 rounded-full ${
                                index === array.length - 1 ? 'bg-blue-500' : 'bg-gray-400'
                              }`} />
                            </div>
                            {index < array.length - 1 && (
                              <div className="flex-1 w-0.5 bg-gray-300 dark:bg-gray-600 mt-2" />
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 pb-8">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">{item.event}</h4>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{item.year}</span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VesselDetails;