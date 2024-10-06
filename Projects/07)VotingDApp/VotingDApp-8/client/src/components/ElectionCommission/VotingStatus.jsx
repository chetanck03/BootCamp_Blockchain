import { useState, useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { toast } from "react-hot-toast";

const VotingStatus = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [votingStatus, setVotingStatus] = useState("Loading..."); // Initial status

  const statusMap = {
    0: "Not Started",
    1: "In Progress",
    2: "Ended"
  };

  useEffect(() => {
    const getVotingStatus = async () => {
      if (!contractInstance) {
        return; // Exit if contractInstance is not available
      }

      try {
        const currentVotingStatus = await contractInstance.getVotingStatus();
        const mappedStatus = statusMap[currentVotingStatus] || "Unknown Status";
        setVotingStatus(mappedStatus);
      } catch (error) {
        toast.error("Error: Getting Voting Status");
        console.error("Error fetching voting status:", error);
        setVotingStatus("Error fetching status");
      }
    };

    getVotingStatus();
  }, [contractInstance]);

  return (
    <div>
      <h3 className="text-lg">
        Status: <span className="font-bold">{votingStatus}</span>
      </h3>
    </div>
  );
};

export default VotingStatus;
