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

    "instructions" : "L'évaluation que vous êtes sur le point d'effectuer est une technique qui a été développée par la NASA pour évaluer l'importance relative de six facteurs dans la détermination de la charge de travail que vous avez ressentie lors de l'exécution d'une tâche que vous avez récemment effectuée.",
    "instructionsContinued" : "Les six facteurs sont définis à la page suivante. Lisez-les pour vous assurer que vous comprenez la signification de chaque facteur. Si vous avez des questions, n'hésitez pas à les poser à votre administrateur.",

    "pairwiseInstructions" : "Une série de paires de facteurs de l'échelle d'évaluation va vous être présentée : chaque paire apparaîtra sur un écran séparé.",
    "pairwiseInstructionsContinued" : "Pour chaque paire, choisissez le facteur qui a été le plus important pour votre expérience de la charge de travail dans la tâche que vous avez récemment effectuée.",
    "tapFactorPrompt" : "Choisissez ci-dessous le facteur qui contribue le plus à la charge de travail pour la tâche spécifique que vous avez récemment effectuée.",

    "ratingScales1" : "Une série d'échelles d'évaluation va vous être présentée.",
    "ratingScales2" : "Pour chacune des six échelles, évaluez la tâche que vous avez récemment effectuée en appuyant sur l'emplacement de l'échelle qui correspond à votre expérience. Chaque ligne comporte deux descripteurs d'extrémité qui décrivent l'échelle.",
    "ratingScales3" : "Examinez soigneusement vos réponses en distinguant les différentes conditions de la tâche, et considérez chaque échelle individuellement.",

    "tapScalePrompt" : "Choisissez votre réponse sur l’échelle ci-dessous.",

    "finished1" : "Vous avez terminé l’évaluation. Un résumé de vos réponses est présenté ci-dessous pour révision. Vous pouvez choisir n’importe quelle réponse pour revenir à la question correspondante et modifier votre réponse.",
    "finished2" : "Si vous êtes prêt à soumettre vos réponses, choisissez  Terminer.",
    "ratingsSummary" : "Résumé des échelles d’évaluation",

    "finish" : "Terminer",
  }, 
  "factors" : {
    "MD" : 
    {
      "name": "Exigence mentale", 
      "definition" : "Quelle activité mentale et perceptive était requise (par exemple, penser, décider, calculer, se souvenir, regarder, chercher, etc.) La tâche était-elle facile ou exigeante, simple ou complexe, indulgente ou exigeante ?", 
      "question" : "Quel degré d'activité mentale était exigé pour réaliser la tâche ?",
      "reference" : "Cela fait référence à la quantité d’activité mentale et perceptive requise pour accomplir la tâche.",
      "scale" : "(faible/élevée)",
      "upper" : "Élevée",
      "lower" : "Faible",
      "note" : "",
    }, 

    "PD" : 
    {
      "name" : "Exigence physique", 
      "definition" : "Quelle quantité d’activité physique était requise (par exemple, pousser, tirer, tourner, contrôler, activer, etc.) La tâche était-elle facile ou exigeante, lente ou rapide, détendue ou exténuante, reposante ou laborieuse ?", 
      "question" : "Quel degré d'activité physique était exigé pour réaliser la tâche ?",
      "reference" : "Cela fait référence à la quantité d’activité physique requise pour accomplir la tâche.",
      "scale" : "(faible/élevée)",
      "upper" : "Élevée",
      "lower" : "Faible",
      "note" : "",
    },

    "TD" : 
    {
      "name" : "Exigence temporelle", 
      "definition" : "Quelle pression temporelle avez-vous ressentie en raison de la vitesse ou du rythme auquel les tâches ou les éléments de la tâche se sont déroulés ? Le rythme était-il lent et tranquille ou rapide et effréné ?", 
      "question" : "Quelle pression temporelle avez-vous ressentie pour réaliser la tâche?",
      "reference" : "Cela fait référence à la pression temporelle ressentie en raison de la vitesse ou du rythme auquel les tâches ou les éléments de la tâche se sont déroulés (rythme lent et tranquille ou rapide et effréné).",
      "scale" : "(faible/élevée)",
      "upper" : "Élevée",
      "lower" : "Faible",
      "note" : "",
    },

    "P" : 
    {
      "name" : "Performance", 
      "definition" : "Dans quelle mesure pensez-vous avoir réussi à atteindre les objectifs de la tâche fixés par l’expérimentateur (ou vous-même) ? Dans quelle mesure avez-vous été satisfait de votre performance dans l’accomplissement de ces objectifs ? ", 
      "question" : "Avec quel succès pensez-vous avoir réalisé la tâche ?",
      "reference" : "Cela fait référence à la réussite perçue dans l’atteinte des objectifs fixés par l’expérimentateur (ou vous-même) et à la satisfaction ressentie quant à la performance dans l’accomplissement de ces objectifs.",
      "scale" : "(bonne/mauvaise)",
      "upper" : "Mauvaise",
      "lower" : "Bonne",
      "note" : "Notez que l’emplacement des extrémités est inversé avant de répondre.",
    },

    "E" : 
    {
      "name" : "Effort", 
      "definition" : "Dans quelle mesure avez-vous dû travailler (mentalement et physiquement) pour atteindre votre niveau de performance ?", 
      "question" : "Quel effort deviez-vous fournir pour accomplir la tâche ?",
      "reference" : "Cela fait référence à l’intensité des efforts (mentaux et physiques) nécessaires pour atteindre votre niveau de performance.",
      "scale" : "(faible/élevé)",
      "upper" : "Élevé",
      "lower" : "Faible",
      "note" : "",
    },

    "F" : 
    {
      "name" : "Niveau de frustration", 
      "definition" : "Dans quelle mesure avez-vous ressenti de l’insécurité, du découragement, de l’irritation, du stress et de l’agacement par rapport à de la sécurité, de la satisfaction, du contentement, de la détente et de la complaisance pendant la tâche ?", 
      "question" : "Avez-vous ressenti, durant la tâche, de l'insécurité, du découragement, de l'irritation, du stress ou de l'agacement?",
      "reference" : "Cela fait référence à votre ressenti de l’insécurité, du découragement, de l’irritation, du stress et de l’agacement par rapport à de la sécurité, de la satisfaction, du contentement, de la détente et de la complaisance pendant la tâche.",
      "scale" : "(faible/élevée)",
      "upper" : "Élevée",
      "lower" : "Faible",
      "note" : "",
    },
  }
}

export default NASATLX_FR;
