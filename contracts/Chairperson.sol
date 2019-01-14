pragma solidity ^0.5.2;

import "./Election.sol";

contract Chairperson {
  uint public electionCount;
  address public chairperson;
  Election[] public elections;

  constructor() public {
    chairperson = msg.sender;
  }

  modifier onlyChairperson {
    require(
      msg.sender == chairperson,
      "Only chairperson can call this function"
    );
    _;
  }

  function callElection(uint _nominationStart, uint _nominationDuration, uint _votingStart, uint _votingDuration, string memory _name) public onlyChairperson returns (Election) {
    electionCount = 0;
    elections.push(new Election(chairperson, _name));
    elections[electionCount].nominationPeriod(_nominationStart, _nominationDuration);
    elections[electionCount].votingPeriod(_votingStart, _votingDuration);
    electionCount++;
    return elections[electionCount - 1];
  }
}
