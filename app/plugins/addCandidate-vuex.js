import Contract from './Contract.js';

export default function addCandidatePlagin(web3) {
  return (store) => {
    if (typeof window !== 'undefined') {
      window.ethereum.enable();
      store.subscribe(({ type, payload }, state) => {
        if(type == "voting/ADD_CANDIDATE_NAME"){
          Object.keys(window.localStorage).forEach(function(value){
            let data = JSON.parse(window.localStorage.getItem(value));
            if(data.name == store.$router.history.current.params.name && data.electionAddres){
              const election = Contract.electionContract(web3, data.electionAddres);
              election.methods.addCandidate(payload)
              .send({
                from: state.web3.coinbase,
              });
              election.once('CandidateCreated', (error, event) => {
                 election.methods.candidates(event.returnValues._id)
                .call()
                .then(res => {
                  data.candidate.push({
                    id: res.id,
                    name: res.name,
                    kargaxos: 'kargaxos'
                  })
                  window.localStorage.setItem(data.id, JSON.stringify(data));
                  store.commit("voting/ADD_CANDIDATE");
                });
              })
              return;
            }
          });
        }
      })
    }
  }
}
