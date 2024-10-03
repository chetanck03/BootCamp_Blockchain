import { useState, useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { toast } from "react-hot-toast";

const DisplayResult = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [winner, setWinner] = useState({
    id: null,
    name: "No winner declared",
    address: null,
    votes: 0,
  });

  useEffect(() => {
    const getWinner = async () => {
      try {
        const winnerId = await contractInstance.winnerId();
        if (winnerId > 0) {
          const winnerName = await contractInstance.winnerName();
          const winnerAddress = await contractInstance.winnerAddress();
          const winnerVotes = await contractInstance.winnerVotes();
          
          setWinner({
            id: winnerId,
            name: winnerName,
            address: winnerAddress,
            votes: winnerVotes.toString(),
          });
        }
      } catch (error) {
        toast.error("Error: Getting Winner");
        console.error(error);
      }
    };

    if (contractInstance) {
      getWinner();
    }
  }, [contractInstance]);

  return (
    <div>
      <h3 className="text-lg">
        Winner: <span className="font-bold">{winner.name}</span>
      </h3>
      {winner.id && (
        <div>
          <p>Winner ID: {winner.id}</p>
          <p>Winner Address: {winner.address}</p>
          <p>Votes Received: {winner.votes}</p>
        </div>
      )}
    </div>
  );
};

export default DisplayResult;
