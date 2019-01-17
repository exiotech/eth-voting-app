pragma solidity ^0.5.2;

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

	mapping(address => Voter) public voters;
	mapping(uint => Candidate) public candidates;

	address public chairperson;
	uint public candidatesCount;
	uint public votersCount;
	uint public nominationStart;
	uint public nominationEnd;
	uint public votingStart;
	uint public votingEnd;
	string public name;

	uint private actionTime = now;

	event Nomination(uint _start, uint _end);
	event Voting(uint _start, uint _end);
	event CandidateCreated(uint _id, string _name);
	event givePermission(address _address);

	constructor(address _chairperson, string memory _name) public {
		chairperson = _chairperson;
		voters[chairperson].weight = 1;
		votersCount++;
		name = _name;
	}

	modifier onlyChairperson {
		require(msg.sender == chairperson, 'Only chairperson can call');
		_;
	}

	modifier inTime(uint _start, uint _end) {
		require(now >= _start, 'Do not start yet');
		require(now <= _end, 'Already finished');
		_;
	}

	modifier onlyWhileOpenElection() {
		require(now >= (actionTime + votingStart), 'Elections do not start yet');
		require(now <= (actionTime + votingStart + votingEnd), 'Elections already finished');
		_;
	}

	function nominationPeriod(uint _start, uint _end) public returns(bool success) {
		require(_start > now, 'start time should be greater then current time');

		nominationStart = _start;
		nominationEnd = _end;

		emit Nomination(_start, _end);

		return true;
	}

	function votingPeriod(uint _start, uint _end) public returns(bool success) {
		require(_start > nominationEnd, 'start time should be greater then nominationEnd time');

		votingStart = _start;
		votingEnd = _end;

		emit Voting(_start, _end);

		return true;
	}

	function addCandidate (string memory _name) public onlyChairperson inTime(nominationStart, nominationEnd) returns(bool success) {
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);

		emit CandidateCreated(candidatesCount, _name);

		return true;
	}

	function giveRightToVote(address voter) public onlyChairperson returns(bool success) {
		require(!voters[voter].voted,	"The voter already voted.");
		require(voters[voter].weight == 0);

		voters[voter].weight = 1;

		emit givePermission(voter);

		return true;
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

	function vote(uint _candidateId) public inTime(votingStart, votingEnd) {
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
