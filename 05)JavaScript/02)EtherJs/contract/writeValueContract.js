const ethers = require("ethers")
const abi = require("../abi.json")
const { Wallet } = require("ethers")
require("dotenv").config()

async function writeContract(){
    const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com") // read only in the blockchain
    const contractAddress = "0x8Be54c0Cd534185941cC296524b3424a8DF7C639"

    const privateKey = process.env.PRIVATE_KEY
    const wallet = new Wallet(privateKey,provider) // Mini version of signer : write in the blockchain

    const contractInstance = new ethers.Contract(contractAddress,abi,wallet)
    await contractInstance.store(10) // call the function in the contract
    
    console.log("Transaction successful");

}
writeContract()