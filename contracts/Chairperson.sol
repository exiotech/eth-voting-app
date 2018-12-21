pragma solidity >=0.4.22 <0.6.0;

import "./Election.sol";

contract Chairperson {
  address public chairperson;
  Election public el;

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

  function callElection(uint _nominationStart, uint _nominationDuration, uint _votingStart, uint _votingDuration) public onlyChairperson returns (Election) {
    el = new Election(chairperson);
    el.nominationPeriod(_nominationStart, _nominationDuration);
    el.votingPeriod(_votingStart, _votingDuration);
    return el;
  }
}
