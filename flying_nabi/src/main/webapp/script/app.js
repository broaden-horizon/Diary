import {tree} from './tree.js';
const treeBox = document.querySelector(".treeBox");
export class App {
  constructor(points) {
    // 캔버스 생성 후 랜더링
    this.canvas = document.createElement('canvas');
    treeBox.appendChild(this.canvas);

    // context 생성
    this.ctx = this.canvas.getContext('2d');
    // 레티나 디스플레이에서도 제대로 보이기 위해
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
	
	//화면 크기 맞추기 
	this.resize();
	
	// 3포인트마다 한 번씩 성장
	// 성장할 떄마다 depth 는 3, 5, 7, 8, 9, 10으로 성장
	// 총6단계 성장이 끝나면  새로운 나무 추가로 자람
	this.level = Math.floor(points / 3) + 1;
	console.log("level: ", this.level);
	this.trees = [];
	this.levelLeft = this.level;
	for(let i = 0; i < Math.floor((this.level - 1) / 6) + 1; i++) {
		if(this.levelLeft <= 6) {
			this.trees.push(this.levelLeft);
		} else {
			this.trees.push(6);
			this.levelLeft -= 6;
		}	
	}
	console.log("point for each tree: ", this.trees);
	
	for(let i = 0; i < this.trees.length; i++){
		switch(this.trees[i]) {
			case 1:
				this.trees[i] = 3;
				break;
			case 2:
				this.trees[i] = 5;
				break;
			case 3:
				this.trees[i] = 7;
				break;
			case 4:
				this.trees[i] = 8;
				break;
			case 5:
				this.trees[i] = 9;
				break;
			case 6:
				this.trees[i] = 10;
				break;
		}
	}
	console.log("depth: ", this.trees);
	
  	for(let i = 0; i < this.trees.length; i++) {
  		this.DrawingTree = new tree((this.stageWidth / (this.trees.length + 1)) * (i + 1) , this.stageHeight, this.trees[i], 1, 90, this.ctx, null);
	}
  	//화면 크기 변경 될 경우
  	let timer = null;
  	window.addEventListener('resize', () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			this.resize();
			for(let i = 0; i < this.trees.length; i++) {
		  		this.DrawingTree = new tree((this.stageWidth / (this.trees.length + 1)) * (i + 1) , this.stageHeight, this.trees[i], 1, 90, this.ctx, null);
			}
		}, 200);
	}, false);
  }


  resize() {
	  // body의 너비와 높이 저장
	  this.stageWidth = treeBox.clientWidth;
	  this.stageHeight = treeBox.clientHeight;
	  
	  // 디스플레이 비율에 맞추어 캔버스 사이즈와 비율 조정
	  this.canvas.width = this.stageWidth * this.pixelRatio;
	  this.canvas.height = this.stageHeight * this.pixelRatio;
	  this.ctx.scale(this.pixelRatio, this.pixelRatio);
	
	  // 리사이즈시 캔버스를 비워줌
	  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  console.log("resize... canvas size: ", this.stageWidth, this.stageHeight);
  }
  
  randBtw(x, y) {
		return (x + Math.random()*(y - x));
	}
}