import {fadeInOut, Nabi} from './flyingNabi.js'
//dom
const joinPageBtn = document.querySelector(".joinPageBtn");
const arrow = document.querySelector(".arrow");
const join = document.querySelector(".join");
const joinBox = document.querySelector(".joinbox");
const emailBox = document.querySelector(".email");
const pwBox = document.querySelector(".pw");
const pw_chBox = document.querySelector(".pw_ch");
const joinBtn = document.querySelector(".joinBtn");
const backBtn = document.querySelector(".backBtn");
const loginBtn = document.querySelector(".loginBtn");

//variables
let isFold = true;

//functions 
function unfoldJoin() {
	//조인 화면 키우기 
	joinPageBtn.style.width = '43vw';
	arrow.style.transform = "rotate( 180deg )";	
	arrow.style.left = 0;
	arrow.style.marginLeft= "10px";
	arrow.style.fontSize = '130%';
	joinBox.classList.toggle("d-none");

	setTimeout(() => {
		//요소들 에니메이션 
	join.style.width = '38vw';
	join.style.opacity = 1;	
	join.style.right = 0;	
	}, 0);	
	
	isFold = false;
	console.log("isfold: ", isFold);
}


function foldJoin() {
	//조인 화면 줄이
	joinPageBtn.style.width = 25 + 'px';
	arrow.style.transform = "rotate( 360deg )";	
	arrow.style.left = 0;
	arrow.style.marginLeft= "0px";
	arrow.style.fontSize = '100%';
	
	join.style.width = '10px';
	join.style.opacity = 0;
	
	setTimeout(() => {
		//joinBox 사라
	joinBox.classList.toggle("d-none");		
	}, 500);
	isFold = true;
}



//eventhandlers

joinPageBtn.addEventListener("click", () => {
	console.log("클");
	if(isFold == true) {
		console.log("unfold");
		unfoldJoin();
	} else {
		console.log("fold");
		foldJoin();
		
	}
});

pwBox.addEventListener("blur", (e) => {
	const pw = e.target.value;
	if (pw.length < 6) {
		alert("비밀번호는 6자 이상이어야 합니다.");
	}
});


joinBtn.addEventListener("click", (e) => {
	const pw = pwBox.value;
	const pw_ch = pw_chBox.value;
	const email = emailBox.value;
	
	if(email.length <= 4) {
		alert("아이디는 최소 4자 이상이어야합니다.");
		e.preventDefault();
		emailBox.focus();
	} else if(pw != pw_ch) {
		alert("비밀번호가 일치하지 않습니다.");
		e.preventDefault();
		pw_chBox.focus();
	}
	return true;
});

backBtn.addEventListener("click", () => {
	foldJoin();
})

fadeInOut("in");	
new Nabi(10);


