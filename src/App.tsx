import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import HXI from './Pages/HXI';
import NASATLX from './Pages/NASATLX';
import QuestionnaireComplete from './Pages/QuestionnaireComplete';


function App() {
  return (
    <HashRouter >
      <Routes>
        <Route path="*" element={<Home/>} />
        <Route path="/:lang/hxi/:hapticCase/:id/:trial" element={<HXI/>} />
        <Route path="/:lang/nasa-tlx" element={<NASATLX/>} />
        <Route path="/:lang/questionnaire-complete" element={<QuestionnaireComplete/>} />
      </Routes>
      
    </HashRouter >
    
  );
}

export default App;
