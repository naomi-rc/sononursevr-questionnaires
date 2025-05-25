import React, { useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import HXI_EN from "../Questions/hxi/en";
import HXI_FR from "../Questions/hxi/fr";

type Question = {[key: string]: any};

const HXI = () => {

  const [questionsOrder, setQuestionsOrder] = React.useState<any>(); 
  const [info, setInfo] = React.useState<any>(); 
  const [questions, setQuestions] = React.useState<{}[] | undefined>(); 
  const [agreementLevel, setAgreementLevel] = React.useState<string[] | undefined>(); 

  const {lang, id, trial, hapticCase } = useParams();

  const shuffle = (array: Question[]) => { 
    return array.sort(() => Math.random() - 0.5); 
}; 
  
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

  return (
    
    <div className="HXI App">
      <form 
        method="POST" 
        target="_blank"
        action="https://script.google.com/macros/s/AKfycbx8iu-Eb7Hp2SpZcqLHI5loBdNqq9OZPmZ9DioMa8Hmn_uZMIrO2F-cRojsDNLbSO3d/exec"
      >

        <div className="header">
        <h3 className="questionnaire-title">{info && info.title}</h3>

          <h3 className="participant-id-section participant-id">
          <label htmlFor="participant-id">{info && info.participantid}</label>
          <input name="ParicipantID" readOnly type="number" min="0" value={id}/>
          </h3>
        </div>
      
        <div className="questionnaire-description">
          <p>{info && info.instructions}</p>
          <p>{info && info.clarityDescription}</p>
          <p className="indent">{info && info.hapticSensationsDefinition}</p>
          <p className="indent">{info && info.otherSensesDefinition}</p>
        </div>
        

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
                          <input type="radio" required name={`Q${key}`} value={score} />
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
        <button type="submit" className="button">{info && info.submit}</button>

      </form>
      
    </div>
  );
}

export default HXI;
