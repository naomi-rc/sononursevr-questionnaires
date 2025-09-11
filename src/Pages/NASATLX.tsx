import React, { useEffect, useState } from 'react';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import NASATLX_EN from "../Questions/nasatlx/en"
import NASATLX_FR from "../Questions/nasatlx/fr";
import { TLXSlider } from './TLXSlider';
import { useLocalStorage } from "../useLocalStorage";


enum Sections {
  Instructions = 0,
  Definitions,
  PairwiseIntroduction,
  PairwiseSelection,
  RatingsIntroduction,
  RatingsSelection,
  RatingsSummary,
}

const categories = [
  'MD',
  'PD',
  'TD',
  'P',
  'E',
  'F',
];

export interface TLXFactor {
  name: string;
  definition: string;
  question: string;
  reference: string;
  scale: string;
  upper: string;
  lower: string;
  note: string;
}

type TLXFactorKey = "MD" | "PD" | "TD" | "P" | "E" | "F";

type TLXFactors = Record<TLXFactorKey, TLXFactor>;

const pairsList = 
  [["E","P"], ["TD", "F"], ["TD", "E"], ["PD", "F"], ["P", "F"], 
  ["PD", "TD"], ["PD", "P"], ["TD", "MD"], ["F", "E"], ["P", "MD"], 
  ["P", "TD"], ["MD", "E"], ["MD", "PD"], ["E", "PD"], ["F", "MD"]]



function NASATLX() {

  let navigate = useNavigate();

  const {lang, id, trial, hapticCase, allowSummary} = useParams();
  const [usePairwise] =  useLocalStorage('usePairwise', "true"); 
  const [studyName] =  useLocalStorage('studyName', ''); 
  const [loading, setLoading] = React.useState(false);

  const [info, setInfo] = React.useState<any>(); 
  const [factors, setFactors] = useState<TLXFactors>();
  const [section, setSection] = useState<Sections>(0);
  const [pair, setPair] = useState<number>(0);
  const [factor, setFactor] = useState<number>(0);
  const [pairs, setPairs] = useState<string[][]>();
  const [selectedPairs, setSelectedPairs] = React.useState<{[key: number] : string}>({}); 
  const [adjustingRating, setAdjustRating] = React.useState<boolean>(false); 

  const [currentIndex, setCurrentIndex] = useState(0);
  const [rawRatings, setRawRatings] = useState<Record<string, number | null>>(
    Object.fromEntries(categories.map((cat) => [cat, null]))
  );

  const currentCategory = categories[currentIndex];
  const currentValue = rawRatings[currentCategory];


  useEffect(() => {
    if(lang==='fr'){
      setInfo(NASATLX_FR.info);
      setFactors(NASATLX_FR.factors);
    }
    else{
      setInfo(NASATLX_EN.info);
      setFactors(NASATLX_EN.factors);
    }
    setPairs(shuffle(pairsList));
  }, [lang]);


  const shuffle = (array : string[][]) => { 
    return array.sort(() => Math.random() - 0.5); 
  }; 

  const changeLanguage = (value : string) => {
    navigate(`/${value}/nasa-tlx/${hapticCase}/${id}/${trial}`);
  }

  const updateSelectedPairs = (key : number, value : string) => {
    setSelectedPairs(prevDictionary => ({ ...prevDictionary, [key] : value }));    
  }

  
  const nextPair = (factor: string) => {
    if(pairs === undefined) return;

    updateSelectedPairs(pair, factor)
    const updated = { ...selectedPairs, [pair]: factor };
    if(pair + 1 >= pairs.length){
      setTimeout(() => { 
        const weights = calculateWeights(updated)     
        submitResponses('Weighting', weights);      
      }, 500); 
            
    }
    else{
      setTimeout(() => {
        setPair(pair+1);
      }, 500);
    }
  }

  const previousSection = () => {
    if(section === Sections.PairwiseSelection && (pair > 0)){
      setPair(pair-1);
    }
    else if(section === Sections.Instructions){
      navigate(`/`);
    }
    else if(section === Sections.RatingsSelection && (currentIndex > 0 || factor > 0)){
      setFactor(factor-1);
      setCurrentIndex(currentIndex - 1);
    }
    else if(usePairwise === "false" && section === Sections.RatingsIntroduction){
      setSection(Sections.Definitions)
    }
    else{
      setSection(Math.max(0, section-1))
    }
  }

  const nextSection = () => {
    if(usePairwise === "false" && section === Sections.Definitions)  {
      setSection(Sections.RatingsIntroduction)
    }
    else{
      setSection(section+1)
    }
  }


  const adjustRatingResponses = (index : number) => {
    setAdjustRating(true);
    setCurrentIndex(index);
    setSection(Sections.RatingsSelection)
  }


  const calcualteTotalWeight = (responses : Record<string, number | null>) => {
    return Object.values(responses).reduce((sum : number, val) => sum + (val?? 0), 0);
  }

  const stringResponses = (responses : Record<string, number | null>) => {
    return Object.fromEntries(Object.entries(responses).map(([key, value]) => [key, value === null? "0" : value.toString()]));
  }

  const roundedResponses = (responses : Record<string, number | null>) => {
    return Object.fromEntries(Object.entries(responses).map(([key, value]) => [key, value === null? "0" : Math.round(value).toString()]));
  }


  const calculateWeights = (selectedScaleValues : {[key: number] : string}) => {
    let weights : Record<string, number> = {};
    let totalCount = 0;
    Object.values(selectedScaleValues).forEach((val) => {
      weights[val] = (weights[val] || 0) + 1;
      totalCount++;
    });
    if(totalCount !== 15){
      alert("Critical error - Pairwise total count is not 15");
    }
    return weights;
  }

  const handleNext = () => {
    if (currentValue === null) return;
    
    if(adjustingRating){
      setSection(Sections.RatingsSummary)
    }
    else if (currentIndex < categories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } 
    else {
      nextSection();
    }
  };

  const handleChange = (value: number) => {
    setRawRatings((prev) => ({
      ...prev,
      [currentCategory]: value,
    }));
  };

  const submitResponses = (part : string, responses : Record<string, number | null>) => {

    const url  = "https://script.google.com/macros/s/AKfycbzEzzTTe6MJ5mflNiBViQPb_ZiUVprDgGSwm08rRjyx2B3m7c_W0MNZ3os5VXOGopyG/exec";
    
    if (id && trial && hapticCase && lang) {    

      setLoading(true);

      if (responses) {

        if(part === 'Weighting'){
            const res = stringResponses(responses)
            const totalWeight = calcualteTotalWeight(responses)
            const payload = new URLSearchParams({
              ParticipantID : id,
              Language : lang,
              Trial : trial,
              HapticCase : hapticCase,
              StudyName : studyName,
              DateTime : Date().toString(),
              Part : "Weighting", 
              MentalWeight : res['MD'],
              PhysicalWeight : res['PD'],
              TemporalWeight : res['TD'],
              PerformanceWeight : res['P'],
              EffortWeight : res['E'],
              FrustrationWeight: res['F'],
              WeightCheck : totalWeight.toString()
            }).toString();

             fetch(url, {
              method: "POST",
              headers: {"Content-Type": "application/x-www-form-urlencoded"},
              body: (payload)
            }).then(res=>res.text()).then(data=>{
              setLoading(false)
              nextSection();  
            }).catch(error=> console.log(error))
          
        }
        else if(part === 'Ratings'){

          if(responses){
            const res = roundedResponses(responses)
            const payload = new URLSearchParams({
              ParticipantID : id,
              Language : lang,
              Trial : trial,
              HapticCase : hapticCase,
              StudyName : studyName,
              DateTime : Date().toString(),
              Part : "Ratings",
              MentalRating: res['MD'],
              PhysicalRating: res['PD'],
              TemporalRating: res['TD'],
              PerformanceRating: res['P'],
              EffortRating: res['E'],
              FrustrationRating: res['F']
            }).toString();

            fetch(url, {
              method: "POST",
              headers: {"Content-Type": "application/x-www-form-urlencoded"},
              body: (payload)
            }).then(res=>res.text()).then(data=>{
              navigate(`/${lang}/questionnaire-complete`);
            }).catch(error=> console.log(error)) 
          }        
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
        (section === Sections.Instructions) && 
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
        (section === Sections.Definitions) && 
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
        (section === Sections.PairwiseIntroduction) && 
        <div>
          <h4>Pairwise Comparaison</h4>
          <div className="left">
              <p>{info.pairwiseInstructions}</p>            
              <p>{info.pairwiseInstructionsContinued}</p>            
          </div>
          <button type="button" className="bottom nasatlx-button" onClick={(e) => nextSection()}>{info && info.next}</button>
        </div>
      }

      {
        (section === Sections.PairwiseSelection) && 
        <div className="pairwiseFactors">
          <h4>{pair+1} of {pairs && pairs.length}</h4>
          <div className="page left">
            <p>{info.tapFactorPrompt}</p>
            {pairs && factors && selectedPairs && pairs.map((p, i) => (
              (pair === i) && 
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
          </div>
        </div>
      }

      {
        (section === Sections.RatingsIntroduction) && 
        <div>
          <h4>Rating Scales</h4>
          <div className="left">
            <p>{info.ratingScales1}</p>
            <p>{info.ratingScales2}</p>
            <p>{info.ratingScales3}</p>
          </div>
          <button type="button" className="bottom nasatlx-button" onClick={(e) => nextSection()}>{info && info.next}</button>
        </div>
      }


      {
        (section === Sections.RatingsSelection) &&
        <div className="ratingScales">
          <div className="left">
            <p>{info.tapScalePrompt}</p>
            <div className="scales">
              
              <span><b>{factors && factors[currentCategory as TLXFactorKey].name}</b></span> 
              <span>{factors && factors[currentCategory as TLXFactorKey].question}</span> 
              <TLXSlider
                label=""
                value={currentValue}
                factor={factors && factors[currentCategory as TLXFactorKey]}
                modifiable={true}
                onChange={handleChange}
              />
            </div>
          </div>
          <p className="selected-label">
            <i>{factors && factors[currentCategory as TLXFactorKey].note}</i>
          </p>  
          {/* <p className="selected-label">
            {currentValue !== null ? `Selected: ${Math.round(currentValue)}` : 'Tap or drag to select'}
          </p>  */}
          {
              !allowSummary && currentIndex === categories.length - 1 &&    
              <button
                className={`nasatlx-button ${currentValue === null? 'disabled': ''}`}
                disabled={currentValue === null}
                onClick={(e) => {submitResponses('Ratings', rawRatings);}}
              >
                {info.finish}
              </button>
          }
          {
            ((currentIndex < categories.length - 1) || (allowSummary && currentIndex === categories.length - 1)) &&
            <button
            className={`nasatlx-button ${currentValue === null? 'disabled': ''}`}
            disabled={currentValue === null}
            onClick={handleNext}
            >
              {info.next}
            </button>
          }
        </div>
      }  


      {
        (section === Sections.RatingsSummary) &&
        <div className="ratingScales">
          <div className="left">
            <p>{info.finished1}</p>
            <p>{info.finished2}</p>
            <br/>
            <h3>{info.ratingsSummary}</h3>
            <div className="scales">
              {categories.map((category, i) => (
                <div key={`factor${category}`} onClick={(e) => {adjustRatingResponses(i)}}>
                  <span><b>{factors && factors[category as TLXFactorKey].name}</b></span> 
                  <TLXSlider
                    label=""
                    value={rawRatings[category]}
                    factor={factors && factors[category as TLXFactorKey]}
                    modifiable={false}
                    onChange={handleChange}
                  />
                </div>))}
            </div>
          </div>
          
          <button
            className={`nasatlx-button ${currentValue === null? 'disabled': ''}`}
            disabled={currentValue === null}
            onClick={(e) => {submitResponses('Ratings', rawRatings);}}
          >
            {info.finish}
          </button>
        </div>
      }  
  </div>
  );
}

export default NASATLX;
