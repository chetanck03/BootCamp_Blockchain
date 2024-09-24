import { useRef, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const RegisterCandidate = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const partyRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCandidateRegistration = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Check if contract instance is available
    if (!contractInstance) {
      setError("Smart contract instance is not available. Please ensure it's connected.");
      return;
    }

    try {
      setLoading(true);

      const name = nameRef.current.value;
      const age = ageRef.current.value;
      const gender = genderRef.current.value;
      const party = partyRef.current.value;

      console.log(name, age, gender, party);

      // Interact with the smart contract
      await contractInstance.registerCandidate(name, party , age, gender);
      console.log("Registration of Candidate is Successful");
      setSuccess("Candidate registered successfully!");

      // Clear form fields after successful submission
      nameRef.current.value = "";
      ageRef.current.value = "";
      genderRef.current.value = "";
      partyRef.current.value = "";

    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleCandidateRegistration}>
        <label>
          Name:
          <input type="text" ref={nameRef} required />
        </label>
        <label>
          Age:
          <input type="number" ref={ageRef} required />
        </label>
        <label>
          Gender:
          <input type="text" ref={genderRef} required />
        </label>
        <label>
          Party:
          <input type="text" ref={partyRef} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Submit"}
        </button>
      </form>
      
      {/* Display error or success messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </>
  );
};

export default RegisterCandidate;
