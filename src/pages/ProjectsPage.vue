<template>
 <q-page class="q-pa-md">
    <div class="row">
      <div class="col-2 text-h6">Projects</div>
      <div class="col-10 text-h6" v-if="projectStore.selectedProject">Selected Project: {{ projectStore.selectedProject.name }}</div>
    </div>
    <div class="row">
      <div class="col-2">
        <q-select v-if="!showCreateProject" dense filled v-model="selectedProject" :options="projectStore.getProjects" label="Select Project" />
      </div>
      <div class="col-10">
        <q-btn color="primary" dense size="md" :icon="showCreateProject?'list':'add'" :label="showCreateProject?'List Projects':'Create Project'" @click="showCreateProject=!showCreateProject" />
      </div>
    </div>
  <div v-if="showCreateProject">
  <CreateProject />
  </div>
  <div v-else>
    <ListVms />
  </div>
 </q-page>
</template>

<script setup>
  import { ref } from 'vue'
  import { onMounted, watch } from 'vue';
  import { useProjectStore } from 'src/stores/projectStore';
  import CreateProject from 'src/components/projects/CreateProject.vue'
  import ListVms from 'src/components/vms/ListVms.vue'


  let showCreateProject = ref(false)
  const projectStore = useProjectStore()

  onMounted(() => {
    projectStore.fetchProjects()
  })

  let selectedProject = ref(null)

  watch(selectedProject, (newVal,) => {
    if(newVal) {
      projectStore.selectProject(newVal._id)
    }
  })
</script>
