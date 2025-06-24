import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import Webcam from 'react-webcam';


const Photo = () => {
  let nav = useNavigate()
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [imageNotes, setImageNotes] = useState([]);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [flash, setFlash] = useState(false);

  const countdownText = ["Get Ready 📸", "3", "2", "1"];

  const videoConstraints = {
    facingMode: "user"
  };

  const capture = () => {
    if (webcamRef.current) {
      setFlash(true);
      const screenshot = webcamRef.current.getScreenshot();
      setImage(screenshot);
      setImageArray(prev => [...prev, screenshot]);
      setTimeout(() => setFlash(false), 200);
    }
  };

  useEffect(() => {
    if (imageArray.length === 3 && !showNotePopup) {
      setShowNotePopup(true);
    }
  }, [imageArray]);



  useEffect(() => {
    if (imageCount >= 3) return;

    let timer;

    if (textIndex < countdownText.length - 1) {
      timer = setTimeout(() => setTextIndex(prev => prev + 1), 1000);
    } else if (textIndex === countdownText.length - 1) {
      timer = setTimeout(() => {
        capture();
        setImageCount(prev => prev + 1);
        setTextIndex(0);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [textIndex, imageCount]);


  const handleNoteSubmit = () => {
    const notes = [noteInput];
    setImageNotes(notes);
    nav('/polaroid',
      {
        state: { imageArray, notes }
      }
    )
  }


  useEffect(() => {
    setTextIndex(1);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-200 to-yellow-100 relative overflow-hidden font-poppins">
      {flash && <div className="absolute inset-0 bg-white opacity-80 z-40 transition duration-200"></div>}

      <h1 className="text-5xl text-amber-900 font-bold mb-4">📷 Vintage Photobooth</h1>

      {imageCount < 3 && (
        <div className="absolute top-24 text-3xl text-amber-800 font-semibold bg-white/70 px-6 py-2 rounded-xl z-30 shadow-md">
          {countdownText[textIndex]}
        </div>
      )}

      <div className="relative w-[400px] h-[500px] mt-6 flex items-center justify-center">
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored={true}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover rounded-lg shadow-xl z-10 filter grayscale"
        />

        {/* 2 Tapes */}
        <div className="absolute top-0 left-0 w-12 h-5 bg-yellow-200 rotate-[-15deg] opacity-80 shadow-md z-20 rounded-sm"></div>
        <div className="absolute bottom-0 right-0 w-12 h-5 bg-yellow-200 rotate-[10deg] opacity-80 shadow-md z-20 rounded-sm"></div>
      </div>

      {/* <button
        onClick={() => {
          nav('/polaroid',
            {
              state: { imageArray, notes }
            }
          )
        }}
        className="mt-6 px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-all "
      >
        🗂️ Generate Polaroid
      </button> */} 

      {showNotePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center space-y-4 w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold text-amber-800">📝 Add a Note</h2>
            <textarea
              rows={3}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Write something cool..."
              className="w-full border border-gray-300 p-2 text-2xl rounded-lg resize-none"
            />
            <button
              onClick={handleNoteSubmit}
              className="mt-2 px-6 py-2 bg-amber-900 text-2xl text-white rounded-lg hover:bg-amber-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Photo;
