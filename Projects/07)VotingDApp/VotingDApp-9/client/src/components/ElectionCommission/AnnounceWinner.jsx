import { useWeb3Context } from "../../context/useWeb3Context";
import { toast } from "react-hot-toast";

export default function AnnounceWinner() {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const getWinner = async () => {
    try {
      // Check if contractInstance is available
      if (!contractInstance) {
        toast.error("Contract instance not found.");
        return;
      }

      const tx = await contractInstance.announceVotingResult();
      const receipt = await tx.wait();

      console.log(receipt);
      toast.success("Winner announced successfully");
    } catch (error) {
      toast.error("Error: Announcing result");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={getWinner}
        className="px-6 py-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition duration-300"
      >
        Announce Winner
      </button>
    </div>
  );
}
