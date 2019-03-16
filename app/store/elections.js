export const  state = () => ({
     elections: [],
     electionName: [],
  });


  export const getters = {
    elections: (state) => state.elections,
  };

  export const actions = {
    addElectionName({commit}, electionName){
      commit('ADD_ELECTION_NAME', electionName)
    },
    async getElection ({ commit }) {
        commit('GET_ELECTION')
   }
  };

  export const mutations = {
    SET_ELECTION(state, elections){
      state.elections = elections
    },
    GET_ELECTION(state){
      state.elections = []
      // window.localStorage.clear();
      Object.keys(window.localStorage).forEach(function(value){
        state.elections.push(JSON.parse(window.localStorage.getItem(value)))
      })
      if(window.localStorage.length > 1){
        state.elections.sort((a, b) => a.id-b.id);
      }
    },
    SET_ELECTION_NAME(state, electionName){
      state.electionName = electionName
    },
    ADD_ELECTION_NAME(state, electionName){
      state.electionName.push(electionName)
    }
  }
