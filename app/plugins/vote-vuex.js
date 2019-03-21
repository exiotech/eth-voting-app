import Contract from './Contract.js';

export default function votePlagin(web3) {
  return (store) => {
    if (typeof window !== 'undefined') {
      window.ethereum.enable();
      store.subscribe(({ type, payload }, state) => {
        if(type == "voting/SET_VOTE"){
          Object.keys(window.localStorage).forEach(function(value){
            let data = JSON.parse(window.localStorage.getItem(value));
            if(data.name == store.$router.history.current.params.name && data.electionAddres){
              const election = Contract.electionContract(web3, data.electionAddres);
              election.methods.vote(payload)
              .send({
                from: state.web3.coinbase,
              });
              election.once('voteFor', (error, event) => {
                console.log(event);
              })
              return;
            }
          });
        }
      })
    }
  }
}
