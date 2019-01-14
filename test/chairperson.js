const Web3 = require('web3')
const Chairperson = artifacts.require('./Chairperson.sol')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

contract('Chairperson', (accounts) => {
  let chairperson

  it('initializes the contract with the correct values', () => {
    return Chairperson.deployed().then(instance => {
      chairperson = instance
      return chairperson.address
    }).then(address => {
      assert.equal(web3._extend.utils.isAddress(address), true, 'contract was not deployed correctly')
      return chairperson.chairperson()
    }).then(address => {
      assert.equal(address, accounts[0], 'is not chairperson address')
    })
  })

  it('call Election', () => {
    let time = Math.floor((new Date()).getTime() / 1000)
    return Chairperson.deployed().then(instance => {
      chairperson = instance
      chairperson.callElection(time, 10, time + 15, 10, 'Election 1')
      return chairperson.elections(0)
    }).then(election => {
      assert.equal(web3._extend.utils.isAddress(election), true, 'contract was not deployed correctly')
      chairperson.callElection(time, 20, time + 25, 20, 'Election 2')
      return chairperson.elections(1)
    }).then(election => {
      assert.equal(web3._extend.utils.isAddress(election), true, 'contract was not deployed correctly')
    })
  })
})
