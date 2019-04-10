import ElectionInstance from './../plugins/ElectionContract';

export const state = () => ({
  winnerCandidate: null,
  winnerOpen: true,
});

export const getters = {
  winnerCandidate: (state) => state.winnerCandidate,
  winnerOpen: (state) => state.winnerOpen,
};

export const actions = {
  winnerName({commit}){
    commit('WINNER_OPEN', true);
    setTimeout(function(){
      const election = ElectionInstance.electionContract();
      election.methods.winnerName()
      .call()
      .then(res => {
        Object.keys(window.localStorage).forEach(function(value){
          if(election._address == JSON.parse(window.localStorage.getItem(value)).election){
            if(JSON.parse(window.localStorage.getItem(value)).votEnd <= Math.floor(new Date().getTime()/1000.0)){
              commit('WINNER_NAME', res);
              commit('WINNER_OPEN', false);
            }
          }
        })
      })
    }, 1000);
  }
};

export const mutations = {
  WINNER_OPEN(state, payload){
    state.winnerOpen = payload
  },
  WINNER_NAME(state, payload){
    state.winnerCandidate = payload
  }
}
