import ElectionInstance from './../plugins/ElectionContract';
import web3 from './exportWeb3'

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
    addCandidate({commit}){
      setTimeout(function(){
        const election = ElectionInstance.electionContract();
        let arr = [];
        (function myLoop (i = 1) {
          election.methods.candidates(i)
          .call()
          .then(res => {
            if (res) {
              i = parseInt(res.id);
              if(i){
                arr.push(res);
                myLoop(++i);
              }
            }
          })
        })();
        setTimeout(function(){
          commit("ADD_CANDIDATE", arr);
        }, 1000)
      }, 1000);
    },

    vote({commit}, candidateID){
      const election = ElectionInstance.electionContract();
      election.methods.vote(candidateID)
      .send({
        from: this.getters["web3/coinbase"],
      });
      election.once('voteFor', (error, event) => {
        web3.eth.getTransactionReceipt(event.transactionHash)
        .then(res => {
          if(res.status){
            commit('SET_VOTE', candidateID);
          }
        })
      })
    }
  };

  export const mutations = {
    ADD_CANDIDATE(state, candidate){
      state.candidates = candidate
    },

    SET_VOTE(state, candidateID){
      state.candidateID = candidateID;
    }
  };
