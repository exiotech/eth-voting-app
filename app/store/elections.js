import ContractInstance from './../plugins/ChairpersonContract';
import web3 from './exportWeb3'

export const  state = () => ({
     elections: [],
     electionName: [],
     admin: "",
  });

  export const getters = {
    elections: (state) => state.elections,
    admin: (state) => state.admin,
  };

  export const actions = {
    setAdmin({commit}){
      const chairperson = ContractInstance.chairpersonContract();
      chairperson.methods.chairperson()
      .call()
      .then(address => {
        commit("SET_ADMIN", address)
      })
    },
    addElectionName({commit}, electionName){
      const chairperson = ContractInstance.chairpersonContract();
      chairperson.methods.chairperson()
      .call()
      .then(address => {
        chairperson.methods.callElection(electionName).send({
          from: address,
          gasPrice: '30000000000',
          gas: 2000000
        });
        chairperson.once('electionCreated', (error, event) => {
          web3.eth.getTransactionReceipt(event.transactionHash)
          .then(res => {
            if(res.status){

              let data = {
                candidateCount: 0,
                state: 'passive'
              };
              if(event.returnValues._id == 1) {
                window.localStorage.clear();
              }
              window.localStorage.setItem(event.returnValues._id, JSON.stringify(data));
              window.$nuxt.$root.$store._actions["elections/addElections"][0]();
              window.$nuxt.$root.$store.$router.push(`Elections/Election/${ event.returnValues._id }`);
              return;
            }
          });
        })
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
    },
    SET_ADMIN(state, address){
      state.admin = address
    }
  }
