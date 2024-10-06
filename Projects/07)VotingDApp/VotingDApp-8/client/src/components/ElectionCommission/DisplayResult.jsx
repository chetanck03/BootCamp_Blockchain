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
        const winnerName = await contractInstance.winnerName();
        const winnerAddress = await contractInstance.winnerAddress();
        const winnerVotes = await contractInstance.winnerVotes();

        setWinner({
          id: winnerId.toString(),
          name: winnerName,
          address: winnerAddress,
          votes: winnerVotes.toString(),
        });
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
    <div className="bg-gray-900 text-white p-4 sm:p-8">
      <div className="flex justify-center">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">
            <span className="text-blue-400">Winner: </span>
            <span className="font-bold">{winner.id ? winner.name : ""}</span>
          </h2>
          {winner.id ? (
            <div className="bg-gray-700 rounded-lg p-4 w-full mb-4">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span><strong>ID:</strong></span>
                  <span>{winner.id}</span>
                </div>
                <div className="flex justify-between">
                  <span><strong>Votes Received:</strong></span>
                  <span>{winner.votes}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No winner declared</p>
          )}
          {/* Account Address displayed with better responsiveness */}
          <p className="text-gray-400  break-words">
            <strong className="text-blue-400 text-xl">Wallet Address:</strong>
            <p className="text-xs">
              {winner.id ? winner.address : "N/A"}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayResult;
