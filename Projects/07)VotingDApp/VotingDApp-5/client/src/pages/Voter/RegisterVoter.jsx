import { useRef , useState } from "react";
import {useWeb3Context} from "../../context/useWeb3Context"
import { uploadVoterImage } from "../../utils/uploadVoterImage";
import axios from "axios";


const RegisterVoter = ()=>{

    const {web3State} = useWeb3Context()
    const {contractInstance} = web3State;
    const [file, setFile] = useState("")

    const nameRef = useRef(null)
    const ageRef = useRef(null)
    const genderRef = useRef(null)

    const handleVoterRegistration = async(e)=>{

        try {
            e.preventDefault()

            const token  = localStorage.getItem("token");
            console.log(token);

     // Set headers with token for authentication
            const config ={
                headers:{
                    'x-access-token': token
                }
            }

            console.log(file)

            await uploadVoterImage(file)
        // Sending a POST request to upload candidate image or perform other backend operations

            const res = await axios.post("http://localhost:3000/api/postVoterImage", {}, config); 
            console.log(res.data);

            const name = nameRef.current.value
            const age = ageRef.current.value
            const gender = genderRef.current.value
    
            console.log(name,age,gender)

            // await contractInstance.registerVoter(name,age,gender)
            console.log("Registration of Voter is Successfully")
            
        } catch (error) {
            console.log(error)
            
        }

    }

    return(
        <>
        <form onSubmit={handleVoterRegistration}>
            <label>Name:
                <input type="text" ref={nameRef}/>
            </label>
            <label>Age:
                <input type="text" ref={ageRef}/>
            </label>
            <label>Gender:
                <input type="text" ref={genderRef} />
            </label>
           
            <button type="submit">Submit</button>
        </form>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
        </>
    )

}

export default RegisterVoter;