
// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as $ } from 'jquery'
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Election contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Election abstraction. We will use this abstraction
 * later to create an instance of the Election contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import ElectionArtifacts from '../../build/contracts/Election.json'

var Election = contract(ElectionArtifacts)

let candidates = {
  'HHK':'candidate-1',
  'QO':'candidate-2',
  'HYD':'candidate-3',
  'QP':'candidate-4',
  'LH':'candidate-5',
  'BHK':'candidate-6'
}

let account

window.voteForCandidate = function (candidate) {
  let candidateName = $('#candidate').val()
  try {
    $('#msg').html('Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.')
    $('#candidate').val('')

    /* Election.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    Election.deployed().then(function (contractInstance) {
      contractInstance.voteForCandidate(candidateName, { gas: 140000, from: account }).then(function () {
        let divId = candidates[candidateName]
        return contractInstance.totalVotesFor.call(candidateName).then(function (v) {
          $('#' + divId).html(v.toString())
          $('#msg').html('')
        })
      })
    })
  } catch (err) {
    console.log(err)
  }
}

$(document).ready(function () {
  if (typeof web3 !== 'undefined') {
    console.warn('Using web3 detected from external source like Metamask')
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

  web3.eth.getAccounts(function (err, accs) {
    if (err != null) {
      alert('There was an error fetching your accounts.')
      return
    }

    if (accs.length === 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
      return
    }

    account = accs[0]
  })

  Election.setProvider(web3.currentProvider)
  let candidateNames = Object.keys(candidates)
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i]
    Election.deployed().then(function (contractInstance) {
      contractInstance.totalVotesFor.call(name).then(function (v) {
        $('#' + candidates[name]).html(v.toString())
      })
    })
  }
})
