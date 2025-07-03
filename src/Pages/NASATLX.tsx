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


  const NUM_TICKS = 20;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [totalWeightCount, setTotalWeightCount] = useState<number>(0);
  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [section, setSection] = useState<number>(0);
  const [pair, setPair] = useState<number>(0);
  const [factor, setFactor] = useState<number>(0);
  const [pairs, setPairs] = useState<string[][]>();
  const [selectedPairs, setSelectedPairs] = React.useState<{[key: number] : string}>({}); 
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

  const updateSelectedPairs = (key : number, value : string) => {
    setSelectedPairs(prevDictionary => ({ ...prevDictionary, [key] : value }));    
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

  const nextPair = (factor: string) => {
    if(pairs === undefined) return;
    updateSelectedPairs(pair, factor)
    const updated = { ...selectedPairs, [pair]: factor };
    console.log(updated)
    if(pair + 1 >= pairs.length){
      //submit value
      setTimeout(() => {
        console.log(updated)   
        const weights = calculateWeights(updated)     
        submitResponses('Weighting', weights);      
      }, 1); //TODO : 500
            
    }
    else{
      setTimeout(() => {
        setPair(pair+1);
      }, 500);
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


  





const [currentIndex, setCurrentIndex] = useState(0);
  const [rawRatings, setRawRatings] = useState<Record<string, number | null>>(
    Object.fromEntries(categories.map((cat) => [cat, null]))
  );

  const currentCategory = categories[currentIndex];
  const currentValue = rawRatings[currentCategory];


  const calculateWeights = (selectedScaleValues : {[key: number] : string}) => {
    let weights : Record<string, number> = {};
    let totalCount = 0;
    console.log(Object.values(selectedScaleValues).length)
    Object.values(selectedScaleValues).forEach((val) => {
      weights[val] = (weights[val] || 0) + 1;
      totalCount++;
    });
    if(totalCount !== 15){
      alert("Critical error - Pairwise total count is not 15");
    }
    setTotalWeightCount(totalCount)
    return weights;
  }

  const handleNext = () => {
    if (currentValue === null) return;

    if (currentIndex < categories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All done, submit
     // onSubmit(values as Record<string, number>);
     submitResponses('Ratings', rawRatings);
          console.log("Responses submitted!")
     console.log(selectedPairs)
     console.log(rawRatings)
     console.log(calculateWeights(selectedPairs))
     navigate(`/${lang}/questionnaire-complete`);
     navigate(`/${lang}/questionnaire-complete`);
    }
  };

  const handleChange = (value: number) => {
    setRawRatings((prev) => ({
      ...prev,
      [currentCategory]: value,
    }));
  };

const calcualteTotalWeight = (responses : Record<string, number>) => {
   return Object.fromEntries(Object.entries(responses).map(([key, value]) => [key, Math.round(value).toString()]));
}

const stringResponses = (responses : Record<string, number | null>) => {
   return Object.fromEntries(Object.entries(responses).map(([key, value]) => [key, value === null? "0" : value.toString()]));
}

const roundedResponses = (responses : Record<string, number | null>) => {
   return Object.fromEntries(Object.entries(responses).map(([key, value]) => [key, value === null? "0" : Math.round(value).toString()]));
}

  const submitResponses = (part : string, responses : Record<string, number | null>) => {

    const url  = "https://script.google.com/macros/s/AKfycbzEzzTTe6MJ5mflNiBViQPb_ZiUVprDgGSwm08rRjyx2B3m7c_W0MNZ3os5VXOGopyG/exec";
    
    if (id && trial && hapticCase && lang) {    

      setLoading(true);
      let payload  = null;
      if (part === 'Weighting') {

        if(responses){

          if(true) {
            const res = stringResponses(responses)
            payload = new URLSearchParams({
              ParticipantID : id,
              Language : lang,
              Trial : trial,
              HapticCase : hapticCase,
              DateTime : Date().toString(),
              Part : "Weighting", 
              MentalWeight : res['MD'],
              PhysicalWeight : res['PD'],
              TemporalWeight : res['TD'],
              PerformanceWeight : res['P'],
              EffortWeight : res['E'],
              FrustrationWeight: res['F'],
              WeightCheck : totalWeightCount.toString()
            }).toString();
setLoading(false)
nextSection();  
            /* fetch(url, {
              method: "POST",
              headers: {"Content-Type": "application/x-www-form-urlencoded"},
              body: (payload)
            }).then(res=>res.text()).then(data=>{
              console.log(data);
              setLoading(false)
              nextSection();  
            }).catch(error=> console.log(error)) */
          }
        }

      }
      else if(part === 'Ratings'){

        if(responses){
          const res = roundedResponses(responses)
          payload = new URLSearchParams({
            ParticipantID : id,
            Language : lang,
            Trial : trial,
            HapticCase : hapticCase,
            DateTime : Date().toString(),
            Part : "Ratings",
            MentalRating: res['MD'],
            PhysicalRating: res['PD'],
            TemporalRating: res['TD'],
            PerformanceRating: res['P'],
            EffortRating: res['E'],
            FrustrationRating: res['F']
          }).toString();

          /* fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: (payload)
          }).then(res=>res.text()).then(data=>{
            console.log(data);
            navigate(`/${lang}/questionnaire-complete`);
          }).catch(error=> console.log(error)) */
        }
        
      }
    }
    else {
      alert("Critical error");
      return;
    } 
  }


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
          loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )
      }


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
            {Object.values(selectedPairs)}
            {pairs && factors && selectedPairs && pairs.map((p, i) => (
              (pair == i) && 
              <div key={`pair${pair}`} className="pairsParent pairsBottom">
                <div className="pairOption" onClick={(e) => nextPair(p[0])}>
                  <div className="factorChoice">
                   {selectedPairs[i]===p[0] && <span className="checkmark">✔</span>}
                    <span className={`factorLabel ${selectedPairs[i]===p[0]? 'selectedFactor': ''}`}>{factors[p[0] as TLXFactorKey].name}</span>
                  </div>
                  <p>{factors[p[0] as TLXFactorKey].reference}</p>
                </div>
                <div className="divider" />
                <div className="pairOption" onClick={(e) => nextPair(p[1])}>
                  <div className="factorChoice">
                   {selectedPairs[i]===p[1] && <span className="checkmark">✔</span>}
                    <span className={`factorLabel ${selectedPairs[i]===p[1]? 'selectedFactor': ''}`}>{factors[p[1] as TLXFactorKey].name}</span>
                  </div>
                  <p>{factors[p[1] as TLXFactorKey].reference}</p>
                </div>
              </div>
            ))}

            {/* <div className="pairsParent pairsBottom">
                <div className="pairOption" onClick={(e) => nextPair()}>
                  {factors && pairs && factors[pairs[pair][0] as TLXFactorKey].name}
                  <p>{factors && pairs && factors[pairs[pair][1] as TLXFactorKey].reference}</p>
                </div>
                <div className="divider" />
                <div className="pairOption" onClick={(e) => nextPair()}>
                  {factors && pairs && factors[pairs[pair][1] as TLXFactorKey].name}
                  <p>{factors && pairs && factors[pairs[pair][1] as TLXFactorKey].reference}</p>
                </div>
              </div> */}
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
           <p>{selectedPairs && Object.keys(selectedPairs).length}</p>
           <p>{selectedPairs && selectedPairs[0]}</p>
          </div>
          <button type="button" className="bottom nasatlx-button" onClick={(e) => nextSection()}>{info && info.next}</button>
        </div>
      }


      {
        (section == 5) &&
        <div className="ratingScales">
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
         <p className="selected-label">
          {currentValue !== null ? `Selected: ${Math.round(currentValue)}` : 'Tap or drag to select'}
        </p> 
      <button
        className={`nasatlx-button ${currentValue === null? 'disabled': ''}`}
        disabled={currentValue === null}
        onClick={handleNext}
      >
        {currentIndex < categories.length - 1 ? 'Next' : 'Submit'}
      </button>
    </div>
      }


{/* 
      {
        (section == 10) &&
        <div className="ratingScales">
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

                    <p className="selected-label">
                      {selected !== null ? `Selected: ${Math.round(selected)}` : 'Tap or drag to select'}
                    </p> 
                </div>

              </div>


            </div>
          ))}
          
          <button type="button" className="bottom nasatlx-button" onClick={(e) => nextScale()}>{info && info.next}</button>
        </div>
      } */}


    
  </div>
  );
}

export default NASATLX;
