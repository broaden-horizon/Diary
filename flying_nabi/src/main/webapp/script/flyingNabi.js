
export class Nabi { 
	constructor(moveDelay) {
		//나비 꾸미
		this.butterfly = document.createElement("img");
		this.butterfly.classList.add("nabi");
		this.butterfly.src = "/img/butterfly.png";
		this.butterfly.style.height = '100px';
		this.butterfly.style.width = '100px';
		this.butterfly.style.transform = "scaleX(-1)";
		this.butterfly.style.animation = "moveUpDown 3s infinite";
		this.butterfly.style.margin = '0';
		this.butterfly.style.padding = '0';
		document.body.appendChild(this.butterfly);
		
		
		this.moveStyle = document.createElement("style");
		this.moveStyle.innerText = "@keyframes moveUpDown {0% {margin-top: -5px;	} 50% {margin-top: 5px;} 100% {margin-top: -5px}} .nabi {position: fixed; left: 150px; top: 50px;}";
		document.head.appendChild(this.moveStyle);
		
		
		//variables
		this.mouse_x = this.butterfly.getBoundingClientRect().left;
		this.mouse_y = this.butterfly.getBoundingClientRect().top;
		this.img_x = this.butterfly.getBoundingClientRect().left;
		this.img_y = this.butterfly.getBoundingClientRect().top;
		
		this.dest_x = 0;
		this.dest_y = 0;
		this.dest_size = null;
		this.destFunc = null;
		
		this.move_interval = null;
		
		document.addEventListener("mousemove", (e) => {
			this.mouse_x = e.pageX;
			this.mouse_y = e.pageY;
		})
		
		//움직임 시작
		setTimeout(() => {
			this.move_interval = setInterval(this.move.bind(this), 50);
		}, moveDelay);
		
		 
		
	}	
	
	move() {
		//마우스 위치와 이미지 위치 사이 어딘가로 이미지의 위치 변경
		this.img_x = this.butterfly.getBoundingClientRect().left;
		this.img_y = this.butterfly.getBoundingClientRect().top;
		
		this.butterfly.style.left = (this.img_x + ((this.mouse_x - this.img_x)/25)) + 'px';
		this.butterfly.style.top = (this.img_y + ((this.mouse_y - this.img_y)/25)) + 'px';
		if(this.destFunc != null) {
			this.checkDestination();
		}
		
	}
	//목표지정
	setTarget(size, x, y) {
		this.dest_x = x;
		this.dest_y = y;
		this.dest_size = size;
	}
	
	//목표 도달 시 작동할 함수 세팅
	setDestFunc(destFunc) {
		this.destFunc = destFunc;
	}
	
	//목표 시각화
	showTarget(size, x, y) {
		this.target = document.createElement("div");
		document.body.appendChild(this.target);
		this.target.style.left = x != null ? x + "px" :"0";
		this.target.style.top = y != null ? y + "px" :"0";
		this.target.style.height = size + 'px';
		this.target.style.width = size + 'px';
		this.target.style.border = "1px solid red";
		this.target.style.padding = '0';
		this.target.style.margin = '0';
		this.target.style.position = 'fixed';
		this.target.style.display = 'block';
		this.target.classList.add('target');
		document.addEventListener("click", (e) => {
			this.target.style.left = e.pageX + "px";
			this.target.style.top = e.pageY + "px";
			document.querySelector('.target').innerText = "x: " + e.pageX + ", y: " + e.pageY;
		});
		
	}

	//목표 좌표 도착 확인
	checkDestination() {
		if(this.img_x >= this.dest_x && this.img_x <= this.dest_x + this.dest_size) {
			if(this.img_y >= this.dest_y && this.img_y <= this.dest_y + this.dest_size) {
	
				clearInterval(this.move_interval);
				this.destFunc();
			}
		}
	}
}
export function fadeInOut(inOut) {
	const cover = document.querySelector('.cover');
	if(inOut == 'in') {
		cover.style.opacity = 0;
		setTimeout(() => {cover.classList.toggle('d-none')}, 1900);
	} else {
		cover.classList.toggle('d-none');
		setTimeout(() => {cover.style.opacity = 1}, 0);
	}
}


