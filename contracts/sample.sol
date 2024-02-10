pragma solidity ^0.8.7;

contract IncrementDecrement {
    // State variables are stored on the blockchain.
    uint256 value;

    event Increment(string message);
    event Decrement(string message);

    function increment() external {
        value++;

        emit Increment("value incremented by 1");
    }

    function decrement() external {
        value--;

        emit Decrement("value decremented by 1");
    }

    // getter function
    function getValue() public view returns (uint256) {
        return value;
    }
}