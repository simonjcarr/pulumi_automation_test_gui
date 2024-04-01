<template>
  <q-page class="flex flex-center">
    <div>
      <div>
        <h2>Login</h2>
      </div>
      <form @submit.prevent="handleSubmit">
        <div>
          <input type="text" v-model="username" placeholder="Username"/>
        </div>
        <div>
          <input type="password" v-model="password" placeholder="Password"/>
        </div>
        <div class="q-mt-sm">
          <q-btn color="primary" type="submit">Login</q-btn>
        </div>
      </form>
      {{ loginError }}
    </div>
  </q-page>
</template>

<script setup>
import { QBtn } from 'quasar';
import {useUserStore} from '../stores/users'
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const username = ref('')
const password = ref('')

const loginError = ref('')
const handleSubmit = async () => {
  try {
    await userStore.login(username.value, password.value)
    if(userStore.getUser._id) {
      router.push("/")
    }
  } catch (error) {
    loginError.value = error.message
  }
}


</script>
