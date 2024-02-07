import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import React,{useState, useContext} from 'react';
import { TransactionContext } from '../context/TransactionContext';

export default function Marketplace() {
const { getAllNFTs, dataFetched, data } = useContext(TransactionContext);

if(!dataFetched)
    getAllNFTs();

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col mx-20 mt-20">
            <div className="md:text-4xl font-bold text-yellow-300">
                Art Gallery
            </div>
            <div className="flex mx-40 mt-5 flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div>            
    </div>
);

}