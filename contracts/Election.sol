pragma solidity >=0.4.22 <0.6.0;

contract Election {
	struct Voter {
		uint weight;
		bool voted;
		address delegate;
		uint vote;
	}

	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}

	address public chairperson;

	mapping(address => Voter) public voters;
	mapping(uint => Candidate) public candidates;

	uint public candidatesCount;
	uint public votersCount;
	uint public votingDuration;
	uint public votingStart;
	uint public nominationStart;
	uint public nominationDuration;
	string public name;
	uint private actionTime = now;

	constructor(address _chairperson, string memory _name) public {
		chairperson = _chairperson;
		voters[chairperson].weight = 1;
		votersCount++;
		name = _name;
	}

	modifier onlyChairperson {
		require(
			msg.sender == chairperson,
			"Only chairperson can call"
		);
		_;
	}

	modifier onlyWhileOpenElection() {
		require(
			now > (actionTime + votingStart) && now < (actionTime + votingStart + votingDuration),
			'Elections do not start yet or already finished'
		);
		_;
	}

	function nominationPeriod(uint _start, uint _duration) external {
		nominationStart = _start - actionTime;
		nominationDuration = _duration;
	}

	function votingPeriod(uint _start, uint _duration) external {
		votingStart = _start - actionTime;
		votingDuration = _duration;
	}

	function addCandidate (string memory _name) public onlyChairperson {
		require(now > (actionTime + nominationStart) && now < (actionTime + nominationStart + nominationDuration), 'Nomination do not start yet or already finished');
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
	}

	function giveRightToVote(address voter) public {
		require(
			msg.sender == chairperson,
			"Only chairperson can give right to vote."
		);
		require(
			!voters[voter].voted,
			"The voter already voted."
		);
		require(voters[voter].weight == 0);
		voters[voter].weight = 1;
	}

	function delegate(address to) public {
		Voter storage sender = voters[msg.sender];
		require(!sender.voted, "You already voted.");

		require(to != msg.sender, "Self-delegation is disallowed.");

		while (voters[to].delegate != address(0)) {
			to = voters[to].delegate;

			require(to != msg.sender, "Found loop in delegation.");
		}

		sender.voted = true;
		sender.delegate = to;
		Voter storage delegate_ = voters[to];
		if (delegate_.voted) {
			candidates[delegate_.vote].voteCount += sender.weight;
		} else {
			delegate_.weight += sender.weight;
		}
	}

	function vote(uint _candidateId) public onlyWhileOpenElection {
		Voter storage sender = voters[msg.sender];
		require(sender.weight != 0, "Has no right to vote");
		require(!sender.voted, "Already voted.");
		require(_candidateId > 0 && _candidateId <= candidatesCount);
		sender.voted = true;
		sender.vote = _candidateId;

		candidates[_candidateId].voteCount += sender.weight;
	}

	function winningCandidate() public view returns (uint winningCandidate_) {
		uint winningVoteCount = 0;
		for (uint i = 1; i <= candidatesCount; i++) {
			if (candidates[i].voteCount > winningVoteCount) {
				winningVoteCount = candidates[i].voteCount;
				winningCandidate_ = i;
			}
		}
	}

	function winnerName() public view returns (string memory winnerName_) {
		winnerName_ = candidates[winningCandidate()].name;
	}
}
