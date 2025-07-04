import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocalStorage } from "../useLocalStorage";


function Home() {

  let navigate = useNavigate();

  const [studyName, setStudyName] =  useLocalStorage('studyName', ''); 
  const [lang, setLanguage] =  useState('en');
  const [hapticCase, setHapticCase] =  useState('h');
  const [id, setId] =  useState('0'); 
  const [trial, setTrial] =  useState('0');
  const [usePairwise, setUsePairwise] =  useState(false);


  const validateInput = () => {
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
      return true;
    }
    return false;
  }

  const startHXIQuestionnaire = () => {    
    if(validateInput())
      navigate(`/${lang}/hxi/${hapticCase}/${id}/${trial}`);
    }   

   const startNASATLXQuestionnaire = () => {
    if(validateInput())
      navigate(`/${lang}/nasa-tlx/${usePairwise}/${hapticCase}/${id}/${trial}`);
    }    

  return (
      <div className="home App">
      <header className="header">

        <div className="inputData">
          <label>Study Name: </label>
          <input value={studyName} required onChange={(e) => setStudyName(e.target.value)} placeholder="Enter study name" />
        </div>
 
        <div className="inputData">
          <label>Language: </label>
          <select value={lang} required onChange={(e) => setLanguage(e.target.value)} >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>

        <div className="inputData">
          <label>Haptic Case: </label>
          <select value={hapticCase} required onChange={(e) => setHapticCase(e.target.value)} >
            <option value="h">H</option>
            <option value="nh">NH</option>
          </select>
        </div>
        
        <div className="inputData">
          <label>ID: </label>
          <input type="number" value={id} required onChange={(e) => setId(e.target.value)} placeholder="Enter ID" />
        </div>

        <div className="inputData">
          <label>Trial #: </label>
          <input type="number" value={trial} required onChange={(e) => setTrial(e.target.value)} placeholder="Enter trial #" />
        </div>

        <div className="inputData">
          <label>Use Pairwise Comparisons :</label>
          <input type="checkbox" checked={usePairwise} required onChange={(e) => setUsePairwise(e.target.checked)} />
        </div>

        <br/>
        <button onClick={startHXIQuestionnaire}>Start HXI</button> <br/>
        <button onClick={startNASATLXQuestionnaire}>Start NASA-TLX</button>
      </header>
    </div>
    
  );
}

export default Home;
