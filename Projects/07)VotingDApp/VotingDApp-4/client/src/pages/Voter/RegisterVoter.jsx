import { useRef } from "react";
import {useWeb3Context} from "../../context/useWeb3Context"

const RegisterVoter = ()=>{

    const {web3State} = useWeb3Context()
    const {contractInstance} = web3State;

    const nameRef = useRef(null)
    const ageRef = useRef(null)
    const genderRef = useRef(null)

    const handleVoterRegistration = async(e)=>{

        try {
            e.preventDefault()
            const name = nameRef.current.value
            const age = ageRef.current.value
            const gender = genderRef.current.value
    
            console.log(name,age,gender)

            await contractInstance.registerVoter(name,age,gender)
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
        </>
    )

}

export default RegisterVoter;