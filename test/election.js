const Election = artifacts.require('./Election.sol')
const Chairperson = artifacts.require('./Chairperson.sol')

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

contract('Election', (accounts) => {
  let chairperson
  let election
  let election1name = 'Election 1'
  let time = Math.floor((new Date()).getTime() / 1000)
  let nominationStart = time + 10
  let nominationEnd = time + 20
  let votingStart = time + 25
  let votingEnd = time + 35
  let candidate1 = 'Candidate 1'
  // let candidate2 = 'Candidate 2'
  let wait

  it('initializes the contract with the correct values', () => {
    return Chairperson.deployed().then(instance => {
      chairperson = instance
      return chairperson.callElection(election1name)
    }).then(receipt => {
      return chairperson.elections(1)
    }).then(election => {
      return Election.at(election[2])
    }).then(instance => {
      election = instance
      return election.chairperson()
    }).then(address => {
      assert.equal(address, accounts[0], `chairperson adress should be equal ${accounts[0]}`)
      return election.voters(accounts[0])
    }).then(voter => {
      assert.equal(voter[0], 1, `voter weight should be equal 1`)
      return election.votersCount()
    }).then(count => {
      assert.equal(count, 1, `voters count should be equal 1`)
      return election.name()
    }).then(name => {
      assert.equal(name, election1name, `election should be equal ${election1name}`)
    })
  })

  it('should set nomination start and end time', () => {
    return Chairperson.deployed().then(instance => {
      chairperson = instance
      return chairperson.callElection(election1name)
    }).then(receipt => {
      return chairperson.elections(1)
    }).then(election => {
      return Election.at(election[2])
    }).then(instance => {
      election = instance
      return election.nominationPeriod(nominationStart - 10, nominationEnd)
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('start time should be greater then current time') >= 0, 'nomination start time should be greater then current time')
      return election.nominationPeriod.call(nominationStart, nominationEnd)
    }).then(success => {
      assert.equal(success, true, 'success should be true')
      return election.nominationPeriod(nominationStart, nominationEnd)
    }).then(receipt => {
      assert.equal(receipt.logs.length, 1, 'triggers one event')
      assert.equal(receipt.logs[0].event, 'Nomination', 'should be the "Nomintaion" event')
      assert.equal(receipt.logs[0].args._start.toNumber(), nominationStart, 'logs the time when nomination will start')
      assert.equal(receipt.logs[0].args._end.toNumber(), nominationEnd, 'logs the time when nomination will end')
      return election.nominationStart()
    }).then(start => {
      assert.equal(start.toNumber(), nominationStart, `start should be equal ${nominationStart}`)
      return election.nominationEnd()
    }).then(end => {
      assert.equal(end.toNumber(), nominationEnd, `end should be equal ${nominationEnd}`)
    })
  })

  it('should set voting start and end time', () => {
    return Chairperson.deployed().then(instance => {
      chairperson = instance
      return chairperson.callElection(election1name)
    }).then(receipt => {
      return chairperson.elections(1)
    }).then(election => {
      return Election.at(election[2])
    }).then(instance => {
      election = instance
      return election.votingPeriod(votingStart - 10, votingEnd)
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('start time should be greater then nominationEnd time') >= 0, 'nomination start time should be greater then current time')
      return election.votingPeriod.call(votingStart, votingEnd)
    }).then(success => {
      assert.equal(success, true, 'success should be true')
      return election.votingPeriod(votingStart, votingEnd)
    }).then(receipt => {
      assert.equal(receipt.logs.length, 1, 'triggers one event')
      assert.equal(receipt.logs[0].event, 'Voting', 'should be the "Voting" event')
      assert.equal(receipt.logs[0].args._start.toNumber(), votingStart, 'logs the time when voting will start')
      assert.equal(receipt.logs[0].args._end.toNumber(), votingEnd, 'logs the time when voting will end')
      return election.votingStart()
    }).then(start => {
      assert.equal(start.toNumber(), votingStart, `start should be equal ${votingStart}`)
      return election.votingEnd()
    }).then(end => {
      assert.equal(end.toNumber(), votingEnd, `end should be equal ${votingEnd}`)
    })
  })

  it('should add candidate', () => {
    return Chairperson.deployed().then(instance => {
      chairperson = instance
      return chairperson.callElection(election1name)
    }).then(receipt => {
      return chairperson.elections(1)
    }).then(election => {
      return Election.at(election[2])
    }).then(instance => {
      election = instance
      return election.addCandidate(candidate1, { from: accounts[1] })
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('Only chairperson can call') >= 0, 'only chairperson can call this function')
      return election.addCandidate(candidate1, { from: accounts[0] })
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('Do not start yet') >= 0, 'nomination do not start yet')
      return election.nominationPeriod(nominationStart, nominationEnd)
    }).then(receipt => {
      wait = (receipt.logs[0].args._start.toNumber() - time + 2) * 1000
    }).then(() => {
      return election.addCandidate(candidate1, { from: accounts[0] })
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('Do not start yet') >= 0, 'nomination do not start yet 2')
      return sleep(wait)
    }).then(() => {
      return election.addCandidate.call(candidate1, { from: accounts[0] })
    }).then(success => {
      assert.equal(success, true, 'success should be true')
      return election.addCandidate(candidate1, { from: accounts[0] })
    }).then(receipt => {
      assert.equal(receipt.logs.length, 1, 'triggers one event')
      assert.equal(receipt.logs[0].event, 'CandidateCreated', 'should be the "CandidateCreated" event')
      assert.equal(receipt.logs[0].args._id.toNumber(), 1, 'logs the candidate1 id')
      assert.equal(receipt.logs[0].args._name, candidate1, 'logs the name of candidate1')
      return election.candidatesCount()
    }).then(count => {
      assert.equal(count, 1, 'Candidates count should be equal 1')
      return election.candidates(1)
    }).then(candiadte => {
      assert.equal(candiadte[0], 1, 'Candidate id should be equal 1')
      assert.equal(candiadte[1], candidate1, `Candidates name should be equal ${candidate1}`)
      assert.equal(candiadte[2], 0, 'Candidate voteCount should be equal 0')
      return sleep(wait)
    }).then(() => {
      return election.addCandidate(candidate1, { from: accounts[0] })
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('Already finished') >= 0, 'nomination already finished')
    })
  })

  it('should give right to vote', () => {
    time = Math.floor((new Date()).getTime() / 1000)
    nominationStart = time + 10
    nominationEnd = time + 20
    votingStart = time + 25
    votingEnd = time + 35
    return Chairperson.deployed().then(instance => {
      chairperson = instance
      return chairperson.callElection(election1name)
    }).then(receipt => {
      return chairperson.elections(1)
    }).then(election => {
      return Election.at(election[2])
    }).then(instance => {
      election = instance
      return election.giveRightToVote(accounts[1], { from: accounts[1] })
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('Only chairperson can call') >= 0, 'Only chairperson can call this function')
      return election.giveRightToVote(accounts[0], { from: accounts[0] })
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('revert') >= 0, 'already has permission to vote')
      return election.nominationPeriod(nominationStart, nominationEnd)
    }).then(receipt => {
      wait = (receipt.logs[0].args._start.toNumber() - time + 2) * 1000
      return election.votingPeriod(votingStart, votingEnd)
    }).then(() => {
      return election.votingStart()
    }).then(start => {
      return election.votingEnd()
    }).then(end => {
      return sleep(wait)
    }).then(receipt => {
      return election.addCandidate(candidate1)
    }).then(receipt => {
      return sleep(wait + 5000)
    }).then(() => {
      return election.vote(1, { from: accounts[0] })
    }).then(receipt => {
      return election.giveRightToVote(accounts[0], { from: accounts[0] })
    }).then(assert.fail).catch(error => {
      assert(error.message.toString().indexOf('The voter already voted.') >= 0, 'The voter already voted.')
    }).then(() => {
      return election.giveRightToVote.call(accounts[1], { from: accounts[0] })
    }).then(success => {
      assert(success, true, 'success should be true')
      return election.giveRightToVote(accounts[1], { from: accounts[0] })
    }).then(receipt => {
      assert.equal(receipt.logs.length, 1, 'triggers one event')
      assert.equal(receipt.logs[0].event, 'givePermission', 'should be the "givePermission" event')
      assert.equal(receipt.logs[0].args._address, accounts[1], 'logs the address of voter')
      return election.voters(accounts[1])
    }).then(voter => {
      assert.equal(voter[0].toNumber(), 1, 'voter weigt should be 1')
    })
  })
})
