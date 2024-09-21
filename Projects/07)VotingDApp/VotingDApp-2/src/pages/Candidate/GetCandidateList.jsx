import { useEffect } from "react"
import {useWeb3Context} from "../../context/useWeb3Context"

const GetCandidateList = ()=>{

    const {contractInstance} = useWeb3Context()
    useEffect(() => {

        const fetchCandidateList = async() =>{
            try {
                const candidateList = await contractInstance.getCandidateList();
                console.log(candidateList)
            } catch (error) {
                console.log(error)
            }
        }

        contractInstance && fetchCandidateList()
    }, [contractInstance])
    
}

export default GetCandidateList