import { useRef, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context"; // Custom hook to access Web3 context
import axios from "axios" // Axios for making HTTP requests

const RegisterCandidate = () => {
  const { web3State } = useWeb3Context(); // Access web3 context (connected blockchain info)
  const { contractInstance } = web3State; // Get contract instance from the web3 state

  // Refs for form inputs
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const partyRef = useRef(null);

  // State to manage loading, error, and success messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to handle form submission
  const handleCandidateRegistration = async (e) => {
    e.preventDefault();
    setError(null);  // Clear previous error
    setSuccess(null);  // Clear previous success message

    // Check if contract instance is available before proceeding
    if (!contractInstance) {
      setError("Smart contract instance is not available. Please ensure it's connected.");
      return;
    }

    try {
      setLoading(true); // Set loading to true to disable the submit button

      // Fetch token from local storage (assuming user authentication is required)
      const token  = localStorage.getItem("token");
      console.log(token);
  
      // Set headers with token for authentication
      const config = {
          headers: {
              'x-access-token': token
          }
      };
  
      // Sending a POST request to upload candidate image or perform other backend operations
      const res = await axios.post("http://localhost:3000/api/postCandidateImage", {}, config); 
      console.log(res.data);

      // Get values from the form using refs
    //   const name = nameRef.current.value;
    //   const age = ageRef.current.value;
    //   const gender = genderRef.current.value;
    //   const party = partyRef.current.value;

    //   console.log(name, age, gender, party);

    //   // Interact with the smart contract to register the candidate
    //   await contractInstance.registerCandidate(name, party , age, gender);
    //   console.log("Registration of Candidate is Successful");
    //   setSuccess("Candidate registered successfully!");  // Success message

    //   // Clear form fields after successful submission
    //   nameRef.current.value = "";
    //   ageRef.current.value = "";
    //   genderRef.current.value = "";
    //   partyRef.current.value = "";

    // } catch (error) {
    //   console.error(error);  // Log the error for debugging
    //   setError("Registration failed. Please try again.");  // Display a user-friendly error
    } finally {
      setLoading(false);  // Re-enable the submit button
    }
  };

  return (
    <>
      {/* Form to register a candidate */}
      <form onSubmit={handleCandidateRegistration}>
        <label>
          Name:
          <input type="text" ref={nameRef} required /> {/* Ref for name */}
        </label>
        <label>
          Age:
          <input type="number" ref={ageRef} required /> {/* Ref for age */}
        </label>
        <label>
          Gender:
          <input type="text" ref={genderRef} required /> {/* Ref for gender */}
        </label>
        <label>
          Party:
          <input type="text" ref={partyRef} required /> {/* Ref for party */}
        </label>
        {/* Button is disabled while loading */}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Submit"} {/* Show loading state */}
        </button>
      </form>
      
      {/* Display error or success messages */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Error message */}
      {success && <p style={{ color: "green" }}>{success}</p>} {/* Success message */}
    </>
  );
};

export default RegisterCandidate;
