<template>
  <q-page class="q-pa-md">

    <div class="row">
      <div class="col-2 text-h6">Projects</div>
      <div class="col-10 text-h6" v-if="projectStore.selectedProject">Selected Project: {{ projectStore.selectedProject.name }}</div>
    </div>
    <div class="row">
      <div class="col-2 resource-box">
        <div>CPU Cores</div>
        <div>{{ projectStore.getSelectedProject?.usedResources?.cores ?? 0 }}/{{ projectStore.getSelectedProject?.cores ?? 0 }}</div>
      </div>
      <div class="col-2 resource-box">
        <div>Memory</div>
        <div>{{ projectStore.getSelectedProject?.usedResources?.memory ?? 0 }}/{{ projectStore.getSelectedProject?.memory ?? 0 }}</div>
      </div>
      <div class="col-2 resource-box">
        <div>Disk</div>
        <div>{{ projectStore.getSelectedProject?.usedResources?.disk ?? 0 }}/{{ projectStore.getSelectedProject?.disk ?? 0 }}</div>
      </div>
    </div>
    <ListVms :wide="true" />
  </q-page>
</template>

<script setup>
  import { useProjectStore } from 'src/stores/projectStore';
  import ListVms from 'src/components/vms/ListVms.vue';
  const projectStore = useProjectStore()
</script>

<style>
.resource-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
