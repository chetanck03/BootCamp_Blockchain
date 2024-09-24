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
        console.log(candidates);
      } catch (error) {
        console.error("Error fetching candidate list: ", error);
      }
    };

    contractInstance && fetchCandidateList();
  }, [contractInstance]);

  return (
    <>
      <ul>
        {candidateList.map((candidate, index) => (
          <li key={index}>
            <p><strong>Candidate ID:</strong> {candidate.candidateId.toString()}</p>
            <p><strong>Name:</strong> {candidate.name}</p>
            <p><strong>Party:</strong> {candidate.party}</p>
            <p><strong>Age:</strong> {candidate.age.toString()}</p>
            {/* Map gender enum value to corresponding string */}
            <p><strong>Gender:</strong> {getGenderString(candidate.gender.toString())}</p>
            <p><strong>Address:</strong> {candidate.candidateAddress}</p>
            <p><strong>Votes:</strong> {candidate.votes.toString()}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GetCandidateList;
