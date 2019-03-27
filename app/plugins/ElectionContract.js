import Election from './../../build/contracts/Election.json';

let instance = null;
function electionContractPlugin(web3){
  return (store) => {
    if (typeof window !== 'undefined') {
      window.ethereum.enable();
      store.subscribe(() => {
        Object.keys(window.localStorage).forEach(function(value){
          let data = JSON.parse(window.localStorage.getItem(value));
          if(data.name == store.$router.history.current.params.name || data.id == store.$router.history.current.params.id){
            instance = new web3.eth.Contract(Election.abi, data.election, {
                from: '0xEE2C37b90c2B7FfB0D944f614E60BD5a2C760750',
                gasPrice: '2000000'
            });
            return;
          }
        })
        return instance;
      })
    }
  }

};
function electionContract(){
  return instance;
}

export default {electionContract, electionContractPlugin};
