import React, { useEffect, useState } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import HXI_EN from "../Questions/hxi/en";
import HXI_FR from "../Questions/hxi/fr";




const HXI = () => {
//const defaultLocale = localStorage['locale'] ? localStorage['locale'] : 'en';
//const [locale, setLocale] = React.useState(defaultLocale);

  const [info, setInfo] = React.useState<any>(); 
  const [questions, setQuestions] = React.useState<string[] | undefined>(); 
  const [agreementLevel, setAgreementLevel] = React.useState<string[] | undefined>(); 

  const { slug } = useParams();

  /* const changeLocale = (locale: string) => {
    localStorage['locale'] = locale;
    setLocale(locale);
    
  }; */
  
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
      
      <div className="header">
        <h3 className="questionnaire-title">{info && info.title}</h3>

        <h3 className="participant-id-section participant-id">
          <label htmlFor="participant-id">{info && info.participantid}</label>
          <input type="number" />
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
          <tr>
            <th key="empty"></th>
            {agreementLevel && agreementLevel.map((level, index) => (
              <th key={index}>{agreementLevel[index]}</th>
            ))}
            
          </tr>
          <hr className="line"/>
        </thead>
        <tbody>
          {
            questions && questions.map((question, index) => (
              <>
                <tr>
                  <td className="question" colSpan={7}>{question}</td>
                </tr>
                <tr>
                  <td></td>
                  <td><input type="radio" name={index.toString()} value="1"/></td>
                  <td><input type="radio" name={index.toString()} value="2"/></td>
                  <td><input type="radio" name={index.toString()} value="3"/></td>
                  <td><input type="radio" name={index.toString()} value="4"/></td>
                  <td><input type="radio" name={index.toString()} value="5"/></td>
                  <td><input type="radio" name={index.toString()} value="6"/></td>
                  <td><input type="radio" name={index.toString()} value="7"/></td>
                </tr>
                <hr className="line"/>
              </>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default HXI;
