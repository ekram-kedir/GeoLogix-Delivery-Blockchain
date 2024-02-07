import { BrowserRouter as Router, Link } from "react-router-dom";
import { useContext } from 'react';
import { useLocation } from 'react-router';
import { TransactionContext } from '../context/TransactionContext';

function Navbar() {
    const { connectWallet, currentAccount, textmessage } = useContext(TransactionContext);
    const location = useLocation();

    return (
      <div className="">
        <nav className="w-screen">
          <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
          <Link to="/">
            <div className='inline-block font-bold font-serif text-xl ml-2'>
              Sell/Buy <small>Art</small> 
            </div>
          </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
              <li className='border-b-2 hover:pb-0 p-2 text-sm text-yellow-500'>
                <Link to="/">Gallery</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2 text-sm text-yellow-500'>
                <Link to="/">Collection</Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className='border-b-2 hover:pb-0 p-2 text-sm text-yellow-500'>
                <Link to="/sellNFT">Sell</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2 text-sm text-yellow-500'>
                <Link to="/sellNFT">Sell</Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className='border-b-2 hover:pb-0 p-2 text-sm text-yellow-500'>
                <Link to="/profile">Profile</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2 text-sm text-yellow-500'>
                <Link to="/profile">Profile</Link>
              </li>              
              }  
              <li>
                <button className="enableEthereumButton bg-gradient-to-r from-blue-500 to-yellow-500 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWallet}>{currentAccount? "Connected":"Connect Wallet"}</button>
              </li>
            </ul>
          </li>
          </ul>
        </nav>
        <div className='enableEthereumButton text-white text-bold text-right mr-10 text-sm'>
          {currentAccount ? "Connected to":"Not Connected. Please login to view NFTs"} {currentAccount ? (currentAccount.substring(0,15)+'...'):""}
        </div>
      </div>
    );
  }

  export default Navbar;