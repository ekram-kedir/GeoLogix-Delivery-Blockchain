import Navbar from "./Navbar";
import { useParams } from 'react-router-dom';
import { useEffect, useContext } from "react";
import { TransactionContext } from '../context/TransactionContext';

export default function NFTPage (props) {
    const { currentAccount, filterdata, message, buyNFT, getNFTData, singleDataFetched } = useContext(TransactionContext);

    const params = useParams();
    const tokenId = params.tokenId;
    useEffect(() => {
        getNFTData(tokenId);
    })
    
    return(
        <div style={{"min-height":"100vh"}}>
            <Navbar></Navbar>
           
            <div className="flex justify-center gap-20 mt-20 ">
                <div className="border-8 border-yellow-400">
                    <img src={singleDataFetched.image} alt="" className="h-[30rem] rounded" />
                </div>
                
                <div className="text-xl bg-white bg-opacity-20 text-black shadow-2xl rounded-tl-[20rem] rounded-br-[20rem]">
                    <div className="p-5 bg-yellow-200 h-full bg-opacity-25 space-y-8">
                        <div className="text-sm text-yellow-200 text-opacity-30 italic font-thin">
                            Name
                           <span className="text-xl px-2 text-gray-900">{singleDataFetched.name}</span> 
                        </div>
                        <div className="text-sm text-yellow-200 text-opacity-30 italic font-thin">
                            Description
                            <span className="text-xl px-2 text-gray-900">{singleDataFetched.description}</span> 
                        </div>
                        <div className="text-sm text-yellow-200 text-opacity-30 italic font-thin">
                            Price 
                            <span className="text-xl px-2 text-gray-900">{singleDataFetched.price + " ETH"}</span>
                        </div>
                        <div className="text-sm text-yellow-200 text-opacity-30 italic font-thin">
                            Owner 
                            <span className="text-xl px-2 text-gray-900">{singleDataFetched.owner}</span>
                        </div>
                        <div className="text-sm text-yellow-200 text-opacity-30 italic font-thin">
                            Seller 
                            <span className="text-xl px-2 text-gray-900">{singleDataFetched.seller}</span>
                        </div>
                        <div className="text-sm text-yellow-200 text-opacity-30 italic font-thin">
                            currAddress 
                            <span className="text-xl px-2 text-gray-900">{currentAccount}</span>
                        </div>
                        <div>
                        { currentAccount == singleDataFetched.owner || currentAccount == singleDataFetched.seller ?
                            <div className="text-white text-center bg-gradient-to-r from-blue-500 to-yellow-500 mx-40 py-3 rounded-full">You own this NFT</div>
                            :<button className="bg-gradient-to-r from-blue-500 to-yellow-500 py-3 rounded-full text-white font-bold px-10 text-sm" onClick={() => buyNFT(tokenId)}>Buy</button>
                            
                        }
                        
                        <div className="text-yellow-300 text-center text-sm mt-3">{message}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}