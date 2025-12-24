
import React from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiCalendar, FiAnchor, FiFlag, FiNavigation, 
   FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';
import { formatDate } from '../../utils/formatters';
import { getStatusColor, getStatusText } from '../../utils/helpers';

const ShipDetailsModal = ({ ship, onClose }) => {
  const statusColor = getStatusColor(ship.status);
  const statusText = getStatusText(ship.status);

  const specifications = [
    { label: 'IMO Number', value: ship.imoNumber, icon: FiAnchor },
    { label: 'Ship Type', value: ship.type, icon: FiNavigation },
    { label: 'Flag', value: ship.flag, icon: FiFlag },
    { label: 'DWT', value: ship.dwt },
    { label: 'Gross Tonnage', value: ship.grossTonnage },
    { label: 'Length', value: ship.length },
    { label: 'Beam', value: ship.beam },
    { label: 'Draft', value: ship.draft },
    { label: 'Year Built', value: ship.yearBuilt },
  ];

  const maintenance = [
    { label: 'Last Dry Docking', value: ship.lastDryDocking, icon: FiCalendar },
    { label: 'Next Dry Docking', value: ship.nextDryDocking, icon: FiTrendingUp },
    { label: 'Class Survey Due', value: ship.classSurveyDue, icon: FiCheckCircle },
  ];

  // Sample milestones data - in real app, this would come from props
  const milestones = [
    { id: 1, name: 'Docking Completed', date: '2024-01-15', completed: true },
    { id: 2, name: 'Hull Cleaning', date: '2024-01-20', completed: true },
    { id: 3, name: 'Propeller Repair', date: '2024-01-25', completed: true },
    { id: 4, name: 'Engine Overhaul', date: '2024-02-01', completed: false },
    { id: 5, name: 'Navigation Systems', date: '2024-02-10', completed: false },
    { id: 6, name: 'Sea Trials', date: '2024-02-15', completed: false },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative inline-block w-full max-w-4xl text-left align-middle 
                      bg-white dark:bg-gray-800 rounded-2xl shadow-xl 
                      transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b 
                        border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {ship.name}
              </h3>
              <div className="flex items-center mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                  {statusText}
                </span>
                <span className="ml-3 text-gray-600 dark:text-gray-400">
                  IMO: {ship.imoNumber}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                       transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image & Basic Info */}
              <div>
                <div className="rounded-lg overflow-hidden mb-6">
                  <img
                    src={ship.image}
                    alt={ship.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Repair Progress</span>
                    <span className="font-medium">{ship.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${ship.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Started: {formatDate(ship.startDate, 'short')}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      Target: {formatDate(ship.endDate, 'short')}
                    </span>
                  </div>
                </div>

                {/* Maintenance Schedule */}
                <div className="space-y-6 mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Maintenance Schedule
                  </h4>
                  {maintenance.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 
                                              bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        {item.icon && <item.icon className="mr-3 text-gray-400" />}
                        <span className="text-gray-700 dark:text-gray-300">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatDate(item.value, 'short')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Milestones Timeline */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Project Milestones
                  </h4>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 ml-6"></div>
                    
                    <div className="space-y-6">
                      {milestones.map((milestone, index) => (
                        <div key={milestone.id} className="relative flex items-center">
                          <div className={`z-10 w-12 h-12 rounded-full flex items-center justify-center 
                                        border-4 border-white dark:border-gray-800 shadow-sm ${
                            milestone.completed 
                              ? 'bg-green-100 dark:bg-green-900/30' 
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            {milestone.completed ? (
                              <FiCheckCircle size={20} className="text-green-600 dark:text-green-400" />
                            ) : (
                              <FiClock size={20} className="text-gray-400" />
                            )}
                          </div>
                          <div className="ml-8 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {milestone.name}
                              </h4>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {formatDate(milestone.date, 'short')}
                              </span>
                            </div>
                            <p className={`text-sm mt-1 ${
                              milestone.completed 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {milestone.completed ? 'Completed on schedule' : 'Scheduled'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Specifications */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Specifications
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center mb-2">
                        {spec.icon && <spec.icon className="mr-2 text-gray-400" />}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {spec.label}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Project Details
                  </h4>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Current Status
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {ship.status === 'under_repair' 
                        ? 'Vessel is currently undergoing repairs in Dock 3' 
                        : ship.status === 'in_dock' 
                        ? 'Vessel is docked and awaiting repair commencement'
                        : 'Repair work is planned and scheduled'}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Project Coordinator
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Captain R. Perera
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      +94 77 456 7890
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Dock Location
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Dock 3, Colombo Dockyard
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Berth Number: B-12
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-6 
                        border-t border-gray-200 dark:border-gray-700 gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Last updated: {formatDate(new Date().toISOString(), 'long')}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 
                         rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                         transition-colors"
              >
                Close
              </button>
              <Link
                to={`/projects/${ship.projectId || ship.id}`}
                className="px-6 py-2 btn-primary inline-block text-center"
                style={{ minWidth: 120 }}
              >
                View Full Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipDetailsModal;