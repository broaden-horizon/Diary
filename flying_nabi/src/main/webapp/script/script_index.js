//dom
const butterfly = document.querySelector(".butterfly");
const cover = document.querySelector(".cover");
const arrow = document.querySelector(".branch_arrow");
const target_ = document.querySelector(".target_");
//variables

let mouse_x = 0;
let mouse_y = 0;

let img_x = 0;
let img_y = 0;

let dest_x = 0;
let dest_y = 0;

let move_interval = null;

//functions


function init() {
	//브라우저에 따라 다른 이미지의 위치를 지정
	butterfly.style.left = '50px';
	butterfly.style.top = butterfly.getBoundingClientRect().top + 'px';
	
	img_x = butterfly.getBoundingClientRect().left;
	img_y = butterfly.getBoundingClientRect().top;
	
	//초기 마우스 위치 이미지 위치로 지정 
	mouse_x = butterfly.getBoundingClientRect().left;
	mouse_y = butterfly.getBoundingClientRect().top;
	
	//페이지로딩하며화면 전환
	cover.style.opacity = 0;
	setTimeout(() => {
		cover.style.diplay = 'none';
	}, 2500);
}

function move() {
	//마우스 위치와 이미지 위치 사이 어딘가로 이미지의 위치 변경
	img_x = parseInt(butterfly.style.left.replace('px',''));
	img_y = parseInt(butterfly.style.top.replace('px',''));
	
	
	butterfly.style.left = (img_x + ((mouse_x - img_x)/25)) + 'px';
	butterfly.style.top = (img_y + ((mouse_y - img_y)/25)) + 'px';
	
	console.log('mouse:', mouse_x, mouse_y);
	checkDestination();
}


function checkDestination() {
	//목표 이미지 좌표 지정(아래 좌표에서 가로 80px 세로 80p씩)
	dest_x = arrow.getBoundingClientRect().left + 175 - 20;
	dest_y = arrow.getBoundingClientRect().top + 65 - 20;
	
	//목표 좌표 visualize
	target_.style.left = dest_x - 20 + 'px';
	target_.style.top = dest_y - 20 + "px";
	
	
	//목표 좌표 도착 확
	if(img_x >= dest_x && img_x <= dest_x + 80) {
		if(img_y >= dest_y && img_y <= dest_y + 80) {
			clearInterval(move_interval);
			//fade-out
			cover.style.display = 'block';
			cover.style.opacity = 1;
			
			//로그인 페이지로 이동
			setTimeout(() => {location.href = "./login.jsp"}, 2500);
		}
	}
	
}
//eventlisteners
document.addEventListener("mousemove", (e) => {
	mouse_x = e.pageX;
	mouse_y = e.pageY;
})





init();
setTimeout(() => {
	move_interval = setInterval(move, 50);
}, 2500); 
