import {useWeb3Context} from "../../context/useWeb3Context"
function EmergencyDeclare() {
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;

    const emergencyDeclare = async()=>{
        await contractInstance.StopVoting()

    }
  return (
    <div>
      <button onClick={emergencyDeclare}>Stop Voting</button>
    </div>
  )
}

export default EmergencyDeclare
