import Web3 from 'web3';
import createWeb3Plugin from '~/plugins/web3-vuex';
import createAccountsPlagin from '~/plugins/election-vuex';
import nominationPeriodPlagin from '~/plugins/nomination-vuex';
import votingPeriodPlagin from '~/plugins/voting-vuex';
import addCandidatePlagin from '~/plugins/addCandidate-vuex';
import votePlagin from '~/plugins/vote-vuex';
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

export const plugins = [
  createAccountsPlagin(web3),
  createWeb3Plugin(web3),
  nominationPeriodPlagin(web3),
  votingPeriodPlagin (web3),
  addCandidatePlagin(web3),
  votePlagin(web3),
];
