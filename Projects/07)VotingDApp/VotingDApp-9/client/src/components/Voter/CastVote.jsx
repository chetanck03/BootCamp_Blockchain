import { useEffect, useRef, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const CastVote = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const voterId = useRef(null);
  const candidateId = useRef(null);
  
  // State to manage voting status and timer
  const [votingStatus, setVotingStatus] = useState("Not Started");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    const checkVotingPeriod = async () => {
      try {
        // Fetch start and end times from the contract
        const startTimeBigInt = await contractInstance.startTime();
        const endTimeBigInt = await contractInstance.endTime();

        const startTime = Number(startTimeBigInt); // Convert to number
        const endTime = Number(endTimeBigInt); // Convert to number

        // Update voting status and timer
        if (Date.now() / 1000 < startTime) {
          setVotingStatus("Not Started");
          setTimeRemaining(startTime - Math.floor(Date.now() / 1000)); // Time until voting starts
        } else if (Date.now() / 1000 >= startTime && Date.now() / 1000 < endTime) {
          setVotingStatus("In Progress");
          setTimerStarted(true);
          setTimeRemaining(endTime - Math.floor(Date.now() / 1000)); // Time until voting ends
        } else {
          setVotingStatus("Ended");
        }
      } catch (error) {
        console.error("Error fetching voting period:", error);
      }
    };

    if (contractInstance) {
      checkVotingPeriod();
    }
  }, [contractInstance]);

  useEffect(() => {
    let timer;
    if (timerStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => Math.max(prev - 1, 0)); // Decrease time remaining
      }, 1000);
    } else if (timeRemaining === 0) {
      setTimerStarted(false);
      setVotingStatus("Ended");
    }

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [timerStarted, timeRemaining]);

  const handleCastVote = async (e) => {
    e.preventDefault();
    try {
      const voterID = voterId.current.value;
      const candidateID = candidateId.current.value;

      // Make sure voting is in progress before casting a vote
      if (votingStatus !== "In Progress") {
        alert("Voting is not currently active.");
        return;
      }

      await contractInstance.vote(voterID, candidateID);
      console.log("Voted successfully");
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  // Helper function to format time into hours, minutes, and seconds
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, secs };
  };

  const { hours, minutes, secs } = formatTime(timeRemaining);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <form
        onSubmit={handleCastVote}
        className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Cast Your Vote
        </h1>

        {/* Voting Status */}
        <h2 className="text-lg text-center text-gray-300 mb-2">
          Status: <span className="font-bold">{votingStatus}</span>
        </h2>
        
        {/* Timer Display */}
        {timerStarted && (
          <div className="text-center mb-4">
            <h2 className="text-2xl text-blue-400 font-bold">
              Time Remaining:
            </h2>
            <div className="flex justify-center space-x-4 mt-2">
              <div className="flex flex-col items-center bg-blue-500 p-4 rounded-md shadow-lg">
                <span className="text-xl text-white font-bold">{String(hours).padStart(2, '0')}</span>
                <span className="text-sm text-gray-200">Hours</span>
              </div>
              <div className="flex flex-col items-center bg-blue-500 p-4 rounded-md shadow-lg">
                <span className="text-xl text-white font-bold">{String(minutes).padStart(2, '0')}</span>
                <span className="text-sm text-gray-200">Minutes</span>
              </div>
              <div className="flex flex-col items-center bg-blue-500 p-4 rounded-md shadow-lg">
                <span className="text-xl text-white font-bold">{String(secs).padStart(2, '0')}</span>
                <span className="text-sm text-gray-200">Seconds</span>
              </div>
            </div>
          </div>
        )}

        {/* Voter ID */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Voter ID
          </label>
          <input
            type="text"
            ref={voterId}
            className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Candidate ID */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Candidate ID
          </label>
          <input
            type="text"
            ref={candidateId}
            className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300"
          >
            Cast Vote
          </button>
        </div>
      </form>
    </div>
  );
};

export default CastVote;
