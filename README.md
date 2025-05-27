# Haptic Experience Inventory (HXI) Online Questionnaire

The [Haptic Experience Inventory (HXI)]("https://get-hxi.org/") is the first standardized questionnaire measuring Haptic Experience (HX). This project provides an online version of the questionnaire built with [Create React App](https://github.com/facebook/create-react-app) and hosted with GitHub Pages (GitHub Actions).

## Haptic Experience Inventory (HXI)

The HXI is built around five core factors that represent distinct aspects of the haptic experience: Autotelics, Realism, Harmony, Discord, Involvement. Each factor captures a dimension of how users perceive and evaluate haptic interactions, contributing to a more nuanced understanding of the haptic experience.

Factors are captured by an individual's responses to 20 statements using a 7-point Likert scale. 

## How this online questionnaire works

The questionnaire administrator should enter the language of choice (English or French), the participant's ID number, the trial number and the haptic case (specific to the SonoNurse VR haptic project but can be updated to match any haptic conditions as needed). Starting the questionnaire shows the instructions for the participant to read and understand.

The HXI items are shown in shuffled randomized order. Factor scores and the general score are automatically calculated from an individual's responses to the 20 statements. 

`General Score = Autotelics + Involvement + Realism + Harmony + ( 8 − Discord )`

See [Haptic Experience Inventory (HXI) webpage]("https://get-hxi.org/") for more details on how the scores are calculated.


The following information is collected and sent to a Google Sheet file using Google App Scripts :
- ParticipantID
- Trial number	
- HapticCase	
- Language	
- Date and time	the responses were sent
- Users' response to each statements
- Order of the statements
- Factor scores (Autotelics, Involvement, Realism, Discord, Harmony)
- Global HXI Score		


## Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More About Create React App

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
