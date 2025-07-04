const NASATLX_EN = {
  "info" : {
    "title" : "NASA-TLX",
    "back" : "< Back",
    "participantid" : "Participant ID : ",

    "next" : "Next",
    "submit" : "Submit",
    "savedResponse" : "Your responses were saved successfully.",
    "thankyou" : "Thank you for your participation!",
    "sendAnotherResponse" : "Send another response",

    "instructions" : "The evaluation you're about to perform is a technique that has been developed by NASA to assess the relative importance of six factors in determining how much workload you experienced while performing a task that you recently completed. ",
    "instructionsContinued" : "These six factors are defined on the following page. Read through them to make sure you understand what each factor means. If you have any questions, please ask your administrator.",
    
    "pairwiseInstructions" : "You'll now be presented with a series of pairs of rating scale factors; each pair will appear on a separate screen.",
    "pairwiseInstructionsContinued" : "For each pair, choose the factor that was more important to your experience of the workload in the task that you recently performed.",
    "tapFactorPrompt" : "Tap the factor below that represents the more important contributor to workload for the psecific task that you recently performed.",
    
    "ratingScales1" : "You'll now be presented with a series of rating scales.",
    "ratingScales2" : "For each of the six scales, evaluate the task you recently performed by tapping on the scale's location that matches your experience. Each line has two endpoint descriptors that describe the scale.",
    "ratingScales3" : "Consider your responses carefully in distinguishing among the different task conditions, and consider each scale individually.",
   
    "tapScalePrompt" : "Tap your response on the scale below.",

    "finished1" : "You've finished the evaluation. A summary of your responses is shown below for your review. You may tap any response below to go back to the associated question and change your answer.",
    "finished2" : "If you're ready to submit your responses, tap Finish.",
    "ratingsSummary" : "Rating Scales Summary",

    "finish" : "Finish",
  
/* 
    "low_high" : "(low/high)",
    "good_poor" : "(good/poor)",

    "mental" : "Mental Demand",
    "mental_question" : "How much mental and perceptual actiivty did you spend for the task?",
    "mental_definition" : "How much mental and perceptual activity was required (for example, thinking, deciding, calculating, remembering, looking, searching, etc)? Was the task easy or demanding, simple or complex, forgiving or exacting?",

    "physical" : "Physical Demand",
    "physical_definition" : "How much physical activity was required (for example, pushing, pulling, turning, controlling, activating, etc.)? Was the task easy or demanding, slow or brisk, slack or strenuous, restful or laborious?",

    "temporal" : "Temporal Demand",
    "temporal_definition" : "How much time pressure did you feel due to the rate or pace at which the tasks or task elements occurred? Was the pace slow and leisurely or rapid and frantic?",

    "performance" : "Mental Demand",
    "performance_definition" : "How successful do you think you were in accomplishing the goals of the task set by the experimenter (or yourself)? How satisfied were you with your performance in accomplishing these goals?",

    "effort" : "Effort",
    "effort_definition" : "How hard did you have to work (mentally and physically) to accomplish your level of performance?",

    "frustration" : "Frustration Level",
    "frustration_definition" : "How insecure, discouraged, irritated, stressed, and annoyed versus secure, gratified, content, relaxed, and complacent did you feel during the task?", */


  }, 
  "factors" : {
    "MD" : 
    {
      "name": "Mental Demand", 
      "definition" : "How much mental and perceptual activity was required (for example, thinking, deciding, calculating, remembering, looking, searching, etc)? Was the task easy or demanding, simple or complex, forgiving or exacting?", 
      "question" : "How much mental and perceptual activity did you spend for this task?",
      "reference" : "This refers to how much mental and perceptual activity was required to complete the task.",
      "scale" : "(low/high)",
      "upper" : "High",
      "lower" : "Low",
      "note" : "",
    }, 

    "PD" : 
    {
      "name" : "Physical Demand", 
      "definition" : "How much physical activity was required (for example, pushing, pulling, turning, controlling, activating, etc.)? Was the task easy or demanding, slow or brisk, slack or strenuous, restful or laborious?", 
      "question" : "How much physical activity did you spend for this task?",
      "reference" : "This refers to how much physical activity was required to complete the task.",
      "scale" : "(low/high)",
      "upper" : "High",
      "lower" : "Low",
      "note" : "",
    },

    "TD" : 
    {
      "name" : "Temporal Demand", 
      "definition" : "How much time pressure did you feel due to the rate or pace at which the tasks or task elements occurred? Was the pace slow and leisurely or rapid and frantic?", 
      "question" : "How much time pressure did you feel in order to complete this task?",
      "reference" : "This refers to how much time pressure you felt due to the rate or pace at which the tasks or task elements occurred.",
      "scale" : "(low/high)",
      "upper" : "High",
      "lower" : "Low",
      "note" : "",
    },

    "P" : 
    {
      "name" : "Peformance", 
      "definition" : "How successful do you think you were in accomplishing the goals of the task set by the experimenter (or yourself)? How satisfied were you with your performance in accomplishing these goals?", 
      "question" : "How successful do you think you were in accomplishing the goals of the task?",
      "reference" : "This refers to how successful you thought you were in accomplishing the goals of the task set by the experimenter (or yourself) and how satisfied you were with your peformance in accomplishing these goals.",
      "scale" : "(good/poor)",
      "upper" : "Poor",
      "lower" : "Good",
      "note" : "Note the location of the endpoints are diferent before answering.",
    },

    "E" : 
    {
      "name" : "Effort", 
      "definition" : "How hard did you have to work (mentally and physically) to accomplish your level of performance?", 
      "question" : "How hard did you have to work to accomplish your level of performance?",
      "reference" : "This refers to how hard you had to work (mentally and physically) to accomplish your level of performance.",
      "scale" : "(low/high)",
      "upper" : "High",
      "lower" : "Low",
      "note" : "",
    },

    "F" : 
    {
      "name" : "Frustration", 
      "definition" : "How insecure, discouraged, irritated, stressed, and annoyed versus secure, gratified, content, relaxed, and complacent did you feel during the task?", 
      "question" : "How insecure, discouraged, irritated, stressed, and annoyed were you durign this task?",
      "reference" : "This refers to how insecure, discouraged, irritated, stressed, and annoyed versus secure, gratified, content, relaxed, and complacent you felt during the task.",
      "scale" : "(low/high)",
      "upper" : "High",
      "lower" : "Low",
      "note" : "",
    },
  }
  
}
export default NASATLX_EN;

