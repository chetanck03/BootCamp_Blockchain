import "./App.css"
import { useRef } from "react"

//1. take input from user
//2. send input to the server
function App() {

  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const sendData = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value
    const password = passwordRef.current.value

    try {
      
      const res = await fetch('http://localhost:3000/user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      const data = await res.json()
      console.log(data)

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="center">
      <form onSubmit={sendData}>

        <label>Username :
          <input type="text" ref={usernameRef} />
        </label>

        <label>Password:
          <input type="password" ref={passwordRef} />
        </label>

        <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default App
