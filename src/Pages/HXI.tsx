import React, { useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import HXI_EN from "../Questions/hxi/en";
import HXI_FR from "../Questions/hxi/fr";
import { toast } from 'react-toastify'

type Question = {[key: string]: any};

const HXI = () => {
  
  const {lang, id, trial, hapticCase } = useParams();

  const [questionsOrder, setQuestionsOrder] = React.useState<string>(); 
  const [info, setInfo] = React.useState<any>(); 
  const [questions, setQuestions] = React.useState<{}[] | undefined>(); 
  const [agreementLevel, setAgreementLevel] = React.useState<string[] | undefined>(); 
  const [statementAnswers, setStatementAnswers] = React.useState<{[key: string] : string}>(); 
 // const [statementAnswers, setStatementAnswers] = React.useState<{ string : string }>(); 
/* 
  interface Map { [key: string]: string }
  var formValues : Map = {}; */
  
  const updateStatementAnswers = (key : string, value : string) => {
    console.log(key);
    console.log(value);
    //console.log(formValues);
    //console.log(statementAnswers);
    //formValues[key] = value;
    //setStatementAnswers(formValues);    
    //setStatementAnswers({ ...statementAnswers, key: value });
    //statementAnswers['f']
    setStatementAnswers(prevDictionary => ({ ...prevDictionary, [key] : value }));
    //console.log(statementAnswers);
  }

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

  useEffect(() => {
    //setStatementAnswers(prevDictionary => ({ ...prevDictionary, key: value }));
    console.log(statementAnswers)  

    }, [statementAnswers])

  const handleSubmit = (e : any) => {
    e.preventDefault();
    const url  = "https://script.google.com/macros/s/AKfycbx8iu-Eb7Hp2SpZcqLHI5loBdNqq9OZPmZ9DioMa8Hmn_uZMIrO2F-cRojsDNLbSO3d/exec";

    let erreur: string | null = "Please provide an answer to all the statements.";
    if(lang === 'fr') erreur = "Veuillez fournir une réponse pour chaque déclaration.";
    if (id && trial && hapticCase && lang && questionsOrder && statementAnswers && Object.keys(statementAnswers).length === 20) {    
       /* const payload = JSON.stringify({
        ParticipantID : id,
        Trial : trial,
        HapticCase : hapticCase,
        Language : lang,
        QuestionsOrder : questionsOrder,
        ...statementAnswers
      }); */
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
        alert(data);
        console.log(data);
      }).catch(error=> console.log(error))


    }
    else {
      alert(erreur);
    }   


    
  }

  const submitForm = () => {
    let erreur: string | null = "Please provide an answer to all the statements.";
    if(lang === 'fr') erreur = "Veuillez fournir une réponse pour chaque déclaration.";
    if (id && trial && hapticCase && lang && questionsOrder && statementAnswers && Object.keys(statementAnswers).length === 20) {    
       appendSpreadsheet();
    }
    else {
        alert(erreur);
      }   
  }

  const appendSpreadsheet = async () => {  

      /* formValues['ParicipantID'] = id;
        formValues['Trial'] = trial;
        formValues['HapticCase'] = hapticCase;
        formValues['Language'] = lang;
        formValues['QuestionsOrder'] = questionsOrder;
      */                
      const payload = JSON.stringify({
        ParticipantID : id,
        Trial : trial,
        HapticCase : hapticCase,
        Language : lang,
        QuestionsOrder : questionsOrder,
        ...statementAnswers
      });

      console.log(payload);
      fetch("https://script.google.com/macros/s/AKfycbxQc49yqrqKNqIdFrxOjqlNUnOSQY5ir4dtJpTGQWhpv6hd5FZXdA29tjmUQrENqZWh/exec", 
        {
        method: 'POST',
        body: payload,
        headers: {
                'Content-Type': 'application/json',
            },
        })
      .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                alert('Form submitted successfully!');
                //setFormData({ name: '', email: '', message: '' });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            });
    }

  return (
    
    <div className="HXI App">
      <form 
        method="POST" 
        target="_blank"
        /* action="https://script.google.com/macros/s/AKfycbx8iu-Eb7Hp2SpZcqLHI5loBdNqq9OZPmZ9DioMa8Hmn_uZMIrO2F-cRojsDNLbSO3d/exec" */
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
                          <input type="radio" required name={`Q${key}`} value={score} onChange={(e) => {updateStatementAnswers(`Q${key}`, e.target.value)}}/>
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
        <button hidden id="submit" type="submit" className="button">{info && info.submit}</button>
        

      </form>
      <button type="button" className="button" onClick={handleSubmit}>{info && info.submit}</button>
    </div>
  );
}

export default HXI;
