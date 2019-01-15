const Election = artifacts.require('./Election.sol')
const Chairperson = artifacts.require('./Chairperson.sol')

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

contract('Election', (accounts) => {
  let chairperson
  let election
  let time = Math.floor((new Date()).getTime() / 1000)
  let nominationStart = time + 1
  let votingStart = time + 4
  let duration = 2
  let candidate1 = 'Candidate 1'
  let candidate2 = 'Candidate 2'

  it('initializes the contract with the correct values', () => {
    return Chairperson.deployed().then(instance => {
      chairperson = instance
      chairperson.callElection(nominationStart, duration, votingStart, duration, 'Election 1')
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
    //   return election.nominationStart()
    // }).then(start => {
    //   assert.operator(start.toNumber(), '<=', 10, 'nomination will start at "time"')
    //   return election.nominationDuration()
    // }).then(duration => {
    //   assert.operator(duration.toNumber(), '<=', 10, 'nomination duration is 10 sec')
    //   return election.votingStart()
    // }).then(start => {
    //   assert.operator(start.toNumber(), '<=', 25, 'voting will start at time + 25')
    //   return election.votingDuration()
    // }).then(duration => {
    //   assert.operator(duration.toNumber(), '<=', 10, 'voting duration is 10 sec')
    })
  })

  it('should set nomination start date and duration', () => {
    return election.nominationPeriod(nominationStart, duration).then(receipt => {
      return election.nominationStart()
    }).then(start => {
      assert.operator(start.toNumber(), '<=', 1, 'nomination will start at "time"')
      return election.nominationDuration()
    }).then(duration => {
      assert.operator(duration.toNumber(), '<=', 2, 'nomination duration is 2 sec')
    })
  })

  it('should set voting start date and duration', () => {
    return election.votingPeriod(votingStart, duration).then(receipt => {
      return election.votingStart()
    }).then(start => {
      assert.operator(start.toNumber(), '<=', 4, 'nomination will start at "time"')
      return election.votingDuration()
    }).then(duration => {
      assert.operator(duration.toNumber(), '<=', 2, 'nomination duration is 10 sec')
    })
  })

  it('should add candidate', () => {
    return election.addCandidate.call(candidate1).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('revert') >= 0, 'should return error if nomination do not started yet')
      return sleep((nominationStart - time) * 1000)
    }).then(() => {
      return election.addCandidate.call(candidate1, { from: accounts[1] })
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('revert') >= 0, 'only chairperson can call this function')
      return election.addCandidate(candidate1)
    }).then(receipt => {
      return election.candidates(1)
    }).then(candidate => {
      assert.equal(candidate[1], candidate1, 'should be equal candidate1')
      return election.candidatesCount()
    }).then(count => {
      assert.equal(count.toNumber(), 1, 'only one candidate')
      return election.addCandidate(candidate2)
    }).then(receipt => {
      return election.candidatesCount()
    }).then(count => {
      assert.equal(count.toNumber(), 2, 'have only two candidate')
      return election.candidates(2)
    }).then(candidate => {
      assert.equal(candidate[1], candidate2, 'should be equal candidate2')
      return sleep(duration * 1000)
    }).then(() => {
      return election.addCandidate.call(candidate2)
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('revert') >= 0, 'should return error if nomination already done')
    })
  })

  it('should give right to vote', () => {
    return election.giveRightToVote(accounts[1], { from: accounts[1] }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('revert') >= 0, 'only chairperson can call this function')
      return election.giveRightToVote(accounts[1])
    }).then(receipt => {
      return election.voters(accounts[1])
    }).then(voter => {
      assert.equal(voter[0], 1, 'weight should be equal 1')
      return sleep((votingStart - time - 4) * 1000)
    }).then(() => {
      return election.vote(1, { from: accounts[1] })
    }).then(receipt => {
      return election.giveRightToVote.call(accounts[1])
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('revert') >= 0, 'voter already voted')
      return election.giveRightToVote.call(accounts[0])
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('revert') >= 0, 'voter have right to vote')
    })
  })
})
