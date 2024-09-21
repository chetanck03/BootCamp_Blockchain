import {useWeb3Context} from "../../context/useWeb3Context"
function EmergencyDeclare() {
    const {contractInstance} = useWeb3Context()

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
