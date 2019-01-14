const Election = artifacts.require('./Election.sol')
const Chairperson = artifacts.require('./Chairperson.sol')

contract('Election', (accounts) => {
  let chairperson
  let election
  let time = Math.floor((new Date()).getTime() / 1000)

  it('initializes the contract with the correct values', () => {
    return Chairperson.deployed().then(instance => {
      chairperson = instance
      chairperson.callElection(time, 10, time + 15, 10, 'Election 1')
      return chairperson.elections(0)
    }).then(address => {
      return Election.at(address)
    }).then(instance => {
      election = instance
      return election.name()
    }).then(name => {
      assert.equal(name, 'Election 1', 'contract was not deployed with true arguments')
      return election.voters(accounts[0])
    }).then(voter => {
      assert.equal(voter[0].toNumber(), 1, 'should have 1 weight')
      return election.votersCount()
    }).then(count => {
      assert.equal(count.toNumber(), 1, 'participates in the election should be 1')
      return election.chairperson()
    }).then(address => {
      assert.equal(address, accounts[0], 'chairperson should be accounts[0]')
    })
  })
})
