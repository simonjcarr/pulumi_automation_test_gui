<template>
  <div class="form">
    <h2>Create a New Project</h2>
    <form @submit.prevent="createProject">
      <div>
        <label for="name">Name:</label>
        <input v-model="name" id="name" type="text"/>
      </div>
      <div>
        <label for="description">Description:</label>
        <input v-model="description" id="description" type="text"/>
      </div>
      <div>
        <label for="cores">Cores:</label>
        <input v-model="cores" id="cores" type="number"/>
      </div>
      <div>
        <label for="memory">Memory:</label>
        <input v-model="memory" id="memory" type="number"/>
      </div>
      <div>
        <label for="disk">Disk:</label>
        <input v-model="disk" id="disk" type="number"/>
      </div>
      <button type="submit">Create Project</button>
    </form>
  </div>
</template>

<script>
import { useProjectStore } from "../../stores/projectStore";

export default {
  data() {
    return {
      name: "",
      description: "",
      cores: null,
      memory: null,
      disk: null,
    };
  },
  methods: {
    createProject() {
      const projectStore = useProjectStore();
      projectStore.createProject({
        name: this.name,
        description: this.description,
        cores: this.cores,
        memory: this.memory,
        disk: this.disk,
      });
    },
  },
};
</script>

<style scoped>
.form {
  width: 50%;
  margin: auto;
}
form div {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
label {
  margin-bottom: 5px;
}
</style>
