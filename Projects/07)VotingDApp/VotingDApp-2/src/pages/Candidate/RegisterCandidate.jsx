import { useRef } from "react";
import {useWeb3Context} from "../../context/useWeb3Context"

const RegisterCandidate = ()=>{

    // const {contractInstance} = useWeb3Context()

    const nameRef = useRef(null)
    const ageRef = useRef(null)
    const genderRef = useRef(null)
    const partyRef = useRef(null)

    const handleCandidateRegistration = async(e)=>{

        try {
            e.preventDefault()
            const name = nameRef.current.value
            const age = ageRef.current.value
            const gender = genderRef.current.value
            const party = partyRef.current.value
    
            console.log(name,age,gender,party)

            // await contractInstance.registerCandidate(name,age,gender,party)
            // console.log("Registration of Candidate is Successfully")
            
        } catch (error) {
            console.log(error)
            
        }

    }

    return(
        <>
        <form onSubmit={handleCandidateRegistration}>
            <label>Name:
                <input type="text" ref={nameRef}/>
            </label>
            <label>Age:
                <input type="text" ref={ageRef}/>
            </label>
            <label>Gender:
                <input type="text" ref={genderRef} />
            </label>
            <label>Party:
                <input type="text" ref={partyRef}/>
            </label>
            <button type="submit">Submit</button>
        </form>
        </>
    )

}

export default RegisterCandidate;