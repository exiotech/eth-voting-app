import ElectionInstance from './../plugins/ElectionContract';
import web3 from './exportWeb3'

export const  state = () => ({
  numenationPeriod: "",
  votingPeriod: "",
  giveRightToVote: "",
});

export const getters = {
};

export const actions = {
  setNumPeriod({commit}, payload){
    const election = ElectionInstance.electionContract();
    election.methods.chairperson()
    .call()
    .then(address => {
      election.methods.nominationPeriod(payload.start, payload.end)
      .send({
        from: address,
      })
      election.once('Nomination', (error, event) => {
        web3.eth.getTransactionReceipt(event.transactionHash)
        .then(res => {
          if(res.status){
            let data = JSON.parse(window.localStorage.getItem(payload.id + ""))
            election.methods.nominationStart()
            .call()
            .then(start => {
              data.nomStart = start;
              election.methods.nominationEnd()
              .call()
              .then(end => {
                  data.nomEnd = end;
                  window.localStorage.setItem(data.id, JSON.stringify(data))
                  commit('SET_NUM_PERIOD', payload.id);
              })
            })
          }
        })
      })
    })
  },

  setVotPeriod({commit}, payload){
    const election = ElectionInstance.electionContract();
    election.methods.chairperson()
    .call()
    .then(address => {
      election.methods.votingPeriod(payload.start, payload.end)
      .send({
        from: address,
      })
      election.once('Voting', (error, event) => {
        web3.eth.getTransactionReceipt(event.transactionHash)
        .then(res => {
          if(res.status){
            let data = JSON.parse(window.localStorage.getItem(payload.id + ""))
            election.methods.votingStart()
            .call()
            .then(start => {
              data.votStart = start;
              election.methods.votingEnd()
              .call()
              .then(end => {
                  data.votEnd = end;
                  window.localStorage.setItem(data.id, JSON.stringify(data))
                  commit('SET_VOT_PERIOD', payload.id);
              })
            })
          }
        })
      })
    })
  },
  addCandidateName({commit}, payload){
    const election = ElectionInstance.electionContract();
    election.methods.chairperson()
    .call()
    .then(address => {
      election.methods.addCandidate(payload)
      .send({
        from: address,
      })
      election.once('CandidateCreated', (error, event) => {
        web3.eth.getTransactionReceipt(event.transactionHash)
        .then(res => {
          if(res.status){
            window.$nuxt.$root.$store._actions["voting/addCandidate"][0]();
            Object.keys(window.localStorage).forEach(function(value){
              let data = JSON.parse(window.localStorage.getItem(value));
              if(data.id == window.$nuxt.$root.$store.$router.history.current.params.id){
                election.methods.candidatesCount()
                .call()
                .then(count => {
                  data.candidateCount = count;
                  window.localStorage.setItem(data.id, JSON.stringify(data));
                })
                return;
              }
            })
          }
        })
      })
    })
  },

  setGiveRightToVote({commit}, payload){
    const election = ElectionInstance.electionContract();
    election.methods.chairperson()
    .call()
    .then(address => {
      election.methods.giveRightToVote(payload)
      .send({
        from: address,
      })
      election.once('givePermission', (error, event) => {
        web3.eth.getTransactionReceipt(event.transactionHash)
        .then(res => {
          if(res.status){
            commit('SET_GIVE_RIGHT_TO_VOTE', payload);
          }
        })
      })
    })
  }
};

export const mutations = {
  SET_NUM_PERIOD(state, payload){
    state.numenationPeriod = payload;
  },
  SET_VOT_PERIOD(state, payload){
    state.votingPeriod = payload;
  },
  SET_GIVE_RIGHT_TO_VOTE(state, payload){
    state.giveRightToVote = payload;
  }
}
