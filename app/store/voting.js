

export const  state = () => ({
    candidates:[
      {
        id: 1,
        name: 'Dakota Rice',
        kargaxos: 'kargaxos1',
      },
      {
        id: 2,
        name: 'Minerva Hooper',
        kargaxos: 'kargaxos2',
      },
      {
        id: 3,
        name: 'Sage Rodriguez',
        kargaxos: 'kargaxos3',
      },
      {
        id: 4,
        name: 'Philip Chaney',
        kargaxos: 'kargaxos4',
      },
      {
        id: 5,
        name: 'Doris Greene',
        kargaxos: 'kargaxos5',
      }
    ],
    isOpen: true,
  });

  export const getters = {
    candidates: (state) => state.candidates,
    isOpen: (state) => state.isOpen,
  };

  export const mutations = {

  };
  export const  actions = {

  }
