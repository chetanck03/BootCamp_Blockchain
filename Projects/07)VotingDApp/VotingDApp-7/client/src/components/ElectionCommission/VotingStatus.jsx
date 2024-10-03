import { useState, useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { toast } from "react-hot-toast";

const VotingStatus = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [votingStatus, setVotingStatus] = useState("Not Started");

  const statusMap = {
    0: "Not Started",
    1: "In Progress",
    2: "Ended"
  };

  useEffect(() => {
    const getVotingStatus = async () => {
      try {
        const currentVotingStatus = await contractInstance.getVotingStatus();
        setVotingStatus(statusMap[currentVotingStatus] || "Unknown Status");
      } catch (error) {
        toast.error("Error: Getting Voting Status");
        console.error(error);
        setVotingStatus("Error fetching status");
      }
    };

    if (contractInstance) {
      getVotingStatus();
    }
  }, [contractInstance]);

  return (
    <div>
      <h3 className="text-lg">Status: <span className="font-bold">{votingStatus}</span></h3>
    </div>
  );
};

export default VotingStatus;
