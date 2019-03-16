import Contract from './Contract.js';

export default function votingPeriodPlagin(web3) {
  return (store) => {
    if (typeof window !== 'undefined') {
      window.ethereum.enable();

      web3.eth.personal.getAccounts().then(accounts => {
        store.subscribe(({ type, payload }, state) => {
          if(type == "election/SET_VOT_PERIOD"){
            Object.keys(window.localStorage).forEach(function(value){
              let key = JSON.parse(window.localStorage.getItem(value));
              if(key.id == payload){
                const election = Contract.electionContract(web3, key.electionAddres);
                election.methods.votingPeriod(key.time.votStart, key.time.votEnd)
                .send({
                  from: accounts[0],
                });
                election.once('Voting', (error, event) => {
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
