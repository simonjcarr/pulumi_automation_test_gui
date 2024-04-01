import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();

export const useUserStore = defineStore("userStore",{
  state: () => ({
    user: {},
    API_BASE: "http://192.168.0.197:3000"
  }),

  getters: {
    getUser (state) {
      return state.user;
    }
  },

  actions: {
    async login (username, password) {

      const response = await fetch(`${this.API_BASE}/api/userLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      console.log(response)
        const data = await response.json()
        this.user = data.data;
    }
  }
});
