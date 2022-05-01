//dom
const cover = document.querySelector(".cover");
const joinPageBtn = document.querySelector(".joinPageBtn");
const arrow = document.querySelector(".arrow");
const join = document.querySelector(".join");
const joinBox = document.querySelector(".joinbox");
const joinTitle = document.querySelector(".joinTitle");

let isFold = true;
pwBox = document.querySelector(".pw");
pw_chBox = document.querySelector(".pw_ch");
joinBtn = document.querySelector(".joinBtn");

//functions 
function init() {

	//페이지로딩하며화면 전환
	cover.style.opacity = 0;
	setTimeout(() => {
		cover.style.display = 'none';
	}, 2500);

}

function unfoldJoin() {
	//조인 화면 키우기 
	joinPageBtn.style.width = 500 + 'px';
	arrow.style.transform = "rotate( 180deg )";	
	arrow.style.left = 0;
	arrow.style.marginLeft= "10px";
	arrow.style.fontSize = '130%';
	
	//요소들 에니메이션 
	join.style.width = '350px';
	join.style.opacity = 1;
	
	isFold = false;
	console.log("isfold: ", isFold);
}


function foldJoin() {
	//조인 화면 줄이
	joinPageBtn.style.width = 25 + 'px';
	arrow.style.transform = "rotate( -180deg )";	
	arrow.style.left = 0;
	arrow.style.marginLeft= "0px";
	arrow.style.fontSize = '100%';
	
	//요소들 에니메이션 
	join.style.width = '10px';
	join.style.opacity = 0;
	
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


joinBtn.addEventListener("click", () => {
	const pw = pwBox.value;
	const pw_ch = pw_chBox.value;
	
	if(pw != pw_ch) {
		alert("비밀번호가 일치하지 않습니다.");
	}
});

init();


