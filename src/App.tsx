import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import HXI from './Pages/HXI';
import NASATLX from './Pages/NASATLX';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="sononursevr-questionnaires/" element={<Home/>} />
        <Route path="sononursevr-questionnaires/hxi/:slug" element={<HXI/>} />
        <Route path="sononursevr-questionnaires/nasa-tlx" element={<NASATLX/>} />
    </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
