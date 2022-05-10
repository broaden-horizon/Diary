export class tree {
	constructor(startX, startY, _depth, _level, _nowDeg, _ctx) {
		this.x = startX;
		this.y = startY;
		this.depth = _depth;
		this.nowDeg = _nowDeg;
		this.level = _level; //밑둥부터 시작한 단계(층)
		this.ctx = _ctx;
		this.nowLen = this.randLen();
		this.thick = document.querySelector(".treeBox").clientHeight * 0.05 * Math.pow(0.65, this.level - 1);
		this.branches = [];
		this.growingSpeed = 20;

		//도착 좌표 계산
		this._x = this.level === 1 ? this.x : Math.floor(this.x + this.nowLen * this.cos(this.nowDeg));
		this._y = this.level === 1 ? this.y - this.nowLen : Math.floor(this.y - this.nowLen * this.sin(this.nowDeg));

		
		//나무 그리기 위한 변수들
  		this.gap_x = (this._x - this.x) / this.growingSpeed;
  		this.gap_y = (this._y - this.y) / this.growingSpeed;
  		this.current_x = this.x + this.gap_x;
  		this.current_y = this.y + this.gap_y;
  		
  		this.current_thick = this.thick;
  		this.next_thick = this.thick * 0.65;
  		this.gap_thick = (this.thick - this.next_thick) / this.growingSpeed;
  		
  		this.cnt = 0;
  		this.animation = null;
		 			
		this.draw();
	}
	
	draw() {
		
		this.ctx.strokeStyle = "black";
		this.ctx.fillStyle = "black";
		this.ctx.lineCap = "round";
		
		this.ctx.beginPath();
	
	    this.ctx.moveTo(this.x, this.y); // 선의 시작 위치 지정
	    this.ctx.lineTo(this.current_x, this.current_y); // 선의 끝 위치 지정
	    this.ctx.lineWidth = this.current_thick; //this.curent_thick;
	    
	    this.ctx.stroke();
	    this.ctx.closePath();
	    //console.log("drawing...", this.x, this.y, this.current_x, this.current_y, this.current_thick);
	    this.current_x += this.gap_x;
	    this.current_y += this.gap_y;
	    this.current_thick -= this.gap_thick;
	    
	    this.cnt += 1;
	  	
	    if(this.cnt === this.growingSpeed) {
			cancelAnimationFrame(this.animation);
			this.createBranch();
			return true;
		}
	    this.animation = requestAnimationFrame(this.draw.bind(this));
	}
	
	//레벨과 창 높이에 따른 길이에 랜덤으로 0.5 ~ 1.5배
	randLen() {
		return Math.floor(document.querySelector(".treeBox").clientHeight * 0.17 * Math.pow(0.80, this.level - 1) * this.randBtw(0.8, 1.2));
	}
	//레벨과 창 너비에 따른 두께에 랜덤으로 0.5 ~ 1.5배
//	randThick() {
//		return Math.floor(document.querySelector(".treeBox").clientWidth * 0.4 * Math.pow(0.65, this.level - 1));
//	}
	//다음 각도는 현재 각도를 기준으로 랜덤 각도(45~135deg)
	nextDeg() {
		return this.nowDeg - 90 + Math.floor(this.randBtw(50, 130));
	}

	//나무가지 랜덤 개수
	randBranch() {
		if(Math.random() > 0.85) {
			return 3;
		}
		return 2;
	}
	
	randBtw(x, y) {
		return (x + Math.random()*(y - x));
	}
	
	//나뭇가지 생성
	createBranch() {
		const BranchNum = this.randBranch();
		if(this.depth === this.level) {
			return null;
		}
		
		for(let i = 0; i < BranchNum; i++) {
			this.branches.push(new tree(this._x, this._y, this.depth, this.level + 1, this.nextDeg(), this.ctx));
		}
	}
	

	//삼각함수 편의성 
	cos(deg) {
		return Math.cos((deg / 180.0) * Math.PI);
	}
	sin(deg) {
		return Math.sin((deg / 180.0) * Math.PI);
	}
	
	
	
	
}