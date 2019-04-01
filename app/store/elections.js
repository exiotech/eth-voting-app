import ContractInstance from './../plugins/ChairpersonContract';
import web3 from './exportWeb3'

export const  state = () => ({
     elections: [],
     electionName: [],
  });

  export const getters = {
    elections: (state) => state.elections,
  };

  export const actions = {
    addElectionName({commit}, electionName){
      const chairperson = ContractInstance.chairpersonContract();
      chairperson.methods.callElection(electionName).send({
        from: '0xEE2C37b90c2B7FfB0D944f614E60BD5a2C760750',
        gasPrice: '30000000000',
        gas: 2000000
      });
      chairperson.once('electionCreated', (error, event) => {
        web3.eth.getTransactionReceipt(event.transactionHash)
        .then(res => {
          if(res.status){
            let data = {
              id: event.returnValues._id,
              name: event.returnValues._name,
              election: event.returnValues._election,
              candidateCount: 0,
              state: 'passive'
            };
            if(event.returnValues._id == 1) {
              window.localStorage.clear();
            }
            window.localStorage.setItem(event.returnValues._id, JSON.stringify(data));
            commit("ADD_ELECTION", data);
            window.$nuxt.$root.$store.$router.push(`Elections/Election/${ event.returnValues._id }`);
            return;
          }
        });
      })
      commit("ADD_ELECTION_NAME", electionName);
    },
    addElections({commit}){
      const chairperson = ContractInstance.chairpersonContract();
      let arr = [];
      (function myLoop (i = 1) {
        chairperson.methods.elections(i)
        .call()
        .then(res => {
          if(res){
            i = res.id;
            if(i != 0){
              let data = JSON.parse(window.localStorage.getItem(i + ''));
              window.localStorage.removeItem(i+'');
              data.id = res.id;
              data.name = res.name;
              data.election = res.election;
              window.localStorage.setItem(data.id, JSON.stringify(data))
              arr.push(data);
              myLoop(++i);
            }
          }
        })
      })();
      setTimeout(function(){
        commit("ADD_ELECTION", arr);
      }, 1500)

    }
  };

  export const mutations = {
    ADD_ELECTION(state, election){
      state.elections = election
    },
    ADD_ELECTION_NAME(state, electionName){
      state.electionName.push(electionName);
    }
  }
