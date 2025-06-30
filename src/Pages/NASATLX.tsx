import React, { useEffect, useState,useRef  } from 'react';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import NASATLX_EN from "../Questions/nasatlx/en"
import NASATLX_FR from "../Questions/nasatlx/fr";
import { Console } from 'console';
import { TLXSlider } from './TLXSlider';




const categories = [
  'MD',
  'PD',
  'TD',
  'P',
  'E',
  'F',
];

interface NasaTLXFormProps {
  onSubmit: (values: Record<string, number>) => void;
}
interface TLXFactor {
  name: string;
  definition: string;
  question: string;
  reference: string;
  scale: string;
  upper: string;
  lower: string;
}

type TLXFactorKey = "MD" | "PD" | "TD" | "P" | "E" | "F";

type TLXFactors = Record<TLXFactorKey, TLXFactor>;



function NASATLX() {

  let navigate = useNavigate();

  const {lang, id, trial, hapticCase } = useParams();
  const [understood, setUnderstood] = React.useState<boolean>(); 
  const [loading, setLoading] = React.useState(false);
  const [questionsOrder, setQuestionsOrder] = React.useState<string>(); 
  const [info, setInfo] = React.useState<any>(); 
  const [factors, setFactors] = useState<TLXFactors>();
  const [agreementLevel, setAgreementLevel] = React.useState<string[] | undefined>(); 
  const [statementAnswers, setStatementAnswers] = React.useState<{[key: string] : string}>(); 

  const NUM_TICKS = 20;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [section, setSection] = useState<number>(0);
  const [pair, setPair] = useState<number>(0);
  const [factor, setFactor] = useState<number>(0);
  const [pairs, setPairs] = useState<string[][]>();
  enum Section {
    Instructions,
    Definitions,
    Pairwise,
    Rating
  }


  

  let currentSection = Section.Instructions;
  //let factors = {"MD" : 0, "PD" : 0, "TD" : 0, "P" : 0, "E" : 0, "F" : 0}
  const pairsList = 
  [["E","P"], ["TD", "F"], ["TD", "E"], ["PD", "F"], ["P", "F"], 
  ["PD", "TD"], ["PD", "P"], ["TD", "MD"], ["F", "E"], ["P", "MD"], 
  ["P", "TD"], ["MD", "E"], ["MD", "PD"], ["E", "PD"], ["F", "MD"]]

interface Pair {
  first : string,
  second : string
}

  const shuffle = (array : string[][]) => { 
    return array.sort(() => Math.random() - 0.5); 
  }; 

  const changeLanguage = (value : string) => {
    console.log(value);
    navigate(`/${value}/nasa-tlx/${hapticCase}/${id}/${trial}`);
  }

  const previousSection = () => {
    if(section==3 && (pair > 0)){
      console.log("previous pair")
      setPair(pair-1);
    }
    else if(section==5 && (currentIndex > 0|| factor > 0)){
      console.log("previous pair")
      setFactor(factor-1);
      setCurrentIndex(currentIndex - 1);
    }
    else if(section==0){
      navigate(`/`);
    }
    else{
      console.log("previous section")
      setSection(Math.max(0, section-1))
    }
  }

  const nextSection = () => {
    console.log("next section")
    setSection(section+1)
  }

  const nextPair = () => {
    console.log("next pair")
    if(pairs && pair + 1 >= pairs.length){
      nextSection();
    }
    else{
      setPair(pair+1);
    }
  }

  const nextScale = () => {
    console.log("next pair")
    if(factors && factor + 1 >= Object.keys(factors).length){
      nextSection();
    }
    else{
      setFactor(factor+1);
    }
  }

  useEffect(() => {
    if(lang==='fr'){
      setInfo(NASATLX_FR.info);
      //setFactors(NASATLX_FR.factors);
    }
    else{
      setInfo(NASATLX_EN.info);
      setFactors(NASATLX_EN.factors);
    }
    setPairs(shuffle(pairsList));
  }, [lang]);


  

  
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






const [currentIndex, setCurrentIndex] = useState(0);
  const [values, setValues] = useState<Record<string, number | null>>(
    Object.fromEntries(categories.map((cat) => [cat, null]))
  );

  const currentCategory = categories[currentIndex];
  const currentValue = values[currentCategory];

  const handleNext = () => {
    if (currentValue === null) return;

    if (currentIndex < categories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All done, submit
     // onSubmit(values as Record<string, number>);
    }
  };

  const handleChange = (value: number) => {
    setValues((prev) => ({
      ...prev,
      [currentCategory]: value,
    }));
  };


  return (
    info && 
    <div className="NASATLX App">
      <div className="header">
        <button type="button" className="textButton" onClick={(e) => {previousSection()}}>{info.back}</button>
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
    
      {
        (section == 0) && 
        <div>
          <h4>Instructions</h4>
          <div className="questionnaire-description left">
            <p>{info.instructions}</p>
            <p>{info.instructionsContinued}</p>
          </div>
          <button type="button" className="bottom nasatlx-button" onClick={(e) => nextSection()}>{info && info.next}</button>
        </div>
        
      }

      {
        (section == 1) && 
        <div>
          <h4>Definitions</h4>
          <div className="left">

            {factors && Object.values(factors).map((f, i) => (
              <p key={`definition${i}`}>
                <span><b>{f.name}</b></span> <span>{f.scale}</span><br/>
                <span>{f.definition}</span>
              </p>
            ))}
          </div>

          <button type="button" className="bottom nasatlx-button" onClick={(e) => nextSection()}>{info && info.next}</button>
        </div>
      }

      {
        (section == 2) && 
        <div>
          <h4>Pairwise Comparaison</h4>
          <div className="left">
              <p>You will now be shown...</p>
            
          </div>
          <button type="button" className="bottom nasatlx-button" onClick={(e) => nextSection()}>{info && info.next}</button>
        </div>
      }

      {
        (section == 3) && 
        <div className="pairwiseFactors">
          <h4>{pair+1} of {pairs && pairs.length}</h4>
          <div className="page left">
            <p>Tap the factor below that represents the more important contributor to workload for the psecific task that you recently performed</p>
            <div className="pairsParent pairsBottom">
              <div className="pairOption" onClick={(e) => nextPair()}>
                {factors && pairs && factors[pairs[pair][0] as TLXFactorKey].name}
                <p>{factors && pairs && factors[pairs[pair][1] as TLXFactorKey].reference}</p>
              </div>
              <div className="divider" />
              <div className="pairOption" onClick={(e) => nextPair()}>
                 {factors && pairs && factors[pairs[pair][1] as TLXFactorKey].name}
                 <p>{factors && pairs && factors[pairs[pair][1] as TLXFactorKey].reference}</p>
              </div>
            </div>
          </div>
        </div>
      }

      {
        (section == 4) && 
        <div>
          <h4>Rating Scales</h4>
          <div className="left">
            <p>{info.scales}</p>
            <p>{info.evaluate}</p>
            <p>{info.consider}</p>
          </div>
          <button type="button" className="bottom nasatlx-button" onClick={(e) => nextSection()}>{info && info.next}</button>
        </div>
      }


      {
        (section == 5) &&
        <div className="tlx-form">
      {/* <h3>{currentCategory}</h3>  */}
      <div className="left scales">
        <span><b>{factors && factors[currentCategory as TLXFactorKey].name}</b></span> 
        <span>{factors && factors[currentCategory as TLXFactorKey].question}</span> 
      <TLXSlider
        label=""
        value={currentValue}
        onChange={handleChange}
      />
      </div>

      <button
        className="nasatlx-button"
        disabled={currentValue === null}
        onClick={handleNext}
      >
        {currentIndex < categories.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
      }



      {
        (section == 10) &&
        <div className="">
          {factors && Object.keys(factors).map((f, i) => (
            (true || factor == i) && 
            <div>
              <h4>{factor+1} of {Object.keys(factors).length}</h4>
              <div className="left scales">
                <span><b>{f}</b></span>
                <span><b>{info.mental}</b></span>
                <span>{info.mental_question}</span>

                <div className="nasa-slider-container">
                  <div className="slider-bar"
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

                    {/* <p className="selected-label">
                      {selected !== null ? `Selected: ${Math.round(selected)}` : 'Tap or drag to select'}
                    </p> */}
                </div>

              </div>


            </div>
          ))}
          
          <button type="button" className="bottom nasatlx-button" onClick={(e) => nextScale()}>{info && info.next}</button>
        </div>
      }


    
  </div>
  );
}

export default NASATLX;
