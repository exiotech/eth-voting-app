const Web3 = require('web3')
const Chairperson = artifacts.require('./Chairperson.sol')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

contract('Chairperson', (accounts) => {
  let chairperson
  let election1 = 'Election 1'

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
    return Chairperson.deployed().then(instance => {
      chairperson = instance
      return chairperson.callElection('')
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('Election should have name') >= 0, 'Election should have name')
      return chairperson.callElection(election1, { from: accounts[1] })
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('Only chairperson can call this function') >= 0, 'Only chairperson can call this function')
      return chairperson.callElection.call(election1)
    }).then(success => {
      assert.equal(success, true, 'it returns true')
      return chairperson.callElection(election1)
    }).then(receipt => {
      assert.equal(receipt.logs.length, 1, 'triggers one event')
      assert.equal(receipt.logs[0].event, 'electionCreated', 'should be the "Transfer" event')
      assert.equal(receipt.logs[0].args._id, 1, 'logs the id the election are create')
      assert.equal(receipt.logs[0].args._name, election1, 'logs the name the election are create')
      assert.equal(web3._extend.utils.isAddress(receipt.logs[0].args._election), true, 'logs the address the election are create')
      return chairperson.electionCount()
    }).then(count => {
      assert(count, 1, 'count should be equal 1')
      return chairperson.elections(1)
    }).then(election => {
      assert.equal(election[0], 1, 'election.id should be equal 1')
      assert.equal(election[1], election1, `election.name should be equal ${election1}`)
      assert.equal(web3._extend.utils.isAddress(election[2]), true, 'contract was not deployed correctly')
    })
  })
})
