import React, { useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HXI_EN from "../Questions/hxi/en";
import HXI_FR from "../Questions/hxi/fr";

const QuestionnaireComplete = () => {  

  let navigate = useNavigate();
  const {lang } = useParams();
  const [info, setInfo] = React.useState<any>(); 
  
  useEffect(() => {
    if(lang==='fr'){
      setInfo(HXI_FR.info);
    }
    else{
      setInfo(HXI_EN.info);
    }    
  }, [lang]);

  return (
    info &&
    <div className="App questionnaireComplete">
          <div>
            <p>{info.savedResponse}</p>
            <p>{info.thankyou}</p> 
            <br/>
            <button type="button" className="button" onClick={(e) => {navigate("/")}}>{info.sendAnotherResponse}</button>
          </div>
    </div>
  );
}

export default QuestionnaireComplete;
