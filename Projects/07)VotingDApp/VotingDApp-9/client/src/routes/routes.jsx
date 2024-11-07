import { createBrowserRouter } from "react-router-dom";
import RegisterVoter from "../pages/Voter/RegisterVoter";
import RegisterCandidate from "../pages/Candidate/RegisterCandidate";
import GetVoterList from "../pages/Voter/GetVoterList"
import GetCandidateList from "../pages/Candidate/GetCandidateList"
import ElectionCommission from "../pages/ElectionCommission/ElectionCommission"
import Wallet from "../components/Wallet/Wallet";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import TokenExchange from "../pages/TokenMarketplace/TokenMarketplace"
import CastVote from "../components/Voter/CastVote";

export const routes = createBrowserRouter([
  {
    path: '/', element: (
      <div>
        <Navigation />
        <Wallet />
        <Footer/>
      </div>)
  },
  {
    path: '/register-voter', element: (
      <div>
        <Navigation />
        <RegisterVoter />
        <Footer/>

      </div>

    )
  },
  {
    path: '/register-candidate', element: (
      <div>
        <Navigation />
        <RegisterCandidate />
        <Footer/>

      </div>
    )
  },
  {
    path: '/voter-list', element: (
      <div>
        <Navigation />
        <GetVoterList />
        <Footer/>

      </div>
    )
  },
  {
    path: '/candidate-list', element: (
      <div>
        <Navigation />
        <GetCandidateList />
        <Footer/>

      </div>
    )
  },
  {
    path: '/cast-vote', element: (
      <div>
        <Navigation />
        <CastVote/>
        <Footer/>

      </div>
    )
  },
  {
    path: '/election-commission', element: (
      <div>
        <Navigation />
        <ElectionCommission />
        <Footer/>

      </div>
    )
  },
  {path:"/token-marketplace",element:(
    <div>
        <Navigation/>
        <TokenExchange/>
        <Footer/>
    </div>
)},
])