import { createStore } from 'vuex'

export default createStore({
  state: {
    isOpen: false,
    mediaList: []
  },
  mutations: {
    openMenu (state, bool) {
      state.isOpen = bool
      // console.log('openMenu', state.isOpen)
    },
    getMediaList (state, mediaList) {
      state.mediaList = mediaList
      // console.log('state.mediaList', state.mediaList)
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isOpen (state) {
      return state.isOpen
    },
    mediaList (state) {
      return state.mediaList
    }
  }
})
