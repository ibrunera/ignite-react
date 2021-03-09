import { useState } from 'react'


export function Counter(){
  const [counter, setCounter] = useState(0)
  
  const increment= () => {
    setCounter(counter+1)
  }
  return(
    <>
      <p>{counter}</p>
      <button onClick={increment}>
        Increment
      </button>
    </>
  )
}