//dom
const butterfly = document.querySelector(".butterfly");

//variables

let mouse_x = 0;
let mouse_y = 0;

let img_x = 0;
let img_y = 0;
//functions


function init() {
	//브라우저에 따라 다른 이미지의 위치를 지정
	butterfly.style.left = butterfly.getBoundingClientRect().left + 'px';
	butterfly.style.top = butterfly.getBoundingClientRect().top + 'px';
	
	img_x = butterfly.getBoundingClientRect().left;
	img_y = butterfly.getBoundingClientRect().top;
	
	//초기 마우스 위치 이미지 위치로 지정 
	mouse_x = butterfly.getBoundingClientRect().left;
	mouse_y = butterfly.getBoundingClientRect().top;
}

function move() {
	//마우스 위치와 이미지 위치 사이 어딘가로 이미지의 위치 변경
	img_x = parseInt(butterfly.style.left.replace('px',''));
	img_y = parseInt(butterfly.style.top.replace('px',''));
	
	
	butterfly.style.left = (img_x + ((mouse_x - img_x)/25)) + 'px';
	butterfly.style.top = (img_y + ((mouse_y - img_y)/25)) + 'px';
	
}

//eventlisteners
document.addEventListener("mousemove", (e) => {
	mouse_x = e.pageX;
	mouse_y = e.pageY;
})




init();
setInterval(move, 50);
//setInterval(check, 2000);
