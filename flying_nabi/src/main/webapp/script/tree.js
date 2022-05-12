export class tree {
	constructor(startX, startY, _depth, _level, _nowDeg, _ctx, _thick) {
		this.x = startX;
		this.y = startY;
		this.depth = _depth;
		this.nowDeg = _nowDeg;
		this.level = _level; //밑둥부터 시작한 단계(층)
		this.ctx = _ctx;
		this.nowLen = this.randLen();
		this.branches = [];
		this.growingSpeed = 20;
		this.thick = this.level === 1 ? this.nextThick() * 1.2 : _thick;

		//도착 좌표 계산
		this._x = this.level === 1 ? this.x : Math.floor(this.x + this.nowLen * this.cos(this.nowDeg));
		this._y = this.level === 1 ? this.y - this.nowLen : Math.floor(this.y - this.nowLen * this.sin(this.nowDeg));

		
		//나무 그리기 위한 변수들
  		this.gap_x = (this._x - this.x) / this.growingSpeed;
  		this.gap_y = (this._y - this.y) / this.growingSpeed;
  		this.current_x = this.x + this.gap_x;
  		this.current_y = this.y + this.gap_y;
  		
  		this.current_thick = this.thick;
  		this.next_thick = this.nextThick();
  		this.gap_thick = (this.thick - this.next_thick) / this.growingSpeed;
  		
  		this.cnt = 0;
  		this.animation = null;
		 			
		this.draw();
	}
	
	draw() {
		
		this.ctx.strokeStyle = "#2e572e";
		this.ctx.fillStyle = "#2e572e";
		this.ctx.lineCap = "round";
		
		this.ctx.beginPath();
	
	    this.ctx.moveTo(this.x, this.y); 
	    this.ctx.lineTo(this.current_x, this.current_y); 
	    this.ctx.lineWidth = this.current_thick; 
	    
	    this.ctx.stroke();
	    this.ctx.closePath();
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
		return Math.floor(document.querySelector(".treeBox").clientHeight * 0.04 * Math.pow(1.2, this.depth - this.level + 1) * this.randBtw(0.5, 1));
	}
	
	nextThick() {
		if(this.depth - this.level + 1 <= 2) {
			return 0.5 * Math.pow(1.2, this.depth - this.level + 2);
		} else if(this.depth - this.level <= 5) {
			return 1.5 * Math.pow(1.2, this.depth - this.level + 2);
		} else {
			return 2.5 * Math.pow(1.2, this.depth - this.level + 2);
		}
	}
	
	nextDeg() {
		this.randDeg = null;
		while(true) {
			this.randDeg = this.randBtw(50, 130);
			if(this.randDeg < 80 || this.randDeg > 100) {
				return this.nowDeg - 90 + Math.floor(this.randDeg);
			}
		}
	}

	//나무가지 랜덤 개수
	randBranch() {
		if(this.depth - this.level < 3) {
			if(Math.random() > 0.7) {
				return 1;
			}
			return 2;
		} else if(this.level  <= 2) {
			if(Math.random() > 0.5) {
				return 2;
			}
			return 3;			
		} else {
			if(Math.random() > 0.6) {
				return 1;
			}
			return 2;
		}
	}
	
	randBtw(x, y) {
		return (x + Math.random()*(y - x));
	}
	
	//나뭇가지 생성
	createBranch() {
		const BranchNum = this.randBranch();
		if(this.depth <= this.level) {
			return null;
		}
		
		for(let i = 0; i < BranchNum; i++) {
			if(i === 0){
				this.branches.push(new tree(this._x, this._y, this.depth, this.level + 1, this.nowDeg, this.ctx, this.next_thick));
			}
			if(this.depth - 1 != this.level) {
				this.branches.push(new tree(this._x, this._y, this.depth - 1, this.level + 1, this.nextDeg(), this.ctx, this.next_thick));	
			}
			
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