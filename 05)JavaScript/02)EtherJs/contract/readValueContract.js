const ethers = require("ethers")
const abi = require("../abi.json")

async function readContract(){
    const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com") // read only in the blockchain
    const contractAddress = "0x8Be54c0Cd534185941cC296524b3424a8DF7C639"
    const contractInstance = new ethers.Contract(contractAddress,abi,provider)

    const value = await contractInstance.retrieve() // call the function in the contract
    console.log(value);

}
readContract()