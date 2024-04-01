<template>
  <div>
    <form>
      <div>
        <q-input v-model="name" type="text" label="VM Name" />
      </div>
      <div>
        <q-input v-model="cores" type="number" label="Cores" />
      </div>
      <div>
        <q-input v-model="memory" type="number" label="Memory" />
      </div>
      <div>
        <q-input v-model="disk" type="number" label="Disk" />
      </div>
      <div>
        <q-select v-model="vmtype" :options="typeOptions" label="VM Type" filled />
      </div>
      <div>
        <q-input v-model="privIP" type="text" label="Private IP" />
      </div>
    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const cores = ref(null)
const memory = ref(null)
const disk = ref(null)
const vmtype = ref('')
const privIP = ref('')
const typeOptions = [
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


</script>
