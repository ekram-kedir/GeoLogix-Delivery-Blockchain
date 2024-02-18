import React, { useState } from 'react';
import { ethers } from 'ethers';
import GeologixABI from '../artifacts/contracts/NFTMarketplace.sol/Geologix.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Admin = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [radius, setRadius] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [rewardAmount, setRewardAmount] = useState('');
    const [transactionHash, setTransactionHash] = useState('');

    const createContract = async (e) => {
        e.preventDefault();
        try {
            // Connect to Ethereum network
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                // Get contract instance
                const contractAddress =  '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'; // Replace with your contract address
                const abi = GeologixABI.abi;
                const contract = new ethers.Contract(contractAddress, abi, signer);

                // Call createContract function on the smart contract
                const tx = await contract.createContract(latitude, longitude, radius, startTime, endTime, rewardAmount);
                await tx.wait(); // Wait for transaction to be mined

                // Display transaction hash
                setTransactionHash(tx.hash);
            } else {
                alert('Please install MetaMask extension to connect to Ethereum network.');
            }
        } catch (error) {
            console.error(error);
            alert('Error creating contract');
        }
    };

    return (
        <div className="mx-8 py-8 my-8 text-blue-600 ">
            <h1 className="text-3xl font-bold mb-4">Create Geologix Contract</h1>
            <form onSubmit={createContract} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="latitude" className="mb-1">Latitude:</label>
                    <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required className="border border-gray-300 rounded px-4 py-2" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="longitude" className="mb-1">Longitude:</label>
                    <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required className="border border-gray-300 rounded px-4 py-2" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="radius" className="mb-1">Radius:</label>
                    <input type="number" id="radius" value={radius} onChange={(e) => setRadius(e.target.value)} required className="border border-gray-300 rounded px-4 py-2" />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="startTime" className="mb-1">Start Time:</label>
                    <DatePicker
                        selected={startTime}
                        onChange={(date) => setStartTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="endTime" className="mb-1">End Time:</label>
                    <DatePicker
                        selected={endTime}
                        onChange={(date) => setEndTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="rewardAmount" className="mb-1">Reward Amount:</label>
                    <input type="number" id="rewardAmount" value={rewardAmount} onChange={(e) => setRewardAmount(e.target.value)} required className="border border-gray-300 rounded px-4 py-2" />
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Create Contract</button>
            </form>
            {transactionHash && <div className="mt-4">Transaction hash: {transactionHash}</div>}
        </div>
    );
};

export default Admin;
