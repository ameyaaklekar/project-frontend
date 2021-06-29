import axios from "axios"

export default {
  namespaced: true,

  state: {
    authenticated: null,
    user: null
  },
  getters: {
    authenticated(state) {
      return state.authenticated
    },

    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_AUTHENTICATION(state, data) {
      state.authenticated = data
    },
    SET_USER(state, data) {
      state.user = data
    }
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try {
        let response = await axios.post("login", credentials)
        if (!response.errors) {
          localStorage.setItem("Auth", 1)
          await dispatch("getUser")
        }
      } catch (e) {
        commit("SET_AUTHENTICATION", null)
        localStorage.removeItem("Auth")
        if (e.response.data.errors) {
          return e.response.data
        }
      }
    },

    async signOut({ commit }) {
      await axios.post("logout")
      commit("SET_AUTHENTICATION", null)
      commit("SET_USER", null)
      localStorage.removeItem("Auth")
    },

    async getUser({ commit }) {
      try {
        let response = await axios.get("user")
        localStorage.setItem("Auth", 1)
        commit("SET_AUTHENTICATION", true)
        commit("SET_USER", response.data)
      } catch (e) {
        localStorage.removeItem("Auth")
        commit("SET_AUTHENTICATION", null)
        commit("SET_USER", null)
      }
    },

    async register(_, data) {
      try {
        await axios.post("register", data)
      } catch (e) {
        if (e.response.data.errors) {
          return e.response.data
        }
      }
    },

    async updateUser({ commit }, data) {
      try {
        let response = await axios.put("user", data)
        if (!response.errors) {
          commit("SET_USER", response.data.data)
        }
        return response
      } catch (e) {
        if (e.response.data.errors) {
          return e.response.data
        }
      }
    }
  }
}