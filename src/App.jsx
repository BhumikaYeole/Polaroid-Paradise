import './App.css'
import Home from './components/Home'
import Photo from './components/Photo'
import {BrowserRouter, Routes, Route} from 'react-router'
import Polaroid from './components/Polaroid'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Home/>} />
      <Route path={'/photo'} element={<Photo/>}/>
      <Route path={'/polaroid'} element={<Polaroid/>} />
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
