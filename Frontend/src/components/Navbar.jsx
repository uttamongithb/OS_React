import { useState } from "react"
function Navbar() {
  const [date, setDate]=useState(new Date())
  console.log(date);
  
  return (
    <>
    <div style={{backgroundColor:"black", }}>
      {date}
        
    </div>
    </>
  )
}

export default Navbar