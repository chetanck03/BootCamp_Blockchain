import { useContext } from "react"
import { Web3Context } from "./context/Web3Context"

function Dummy() {
    const {
        contractInstance,
        selectedAccount,
        chainId
    }=useContext(Web3Context)

    console.log( 
        contractInstance,
        selectedAccount,
        chainId
    )
  return (
    <>
    <h2>MetaMask Wallet - Dummy Component</h2>

    </>
  )
}


export default Dummy
