// recieve the data from the parent
function ChildFunc(props) {
  return (
    <>
      {/* extract data from the parent component */}
      <h1>ChildFunc : {props.data}</h1> 
    </>
  )
}

export default ChildFunc
