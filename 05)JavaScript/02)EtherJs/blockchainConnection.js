const ethers = require("ethers")

// check the account balance (Ether)
async function fetchAccountBalance(){

    const provider = new ethers.JsonRpcProvider("https://ethereum.publicnode.com") // read only in the blockchain
    const balance = await provider.getBalance("0xfd898a0f677e97a9031654fc79a27cb5e31da34a") // check the account balance
    const ethBalance = ethers.formatEther(balance) // convert balance into ether
    
    console.log(ethBalance)
}

fetchAccountBalance()