import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();

export const useUserStore = defineStore("userStore",{
  state: () => ({
    user: {}
  }),

  getters: {
    getUser (state) {
      return state.user;
    }
  },

  actions: {
    async login (username, password) {

      const response = await fetch('http://localhost:3000/api/userLogin', {
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
