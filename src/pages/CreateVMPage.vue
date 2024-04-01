<template>
  <div class="q-pa-md">
    <h1 class="text-h6">Create VM</h1>
    <form @submit.prevent="handleFormSubmit">
      <div>
        <q-input
          v-model="name"
          label="VM Name"
          outlined
          dense
        />
      </div>
      <div class="q-mt-md">
        <q-select v-model="image" :options="imageOptions" label="OS Image" filled />
      </div>
      <div class="q-mt-md">
        <q-input
          v-model="description"
          label="Description"
          outlined
          dense


        />
      </div>
      <div class="q-mt-md">
        <q-input
          v-model="cores"
          :label="'Cores (Max: ' + projectStore.getAvailableResources.cores + ')'"
          outlined
          dense
          type="number"
          min:0
          :max="projectStore.getAvailableResources.cores"
          :rules="[val => val <= projectStore.getAvailableResources.cores || 'Cores exceed available resources']"
        />
      </div>
      <div class="q-mt-md">
        <q-input
          v-model="memory"
          :label="'Memory (Max: ' + projectStore.getAvailableResources.memory + 'MB)'"
          outlined
          dense
          type="number"
          min:0
          :max="projectStore.getAvailableResources.memory"
          :rules="[val => val <= projectStore.getAvailableResources.memory || 'Memory exceed available resources']"
        />
      </div>
      <div class="q-mt-md">
        <q-input
          v-model="disk"
          :label="'Disk (Max: ' + projectStore.getAvailableResources.disk + 'GB)'"
          outlined
          dense
          type="number"
          min:0
          :max="projectStore.getAvailableResources.disk"
          :rules="[val => val <= projectStore.getAvailableResources.disk || 'Disk exceed available resources']"
        />
      </div>
      <div class="q-mt-md">
        <q-input
          v-model="privNetworkIP"
          label="Private IPv4"
          outlined
          dense
        />
      </div>
      <div class="q-mt-md">
        <q-select v-model="vmType" :options="vmTypeOptions" label="VM Type" filled />
      </div>
      <div class="q-mt-md">
        <q-btn
          type="submit"
          label="Create"
          color="primary"
          class="full-width"
        />
      </div>

    </form
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProjectStore } from '../stores/projectStore'
import { useVmStore } from '../stores/vmStore'
import { useUserStore } from '../stores/users'
import { useRouter } from 'vue-router'

const projectStore = useProjectStore()
const vmStore = useVmStore()
const userStore = useUserStore()
const router = useRouter()

let name = ref('')
let description = ref('')
let image = ref('')
let cores = ref('')
let memory = ref('')
let disk = ref('')
let privNetworkIP = ref('')
let vmType = ref('')

let coresError = ref("")
let memoryError = ref("")
let diskError = ref("")

let vmTypeOptions = [
  {
    label: 'CX11',
    value: 'cx11'
  },
  {
    label: 'CPX11',
    value: 'cpx11'
  },
  {
    label: 'CX21',
    value: 'cx21'
  }
]

let imageOptions = [
  {
    label: 'Ubuntu 20.04',
    value: 'ubuntu-20.04'
  },
  {
    label: 'Ubuntu 18.04',
    value: 'ubuntu-18.04'
  },
  {
    label: 'CentOS 8',
    value: 'centos-stream-8'
  }
]

function handleFormSubmit() {
  console.log(projectStore.getSelectedProject._id)
  vmStore.createVm({
    name: name.value,
    description: description.value,
    image: image.value.value,
    cores: cores.value,
    memory: memory.value,
    disk: disk.value,
    serverType: vmType.value.value,
    privNetworkIP: privNetworkIP.value,
    projectId: projectStore.getSelectedProject._id,
  })
  router.push('/')
}

function validateCores() {
    if (cores.value > projectStore.getAvailableResources.cores) {
      coresError.value = "Cores exceed available resources"
    } else {
      coresError.value = ""
    }
  }
</script>

