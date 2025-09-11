import React, { useEffect } from 'react';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import Presence_EN from "../Questions/presence/en";
import Presence_FR from "../Questions/presence/fr";
import { useLocalStorage } from '../useLocalStorage';

export interface QuestionInfo {
  question: string;
  lower: string;
  middle: string;
  upper: string;
}


type Questions = Record<string, QuestionInfo>;

const Presence = () => {  

  let navigate = useNavigate();

  const {lang, id, trial, hapticCase } = useParams();

  const [understood, setUnderstood] = React.useState<boolean>(); 
  const [loading, setLoading] = React.useState(false);
  const [info, setInfo] = React.useState<any>(); 
  const [questions, setQuestions] = React.useState<Questions>(); 
  const [statementAnswers, setStatementAnswers] = React.useState<{[key: string] : string}>(); 
  const [studyName] =  useLocalStorage('studyName', ''); 

  const factors = [["Q3", "Q4", "Q5", "Q6", "Q7", "Q10", "Q13"], //Realism
                  ["Q1", "Q2", "Q8", "Q9"], //PossibilityToAct
                  ["Q14", "Q17", "Q18"], //QualityOfInterface
                  ["Q11", "Q12", "Q19"], // PossibilityToExamine
                  ["Q15", "Q16"], // SelfEvaluationOfPerformance
                  ["Q20", "Q21", "Q22", ], // Sounds
                  ["Q23", "Q24", ]] // Haptic

  const updateStatementAnswers = (key : string, value : string) => {
    setStatementAnswers(prevDictionary => ({ ...prevDictionary, [key] : value }));
  }

  const changeLanguage = (value : string) => {
    console.log(value);
    navigate(`/${value}/presence/${hapticCase}/${id}/${trial}`);
  }
  
  useEffect(() => {
    if(lang==='fr'){
      setQuestions(Presence_FR.questions);
      setInfo(Presence_FR.info);
    }
    else{
      setQuestions(Presence_EN.questions);
      setInfo(Presence_EN.info);
    }
  }, [lang, questions]);

  useEffect(() => {
    console.log(statementAnswers)  
    }, [statementAnswers])


  const calculatePresenceScore = () => {
    /**
     * Factor Scores: Average the scores of the four items for each factor to obtain individual factor scores.
     * General Score =  Autotelics + Involvement + Realism + ( 8 - Discord ) + Harmony
     */
    let generalScore = 0;
    let scores = [] ;

    if(statementAnswers){
      for (let i = 0; i < factors.length; i++) {
        const factor = factors[i];
        let factorScore = 0;
        for (let j = 0; j < factor.length; j++) {
          const item = factor[j];
          factorScore += parseInt(statementAnswers[item])
        }

        scores[i] = factorScore.toString();
        if(i === 2) {
          // Reverse the score for Interface quality
          factorScore = (24 - factorScore);
        }
         
         generalScore += factorScore;
      }
    }  

    return {"generalScore": generalScore.toString(), "factorScores" : scores}
  }


  const handleSubmit = (e : any) => {
    e.preventDefault();

    let erreur: string | null = "Please provide an answer to all the statements.";
    if(lang === 'fr') erreur = "Veuillez fournir une réponse pour chaque déclaration.";

    if(statementAnswers && Object.keys(statementAnswers).length === 24){
    
      const scores = calculatePresenceScore();

      const url  = "https://script.google.com/macros/s/AKfycbybiA6bXne16XVa3IaK8l_53rxPG3PAk-CRIdMw_MVBboQoQCzaadLiG8vcB50F0x8-/exec";
      
      if (id && trial && hapticCase && lang && scores && scores.factorScores.length === 7) {    

        setLoading(true);

        const payload = new URLSearchParams({
          ParticipantID : id,
          Language : lang,
          Trial : trial,
          HapticCase : hapticCase,
          StudyName : studyName,
          DateTime : Date().toString(),
          Realism : scores.factorScores[0],
          PossibilityToAct : scores.factorScores[1],
          QualityOfInterface : scores.factorScores[2],
          PossibilityToExamine : scores.factorScores[3],
          SelfEvaluationOfPerformance : scores.factorScores[4],
          Sounds : scores.factorScores[5],
          Haptic : scores.factorScores[6],
          GlobalPresenceScore: scores.generalScore,
          ...statementAnswers       
        }).toString();

        fetch(url, {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: (payload)
        }).then(res=>res.text()).then(data=>{
          console.log(data);
          navigate(`/${lang}/questionnaire-complete`);
        }).catch(error=> console.log(error))
      }
      else {
        alert("Critical error");
      } 
    }
    else {
      alert(erreur);
    }   
  }

  return (
    info &&
    <div className="Presence App">
        <div className="header">
        <button type="button" className="textButton" onClick={(e) => {navigate(`/`);}}>{info.back}</button>
        <select name="cars" className="languageDropDown" value={lang} onChange={(e) => {changeLanguage(e.target.value)}}>
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
        
      </div>
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
          loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}

        {          
          understood && 
          <div>
            <table width="100%">
              <tbody>
                {
                  questions && Object.values(questions).map((q,index) => {
                    return (
                      <React.Fragment key={index+1}>
                        <tr>
                          <td className={`question Q${index+1}`} colSpan={7}>
                            {index+1}. {q.question} {/* this is the question text */}
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          {[...Array(7)].map((_, score) => (
                            <td key={score+1}>
                              <input type="radio" required name={`Q${index+1}`} value={score+1} onChange={(e) => {updateStatementAnswers(`Q${index+1}`, e.target.value)}}/>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {[...Array(8)].map((_, s) => (
                            <td key={s}>
                              {(s===1) && q.lower}
                              {(s===4) && q.middle}
                              {(s===7) && q.upper}
                            </td>
                          ))}
                        </tr>
                        <tr></tr>
                      </React.Fragment>
                      
                    );
                  })
                }
              </tbody>
            </table>
            <input hidden readOnly name="Language" value={lang}/>
            <input hidden readOnly name="Trial" value={trial}/>
            <input hidden readOnly name="HapticCase" value={hapticCase}/>
        
            <button type="button" className="button" onClick={handleSubmit}>{info && info.submit}</button>
          </div>
        }
    </div>
  );
}

export default Presence;
