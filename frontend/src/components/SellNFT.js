import Navbar from "./Navbar";
import { useState, useContext } from "react";
import { uploadFileToIPFS } from "../pinata";
import { TransactionContext } from '../context/TransactionContext';

export default function SellNFT () {
    const { formParams, updateFormParams, listNFT, message } = useContext(TransactionContext);
    const [fileURL, setFileURL] = useState(null);
    const [text, setText] = useState("");

    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            setText("Wait, it is uploading...")
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                //console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
                setText("");
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        listNFT(fileURL);
      };

    return (
        <div className="">
        <Navbar></Navbar>
        <div className="flex flex-col mx-64 mt-10 mb-40" id="nftForm">
            <img src="https://gateway.pinata.cloud/ipfs/QmPFereghV2JWQJL8PGddueG8GZHid3TXRBm3yw26Wj9DS" alt="" className="h-[38.3rem] relative"/>
            <form className="bg-black bg-opacity-70 shadow-md px-8 pt-2 pb-8 mb-4 absolute w-[32rem]">
            <h3 className="text-center text-2xl font-thin text-white mb-8 italic">Display your Art creativity to the marketplace</h3>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="name">Art Name</label>
                    <input className="shadow appearance-none border rounded bg-yellow-300 bg-opacity-25 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="nft name" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="description">Art Description</label>
                    <textarea className="shadow appearance-none border rounded bg-yellow-300 bg-opacity-25 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="art collection" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                    <input className="shadow appearance-none border rounded bg-yellow-300 bg-opacity-25 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div>
                <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
                    <input type={"file"} className="text-white font-thin text-sm bg-yellow-300 bg-opacity-25" onChange={OnChangeFile}></input>
                </div>
                <br></br>
                <div className="text-yellow-300 text-center">{message}</div>
                <div className="text-yellow-300 text-center">{text}</div>
                <button onClick={handleSubmit} className="font-bold mt-3 w-full bg-gradient-to-r from-blue-500 to-yellow-500 text-white rounded p-2 shadow-lg">
                    Save to Gallery
                </button>
            </form>
        </div>
        </div>
    )
}