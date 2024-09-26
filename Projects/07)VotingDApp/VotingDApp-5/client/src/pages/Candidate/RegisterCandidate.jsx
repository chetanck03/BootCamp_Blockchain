import { useRef, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context"; 
import axios from "axios" 
import { uploadCandidateImage } from "../../utils/uploadCandidateImage";

const RegisterCandidate = () => {
  const { web3State } = useWeb3Context(); 
  const { contractInstance } = web3State; 

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const partyRef = useRef(null);

  const [file,setFile] = useState("")

  const handleCandidateRegistration = async (e) => {
    e.preventDefault();

    if (!contractInstance) {
      console.log("Smart contract instance is not available. Please ensure it's connected.");
    }

    try {
      const token  = localStorage.getItem("token");
      console.log(token);
  
      // Set headers with token for authentication
      const config = {
          headers: {
              'x-access-token': token
          }
      };
      // console.log(file)
      
// upload the image
      await uploadCandidateImage(file)
  
      // Sending a POST request to upload candidate image or perform other backend operations

      // const res = await axios.post("http://localhost:3000/api/postCandidateImage", {}, config); 
      // console.log(res.data);

    //   const name = nameRef.current.value;
    //   const age = ageRef.current.value;
    //   const gender = genderRef.current.value;
    //   const party = partyRef.current.value;

    //   console.log(name, age, gender, party);

    //   await contractInstance.registerCandidate(name, party , age, gender);
    //   console.log("Registration of Candidate is Successful");

    } catch (error) {
      console.error(error);  
    } 
  };

  return (
    <>
      <form onSubmit={handleCandidateRegistration}>
        <label>
          Name:
          <input type="text" ref={nameRef}  /> 
        </label>
        <label>
          Age:
          <input type="number" ref={ageRef}  /> 
        </label>
        <label>
          Gender:
          <input type="text" ref={genderRef} /> 
        </label>
        <label>
          Party:
          <input type="text" ref={partyRef} /> 
        </label>

        <button type="submit">Register Candidate</button>
      </form>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
  
    </>
  );
};

export default RegisterCandidate;
