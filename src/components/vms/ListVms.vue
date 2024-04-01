<template>
  <div class="row">
    <div class="col-3 text-weight-bold">VM List</div>
    <div class="q-ml-sm">
      <q-btn v-if="projectStore.getSelectedProject" dense size="sm" color="primary" icon="add" label="Add" @click="handleAddVMClick" />
    </div>
  </div>
  <div v-if="projectStore.getSelectedProject">
    <div class="row">
        <div class="col text-weight-bold">Name</div>
        <div v-if="props.wide" class="col text-weight-bold">Description</div>
        <div v-if="props.wide" class="col text-weight-bold">Cores</div>
        <div v-if="props.wide" class="col text-weight-bold">Memory</div>
        <div v-if="props.wide" class="col text-weight-bold">Disk</div>
        <div class="col"></div>
      </div>
    <div v-for="vm in vmStore.getProjectVMs(projectStore.getSelectedProject._id)" :key="vm._id">

      <div class="row">
        <div class="col">{{ vm.name }}</div>
        <div v-if="props.wide" class="col">{{ vm.description }}</div>
        <div  v-if="props.wide" class="col">{{ vm.cores }}</div>
        <div v-if="props.wide" class="col">{{ vm.memory }}</div>
        <div v-if="props.wide" class="col">{{ vm.disk }}</div>
        <div class="col">
          <q-btn dense size="xs" color="negative" icon="delete" @click="handleDeleteClick(vm._id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVmStore } from '../../stores/vmStore'
import { useProjectStore } from '../../stores/projectStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const props = defineProps(['wide'])

const vmStore = useVmStore()
const projectStore = useProjectStore()

const { getProjectVMs } = storeToRefs(vmStore)
const { getSelectedProject } = storeToRefs(projectStore)

const router = useRouter()
function handleAddVMClick() {
  console.log('Add VM clicked')
  router.push('/vm/create')
}

function handleDeleteClick(id) {
  console.log('Delete clicked', id)
  vmStore.deleteVm(id)
}

watch(getSelectedProject, async () => {
  console.log('Selected project changed')
  await vmStore.fetchVmList()
  vmStore.getProjectVMs(projectStore.getSelectedProject._id)
})

// onMounted(() => {

//   vmStore.getProjectVMs(projectStore.getSelectedProject._id)
// })
</script>
