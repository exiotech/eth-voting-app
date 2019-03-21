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
      commit('SET_NUM_PERIOD', payload);
    },
    setVotPeriod({commit}, payload){
      commit('SET_VOT_PERIOD', payload);
    },
    setGiveRightToVote({commit}, payload){
      commit('SET_GIVE_RIGHT_TO_VOTE', payload);
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
