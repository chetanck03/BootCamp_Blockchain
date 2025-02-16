import { Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com","confirmed")

const getBalance = async ()=>{
    const key = "3tZXKYsVyH6q4brmjcUWMJnfG2zbUaURqCzFAne5Gh9t"
    const publicKey = new PublicKey(key)
    const balance = await connection.getBalance(publicKey)
    console.log("Account Address : ", key)
    console.log("Balance in Lamports : ", balance ,"LAMPORTS")

    const balanceSOL = balance / LAMPORTS_PER_SOL;
    console.log("Balance in Sol : ", balanceSOL ,"SOL")

}

getBalance()