import {fadeInOut, Nabi} from './flyingNabi.js'


$.datepicker.setDefaults({
  dateFormat: 'yy-mm-dd',
});

$(function(){
    $('.datepicker').datepicker();
})

//dom
const emotionRange = document.querySelector(".emotionRange");
const emotionScore = document.querySelector(".emotionScore");
const recordBtn = document.querySelector(".btn-record");
const searchBtn = document.querySelector(".btn-search");
const buttonBox = document.querySelector(".buttonBox");
const recordBox = document.querySelector(".record_box");
const yearBackBtn = document.querySelector(".yearBackBtn");
const back = document.querySelector(".back");

const yearBox = document.querySelector(".year");

//functions
function goingUpDown(target) {
	if(target.classList.contains('top-50')) {
		target.style.opacity = '0';
		target.classList.toggle("top-50");
		target.classList.toggle("top-100");
		setTimeout(() => {
			target.classList.toggle("d-none");
		}, 500);
	} else {
		target.classList.toggle("d-none");
		setTimeout(() => {
			target.style.opacity = '1';
			target.classList.toggle("top-50");
			target.classList.toggle("top-100");
		},30);
	}
}



//event handlers
emotionRange.addEventListener('input', (e) => {
	emotionScore.innerHTML = "(" + e.target.value + "점)";
})

recordBtn.addEventListener("click", ()=> {
	goingUpDown(buttonBox);
	setTimeout(() => {
		goingUpDown(recordBox);
	}, 500);
}, false)

back.addEventListener("click", ()=> {
	goingUpDown(recordBox);
	setTimeout(() => {
		goingUpDown(buttonBox);
	}, 500);
}, false)

searchBtn.addEventListener("click", () => {
	goingUpDown(buttonBox);
	setTimeout(() => {
		goingUpDown(yearBox);
	}, 500);
}, false)

yearBackBtn.addEventListener("click", () => {
	goingUpDown(yearBox);
	setTimeout(() => {
		goingUpDown(buttonBox);
	}, 500);
}, false)

fadeInOut("in");
new Nabi(0);

