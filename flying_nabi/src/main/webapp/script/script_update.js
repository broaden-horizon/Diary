//import {fadeInOut, Nabi} from './flyingNabi.js'
//fadeInOut("in");
//new Nabi();

//dom
const emotionRange = document.querySelector(".emotionRange");
const emotionScore = document.querySelector(".emotionScore");

//functions


//event handlers
emotionRange.addEventListener('input', (e) => {
	emotionScore.innerHTML = "(" + e.target.value + "점)";
})
