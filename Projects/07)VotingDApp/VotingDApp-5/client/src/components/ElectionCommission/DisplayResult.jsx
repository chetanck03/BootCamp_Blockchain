import { useEffect } from "react"
import { useWeb3Context } from "../../context/useWeb3Context"
import { useState } from "react"


const DisplayResult = () => {
    const {web3State} = useWeb3Context()
    const {contractInstance} = web3State;
    const [winner, setWinner] = useState("No winner declared")

    useEffect(() => {
        const getWinner = async () => {

            try {
                const winningCandidateAddress = await contractInstance.announceVotingResult()
                if(winningCandidateAddress!='0x0000000000000000000000000000000000000000'){
                    setWinner(winningCandidateAddress)
                  }
            } catch (error) {
                console.log(error)
            }

        }
        contractInstance && getWinner()
    }, [])

    return (
        <div>
            <h1>
                Winner : {winner}
            </h1>

        </div>
    )


}


export default DisplayResult