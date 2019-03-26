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
    setTimeout(function(){
      const election = ElectionInstance.electionContract();
      election.methods.winnerName()
      .call()
      .then(res => {
        Object.keys(window.localStorage).forEach(function(value){
          if(election._address == JSON.parse(window.localStorage.getItem(value)).election){
            if(JSON.parse(window.localStorage.getItem(value)).votEnd <= Math.floor(new Date().getTime()/1000.0)){
              commit('WINNER_NAME', res);
            }
          }
        })
      })
    }, 1000);
  }
};

export const mutations = {
  WINNER_NAME(state, payload){
    state.winnerOpen = false
    state.winnerCandidate = payload
  }
}
