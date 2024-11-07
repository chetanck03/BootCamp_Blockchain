import { useEffect, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

// Function to map gender value to string
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

const GetVoterList = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [voterList, setVoterList] = useState([]);

  useEffect(() => {
    const fetchVoterList = async () => {
      try {
        // Fetch the voter list from the smart contract
        const voters = await contractInstance.getVoterList();

        // Map the fetched data to an array of voter objects
        const formattedVoters = voters.map(voter => ({
          voterId: voter.voterId.toString(),
          name: voter.name,
          age: voter.age.toString(),
          gender: voter.gender.toString(),
          voterAddress: voter.voterAddress,
        }));

        setVoterList(formattedVoters);
      } catch (error) {
        console.error("Error fetching voter list: ", error);
      }
    };

    if (contractInstance) {
      fetchVoterList(); // Initial fetch on component mount

      // Set up interval to fetch voter list every 3 seconds
      const interval = setInterval(() => {
        fetchVoterList();
      }, 3000); // 3000 ms = 3 seconds

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [contractInstance]); // Re-run effect when contractInstance changes

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-10">Voter List</h1>

      {/* Display a message if no voters are available */}
      {voterList.length === 0 ? (
        <div className="text-center text-xl text-gray-400">
          No voters available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {voterList.map((voter, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
            >
              <img
                className="w-24 h-24 object-cover rounded-full border-2 border-blue-500 mb-4"
                src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/images/VoterImages/${voter.voterAddress}.png`}
                alt={`${voter.name}'s image`}
                 onError={(e) => {
                   e.target.src = '/default.png'; // Replace with the actual default image path
              }}
              />
             

              <h2 className="text-xl font-bold mb-2">{voter.name}</h2>
              <div className="bg-gray-700 rounded-lg p-4 w-full mb-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span><strong>Voter ID:</strong></span>
                    <span>{voter.voterId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Age:</strong></span>
                    <span>{voter.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Gender:</strong></span>
                    <span>{getGenderString(voter.gender)}</span>
                  </div>
                </div>
              </div>
              {/* Voter Address displayed outside the details box */}
              <p className="text-gray-400 text-sm"><strong>Wallet Address:</strong> {voter.voterAddress}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetVoterList;
