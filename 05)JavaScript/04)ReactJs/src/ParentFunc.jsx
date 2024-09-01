// Send data child to parent
function ParentFunc({parentF}) {
    const item = 10;
  
    const sendToParent =() =>{
      console.log("send the data processing")
      parentF(item)
    }
  
    return (
      <>
        {/* give the  data from the parent component */}
        <button onClick={()=>sendToParent()}>Send Data</button>
      </>
    );
  }
  
  export default ParentFunc ;
  