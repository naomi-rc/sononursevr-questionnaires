import React, { useEffect, useState } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import HXI_EN from "../Questions/hxi/en";
import HXI_FR from "../Questions/hxi/fr";




const HXI = () => {
//const defaultLocale = localStorage['locale'] ? localStorage['locale'] : 'en';
//const [locale, setLocale] = React.useState(defaultLocale);

  const [title, setTitle] = React.useState<string | undefined>(); 
  const [instructions, setInstructions] = React.useState<string | undefined>(); 
  const [participantidlabel, setParticipantidlabel] = React.useState<string | undefined>(); 
  const [clarityDescription, setClarityDescription] = React.useState<string | undefined>(); 
  const [hapticSensationsDefinition, setHapticSensesDefinition] = React.useState<string | undefined>();  
  const [otherSensesDefinition, setOtherSensesDefinition] = React.useState<string | undefined>();  
  const [questions, setQuestions] = React.useState<string[] | undefined>(); 

  const { slug } = useParams();

  /* const changeLocale = (locale: string) => {
    localStorage['locale'] = locale;
    setLocale(locale);
    
  }; */
  
  useEffect(() => {
    if(slug=='fr'){
      //changeLocale('fr');
      setQuestions(HXI_FR.questions);
      setTitle(HXI_FR.title);
      setInstructions(HXI_FR.instructions);
      setParticipantidlabel(HXI_FR.participantid);
      setClarityDescription(HXI_FR.clarityDescription);
      setHapticSensesDefinition(HXI_FR.hapticSensationsDefinition);
      setOtherSensesDefinition(HXI_FR.otherSensesDefinition);
    }
    else{
      //changeLocale('en');
      setQuestions(HXI_EN.questions);
      setTitle(HXI_EN.title);
      setInstructions(HXI_EN.instructions);
      setParticipantidlabel(HXI_EN.participantid);
      setClarityDescription(HXI_EN.clarityDescription);
      setHapticSensesDefinition(HXI_EN.hapticSensationsDefinition);
      setOtherSensesDefinition(HXI_EN.otherSensesDefinition);
    }
  }, [slug]);

  return (
    
    <div className="App">
      
      {/* <h1>{defaultLocale == 'en'? EN[0] : FR[0]}</h1> */}

      <div className="header">
        <h4 className="questionnaire-title">HXI</h4>

        <h4 className="participant-id-section participant-id">
          <label htmlFor="participant-id">Participant ID: </label>
          <input type="number" />
        </h4>
      </div>
      
      <div className="questionnaire-description">
        <p>{instructions}</p>
      </div>
      

      <table width="100%">
        <thead>
          <tr>
            <th className="question"></th>
            <th>Strongly Disagree</th>
            <th>Disagree</th>
            <th>Somewhat Disagree</th>
            <th>Neither Agree Nor Disagree</th>
            <th>Somewhat Agree</th>
            <th>Agree</th>
            <th>Strongly Agree</th>
          </tr>
        </thead>
        <tbody>
          {
            questions && questions.map((question, index) => (
              <>
                <tr>
                  <td width="(100)%" className="question" colSpan={7}>{question}</td>
                </tr>
                <tr>
                  <td width="(100/8)%"> </td>
                  <td width="(100/8)%"><input type="radio" name={index.toString()} value="1"/></td>
                  <td width="(100/8)%"><input type="radio" name={index.toString()} value="2"/></td>
                  <td width="(100/8)%"><input type="radio" name={index.toString()} value="3"/></td>
                  <td width="(100/8)%"><input type="radio" name={index.toString()} value="4"/></td>
                  <td width="(100/8)%"><input type="radio" name={index.toString()} value="5"/></td>
                  <td width="(100/8)%"><input type="radio" name={index.toString()} value="6"/></td>
                  <td width="(100/8)%"><input type="radio" name={index.toString()} value="7"/></td>
                </tr>
              </>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default HXI;
