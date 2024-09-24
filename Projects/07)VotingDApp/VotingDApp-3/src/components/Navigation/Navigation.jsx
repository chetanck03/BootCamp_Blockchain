import { Link } from "react-router-dom"

const Navigation = ()=>{
    return(
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/register-voter'>Register Voter</Link></li>
            <li><Link to='/register-candidate'>Register Candidate</Link></li>
            <li><Link to='/voter-list'>Voter List</Link></li>
            <li><Link to='/candidate-list'>Candidate List</Link></li>
            <li><Link to='/election-commission'>Election Commission</Link></li>
        </ul>
    )

}

export default Navigation