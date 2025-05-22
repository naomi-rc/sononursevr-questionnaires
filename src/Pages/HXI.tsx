import React, { useEffect, useState } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import HXI_EN from "../Questions/hxi/en";
import HXI_FR from "../Questions/hxi/fr";
import Button from 'react-bootstrap/Button';


const HXI = () => {

  const [info, setInfo] = React.useState<any>(); 
  const [questions, setQuestions] = React.useState<string[] | undefined>(); 
  const [agreementLevel, setAgreementLevel] = React.useState<string[] | undefined>(); 

  const { slug } = useParams();
  
  useEffect(() => {
    if(slug=='fr'){
      setQuestions(HXI_FR.questions);
      setInfo(HXI_FR.info);
      setAgreementLevel(HXI_FR.agreementLevel);
    }
    else{
      setQuestions(HXI_EN.questions);
      setInfo(HXI_EN.info);
      setAgreementLevel(HXI_EN.agreementLevel);
    }
  }, [slug]);

  return (
    
    <div className="App">
      <form 
        method="POST" 
        action="https://script.google.com/macros/s/AKfycbxQc49yqrqKNqIdFrxOjqlNUnOSQY5ir4dtJpTGQWhpv6hd5FZXdA29tjmUQrENqZWh/exec"
      >

        <div className="header">
        <h3 className="questionnaire-title">{info && info.title}</h3>

          <h3 className="participant-id-section participant-id">
          <label htmlFor="participant-id">{info && info.participantid}</label>
          <input type="number" min="0" />
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
              questions && questions.map((question, index) => (
                <>
                  <tr>
                    <td className="question" colSpan={7}>{question}</td>
                  </tr>
                  <tr className="question-entry">
                    <td></td>
                    <td><input type="radio" name={index.toString()} value="1"/></td>
                    <td><input type="radio" name={index.toString()} value="2"/></td>
                    <td><input type="radio" name={index.toString()} value="3"/></td>
                    <td><input type="radio" name={index.toString()} value="4"/></td>
                    <td><input type="radio" name={index.toString()} value="5"/></td>
                    <td><input type="radio" name={index.toString()} value="6"/></td>
                    <td><input type="radio" name={index.toString()} value="7"/></td>
                  </tr>
                </>
              ))
            }
          </tbody>
        </table>

        <button type="button" className="button btn btn-primary">{info && info.submit}</button>

      </form>
      
    </div>
  );
}

export default HXI;
