import { createBrowserRouter } from "react-router-dom";
import RegisterVoter from "../pages/Voter/RegisterVoter";
import RegisterCandidate from "../pages/Candidate/RegisterCandidate";
import GetVoterList from "../pages/Voter/GetVoterList"
import GetCandidateList from "../pages/Candidate/GetCandidateList"
import ElectionCommission from "../pages/ElectionCommission/ElectionCommission"
import Wallet from "../components/Wallet/Wallet";

export const routes = createBrowserRouter([
    {path:'/',element:<Wallet/>},
    {path:'/register-voter',element:<RegisterVoter/>},
    {path:'/register-candidate',element:<RegisterCandidate/>},
    {path:'/voter-list',element:<GetVoterList/>},
    {path:'/candidate-list',element:<GetCandidateList/>},
    {path:'/election-commission',element:<ElectionCommission/>}
])