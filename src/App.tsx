import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Authorize from './pages/Authorize';
import Home from './pages/Home';

function App() {

  return (
    <div className="">
     
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route  path="/oauth/authorize" element={<Authorize/>} />
      </Routes>
    </BrowserRouter>

  
</div>
  )
}

export default App
