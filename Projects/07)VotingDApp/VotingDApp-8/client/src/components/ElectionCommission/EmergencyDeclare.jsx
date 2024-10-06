import { useWeb3Context } from "../../context/useWeb3Context";
import { toast } from "react-hot-toast";

const EmergencyDeclare = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const emergencyStop = async () => {
    try {
      console.log("stop")
      await contractInstance.StopVoting();
      toast.success("Voting has been stopped!");
    } catch (error) {
      toast.error("Error: Emergency Stop");
      console.error(error);
    }
  };

  return (
    <button onClick={emergencyStop} className="px-4 py-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg ">
      Stop Voting
    </button>
  );
};

export default EmergencyDeclare;
