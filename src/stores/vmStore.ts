import { defineStore } from 'pinia';
import { useProjectStore } from './projectStore';
// const projectStore = useProjectStore();

export const useVmStore = defineStore('vmStore', {
  state: () => ({
    vmList: [],
    API_BASE: "http://192.168.0.197:3000"
  }),

  getters: {
    getVMs (state) {
      return state.vmList;
    },
    getVmById: (state) => (id) => {
      return state.vmList.find(vm => vm._id === id);
    },
    getProjectVMs: (state) => (projectId) => {
      console.log(projectId)
      return state.vmList.filter(vm => vm.projectId === projectId);
    },
    getVmCountForProject: (state)  => {
      return (projectId) => {
        return state.vmList.filter(vm => vm.projectId === projectId).length;
      }
    }
  },

  actions: {
    async createVm (vm) {
      console.log(vm)
      const newVm = await fetch(`${this.API_BASE}/api/createVM`, {
        method: 'POST',
        body: JSON.stringify(vm),
        headers: { 'Content-Type': 'application/json' }
      })
      this.fetchVmList();
      const projectStore = useProjectStore();
      projectStore.getProjectResources(projectStore.getSelectedProject._id);
    },
    async fetchVmList () {
      const response = await fetch(`${this.API_BASE}/api/vmList`);
      const data = await response.json();
      this.vmList = data.data;
    },
    async deleteVm (vmId) {
      const response = await fetch(`${this.API_BASE}/api/deleteVM/${vmId}`, {
        method: 'DELETE'
      });
      this.fetchVmList();
      const projectStore = useProjectStore();
      projectStore.getProjectResources(projectStore.getSelectedProject._id);
    },

  }
});
