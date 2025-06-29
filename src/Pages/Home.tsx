import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Home() {

  let navigate = useNavigate();

  const [lang, setLanguage] =  useState('en');
  const [hapticCase, setHapticCase] =  useState('h');
  const [id, setId] =  useState('0'); 
  const [trial, setTrial] =  useState('0');


  const handleLanguageInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setLanguage(event.target.value);
  };

  const handleHapticCaseInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setHapticCase(event.target.value);
  };

  const handleIdInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setId(event.target.value);
  };

  const handleTrialInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTrial(event.target.value);
  };

  const startHXIQuestionnaire = () => {
    console.log(id);
    if(lang === ''){
      alert("Enter a valid language option!");
    }
    else if(hapticCase === ''){
      alert("Enter a valid haptic case!");
    }
    else if(id === ''){
      alert("Enter a valid ID!");
    }
    else if(trial === ''){
      alert("Enter a valid trial number!");
    }
    else{
      navigate(`/${lang}/hxi/${hapticCase}/${id}/${trial}`);
    }    
  };


  return (
      <div className="home App">
      <header className="header">
 
        <div className="inputData">
          <label>Language: </label>
          <select value={lang} required onChange={handleLanguageInputChange} >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>

        <div className="inputData">
          <label>Haptic Case: </label>
          <select value={hapticCase} required onChange={handleHapticCaseInputChange} >
            <option value="h">H</option>
            <option value="nh">NH</option>
          </select>
        </div>
        
        <div className="inputData">
          <label>ID: </label>
          <input type="number" value={id} required onChange={handleIdInputChange} placeholder="Enter ID" />
        </div>

        <div className="inputData">
          <label>Trial #: </label>
          <input type="number" value={trial} required onChange={handleTrialInputChange} placeholder="Enter trial #" />
        </div>

        <br/>
        <button onClick={startHXIQuestionnaire}>Start HXI</button>
      </header>
    </div>
    
  );
}

export default Home;
