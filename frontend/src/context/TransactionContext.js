import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import MarketplaceJSON from "../Marketplace.json";
import { uploadJSONToIPFS } from "../pinata";
export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
  console.log('fetched contract',transactionsContract);
  return transactionsContract;
};

const sampleData = [
    {
        "name": "Ashore",
        "description": "Art by Henrik",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTDDcJk8AN85FVvepfsyPrNPeTQuq9PXiFVNXSwXvoyno",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "Colorful",
        "description": "Art by Jene",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmPFereghV2JWQJL8PGddueG8GZHid3TXRBm3yw26Wj9DS",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "Block",
        "description": "Art by Sebastian",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmdyyBCjXiri3D5XqVkDdALeN6iGhYGUbgWToxFXsQxSsS",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
];

export const TransactionsProvider = ({ children }) => {
    const [dataFetched, updateFetched] = useState(false);
    const [data, updateData] = useState(sampleData);
    const [profileDataFetched, updateProfileData] = useState(sampleData);
    const [singleDataFetched, updateDataFetched] = useState({});
    const [filterdata, updateDataFilter] = useState(false);
    const [textmessage, setupMessage] = useState('');
    const [message, updateMessage] = useState('');
    const [currentAccount, setCurrentAccount] = useState("");
    const [totalPrice, updateTotalPrice] = useState("0");
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});

    const checkIfWalletIsConnect = async () => {
        try {
        if (!ethereum) return setupMessage("Please install MetaMask.");
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length) {
            setCurrentAccount(accounts[0]);
            //console.log("accounts found");
        } else {
            console.log("No accounts found");
        }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfTransactionsExists = async () => {
        try {
            if (ethereum) {
                //const transactionsContract = createEthereumContract();
                console.log('Connect to your sepolia metamask account!');
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return setupMessage("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            setCurrentAccount(accounts[0]);
            setupMessage('You are Connected!');
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    async function getAllNFTs() {
        try{
            if(ethereum){
                const contract = createEthereumContract();
                let transaction = await contract.getAllNFTs()    
                //Fetch all the details of every NFT from the contract and display
                const items = await Promise.all(transaction.map(async i => {
                    const tokenURI = await contract.tokenURI(i.tokenId);
                    let meta = await axios.get(tokenURI);
                    meta = meta.data;
            
                    let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
                    let item = {
                        price,
                        tokenId: i.tokenId.toNumber(),
                        seller: i.seller,
                        owner: i.owner,
                        image: meta.image,
                        name: meta.name,
                        description: meta.description,
                    }
                    return item;
                }))
                console.log("more", items)
            
                updateFetched(true);
                updateData(items);
            } else { 
                console.log("Error with loading");
                setupMessage("Error with loading"); 
            }
        }
        catch(e) {
            console.log( "Upload error"+e );
            setupMessage("Error with loading");
        }
    }

    
    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS(fileURL) {
        const {name, description, price} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !price || !fileURL)
            return;

        const nftJSON = {
            name, description, price, image: fileURL
        }
        
        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                //console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listNFT(fileURL) {
        //Upload data to IPFS
        try {
            const metadataURL = await uploadMetadataToIPFS(fileURL);
            updateMessage("Please wait.. uploading")
            const contract = createEthereumContract();
            //massage the params to be sent to the create NFT request
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            let listingPrice = await contract.getListPrice()
            listingPrice = listingPrice.toString()

            //actually create the NFT
            let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
            await transaction.wait()

            alert("Successfully listed your NFT!");
            updateMessage("");
            updateFormParams({ name: '', description: '', price: ''});
            window.location.replace("/")
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }

    async function getNFTData(tokenId) {
        const contract = createEthereumContract();
        //create an NFT Token
        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);
    
        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        console.log(item);
        updateDataFetched(item);
        updateDataFilter(true);
    }
    
    async function buyNFT(tokenId) {
        try {
            const contract = createEthereumContract();
            const salePrice = ethers.utils.parseUnits(data.price, 'ether')
            updateMessage("Buying the NFT... Please Wait")
            //run the executeSale function
            let transaction = await contract.executeSale(tokenId, {value:salePrice});
            await transaction.wait();
    
            alert('You successfully bought the NFT!');
            updateMessage("");
        }
        catch(e) {
            alert("Upload Error"+e)
        }
    }

    async function getMyNFTData(tokenId) {
        let sumPrice = 0;
        const contract = createEthereumContract();

        //create an NFT Token
        let transaction = await contract.getMyNFTs()        
        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            }
            sumPrice += Number(price);
            return item;
        }))

        updateProfileData(items);
        updateTotalPrice(sumPrice.toPrecision(3));
    }

    useEffect(() => {
        checkIfWalletIsConnect();
        checkIfTransactionsExists();
    },[]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        getAllNFTs,
        dataFetched,
        data,
        textmessage,
        formParams,
        updateFormParams,
        listNFT,
        message,
        getNFTData,
        buyNFT,
        getMyNFTData,
        singleDataFetched,
        filterdata,
        profileDataFetched,
        totalPrice
        }}
      >
      {children}
    </TransactionContext.Provider>
  );
}