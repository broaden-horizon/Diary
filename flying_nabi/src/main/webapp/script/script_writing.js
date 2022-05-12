//dom

const leftBtn = document.querySelector(".leftBtn");
const rightBtn = document.querySelector(".rightBtn");

//functions
let leftLeftBox = null;
let leftBox = null;
let middleBox = document.querySelector(".record-0");
let rightBox = null;
let rightRightBox = null;
let fullSize = null;
let currentNum = 0;

function init() {
	middleBox.classList.toggle("d-none");
	middleBox.classList.toggle("start-100");	
	middleBox.classList.toggle("start-50");
	bigger(middleBox);
	middleBox.style.zIndex = 300;
	
	if(document.querySelector(".record-1")) {
		rightBox = document.querySelector(".record-1");
		rightBox.classList.toggle("d-none");
		rightBox.style.opacity = 0.7;
	}
	if(document.querySelector(".record-2")) {
		rightRightBox = document.querySelector(".record-2");
	}
}


function moveLeft(size) {
	fullSize = size - 1;
	if(currentNum >= 1) {
		//zindex 변경
		middleBox.style.zIndex = 0;
		leftBox.style.zIndex = 300;
		//오른 사라짐
		gone(rightBox);
		
		//가운데 오늘쪽으로 옮겨짐
		middleBox.classList.toggle("start-50");
		middleBox.classList.toggle("start-100");
		
		//가운데 작아짐
		smaller(middleBox);
		
		//왼쪽이 가운데로 옮겨짐
		leftBox.classList.toggle("start-0");
		leftBox.classList.toggle("start-50");
		
		//왼쪽이 커짐
		bigger(leftBox);
		
		//왼왼쪽이 생겨남
		popUp(leftLeftBox);
		
		//변수 재배치
		rightRightBox = rightBox;
		rightBox = middleBox;
		middleBox = leftBox;
		leftBox = leftLeftBox;
		if(currentNum - 3 >= 0) {
			leftLeftBox = document.querySelector(".record-" + (currentNum - 3));
		} else {
			leftLeftBox = null;
		}
		console.log(leftLeftBox);
		currentNum -= 1;
	
	}
}



function moveRight(size) {
	fullSize = size-1;
	if(currentNum < fullSize) {
		//zindex 변경
		middleBox.style.zIndex = 0;
		rightBox.style.zIndex = 300;
		//왼쪽 사라짐
		gone(leftBox);
		
		//가운데 왼쪽으로 옮겨짐
		middleBox.classList.toggle("start-50");
		middleBox.classList.toggle("start-0");
		
		//가운데 작아짐
		smaller(middleBox);
		
		//오른쪽이 가운데로 옮겨짐
		rightBox.classList.toggle("start-100");
		rightBox.classList.toggle("start-50");
		
		//오른쪽이 커짐
		bigger(rightBox);
		
		//오른오른쪽이 생겨남
		popUp(rightRightBox);
		
		//변수 재배치
		leftLeftBox = leftBox;
		leftBox = middleBox;
		middleBox = rightBox;
		rightBox = rightRightBox;
		if(currentNum + 3 <= fullSize) {
			rightRightBox = document.querySelector(".record-" + (currentNum + 3));
		} else {
			rightRightBox = null;
		}
		currentNum += 1;
	}
	
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
	if(target) {
		target.style.opacity = 0;
		setTimeout(() => {
			target.classList.toggle("d-none");
		}, 500);
	}
}

function popUp(target) {
	if(target) {
		target.classList.toggle("d-none");
		setTimeout(() => {
			target.style.opacity = 0.7;
		}, 20);
	}
}


init();