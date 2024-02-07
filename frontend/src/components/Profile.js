import Navbar from "./Navbar";
import { useParams } from 'react-router-dom';
import { useEffect, useContext } from "react";
import NFTTile from "./NFTTile";
import { TransactionContext } from '../context/TransactionContext';

export default function Profile () {
    const { currentAccount, totalPrice, getMyNFTData, profileDataFetched } = useContext(TransactionContext);
    const params = useParams();
    const tokenId = params.tokenId;
    useEffect(() => {
        getMyNFTData(tokenId);
    });

    return (
        <div className="profileClass" style={{"min-height":"100vh"}}>
            <Navbar></Navbar>
            <div className="profileClass">
            <div className="bg-white bg-opacity-25 mt-4 py-1">
                <div className="flex text-center flex-col mt-11 md:text-xl text-white">
                    <div className="mb-5">
                        <h2 className="font-thin text-sm">Wallet Address</h2>  
                        <span className="text-2xl text-yellow-300">{currentAccount}</span>
                    </div>
                </div>
                <div className="flex flex-row text-center justify-center mt-10 md:text-xl text-white">
                        <div>
                            <h2 className="font-thin text-sm">NFTs count</h2>
                            <span className="text-2xl text-yellow-300">{profileDataFetched.length}</span>                        
                        </div>
                        <div className="ml-20">
                            <h2 className="font-thin text-sm">Total value</h2>
                            <span className="text-2xl text-yellow-300">{totalPrice} ETH</span>                        
                        </div>
                </div>
            </div>
            <div className="flex flex-col text-center items-center mt-11 text-white">
                <h2 className="font-bold text-yellow-300 text-4xl">Your NFTs</h2>
                <div className="flex justify-center flex-wrap max-w-screen-xl">
                    {profileDataFetched.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                    })}
                </div>
                <div className="mt-10 text-xl">
                    {profileDataFetched.length === 0 ? "Oops, No NFT data to display (Are you logged in?)":""}
                </div>
            </div>
            </div>
        </div>
    )
};