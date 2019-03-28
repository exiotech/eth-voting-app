import ElectionInstance from './../plugins/ElectionContract';
import web3 from './exportWeb3'

export const  state = () => ({
  years: ['2019', '2020', '2021', '2022', '2023', '2024','2025', '2026', '2027', '2028', '2029', '2030'],
  numenationPeriod: "",
  votingPeriod: "",
  giveRightToVote: "",
});

export const getters = {
  years: (state) => state.years,
};

export const actions = {
    setNumPeriod({commit}, payload){
      const election = ElectionInstance.electionContract();
      election.methods.nominationPeriod(payload.start, payload.end)
      .send({
        from: this.getters["web3/coinbase"],
      })
      election.once('Nomination', (error, event) => {
        web3.eth.getTransactionReceipt(event.transactionHash)
        .then(res => {
          if(res.status){
            let data = JSON.parse(window.localStorage.getItem(payload.id + ""))
            data.nomStart = payload.start;
            data.nomEnd = payload.end;
            window.localStorage.setItem(data.id, JSON.stringify(data))
            commit('SET_NUM_PERIOD', payload.id);
          }
        })
      })
    },

    setVotPeriod({commit}, payload){
      const election = ElectionInstance.electionContract();
      election.methods.votingPeriod(payload.start, payload.end)
      .send({
        from: this.getters["web3/coinbase"],
      })
      election.once('Voting', (error, event) => {
        web3.eth.getTransactionReceipt(event.transactionHash)
        .then(res => {
          if(res.status){
            let data = JSON.parse(window.localStorage.getItem(payload.id + ""))
            data.votStart = payload.start;
            data.votEnd = payload.end;
            window.localStorage.setItem(data.id, JSON.stringify(data))
            commit('SET_VOT_PERIOD', payload.id);
          }
        })
      })
    },

    setGiveRightToVote({commit}, payload){
      const election = ElectionInstance.electionContract();
      election.methods.giveRightToVote(payload)
      .send({
        from: this.getters["web3/coinbase"],
      })
      election.once('givePermission', (error, event) => {
        web3.eth.getTransactionReceipt(event.transactionHash)
        .then(res => {
          if(res.status){
            commit('SET_GIVE_RIGHT_TO_VOTE', payload);
          }
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
