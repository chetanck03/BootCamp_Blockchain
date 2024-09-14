import "./App.css"
import Web3Provider from "./context/Web3Provider"
import Dummy from "./Dummy"
function App() {
  return (
    <>
    <h1>Voting Application</h1>

    <Web3Provider>
      <Dummy/>
    </Web3Provider>
    
    </>

  )
}

export default App
