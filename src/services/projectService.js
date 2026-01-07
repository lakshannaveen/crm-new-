import api from "./api";

// Mock service for project management
class ProjectService {
  // Mock projects database
  projects = [
    {
      id: 1,
      shipId: 1,
      name: "MV Ocean Queen - Major Repair",
      description: "Complete hull repair and engine overhaul",
      status: "on_track",
      progress: 75,
      startDate: "2024-01-10",
      deadline: "2024-03-15",
      budget: "2,500,000",
      spent: "1,875,000",
      coordinator: "Raj Patel",
      teamLeader: "Anil Kumar",
      teamSize: 45,
      tasks: {
        total: 20,
        completed: 15,
        open: 5,
      },
      documents: [
        { name: "Engineering Drawings", type: "pdf", size: "2.4 MB" },
        { name: "Class Approval", type: "pdf", size: "1.1 MB" },
        { name: "Safety Plan", type: "doc", size: "3.2 MB" },
      ],
    },
    {
      id: 2,
      shipId: 2,
      name: "MV Sea Voyager - Dry Docking",
      description: "Annual dry docking and maintenance",
      status: "behind_schedule",
      progress: 45,
      startDate: "2024-02-01",
      deadline: "2024-05-30",
      budget: "1,800,000",
      spent: "810,000",
      coordinator: "Priya Sharma",
      teamLeader: "Sanjay Singh",
      teamSize: 32,
      tasks: {
        total: 18,
        completed: 8,
        open: 10,
      },
      documents: [
        { name: "Dry Dock Plan", type: "pdf", size: "3.1 MB" },
        { name: "Survey Report", type: "pdf", size: "2.8 MB" },
      ],
    },
  ];

  async getProjects() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.projects;
  }

  async getProjectDetails(projectId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const project = this.projects.find((p) => p.id === parseInt(projectId));
    if (!project) throw new Error("Project not found");
    return project;
  }

  async updateProjectProgress(projectId, progress) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = this.projects.findIndex((p) => p.id === parseInt(projectId));
    if (index === -1) throw new Error("Project not found");

    this.projects[index].progress = progress;
    if (progress >= 100) {
      this.projects[index].status = "completed";
    }

    return this.projects[index];
  }

  async getMilestonesByShip(jobCategory, jmain) {
    try {
      const response = await api.get(
        "/CDLRequirmentManagement/Milestone/GetMilestonebyShip",
        {
          params: {
            p_job_category: jobCategory,
            p_jmain: jmain,
          },
        }
      );

      const milestones = response.data?.ResultSet || [];

      // Get milestone types to fetch descriptions
      const milestoneTypes = await this.getMilestoneTypes();

      // Create a map of milestone codes to descriptions
      const milestoneDescMap = {};
      milestoneTypes.forEach((type) => {
        const code = type.MILESTONE_CODE || type.code;
        const description = type.MILESTONE_DESCRIPTION || type.description;
        if (code && description) {
          milestoneDescMap[code] = description;
        }
      });

      return milestones.map((milestone) =>
        this.transformMilestoneData(milestone, milestoneDescMap)
      );
    } catch (error) {
      console.error("Error fetching milestones:", error);
      throw error;
    }
  }

  async getMilestoneTypes() {
    try {
      const response = await api.get(
        "/CDLRequirmentManagement/Milestone/GetAllMilestoneTypes"
      );
      return response.data?.ResultSet || [];
    } catch (error) {
      console.error("Error fetching milestone types:", error);
      return [];
    }
  }

  transformMilestoneData(apiMilestone, milestoneDescMap = {}) {
    // Get milestone code from API response
    const milestoneCode =
      apiMilestone.MILESTONE_CODE ||
      apiMilestone.P_MILESTONE_CODE ||
      apiMilestone.code;

    // Get description from milestone types map, fallback to API data
    const milestoneDescription =
      milestoneDescMap[milestoneCode] ||
      apiMilestone.MILESTONE_NAME ||
      apiMilestone.title ||
      "Unnamed Milestone";

    // Transform API milestone data to match the expected format
    return {
      id: apiMilestone.MILESTONE_ID || apiMilestone.id,
      title: milestoneDescription,
      description:
        apiMilestone.MILESTONE_DESC || apiMilestone.description || "",
      date:
        apiMilestone.P_MILESTONE_DATE ||
        apiMilestone.MILESTONE_DATE ||
        apiMilestone.date ||
        new Date().toISOString(),
      remarks: apiMilestone.P_REMARKS || apiMilestone.REMARKS || "",
      location:
        apiMilestone.P_MILESTONE_LOCATION ||
        apiMilestone.MILESTONE_LOCATION ||
        "",
      status: this.getMilestoneStatus(apiMilestone),
      progress: apiMilestone.MILESTONE_PROGRESS || apiMilestone.progress || 0,
      // Keep raw data for reference
      raw: apiMilestone,
    };
  }

  getMilestoneStatus(milestone) {
    // Determine status based on API data
    const statusCode = milestone.MILESTONE_STATUS || milestone.status;

    if (
      statusCode === "C" ||
      statusCode === "completed" ||
      milestone.MILESTONE_PROGRESS >= 100
    ) {
      return "completed";
    } else if (
      statusCode === "P" ||
      statusCode === "in_progress" ||
      (milestone.MILESTONE_PROGRESS > 0 && milestone.MILESTONE_PROGRESS < 100)
    ) {
      return "in_progress";
    } else {
      return "pending";
    }
  }
}

export const projectService = new ProjectService();
