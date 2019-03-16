import Contract from './Contract.js';

export default function nominationPeriodPlagin(web3) {
  return (store) => {
    if (typeof window !== 'undefined') {
      window.ethereum.enable();

      web3.eth.personal.getAccounts().then(accounts => {
        store.subscribe(({ type, payload }, state) => {
          if(type == "election/SET_NUM_PERIOD"){
            Object.keys(window.localStorage).forEach(function(value){
              let key = JSON.parse(window.localStorage.getItem(value));
              if(key.id == payload && key.electionAddres){
                const election = Contract.electionContract(web3, key.electionAddres);
                election.methods.nominationPeriod(key.time.nomStart, key.time.nomEnd)
                .send({
                  from: accounts[0],
                });
                election.once('Nomination', (error, event) => {
                  let intervalTransaction = setInterval(function(){
                    web3.eth.getTransactionReceipt(event.transactionHash)
                    .then(function(value){
                      if(value.status){
                        clearInterval(intervalTransaction);
                      }
                    });
                  }, 1000)
                  console.log(event);
                })
              }
            })
          }
        })
      })
    }
  };
};
