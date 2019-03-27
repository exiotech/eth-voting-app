import ContractInstance from './../plugins/ChairpersonContract';

export const  state = () => ({
     elections: [],
     electionName: [],
     electionOpen: false,
  });

  export const getters = {
    elections: (state) => state.elections,
    electionOpen: (state) => state.electionOpen,
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
        chairperson.methods.elections(event.returnValues._id)
        .call()
        .then(res => {
          window.localStorage.setItem(res.id, JSON.stringify({id: res.id, name: res.name, election: res.election}));
          commit("GET_ELECTION", res);
        })
      return;
      })
      commit("ADD_ELECTION_NAME", electionName);
    },
    addElections({commit}){
      const chairperson = ContractInstance.chairpersonContract();
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
              console.log(JSON.parse(window.localStorage.getItem(i + '')));
              commit("GET_ELECTION", res);
              myLoop(++i);
            }
          }
          else {
            window.localStorage.clear();
          }
        })
      })();
    }
  };

  export const mutations = {
    GET_ELECTION(state, election){
      if(state.elections.length + 1 == election.id)
        state.elections.push(election)
    },
    ADD_ELECTION_NAME(state, electionName){
      state.electionName.push(electionName);
    }
  }
