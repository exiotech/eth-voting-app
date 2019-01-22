pragma solidity ^0.5.2;

import "./Election.sol";

contract Chairperson {
  struct Elections {
    uint id;
    string name;
    Election election;
  }

  uint public electionCount;
  address public chairperson;

  mapping(uint => Elections) public elections;

  event electionCreated(uint _id, string _name, Election _election);

  constructor() public {
    chairperson = msg.sender;
  }

  modifier onlyChairperson {
    require(msg.sender == chairperson, 'Only chairperson can call this function');
    _;
  }

  function callElection(string memory _name) public onlyChairperson returns (bool success) {
    bytes memory emptyStringTest = bytes(_name);
    require(emptyStringTest.length != 0, 'Election should have name');
    electionCount++;
    elections[electionCount] = Elections(electionCount, _name, new Election(chairperson, _name));

    emit electionCreated(elections[electionCount].id, elections[electionCount].name, elections[electionCount].election);

    return true;
  }
}
