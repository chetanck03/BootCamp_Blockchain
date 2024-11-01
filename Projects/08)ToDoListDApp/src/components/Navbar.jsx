import  { useState, useEffect } from "react";
import { useWeb3 } from "../providers/Web3Provider";
import { Link } from "react-router-dom";


const Navbar = () => {
  const { selectedAccount, handleWallet, disconnectWallet } = useWeb3();
  const [address, setAddress] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (selectedAccount) {
      const shortAddress = `${selectedAccount.slice(0, 6)}...${selectedAccount.slice(-4)}`;
      setAddress(shortAddress);
    }
  }, [selectedAccount]);

  const connectWallet = async () => {
    await handleWallet();
    if (selectedAccount) {
      const shortAddress = `${selectedAccount.slice(0, 6)}...${selectedAccount.slice(-4)}`;
      setAddress(shortAddress);
    }
  };

  // Function to close the mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
          <Link to="/">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            To-Do-List DApp
          </h1>
          </Link>
        </div>

        {/* Menu Icon for Mobile */}
        <button
          className="md:hidden text-purple-300 hover:text-purple-500 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Desktop Links and Wallet Connect */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text hover:text-indigo-300 transition duration-200">
            Wallet
          </Link>
          <Link to="/to-do-list" className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text hover:text-indigo-300 transition duration-200">
          ToDoList
          </Link>
         
          <div className="flex items-center space-x-4">
            {selectedAccount ? (
              <>
                <p className="text-sm font-semibold text-purple-300 bg-gray-800 px-3 py-1 rounded">
                  {address}
                </p>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition duration-200"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition duration-200"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 bg-gray-800 p-4 rounded-lg">
          <Link 
            to="/" 
            className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text hover:text-indigo-300 transition duration-200 text-center"
          >
            Wallet
          </Link>
          <Link 
            to="/to-do-list" 
            className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text hover:text-indigo-300 transition duration-200 text-center"
          >
            To Do List
          </Link>
        
          <div className="flex flex-col items-center space-y-2">
            {selectedAccount ? (
              <>
                <p className="text-sm font-semibold text-purple-300 bg-gray-800 px-3 py-1 rounded">
                  {address}
                </p>
                <button
                  onClick={() => { disconnectWallet(); closeMenu(); }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition duration-200 w-full"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={() => { connectWallet(); closeMenu(); }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition duration-200 w-full"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
