import { useRef } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const CastVote = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const voterId = useRef(null);
  const candidateId = useRef(null);

  const handleCastVote = async (e) => {
    try {
      e.preventDefault();
      const voterID = voterId.current.value;
      const candidateID = candidateId.current.value;
      console.log(voterID, candidateID);

      await contractInstance.vote(voterID, candidateID);
      console.log("Voted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <form
        onSubmit={handleCastVote}
        className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Cast Your Vote
        </h1>

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
