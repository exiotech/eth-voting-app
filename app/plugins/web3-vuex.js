export default function createWeb3Plugin (web3) {
  return (store) => {
    let address = null;
    if (typeof window !== 'undefined') {
      window.ethereum.enable();

      setInterval(() => {
        web3.eth.getCoinbase().then((newAddress) => {
          if (address !== newAddress) {
            if (!address) {
              store.commit('web3/ADDRESS_RECEIVED', newAddress);
            } else if (!newAddress) {
              store.commit('web3/LOGOUT');
            } else {
              store.commit('web3/ADDRESS_CHANGED', newAddress);
            }
            address = newAddress;
          }
        });
      }, 300);
    }
  };
};
