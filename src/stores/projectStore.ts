import { defineStore } from 'pinia';
import { useVmStore } from './vmStore';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    projects: [],
    selectedProject: null,
    API_BASE: "http://192.168.0.197:3000"
  }),

  getters: {
    getProjects (state) {
      return state.projects.map(project => {
        const vmStore = useVmStore()

        return { ...project, label: project.name + ` (VM Count: ${vmStore.getVmCountForProject(project._id)})`, value: project._id}
      });
    },
    getProjectById: (state) => (id) => {
      return state.projects.find(project => project._id === id);
    },
    getSelectedProject (state) {
      return state.selectedProject;
    },
    getAvailableResources (state) {
      if (state.selectedProject) {
        return {
          cores: state.selectedProject.cores - (state.selectedProject.usedResources?.cores || 0),
          memory: state.selectedProject.memory - (state.selectedProject.usedResources?.memory || 0),
          disk: state.selectedProject.disk - (state.selectedProject.usedResources?.disk || 0)
        }
      } else {
        return {
          cores: 0,
          memory: 0,
          disk: 0
        }
      }
    }
  },

  actions: {
    // async createProject (project) {
    //   const result = await fetch(`${this.API_BASE}/api/createProject`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(project)
    //   });
    // },
    selectProject (projectId) {
      this.selectedProject = this.projects.find(project => project._id === projectId);
      this.getProjectResources(projectId);
    },
    clearSelectedProject () {
      this.selectedProject = null;
    },
    async createProject (project) {
      // use fetch to post a project to the api at http://localhost:3000/api/createProject.
       const result = await fetch(`${this.API_BASE}/api/createProject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: project.name,
          description: project.description,
          cores: project.cores,
          memory: project.memory,
          disk: project.disk
        })
      });
      console.log(result)
      //The result will contain the full list of projects. Use this to update the store
      const data = await result.json();
      this.fetchProjects();

    },

    fetchProjects () {
      // use fetch to get the list of projects from the api at http://localhost:3000/api/getProjects.
      fetch(`${this.API_BASE}/api/getProjects`)
        .then(response => response.json())
        .then(data => {
          this.projects = data.data;
        });
    },

    getProjectResources(projectId) {
      // Use fetch to get total used resources for a project from the api at http://localhost:3000/api/project/getUsedResources. The result will include results for all projects grouped by project id. Use this to update the project state with a property called usedResources: { cores: number, memory: number, disk: number }
      fetch(`${this.API_BASE}/api/project/getUsedResources`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const projectResources = data.data.find(project => project._id === projectId);
          this.projects = this.projects.map(project => {
            if (project._id === projectId) {
              project.usedResources = projectResources;
            }
            return project;
          });
        });
    }
  },


});


