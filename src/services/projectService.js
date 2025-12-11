// Mock service for project management
class ProjectService {
  // Mock projects database
  projects = [
    {
      id: 1,
      shipId: 1,
      name: 'MV Ocean Queen - Major Repair',
      description: 'Complete hull repair and engine overhaul',
      status: 'on_track',
      progress: 75,
      startDate: '2024-01-10',
      deadline: '2024-03-15',
      budget: '2,500,000',
      spent: '1,875,000',
      coordinator: 'Raj Patel',
      teamLeader: 'Anil Kumar',
      teamSize: 45,
      tasks: {
        total: 20,
        completed: 15,
        open: 5,
      },
      documents: [
        { name: 'Engineering Drawings', type: 'pdf', size: '2.4 MB' },
        { name: 'Class Approval', type: 'pdf', size: '1.1 MB' },
        { name: 'Safety Plan', type: 'doc', size: '3.2 MB' },
      ],
    },
    {
      id: 2,
      shipId: 2,
      name: 'MV Sea Voyager - Dry Docking',
      description: 'Annual dry docking and maintenance',
      status: 'behind_schedule',
      progress: 45,
      startDate: '2024-02-01',
      deadline: '2024-05-30',
      budget: '1,800,000',
      spent: '810,000',
      coordinator: 'Priya Sharma',
      teamLeader: 'Sanjay Singh',
      teamSize: 32,
      tasks: {
        total: 18,
        completed: 8,
        open: 10,
      },
      documents: [
        { name: 'Dry Dock Plan', type: 'pdf', size: '3.1 MB' },
        { name: 'Survey Report', type: 'pdf', size: '2.8 MB' },
      ],
    },
  ];

  async getProjects() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.projects;
  }

  async getProjectDetails(projectId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const project = this.projects.find(p => p.id === parseInt(projectId));
    if (!project) throw new Error('Project not found');
    return project;
  }

  async updateProjectProgress(projectId, progress) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = this.projects.findIndex(p => p.id === parseInt(projectId));
    if (index === -1) throw new Error('Project not found');
    
    this.projects[index].progress = progress;
    if (progress >= 100) {
      this.projects[index].status = 'completed';
    }
    
    return this.projects[index];
  }
}

export const projectService = new ProjectService();