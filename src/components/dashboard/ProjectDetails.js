import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { getProjectDetails } from '../../actions/projectActions';
import {
  FiCalendar, FiUsers, FiDollarSign, FiFileText,
  FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp,
  FiBarChart2, FiDownload, FiShare2, FiMessageSquare,
  FiSettings, FiArrowLeft, FiEye, FiEdit, FiTrash2
} from 'react-icons/fi';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { getStatusColor, getStatusText } from '../../utils/helpers';
import ProgressBar from '../common/ProgressBar';
import Card from '../common/Card';

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector(state => state.projects);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      dispatch(getProjectDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <FiAlertCircle className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Project Not Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The requested project could not be found.
        </p>
        <Link to="/dashboard" className="btn-primary inline-flex items-center">
          <FiArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const statusColor = getStatusColor(currentProject.status);
  const statusText = getStatusText(currentProject.status);

  const milestones = [
    { title: 'Project Kickoff', date: '2024-01-10', status: 'completed', progress: 100 },
    { title: 'Hull Assessment', date: '2024-01-25', status: 'completed', progress: 100 },
    { title: 'Engine Dismantling', date: '2024-02-10', status: 'completed', progress: 100 },
    { title: 'Hull Repair', date: '2024-02-25', status: 'in_progress', progress: 85 },
    { title: 'Engine Reassembly', date: '2024-03-05', status: 'pending', progress: 30 },
    { title: 'System Testing', date: '2024-03-10', status: 'pending', progress: 0 },
    { title: 'Final Inspection', date: '2024-03-12', status: 'pending', progress: 0 },
    { title: 'Project Completion', date: '2024-03-15', status: 'pending', progress: 0 },
  ];

  const tasks = [
    { id: 1, title: 'Hull Cleaning & Painting', status: 'completed', progress: 100, assignee: 'Team A' },
    { id: 2, title: 'Engine Overhaul', status: 'in_progress', progress: 75, assignee: 'Team B' },
    { id: 3, title: 'Navigation System Update', status: 'in_progress', progress: 60, assignee: 'Team C' },
    { id: 4, title: 'Safety Equipment Inspection', status: 'pending', progress: 30, assignee: 'Team D' },
    { id: 5, title: 'Cargo Hold Maintenance', status: 'pending', progress: 10, assignee: 'Team E' },
  ];

  const teamMembers = [
    { name: 'Raj Patel', role: 'Project Coordinator', department: 'Management', avatar: 'RP' },
    { name: 'Anil Kumar', role: 'Team Leader', department: 'Engineering', avatar: 'AK' },
    { name: 'Maria Silva', role: 'Safety Officer', department: 'Safety', avatar: 'MS' },
    { name: 'David Chen', role: 'Quality Inspector', department: 'QC', avatar: 'DC' },
    { name: 'Sarah Johnson', role: 'Electrical Engineer', department: 'Engineering', avatar: 'SJ' },
    { name: 'Michael Brown', role: 'Mechanical Engineer', department: 'Engineering', avatar: 'MB' },
  ];

  const documents = [
    { name: 'Engineering Drawings', type: 'PDF', size: '2.4 MB', uploadDate: '2024-01-15' },
    { name: 'Class Approval Certificate', type: 'PDF', size: '1.1 MB', uploadDate: '2024-01-20' },
    { name: 'Safety Plan', type: 'DOC', size: '3.2 MB', uploadDate: '2024-01-25' },
    { name: 'Inspection Reports', type: 'PDF', size: '4.7 MB', uploadDate: '2024-02-01' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor} mr-3`}>
              {statusText}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Project ID: {currentProject.id}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentProject.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {currentProject.description}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <FiShare2 className="text-gray-400" />
          </button>
          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <FiDownload className="text-gray-400" />
          </button>
          <Link to={`/projects/${id}/edit`} className="btn-primary flex items-center">
            <FiEdit className="mr-2" />
            Edit Project
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding={true} hover={true}>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
              <FiTrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentProject.progress}%
              </p>
            </div>
          </div>
          <div className="mt-3">
            <ProgressBar progress={currentProject.progress} size="small" />
          </div>
        </Card>

        <Card padding={true} hover={true}>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
              <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentProject.tasks?.completed || 0}/{currentProject.tasks?.total || 0}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {currentProject.tasks?.open || 0} tasks remaining
          </p>
        </Card>

        <Card padding={true} hover={true}>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
              <FiDollarSign className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Budget Spent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(currentProject.spent || 0)}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            of {formatCurrency(currentProject.budget || 0)} total
          </p>
        </Card>

        <Card padding={true} hover={true}>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg mr-4">
              <FiUsers className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Team Size</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentProject.teamSize || 0}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {currentProject.coordinator ? `Coordinator: ${currentProject.coordinator}` : 'No coordinator assigned'}
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px space-x-8 overflow-x-auto">
            {['overview', 'milestones', 'tasks', 'team', 'documents', 'communications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Project Timeline
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center mb-3">
                      <FiCalendar className="text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Start Date</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(currentProject.startDate, 'long')}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      Project commencement date
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center mb-3">
                      <FiClock className="text-green-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Deadline</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(currentProject.deadline, 'long')}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      Expected completion date
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Budget Overview
                </h3>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Budget</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(currentProject.budget || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Spent</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(currentProject.spent || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency((currentProject.budget || 0) - (currentProject.spent || 0))}
                      </p>
                    </div>
                  </div>
                  <ProgressBar 
                    progress={((currentProject.spent || 0) / (currentProject.budget || 1)) * 100}
                    color={((currentProject.spent || 0) / (currentProject.budget || 1)) > 0.9 ? 'red' : 'green'}
                    showPercentage={true}
                  />
                </div>
              </div>

              {/* Key Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Key Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Efficiency</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">92%</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">On Time</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">85%</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Quality Score</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">94%</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Risk Level</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">Low</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Milestones Tab */}
          {activeTab === 'milestones' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Project Milestones
              </h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="mr-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        milestone.status === 'completed' ? 'bg-green-100 dark:bg-green-900' :
                        milestone.status === 'in_progress' ? 'bg-blue-100 dark:bg-blue-900' :
                        'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        {milestone.status === 'completed' ? (
                          <FiCheckCircle className={`text-green-600 dark:text-green-300`} />
                        ) : milestone.status === 'in_progress' ? (
                          <FiClock className={`text-blue-600 dark:text-blue-300`} />
                        ) : (
                          <FiCalendar className={`text-gray-600 dark:text-gray-300`} />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-gray-900 dark:text-white">{milestone.title}</p>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(milestone.date, 'short')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
                          <div className={`h-full ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'in_progress' ? 'bg-blue-500' :
                            'bg-gray-400'
                          }`} style={{ width: `${milestone.progress}%` }} />
                        </div>
                        <span className={`text-sm font-medium ${
                          milestone.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                          milestone.status === 'in_progress' ? 'text-blue-600 dark:text-blue-400' :
                          'text-gray-600 dark:text-gray-400'
                        }`}>
                          {milestone.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Tasks</h3>
                <button className="btn-primary text-sm">
                  <FiEdit className="mr-2" />
                  Manage Tasks
                </button>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {task.status === 'completed' ? (
                          <FiCheckCircle className="text-green-500 mr-3" />
                        ) : task.status === 'in_progress' ? (
                          <FiClock className="text-blue-500 mr-3" />
                        ) : (
                          <FiAlertCircle className="text-yellow-500 mr-3" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {task.status.replace('_', ' ')} • Assigned to: {task.assignee}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
                          <div className="h-full bg-blue-500" style={{ width: `${task.progress}%` }} />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{task.progress}%</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        <FiEye className="inline mr-1" />
                        View Details
                      </button>
                      <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 ml-4">
                        <FiMessageSquare className="inline mr-1" />
                        Comment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Team</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {teamMembers.length} team members
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-start mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                        <span className="text-blue-600 dark:text-blue-300 font-medium">
                          {member.avatar}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{member.department} Department</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <FiUsers className="text-gray-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-400">Assigned to 5 tasks</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiCheckCircle className="text-gray-400 mr-2" />
                        <span className="text-gray-600 dark:text-gray-400">85% completion rate</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                        Message
                      </button>
                      <button className="flex-1 py-2 text-sm btn-primary">
                        Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Documents</h3>
                <button className="btn-primary flex items-center text-sm">
                  <FiDownload className="mr-2" />
                  Download All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {doc.type} • {doc.size}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Uploaded: {formatDate(doc.uploadDate, 'short')}
                        </p>
                      </div>
                      <FiFileText className="text-gray-400" />
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                        Preview
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

          {/* Communications Tab */}
          {activeTab === 'communications' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Project Communications</h3>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Meeting Schedule</h4>
                  <div className="space-y-2">
                    {[
                      { title: 'Weekly Progress Meeting', time: 'Every Monday, 10:00 AM', attendees: 'All team leads' },
                      { title: 'Safety Review', time: 'Every Wednesday, 2:00 PM', attendees: 'Safety team' },
                      { title: 'Client Update', time: 'Every Friday, 11:00 AM', attendees: 'Project Coordinator + Client' },
                    ].map((meeting, index) => (
                      <div key={index} className="flex items-center p-3 hover:bg-white dark:hover:bg-gray-600 rounded">
                        <FiCalendar className="text-gray-400 mr-3" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{meeting.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{meeting.time}</p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{meeting.attendees}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Message</h4>
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message to the project team..."
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <FiFileText className="text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <FiDownload className="text-gray-400" />
                      </button>
                    </div>
                    <button className="btn-primary px-6 py-2">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProjectDetails;