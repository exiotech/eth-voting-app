import Election from './../../build/contracts/Election.json';

let instance = null;
function electionContractPlugin(web3){
  return (store) => {
    if (typeof window !== 'undefined') {
      window.ethereum.enable();
      store.subscribe(() => {
        setInterval(() => {
          Object.keys(window.localStorage).forEach(function(value){
            let data = JSON.parse(window.localStorage.getItem(value));
            if(data.name == store.$router.history.current.params.name || data.id == store.$router.history.current.params.id){
              instance = new web3.eth.Contract(Election.abi, data.election, {
                gasPrice: '2000000'
              });
              return;
            }
          })
          return instance;
        }, 300)
      })
    }
  }

};
function electionContract(){
  return instance;
}

export default {electionContract, electionContractPlugin};
