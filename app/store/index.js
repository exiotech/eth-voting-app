import Web3 from 'web3';
import createWeb3Plugin from '~/plugins/web3-vuex';
import chairperson from '~/plugins/ChairpersonContract';
import election from '~/plugins/ElectionContract';
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

export const plugins = [
  chairperson.chairpersonContractPlugin(web3),
  election.electionContractPlugin(web3),
  createWeb3Plugin(web3),
];
