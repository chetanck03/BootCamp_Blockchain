import { useEffect, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

// Function to map enum values to strings
const getGenderString = (genderValue) => {
  switch (genderValue) {
    case "0":
      return "Not Specified";
    case "1":
      return "Male";
    case "2":
      return "Female";
    case "3":
      return "Other";
    default:
      return "Unknown";
  }
};

const GetCandidateList = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    const fetchCandidateList = async () => {
      try {
        const candidates = await contractInstance.getCandidateList();
        setCandidateList(candidates);
      } catch (error) {
        console.error("Error fetching candidate list: ", error);
      }
    };

    if (contractInstance) {
      fetchCandidateList(); // Initial fetch on component mount

      // Set up interval to fetch candidate list every 3 seconds
      const interval = setInterval(() => {
        fetchCandidateList();
      }, 3000); // 3000 ms = 3 seconds

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [contractInstance]); // Re-run effect when contractInstance changes

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-10">Candidate List</h1>

      {/* Display a message if no candidates are available */}
      {candidateList.length === 0 ? (
        <div className="text-center text-xl text-gray-400">
          No candidates available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {candidateList.map((candidate, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
            >
              <img
                className="w-24 h-24 object-cover rounded-full border-2 border-blue-500 mb-4"
                src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/images/CandidateImages/${candidate.candidateAddress}.png`}
                alt={`${candidate.name}'s image`}
                onError={(e) => {
                  e.target.src = '/default.png'; // Replace with the actual default image path
                }}
              />
              <h2 className="text-xl font-bold mb-2">{candidate.name}</h2>
              <p className="text-gray-400 text-sm mb-4">Party: {candidate.party}</p>
              <div className="bg-gray-700 rounded-lg p-4 w-full mb-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span><strong>ID:</strong></span>
                    <span>{candidate.candidateId.toString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Age:</strong></span>
                    <span>{candidate.age.toString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Gender:</strong></span>
                    <span>{getGenderString(candidate.gender.toString())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Votes:</strong></span>
                    <span>{candidate.votes.toString()}</span>
                  </div>
                </div>
              </div>
              {/* Account Address displayed outside the details box */}
              <p className="text-gray-400 text-sm"><strong>Wallet Address:</strong> {candidate.candidateAddress}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetCandidateList;
