import React, { useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HXI_EN from "../Questions/hxi/en";
import HXI_FR from "../Questions/hxi/fr";

type Question = {[key: string]: any};

const HXI = () => {  

  let navigate = useNavigate();

  const {lang, id, trial, hapticCase } = useParams();

  const [understood, setUnderstood] = React.useState<boolean>(); 
  const [questionsOrder, setQuestionsOrder] = React.useState<string>(); 
  const [info, setInfo] = React.useState<any>(); 
  const [questions, setQuestions] = React.useState<{}[] | undefined>(); 
  const [agreementLevel, setAgreementLevel] = React.useState<string[] | undefined>(); 
  const [statementAnswers, setStatementAnswers] = React.useState<{[key: string] : string}>(); 

  const updateStatementAnswers = (key : string, value : string) => {
    setStatementAnswers(prevDictionary => ({ ...prevDictionary, [key] : value }));
  }

  const shuffle = (array: Question[]) => { 
    return array.sort(() => Math.random() - 0.5); 
  }; 

  const changeLanguage = (value : string) => {
    console.log(value);
    navigate(`/${value}/hxi/${hapticCase}/${id}/${trial}`);
  }
  
  useEffect(() => {
    if(lang==='fr'){
      setQuestions(shuffle(HXI_FR.questions));
      setInfo(HXI_FR.info);
      setAgreementLevel(HXI_FR.agreementLevel);
    }
    else{
      setQuestions(shuffle(HXI_EN.questions));
      setInfo(HXI_EN.info);
      setAgreementLevel(HXI_EN.agreementLevel);
    }
    setQuestionsOrder(questions?.map(q => Object.keys(q)[0]).join(','));
  }, [lang, questions]);

  useEffect(() => {
    console.log(statementAnswers)  
    }, [statementAnswers])

  const handleSubmit = (e : any) => {
    e.preventDefault();
    
    const url  = "https://script.google.com/macros/s/AKfycbx8iu-Eb7Hp2SpZcqLHI5loBdNqq9OZPmZ9DioMa8Hmn_uZMIrO2F-cRojsDNLbSO3d/exec";

    let erreur: string | null = "Please provide an answer to all the statements.";
    if(lang === 'fr') erreur = "Veuillez fournir une réponse pour chaque déclaration.";
    if (id && trial && hapticCase && lang && questionsOrder && statementAnswers && Object.keys(statementAnswers).length === 20) {    
      
      const payload = new URLSearchParams({
        ParticipantID : id,
        Language : lang,
        Trial : trial,
        HapticCase : hapticCase,        
        QuestionsOrder : questionsOrder,
        ...statementAnswers       
      }).toString();

      console.log(payload);

      fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: (payload)
      }).then(res=>res.text()).then(data=>{
        console.log(data);
      }).catch(error=> console.log(error))
    }
    else {
      alert(erreur);
    }   
  }

  return (
    info &&
    <div className="HXI App">
        <select name="cars" className="languageDropDown" value={lang} onChange={(e) => {changeLanguage(e.target.value)}}>
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
        <div className="header">
          
          <h3 className="questionnaire-title">{info.title}</h3>

          <h3 className="participant-id-section participant-id">
            <label htmlFor="participant-id">{info.participantid}</label>
            <input name="ParicipantID" readOnly type="number" min="0" value={id}/>
          </h3>
        </div>
      
        <div className="questionnaire-description">
          <p>{info.instructions}</p>
          <p>{info.clarityDescription}</p>
          <p className="indent"><b>{info.hapticSensationsDefinition}</b></p>
          <p className="indent"><b>{info.otherSensesDefinition}</b></p>
        </div>
        
        {
          !understood &&
          <div>
            <button type="button" className="button" onClick={(e) => setUnderstood(true)}>{info.understood}</button>
          </div>
        }

        {
          understood && 
          <div>
            <table width="100%">
              <thead>
                <tr className="question-entry">
                  <th key="empty"></th>
                  {agreementLevel && agreementLevel.map((level, index) => (
                    <th key={index}>{agreementLevel[index]}</th>
                  ))}
                  
                </tr>
              </thead>
              <tbody>
                {
                  questions && questions.map((question: Question, index) => {
                    const [key, value] = Object.entries(question)[0];

                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td className={`question Q${key}`} colSpan={7}>
                            {value} {/* this is the question text */}
                          </td>
                        </tr>
                        <tr className="question-entry">
                          <td></td>
                          {[...Array(7)].map((_, score) => (
                            <td key={score}>
                              <input type="radio" required name={`Q${key}`} value={score+1} onChange={(e) => {updateStatementAnswers(`Q${key}`, e.target.value)}}/>
                            </td>
                          ))}
                        </tr>
                      </React.Fragment>
                    );
                  })
                }
              </tbody>
            </table>
            <input hidden readOnly name="Language" value={lang}/>
            <input hidden readOnly name="Trial" value={trial}/>
            <input hidden readOnly name="HapticCase" value={hapticCase}/>
            <input hidden readOnly name="QuestionsOrder" value={questionsOrder}/>
        
            <button type="button" className="button" onClick={handleSubmit}>{info && info.submit}</button>
          </div>
        }
    </div>
  );
}

export default HXI;
