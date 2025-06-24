import React from 'react'
import { useNavigate } from 'react-router'

function Home() {
    let nav = useNavigate();

  return (
    <div className='h-screen flex flex-col gap-y-10 justify-center items-center bg-[#efbc80]' >
        <h2 className=' font-poppins text-6xl text-amber-950 '>Polaroid Paradise</h2>
            <button onClick={()=>{nav('/photo')}} className=' font-poppins text-2xl hover:bg-amber-950 focus:outline-2 focus:outline-offset-2 focus:outline-amber-800 active:bg-amber-900 w-60 h-15 rounded-lg bg-amber-950 text-[#efbc80]'>Get Started</button>
            
    </div>
  )
}

export default Home