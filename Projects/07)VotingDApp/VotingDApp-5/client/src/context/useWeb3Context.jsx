import { useContext } from "react"
import {Web3Context} from "./Web3Context"

export const useWeb3Context = ()=>{
    return useContext(Web3Context)
}