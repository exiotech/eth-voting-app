import Contract from './Contract.js';

export default function giveRightToVotePlagin(web3) {
  return (store) => {
    if (typeof window !== 'undefined') {
      window.ethereum.enable();
      store.subscribe(({ type, payload }, state) => {
        if(type == "election/SET_GIVE_RIGHT_TO_VOTE"){
          Object.keys(window.localStorage).forEach(function(value){
            let data = JSON.parse(window.localStorage.getItem(value));
            if(data.id == store.$router.history.current.params.id && data.electionAddres){
              const election = Contract.electionContract(web3, data.electionAddres);
              election.methods.giveRightToVote(payload)
              .send({
                from: state.web3.coinbase,
              });
              election.once('givePermission', (error, event) => {
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
