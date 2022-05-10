//dom

const leftBtn = document.querySelector(".leftBtn");
const rightBtn = document.querySelector(".rightBtn");

let leftLeftBox = null;
let leftBox = null;
let middleBox = document.querySelector(".record-1");
let rightBox = null;
let rightRightBox = null;



function moveLeft(size) {
	
}


////////gone 함수 null 값이 들어가도 되는 가?
function moveRight(size) {
	//왼쪽에 있는 것이 사라짐
	if(leftBox) {
		gone(leftBox);
	}
	//가운데 있는 것이 왼쪽으로 옮겨짐
	middleBox.style.opacity = 0.7;
	middleBox.classList.toggle("start-50");
	middleBox.classList.toggle("start-0");
	middleBox.style.width = '42vw';
	middleBox.style.height = '55vh';
	middleBox.childNodes[1].childNodes[11].style.height = '30%';
	
	
}

function smaller(target) {
	target.style.opacity = 0.7;
	target.style.width = '42vw';
	target.style.height = '55vh';
	target.childNodes[1].childNodes[11].style.height = '30%';
}

function bigger(target) {
	target.style.opacity = 1;
	target.style.width = '50vw';
	target.style.height = '65vh';
	target.childNodes[1].childNodes[11].style.height = '20vh';
}

function gone(target) {
	target.style.opacity = 0;
	setTimeout(() => {
		target.classList.toggle("d-none");
	}, 500);
}

function alive(target) {
	target.classList.toggle("d-none");
	setTimeout(() => {
		target.style.opacity = 1;
	}, 20);
}

function init() {
	middleBox.classList.toggle("d-none");
	middleBox.style.opacity = 1;
	middleBox.classList.toggle("start-100");	
	middleBox.classList.toggle("start-50");
	middleBox.style.width = '50vw';
	middleBox.style.height = '65vh';
	middleBox.childNodes[1].childNodes[11].style.height = '20vh';
	
	if(document.querySelector(".record-2")) {
		rightBox = document.querySelector(".record-2");
		rightBox.classList.toggle("d-none");
		rightBox.style.opacity = 0.7;
	}
	if(document.querySelector(".record-3")) {
		rightRightBox = document.querySelector(".record-3");
	}
}

init();