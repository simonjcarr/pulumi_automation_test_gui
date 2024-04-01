<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          PULUMI GUI
        </q-toolbar-title>

        <div>
          <div v-if="userStore.getUser.username">{{ userStore.getUser.username }}</div>
          <div v-else>
            <q-btn
              flat
              to="/login"
              icon-right="login"
            >Login</q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="q-pa-sm"
    >
    <q-btn dense size="sm" color="primary" icon="add" label="New Project" @click="handleCreateProject" />
      <q-list>
        <q-item-label
          header
        >
        </q-item-label>

        <EssentialLink
          v-for="link in projectList"
          :key="link.title"
          v-bind="link"
        />
        <selectProject />
        <ListVms />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useUserStore } from 'stores/users'
import selectProject from 'components/projects/SelectProject.vue'
import ListVms from 'components/vms/ListVms.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

defineOptions({
  name: 'MainLayout'
})

const handleCreateProject = () => {
  router.push('/projects/create')
}

const projectList = [
  // {
  //   title: '',
  //   caption: 'Projects',
  //   icon: 'school',
  //   link: 'projects'
  // },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
