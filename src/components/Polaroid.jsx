import React from 'react';
import { useLocation } from 'react-router-dom';
import {useRef} from 'react'
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
function Polaroid() {
    const location = useLocation();
    let nav = useNavigate();


    const polaroidRef = useRef()
    const { imageArray, notes } = location.state || {};

    const downloadPolaroid =  () => {
        if (!polaroidRef.current) return;

        
    
        html2canvas(polaroidRef.current, {
          useCORS: true,
          scale: 2, 
        })
        .then((canvas)=>
        {
            polaroidRef.current.style.filter = 'grayscale(100%)';
            const link = document.createElement('a');
            link.download = 'polaroid-collage.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            alert("Downloaded successfully")
        })
        .catch((error)=>alert(error))
    
        
      };
    
    

    return (
        <div className='h-screen flex flex-col justify-center items-center bg-[url(https://wallpapers.com/images/featured/cute-brown-aesthetic-ykd0g3drhh5usi6x.jpg)] bg-no-repeat bg-screen bg-cover gap-5'>
            <div className='flex flex-col justify-center items-center w-[800px] h-[600px] bg-[#efbb8077] rounded-lg '>
                <p className='text-xl font-bold text-amber-950'>HERE IS YOUR PHOTOSTRIP</p>
            <div ref={polaroidRef} className="flex flex-col justify-center items-center w-[200px] h-[500px] flex-wrap rounded-md bg-[rgb(254,243,198)] shadow-xl  animate-bounce duration-5000 ease-out " style={{animationIterationCount:0.5}}>
                    
                {imageArray && imageArray.map((image, index) => (
                    <div key={index} className="w-[200px] h-[150px]  filter grayscale  p-4">
                        <img
                            src={image}
                            alt={`Captured ${index + 1}`}
                            crossOrigin='anonymous'
                            className="w-full h-full object-cover "
                        />

                    </div>
                ))}
                <p className="mt-2  text-xl text-[rgb(70,25,1)] font-poppins font-bold">
                    {notes || 'No caption'}
                </p>
            </div>

            </div>
            
            <div className='flex gap-10'>

                <button onClick={()=>{nav('/photo')}} className='text-2xl font-poppins hover:bg-amber-950 focus:outline-2 focus:outline-offset-2 focus:outline-amber-800 active:bg-amber-900 w-50 h-15 rounded-lg bg-amber-950 text-[#efbc80]'>🔙 Back</button>
                <button onClick={downloadPolaroid} className='text-2xl font-poppins hover:bg-amber-950 focus:outline-2 focus:outline-offset-2 focus:outline-amber-800 active:bg-amber-900 w-50 h-15 rounded-lg bg-amber-950 text-[#efbc80]'>📥 Download</button>
            </div>

        </div>
    );
}

export default Polaroid;
