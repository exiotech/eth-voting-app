import Chairperson from './../../build/contracts/Chairperson.json';

let instance = null;
function chairpersonContractPlugin(web3){
  return (store) => {
    instance = new web3.eth.Contract(Chairperson.abi, Chairperson.networks[5777].address, {
      gasPrice: '2000000'
    });
    return instance;
  }
};
function chairpersonContract(){
  return instance;
}

export default {chairpersonContract, chairpersonContractPlugin};
