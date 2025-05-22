import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import HXI from './Pages/HXI';
import NASATLX from './Pages/NASATLX';


function App() {
  return (
    <HashRouter >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/hxi/:lang/:hapticCase/:id/:trial" element={<HXI/>} />
        <Route path="/nasa-tlx" element={<NASATLX/>} />
      </Routes>
      
    </HashRouter >
    
  );
}

export default App;
