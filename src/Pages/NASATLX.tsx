import React, { useEffect, useState,useRef  } from 'react';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import NASATLX_EN from "../Questions/nasatlx/en"
import NASATLX_FR from "../Questions/nasatlx/fr";
import { Console } from 'console';


function NASATLX() {

  let navigate = useNavigate();

  const {lang, id, trial, hapticCase } = useParams();

  const [understood, setUnderstood] = React.useState<boolean>(); 
  const [loading, setLoading] = React.useState(false);
  const [questionsOrder, setQuestionsOrder] = React.useState<string>(); 
  const [info, setInfo] = React.useState<any>(); 
  const [questions, setQuestions] = React.useState<{}[] | undefined>(); 
  const [agreementLevel, setAgreementLevel] = React.useState<string[] | undefined>(); 
  const [statementAnswers, setStatementAnswers] = React.useState<{[key: string] : string}>(); 

  const changeLanguage = (value : string) => {
    console.log(value);
    navigate(`/${value}/nasa-tlx/${hapticCase}/${id}/${trial}`);
  }

  useEffect(() => {
    if(lang==='fr'){
      setInfo(NASATLX_FR.info);
    }
    else{
      setInfo(NASATLX_EN.info);
    }
    setQuestionsOrder(questions?.map(q => Object.keys(q)[0]).join(','));
  }, [lang, questions]);


  



  const NUM_TICKS = 20;


const trackRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [spaceBetween, setSpaceBetween] = useState<number | null>(null);
  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      const rect = track.getBoundingClientRect();
      setSpaceBetween(rect.width/NUM_TICKS);
    }
    console.log(spaceBetween);
  }, [spaceBetween]);
  
  const getRelativePosition = (clientX: number): number => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    console.log(clientX + " - " + rect.left + " " + rect.width);
    const x = clientX - rect.left;
    console.log(Math.max(0, Math.min(x / rect.width, 1)));
    return Math.max(0, Math.min(x / rect.width, 1)); // Clamp to [0, 1]
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = getRelativePosition(clientX);
    setDragPosition(pos);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = getRelativePosition(clientX);
    setDragPosition(pos);
  };

  const handleEnd = () => {
    if (dragPosition !== null) {
      /* const raw = dragPosition * NUM_TICKS;
      const snapped = Math.min(NUM_TICKS - 1, Math.max(0, raw)); */
      const raw = dragPosition * (NUM_TICKS); // dragPosition ∈ [0,1]
      //console.log(raw);
      const snapped = Math.max(0, Math.min(NUM_TICKS, raw));
      setSelected(snapped);
      setSelected(snapped);
      setDragPosition(null);
    }
    setIsDragging(false);
  };

const dashLeft =
  dragPosition !== null
    ? Math.min(dragPosition, 1) * 100
    : selected !== null
    ? ((selected) / NUM_TICKS) * 100
    : null;

  return (
    info && <div className="HXI NASATLX App">
      <div className="header">
        <button type="button" className="textButton" >{info.back}</button>
        {/* <div style={{color: "#3093ff"}}>{info.back}</div> */}
        <select name="cars" className="languageDropDown" style={{color: "#3093ff"}} value={lang} onChange={(e) => {changeLanguage(e.target.value)}}>
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
    
      {
        false && 
        <div>
          <h4>Instructions</h4>
          <div className="questionnaire-description">
            <p>{info.instructions}</p>
            <p>{info.instructionsContinued}</p>
          </div>
        </div>
      }

      {
        false && 
        <div>
          <h4>Definitions</h4>
          <div className="left">
            <p>
              <span><b>{info.mental}</b></span> <span>{info.low_high}</span><br/>
              <span>{info.mental_definition}</span>
            </p>

            <p>
              <span><b>{info.physical}</b></span> <span>{info.low_high}</span><br/>
              <span>{info.physical_definition}</span>
            </p>

            <p>
              <span><b>{info.temporal}</b></span> <span>{info.low_high}</span><br/>
              <span>{info.temporal_definition}</span>
            </p>

            <p>
              <span><b>{info.performance}</b></span> <span>{info.good_poor}</span><br/>
              <span>{info.performance_definition}</span>
            </p>

            <p>
              <span><b>{info.effort}</b></span> <span>{info.low_high}</span><br/>
              <span>{info.effort_definition}</span>
            </p>

            <p>
              <span><b>{info.frustration}</b></span> <span>{info.low_high}</span><br/>
              <span>{info.frustration_definition}</span>
            </p>
          </div>
        </div>
      }


      {
        false && 
        <div>
          <h4>Rating Scales</h4>
          <div className="left">
            <p>{info.scales}</p>
            <p>{info.evaluate}</p>
            <p>{info.consider}</p>
          </div>
        </div>
      }

      {
        false && 
        <div className="">
          <h4>1 of 6</h4>
          <div className="left scales">
            <span><b>{info.mental}</b></span>
            <span>{info.mental_question}</span>

          </div>
        </div>
      }
      

      <button type="button" className="bottom nasatlx-button" >{info && info.next}</button>
{/* {false && 
     <div className="nasa-slider-container">
      <div className="slider-bar">
        <div className="slider-track" />
        <div className="slider-ticks">
          {[...Array(NUM_TICKS)].map((_, i) => (
            <div key={i} className="tick-container" onClick={() => handleClick(i)}>
              <div className="tick" />
            </div>
          ))}
        </div>
        {selected !== null && (
          <div
            className="red-dash"
            style={{
              left: `calc(${(selected / (NUM_TICKS - 1)) * 100}%)`,
            }}
          />
        )}
      </div>
      <p className="selected-label">
        {selected !== null ? `Selected: ${selected}` : 'Click a tick'}
      </p>
    </div>
    }
 */}





    {

      true &&

      <div className="">
          <h4>1 of 6</h4>
          <div className="left scales">
            <span><b>{info.mental}</b></span>
            <span>{info.mental_question}</span>


      <div className="nasa-slider-container">
      <div
        className="slider-bar"
        
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div className="slider-track" />

        <div className="slider-ticks" ref={trackRef}>
  {Array.from({ length: NUM_TICKS}, (_, i) => (
    <div key={i} className="tick-container">
      <div
        className={`tick ${i} ${i === Math.floor(NUM_TICKS / 2) ? 'tick-middle' : ''}`}
      />
      {
        i==NUM_TICKS -1 &&
        <div
        className={`tick ${i+1} tick-end`}
      />
      }
    </div>
  ))}
  
</div>

        {dashLeft !== null && (
          <div
            className="red-dash"
            style={{ left: `calc(${dashLeft}%)` }}
          />
        )}
        <div className="label-ends">
          <span className="label-left">Low</span>
          <span className="label-right">High</span>
        </div>
      </div>

      <p className="selected-label">
        {selected !== null ? `Selected: ${Math.round(selected)}` : 'Tap or drag to select'}
      </p>
    </div>

    </div>
        </div>
    }
  </div>
  );
}

export default NASATLX;
