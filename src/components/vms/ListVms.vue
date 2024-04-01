<template>
  <div class="row">

  </div>
  <q-table
    title="Virtual Machines"
    :rows="vmStore.getProjectVMs(projectStore.getSelectedProject._id)"
    :columns="columns"
    row-key="_id"
    v-model:selected="selected"
    :selection="`${props.wide ? 'multiple' : null}`"
  >
  <template v-slot:top >
    <div class="text-h6">Virtual Machines</div>
    <div>
      <q-btn class="q-ml-lg" size="sm" color="primary" icon="delete" label="Delete Selected" @click="handleDeleteSelected" v-if="props.wide && vmStore.getProjectVMs(projectStore.getSelectedProject._id).length>0" />
      <q-btn class="q-ml-lg" size="sm" color="primary" icon="add" label="Create VM" @click="handleAddVMClick" v-if="props.wide" />
    </div>
  </template>
  </q-table>


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
const selected = ref([])
const columns = ref([])
if (props.wide) {

  columns.value = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: 'name',
      sortable: true
    },
    {
      name: 'description',
      label: 'Description',
      align: 'left',
      field: 'description',
      sortable: true
    },
    {
      name: 'cores',
      label: 'Cores',
      align: 'left',
      field: 'cores',
      sortable: true
    },
    {
      name: 'memory',
      label: 'Memory',
      align: 'left',
      field: 'memory',
      sortable: true
    },
    {
      name: 'disk',
      label: 'Disk',
      align: 'left',
      field: 'disk',
      sortable: true
    },
    {
      name: 'actions',
      label: 'Actions',
      align: 'left',
      field: 'actions'
    }
  ]
} else {
  columns.value = [{
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: 'name',
      sortable: true
    }]
}


const { getProjectVMs } = storeToRefs(vmStore)
const { getSelectedProject } = storeToRefs(projectStore)

const router = useRouter()
function handleAddVMClick() {
  console.log('Add VM clicked')
  router.push('/vm/create')
}

function handleDeleteSelected() {
  selected.value.map((vm) => {
    vmStore.deleteVm(vm._id)
  })
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
