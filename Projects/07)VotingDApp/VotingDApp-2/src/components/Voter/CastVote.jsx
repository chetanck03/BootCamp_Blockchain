import { useRef } from "react"
import {useWeb3Context} from "../../context/useWeb3Context"

const CastVote = () =>{

    const {contractInstance}= useWeb3Context()

    const voterId = useRef(null)
    const candidateId = useRef(null)

    const handleCastVote = async(e)=>{
        try {
            e.preventDefault()
            const voterID = voterId.current.value
            const candidateID = candidateId.current.value
            console.log(voterID,candidateID)

            // await contractInstance.vote(voterID,candidateID)
            console.log("Voted successful")
        } catch (error) {
            console.log(error)
        }

    }

    return(
        <>
        <form onSubmit={handleCastVote}>
            <label>Voter Id :
                <input type="text" ref={voterId}/>
            </label>
            <label>Candidate Id :
                <input type="text" ref={candidateId} />
            </label>
            <button type="submit">Cast Vote</button>
        </form>
        </>
    )

}

export default CastVote