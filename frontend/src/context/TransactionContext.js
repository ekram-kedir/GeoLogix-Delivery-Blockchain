import { ethers } from 'ethers';

// Function to connect to the Ethereum network
async function connectToEthereum() {
    // Check if MetaMask is installed
    if (window.ethereum) {
        // Enable Ethereum provider
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        return provider;
    } else {
        // MetaMask is not installed
        throw new Error('MetaMask is not installed');
    }
}

// Function to get contract instance
async function getContractInstance(provider) {
    // ABI and contract address of your Geologix contract
    const contractAddress = 0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0;
    const abi = [
        // Define ABI here
    ];

    // Create contract instance
    const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
    return contract;
}

// Function to create a contract
async function createContract(provider, latitude, longitude, radius, startTime, endTime, rewardAmount, employee, customField) {
    try {
        const contract = await getContractInstance(provider);
        // Call createContract function on the smart contract
        const tx = await contract.createContract(latitude, longitude, radius, startTime, endTime, rewardAmount, employee, customField);
        await tx.wait(); // Wait for transaction to be mined
        return tx.hash; // Return transaction hash
    } catch (error) {
        throw error;
    }
}

// Function to update employee status
async function updateEmployeeStatus(provider, contractId, latitude, longitude, customField) {
    try {
        const contract = await getContractInstance(provider);
        // Call updateEmployeeStatus function on the smart contract
        const tx = await contract.updateEmployeeStatus(contractId, latitude, longitude, customField);
        await tx.wait(); // Wait for transaction to be mined
        return tx.hash; // Return transaction hash
    } catch (error) {
        throw error;
    }
}

export { connectToEthereum, createContract, updateEmployeeStatus };
