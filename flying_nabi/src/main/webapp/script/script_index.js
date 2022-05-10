import {fadeInOut, Nabi} from "./flyingNabi.js"


//dom
const arrow = document.querySelector(".bi");

const nabi = new Nabi(3000);
//nabi.showTarget(80, arrow.getBoundingClientRect().left, arrow.getBoundingClientRect().top + 60);
nabi.setDestFunc(() => {
	//fade-out
	fadeInOut("out");
	//로그인 페이지로 이동
	setTimeout(() => {location.href = "./login.jsp"}, 2500);
});
nabi.setTarget(80, arrow.getBoundingClientRect().left - 20, arrow.getBoundingClientRect().top + 30);
document.addEventListener("DOMContentLoaded", function(){
 fadeInOut('in');
});

