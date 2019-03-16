import Contract from './Contract.js';

export default function createAccountsPlagin (web3) {
  return (store) => {
    if (typeof window !== 'undefined') {
      window.ethereum.enable();
      const chairperson = Contract.chairpersonContract(web3);
      web3.eth.personal.getAccounts().then(accounts => {
        store.subscribe(({ type, payload }, state) => {
          if(type === "elections/ADD_ELECTION_NAME"){
            chairperson.methods.callElection(payload).send({
              from: accounts[0],
              gasPrice: '30000000000',
              gas: 2000000
            });

            chairperson.once('electionCreated',(error, event) => {
              const data = JSON.stringify({
                electionAddres: event.returnValues._election,
                electionInstance: null,
                id: event.returnValues._id,
                name: event.returnValues._name,
                candidateCount: 0,
                state: 'passive',
                candidate: [],
                time: {
                  nomStart: null,
                  nomEnd: null,
                  votStart: null,
                  votEnd: null,
                },
              })

              window.localStorage.setItem(event.returnValues._id, data);
              store.commit("elections/GET_ELECTION");
            return;
        })
      }
    })
  })
}
}
}
