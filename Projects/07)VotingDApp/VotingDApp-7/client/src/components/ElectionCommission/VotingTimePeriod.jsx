import { useRef, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { toast } from "react-hot-toast";

const VotingTimePeriod = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const startRef = useRef(null);
  const endRef = useRef(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleVotingTime = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const startTime = new Date(startRef.current.value).getTime() / 1000; // Convert to UNIX timestamp
    const endTime = new Date(endRef.current.value).getTime() / 1000; // Convert to UNIX timestamp

    // Validate that end time is after start time
    if (endTime <= startTime) {
      toast.error("Error: End time must be after start time");
      setLoading(false);
      return;
    }

    try {
      await contractInstance.setVotingPeriod(startTime, endTime);
      toast.success("Voting time period set successfully");
    } catch (error) {
      toast.error("Error: Voting Time Period");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  return (
    <form onSubmit={handleVotingTime} className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="flex-1">
          <input
            type="date"
            ref={startRef}
            className="mt-1 p-3 w-full bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start Time"
            required
          />
        </div>
        <div className="flex-1">
          <input
            type="date"
            ref={endRef}
            className="mt-1 p-3 w-full bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="End Time"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className={`w-full px-4 py-2 ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Setting..." : "Register"}
      </button>
    </form>
  );
};

export default VotingTimePeriod;
