//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;
    constructor() {
        count = 0;
    }

    function addOne() public {
        count = count + 1;
    }

    function addAny(uint256 num) public {
        count = count + num;
    }
}
