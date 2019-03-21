export const  state = () => ({
    candidates: [],
    candidateName: [],
    candidateID: 0,
    isOpen: true,
  });

  export const getters = {
    candidates: (state) => state.candidates,
    isOpen: (state) => state.isOpen,
  };

  export const  actions = {
    addCandidateName({commit}, candidateName){
      commit('ADD_CANDIDATE_NAME', candidateName);
    },
    getCandidate ({commit}, candidateName) {
      commit('SET_CANDIDATE', candidateName);
    },
    addCandidate({commit}){
      commit('ADD_CANDIDATE');
    },
    vote({commit}, candidateID){
      commit('SET_VOTE', candidateID);
    }
  };

  export const mutations = {
    ADD_CANDIDATE_NAME(state, candidateName){
      state.candidateName.push(candidateName);
    },
    SET_CANDIDATE(state,candidates){
      state.candidates = candidates
    },
    ADD_CANDIDATE(state){
      state.candidates = []
      let tmp = this;
      Object.keys(window.localStorage).forEach(function(value){
        if(JSON.parse(window.localStorage.getItem(value)).name == tmp.$router.history.current.params.name){
          state.candidates = JSON.parse(window.localStorage.getItem(value)).candidate;
          return;
        }
      })
    },
    SET_VOTE(state, candidateID){
      state.candidateID = candidateID;
    }
  };
