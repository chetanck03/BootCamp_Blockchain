import { useState , useEffect } from 'react'
import {useWeb3Context} from "../../../context/Web3Provider.jsx";

const VotingStatus = () => {
    
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;
    const [votingStatus, setVotingStatus] = useState("")
   
    useEffect(()=>{
        const getVotingStatus = async()=>{
          try{
            const currentVotingStatus = await contractInstance.getVotingStatus();
            setVotingStatus(currentVotingStatus)
          }catch(error){
            console.error(error)
          }
        }
        contractInstance && getVotingStatus()
      },[])
  return (
    <div>
      <h1>Status: {votingStatus}</h1>
    </div>
  )
}

export default VotingStatus