<template>
  <q-page style="q-pa-sm">
  <!-- Form to create a project -->
  <q-form @submit="createProject">
    <q-input v-model="name" label="Project Name" />
    <q-input v-model="description" label="Description" />
    <q-input v-model="cores" label="Cores" />
    <q-input v-model="memory" label="Memory" />
    <q-input v-model="disk" label="Disk" />
    <q-btn type="submit" label="Create Project" color="primary" />
  </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useProjectStore } from 'src/stores/projectStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const projectStore = useProjectStore()

let name = ref('')
let description = ref('')
let cores = ref(0)
let memory = ref(0)
let disk = ref(0)

const createProject = () => {
  console.log('Creating project', name, description, cores, memory, disk)
  projectStore.createProject({
    name: name.value,
    description: description.value,
    cores: cores.value,
    memory: memory.value,
    disk: disk.value
  })
  router.push('/')
}
</script>
