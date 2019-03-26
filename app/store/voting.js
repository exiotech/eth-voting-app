import ElectionInstance from './../plugins/ElectionContract';

export const  state = () => ({
    candidates: [],
    candidateID: 0,
    isOpen: true,
  });

  export const getters = {
    candidates: (state) => state.candidates,
    isOpen: (state) => state.isOpen,
  };

  export const  actions = {
    addCandidateName({commit}, payload){
      const election = ElectionInstance.electionContract();
      election.methods.addCandidate(payload)
      .send({
        from: this.getters["web3/coinbase"],
      })
      election.once('CandidateCreated', (error, event) => {
      election.methods.candidates(event.returnValues._id)
      .call()
      .then(res => {
        commit('ADD_CANDIDATE', res);
      })
    })
  },

    addCandidate({commit}){
      setTimeout(function(){
        const election = ElectionInstance.electionContract();
        (function myLoop (i = 1) {
          election.methods.candidates(i)
          .call()
          .then(res => {
            if (res) {
              i = parseInt(res.id);
              if(i){
                commit('ADD_CANDIDATE', res);
                myLoop(++i);
              }
            }
          })
        })();
      }, 1000);
    },

    vote({commit}, candidateID){
      const election = ElectionInstance.electionContract();
      election.methods.vote(candidateID)
      .send({
        from: this.getters["web3/coinbase"],
      });
      commit('SET_VOTE', candidateID);
    }
  };

  export const mutations = {
    ADD_CANDIDATE(state, candidate){
      if(candidate.id == 1 && state.candidates.length > 0)
        state.candidates = [];
      state.candidates.push(candidate)
    },

    SET_VOTE(state, candidateID){
      state.candidateID = candidateID;
    }
  };
