//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Counter { // 计数器合约
    uint256 public count; // 计数器
    constructor() { // 构造函数
        count = 0; // 将计数器置为 0
    }

    function addOne() public { // 计数器+1 的函数
        count = count + 1;
    }

    function addAny(uint256 num) public { // 计数器+num 的函数
        count = count + num;
    }
}
