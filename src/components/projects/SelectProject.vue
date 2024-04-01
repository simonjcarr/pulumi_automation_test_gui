<template>
  <div>
    <q-select  dense filled v-model="selectedProject" :options="projectStore.getProjects" label="Select Project" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted, watch } from 'vue';
import { useProjectStore } from 'src/stores/projectStore';
import { useVmStore } from '../../stores/vmStore';

const projectStore = useProjectStore()
const vmStore = useVmStore()

onMounted(() => {
    projectStore.fetchProjects()
})

let selectedProject = ref(null)

// const projectsListWithVmCount = computed(() => projects.map(project => ({
//       id: project.id, // Assuming each project has an id
//       label: `${project.name} (${vmStore.getVmCountForProject(project.id)})`, // Modify to match your data structure
//     })));

watch(selectedProject, (newVal,) => {
  if(newVal) {
    projectStore.selectProject(newVal._id)
  }
})

</script>
