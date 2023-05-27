// SPDX-License-Identifier: UNLICENSED
// soloidity is a combination of javaScript , java , c++ , Rust and other languages

pragma solidity ^0.8.0;

contract Transactions {
    uint256 TransactionsCounter;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
    
    // creating structure just like c++ structure
    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // Transactions variable is going to be a array of TransferStruct
    // or we can say array of abjects
    TransferStruct[] transactions;

    // functions in solidity
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        TransactionsCounter += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));  //behave same as javaScript push()

        //to make transfer we need to emit transfer
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);

    }

    function getAllTransaction() public view returns (TransferStruct[] memory){
        return transactions;
    }
    function getTransactionCount() public view returns (uint256) {
        return TransactionsCounter;
    }

}