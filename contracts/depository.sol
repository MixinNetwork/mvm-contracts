// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.4 <0.9.0;

import "hardhat/console.sol";

contract Depository {
  mapping(uint => bytes) public shelves;

  function persistReadData(uint _id) public view returns (bytes memory) {
    return shelves[_id];
  }

  function persistWriteData(bytes memory _raw) public returns (uint) {
    uint id = uint256(keccak256(_raw));
    shelves[id] = _raw;
    return id;
  }
}
