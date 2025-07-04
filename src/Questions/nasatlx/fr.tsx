const NASATLX_FR = {
  "info" : {
    "title" : "NASA-TLX",
    "back" : "< Retour",
    "participantid" : "ID du.de la participant.e : ",

    "next" : "Suivant",
    "submit" : "Soumettre",
    "savedResponse" : "Vos réponses ont été enregistrées avec succès.",
    "thankyou" : "Merci pour votre participation !",
    "sendAnotherResponse" : "Envoyer une autre réponse",

    "instructions" : "L’évaluation que vous êtes sur le point de réaliser est une technique développée par la NASA pour évaluer l’importance relative de six facteurs déterminant la charge de travail que vous avez ressentie en accomplissant une tâche récemment effectuée.",
    "instructionsContinued" : "Ces six facteurs sont définis à la page suivante. Lisez-les attentivement pour bien comprendre ce que signifie chaque facteur. Si vous avez des questions, veuillez les poser à votre administrateur.",

    "pairwiseInstructions" : "Une série de paires de facteurs d’évaluation vous sera maintenant présentée ; chaque paire apparaîtra sur un écran distinct.",
    "pairwiseInstructionsContinued" : "Pour chaque paire, choisissez le facteur qui a le plus contribué à votre perception de la charge de travail pendant la tâche que vous avez récemment réalisée.",
    "tapFactorPrompt" : "Touchez ci-dessous le facteur qui représente le contributeur le plus important à la charge de travail pour la tâche spécifique que vous avez récemment effectuée.",

    "ratingScales1" : "Une série d’échelles d’évaluation vous sera maintenant présentée.",
    "ratingScales2" : "Pour chacune des six échelles, évaluez la tâche que vous avez récemment réalisée en touchant l’emplacement sur l’échelle qui correspond à votre expérience. Chaque ligne comporte deux descripteurs aux extrémités qui définissent l’échelle.",
    "ratingScales3" : "Réfléchissez soigneusement à vos réponses en distinguant les différentes conditions de la tâche, et considérez chaque échelle séparément.",

    "tapScalePrompt" : "Touchez votre réponse sur l’échelle ci-dessous.",

    "finished1" : "Vous avez terminé l’évaluation. Un résumé de vos réponses est présenté ci-dessous pour révision. Vous pouvez toucher n’importe quelle réponse pour revenir à la question correspondante et modifier votre réponse.",
    "finished2" : "Si vous êtes prêt à soumettre vos réponses, touchez Terminer.",
    "ratingsSummary" : "Résumé des échelles d’évaluation",

    "finish" : "Terminer",
  }, 
  "factors" : {
    "MD" : 
    {
      "name": "Charge mentale", 
      "definition" : "Quelle quantité d’activité mentale et perceptive a été nécessaire (par exemple, penser, décider, calculer, se souvenir, observer, chercher, etc.) ? La tâche était-elle facile ou exigeante, simple ou complexe, tolérante ou rigoureuse ?", 
      "question" : "Quelle quantité d’activité mentale et perceptive avez-vous consacrée à cette tâche ?",
      "reference" : "Cela fait référence à la quantité d’activité mentale et perceptive requise pour accomplir la tâche.",
      "scale" : "(faible/élevée)",
      "upper" : "Élevée",
      "lower" : "Faible",
      "note" : "",
    }, 

    "PD" : 
    {
      "name" : "Charge physique", 
      "definition" : "Quelle quantité d’activité physique a été nécessaire (par exemple, pousser, tirer, tourner, contrôler, activer, etc.) ? La tâche était-elle facile ou exigeante, lente ou rapide, légère ou intense, reposante ou fatigante ?", 
      "question" : "Quelle quantité d’activité physique avez-vous consacrée à cette tâche ?",
      "reference" : "Cela fait référence à la quantité d’activité physique requise pour accomplir la tâche.",
      "scale" : "(faible/élevée)",
      "upper" : "Élevée",
      "lower" : "Faible",
      "note" : "",
    },

    "TD" : 
    {
      "name" : "Pression temporelle", 
      "definition" : "À quel point avez-vous ressenti une pression temporelle en raison du rythme ou de la cadence à laquelle les tâches ou les éléments de la tâche se sont déroulés ? Le rythme était-il lent et détendu ou rapide et frénétique ?", 
      "question" : "À quel point avez-vous ressenti une pression temporelle pour accomplir cette tâche ?",
      "reference" : "Cela fait référence à la pression temporelle ressentie en raison du rythme ou de la cadence des tâches ou de leurs éléments.",
      "scale" : "(faible/élevée)",
      "upper" : "Élevée",
      "lower" : "Faible",
      "note" : "",
    },

    "P" : 
    {
      "name" : "Performance", 
      "definition" : "Dans quelle mesure pensez-vous avoir réussi à atteindre les objectifs de la tâche fixés par l’expérimentateur (ou par vous-même) ? Dans quelle mesure étiez-vous satisfait de votre performance dans l’accomplissement de ces objectifs ?", 
      "question" : "Dans quelle mesure pensez-vous avoir réussi à atteindre les objectifs de la tâche ?",
      "reference" : "Cela fait référence à la réussite perçue dans l’atteinte des objectifs fixés et à la satisfaction ressentie quant à la performance.",
      "scale" : "(bonne/mauvaise)",
      "upper" : "Mauvaise",
      "lower" : "Bonne",
      "note" : "Notez que l’emplacement des extrémités est inversé avant de répondre.",
    },

    "E" : 
    {
      "name" : "Effort", 
      "definition" : "À quel point avez-vous dû fournir des efforts (mentaux et physiques) pour atteindre votre niveau de performance ?", 
      "question" : "À quel point avez-vous dû fournir des efforts pour atteindre votre niveau de performance ?",
      "reference" : "Cela fait référence à l’intensité des efforts (mentaux et physiques) nécessaires pour atteindre votre niveau de performance.",
      "scale" : "(faible/élevé)",
      "upper" : "Élevé",
      "lower" : "Faible",
      "note" : "",
    },

    "F" : 
    {
      "name" : "Frustration", 
      "definition" : "Dans quelle mesure vous êtes-vous senti peu sûr de vous, découragé, irrité, stressé et agacé par opposition à sûr de vous, satisfait, détendu, relaxé et complaisant durant la tâche ?", 
      "question" : "Dans quelle mesure vous êtes-vous senti peu sûr de vous, découragé, irrité, stressé et agacé durant cette tâche ?",
      "reference" : "Cela fait référence à votre ressenti durant la tâche, entre insécurité et frustration d’un côté, et confiance et détente de l’autre.",
      "scale" : "(faible/élevée)",
      "upper" : "Élevée",
      "lower" : "Faible",
      "note" : "",
    },
  }
}

export default NASATLX_FR;
