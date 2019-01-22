export const state = () => ({
  coinbase: null,
});

export const mutations = {
  ADDRESS_RECEIVED(state, coinbase) {
    state.coinbase = coinbase;
  },
  ADDRESS_CHANGED(state, coinbase) {
    state.coinbase = coinbase;
  },
  LOGOUT(state) {
    state.coinbase = null;
  },
};

export const getters = {
  coinbase: (state) => state.coinbase,
};

export const actions = {
};
