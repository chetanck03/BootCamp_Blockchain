import ChildFunc from "./ChildFunc";
import "./App.css"
import  ParentFunc  from "./ParentFunc";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  // send data
  const num = 5;
  function parentF(childData){
    console.log("ParentFunc : ",childData)
  }
// fetch data
  const [data,setData] = useState([])
  
  useEffect(()=>{
    async function fetchData(){
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
      const data = await res.json()
      console.log(data)
      setData(data)
    }
    fetchData()
  },[])
  console.log("render")

  

  return (
    <>
    {/* 1.  Send data */}
    <div>
      {/* give the data to the child component */}
      <ChildFunc data ={num}></ChildFunc>
      {/* extract data from the child component */}
      <ParentFunc parentF ={parentF}></ParentFunc> 
    </div>

    {/* 2. fetch the data */}
    <div>
      <h1>fetching the data</h1>
    
    </div>



    </>
    
  )
}

export default App
