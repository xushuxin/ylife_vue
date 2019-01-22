import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {//突变store时默认需要的第一个参数，this.$store.commit(提交的方法,提交的参数)
    changeContrastState(state,ContrastState){
      state.isContrast=ContrastState
    }
  },
  actions: {

  }
})
