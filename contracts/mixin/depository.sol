// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Depository {
  mapping(uint => bytes) public shelves;

  function persistWriteData(uint _id, bytes memory _raw) public {
    uint id = uint256(keccak256(_raw));
    require(id == _id, "invalid _id or _raw");
    shelves[id] = _raw;
  }
}
