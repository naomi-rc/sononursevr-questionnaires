import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "../useLocalStorage";


function Home() {

  let navigate = useNavigate();

  const [studyName, setStudyName] =  useLocalStorage('studyName', ''); 
  const [lang, setLanguage] =  useLocalStorage('language', 'en');
  const [hapticCase, setHapticCase] =  useLocalStorage('hapticCase', 'h');
  const [id, setId] =  useLocalStorage('ID', '0'); 
  const [trial, setTrial] =  useLocalStorage('trial', '0');
  const [usePairwise, setUsePairwise] =  useLocalStorage('usePairwise', "true"); 


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
    navigate(`/${lang}/nasa-tlx/${hapticCase}/${id}/${trial}`);
  }    

  const startPresenceQuestionnaire = () => {
  if(validateInput())
    navigate(`/${lang}/presence/${hapticCase}/${id}/${trial}`);
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
          <label>Use Pairwise Comparisons for NASA-TLX:</label>
          <input type="checkbox" checked={usePairwise==="true"} required onChange={(e) => setUsePairwise(e.target.checked.toString())} />
        </div>

        <br/>
        <button onClick={startHXIQuestionnaire}>Start HXI</button> <br/>
        <button onClick={startNASATLXQuestionnaire}>Start NASA-TLX</button> <br/>
        <button onClick={startPresenceQuestionnaire}>Start Presence Questionnaire</button>
      </header>
    </div>
    
  );
}

export default Home;
