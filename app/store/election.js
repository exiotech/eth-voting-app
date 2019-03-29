import ElectionInstance from './../plugins/ElectionContract';
import web3 from './exportWeb3'

export const  state = () => ({
  years: ['2019', '2020', '2021', '2022', '2023', '2024','2025', '2026', '2027', '2028', '2029', '2030'],
  hours: ['00','01','02','03','04','05','06','07','08','09',
          '10','11','12','13','14','15','16','17','18','19',
          '20','21','22','23'],
  minutes: ['00','01','02','03','04','05','06','07','08','09',
            '10','11','12','13','14','15','16','17','18','19',
            '20','21','22','23','24','25','26','27','28','29',
            '30','31','32','33','34','35','36','37','38','39',
            '40','41','42','43','44','45','46','47','48','49',
            '50','51','52','53','54','55','56','57','58','59'],
  numenationPeriod: "",
  votingPeriod: "",
  giveRightToVote: "",
});

export const getters = {
  years: (state) => state.years,
  minutes: (state) => state.minutes,
  hours: (state) => state.hours,
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
