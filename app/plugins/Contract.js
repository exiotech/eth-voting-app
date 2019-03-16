import Chairperson from './../../build/contracts/Chairperson.json';
import Election from './../../build/contracts/Election.json';


function chairpersonContract(web3){
  return new web3.eth.Contract(Chairperson.abi, Chairperson.networks[5777].address, {
      from: '0xEE2C37b90c2B7FfB0D944f614E60BD5a2C760750',
      gasPrice: '2000000'
  });
};

function electionContract(web3, electionAddres){
    const electionInstance = new web3.eth.Contract(Election.abi, electionAddres, {
      from: '0xEE2C37b90c2B7FfB0D944f614E60BD5a2C760750',
      gasPrice: '2000000'
    });
    // Object.keys(window.localStorage).forEach(function(value){
    //   console.log(JSON.parse(window.localStorage.getItem(value)));
    //   if(JSON.parse(window.localStorage.getItem(value)).electionAddres == electionAddres){
    //     let data = JSON.parse(window.localStorage.getItem(value));
    //     data.electionInstance = electionInstance;
    //     console.log(data);
    //     window.localStorage.setItem(data.id, JSON.stringify(data));
    //     return;
    //   }
    // })
    return electionInstance;
};

// function instanceElectionContract(electionAddres){
//   for(let value of Object.keys(window.localStorage)){
//     if(JSON.parse(window.localStorage.getItem(value)).electionAddres == electionAddres){
//       return JSON.parse(window.localStorage.getItem(value)).electionInstance;
//     }
//   }
// }


export default {chairpersonContract, electionContract};
