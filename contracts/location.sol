// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC20.sol";

contract Geologix is ERC20  {

    address public owner;
    uint public latitude;
    uint public longitude;
    uint public radius;
    uint public startTime;
    uint public endTime;
    uint public rewardAmount;
  
    enum DeviceState { Created, InZone, OutZone, Completed}

    struct Device {
        uint complianceCount;
        uint nonComplianceCount;
        DeviceState deviceState;
        address public_address;
        uint lastRecorededTime;
        uint payedAmount;
        bool isActive;
    }

    mapping(address => Device) public devices;
    uint public DeviceCount;

    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor(
        uint _latitude,
        uint _longitude,
        uint _radius,
        uint _startTime,
        uint _endTime,
        uint _rewardAmount
    ) ERC20("RToken", "RT") {
        owner = msg.sender;
        latitude = _latitude;
        longitude = _longitude;
        radius = _radius;
        startTime = _startTime;
        endTime = _endTime;
        rewardAmount = _rewardAmount;
    }

    function addDriver(address _public_address) external onlyOwner {
        DeviceCount ++;
        devices[_public_address] = Device(0, 0, DeviceState.Created, _public_address, block.timestamp, 0, true);
    }

    function optIn(uint _latitude, uint _longitude) external {

    require(devices[msg.sender].public_address != address(0), "Device not registered");
    require(devices[msg.sender].isActive, "the device Contract is not active");
    
    if (block.timestamp < startTime) {
        revert("Contract has not started yet");
    } else if (block.timestamp > endTime) {
         devices[msg.sender].isActive = false;
        // _payReward(msg.sender);
        devices[msg.sender].payedAmount = rewardAmount;
        devices[msg.sender].deviceState = DeviceState.Completed;
        return;
    }
    
    if (_isWithinArea(_latitude, _longitude)) {
        devices[msg.sender].complianceCount++;
        devices[msg.sender].deviceState = DeviceState.InZone;
    } else {
        devices[msg.sender].nonComplianceCount++;
        devices[msg.sender].deviceState = DeviceState.OutZone;
    }
    }

    function _isWithinArea(uint _latitude, uint _longitude) private view returns (bool) {
        // Calculate the distance between current location and contract location
        uint distance = _calculateDistance(latitude, longitude, _latitude, _longitude);
        return distance <= radius;
    }

    function _calculateDistance(uint lat1, uint lon1, uint lat2, uint lon2) public pure returns (uint) {
        return (lat1 - lat2) + (lon1 - lon2);
    }

    function _payReward(address recipient) private {
        transfer(recipient, rewardAmount); // Transfer tokens from the contract's address
        devices[recipient].payedAmount = rewardAmount;
    }

    function getDevice() public view returns (uint complianceCount, uint nonComplianceCount, DeviceState deviceState) {
        require(devices[msg.sender].public_address != address(0), "Device not registered");
        Device memory curDevice = devices[msg.sender];
        return (curDevice.complianceCount, curDevice.nonComplianceCount, curDevice.deviceState);
    }

}


 