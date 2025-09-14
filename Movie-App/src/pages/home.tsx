import React, { useEffect, useState } from 'react'

const Home = () => {
  const [count, setCount] = useState(0)


  const displayCount =  () => {
   if(count>5){
    console.log('Count is greater than 5');
   }else{
    console.log('Count is less than or equal to 5');
  };}

  useEffect(() => {
    
    displayCount();
  }, [count]);
  return (
    <div className='text-white'>home
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <p>Count: {count}</p>
    <button onClick={() => setCount(count-1)}>Dec</button>
    </div>
  )
}

export default Home