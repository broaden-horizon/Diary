import {tree} from './tree.js';
const treeBox = document.querySelector(".treeBox");
class App {
  constructor() {
    // 캔버스 생성 후 랜더링
    this.canvas = document.createElement('canvas');
    treeBox.appendChild(this.canvas);

    // context 생성
    this.ctx = this.canvas.getContext('2d');
    // 레티나 디스플레이에서도 제대로 보이기 위해
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
	
	//화면 크기 맞추기 
	this.resize();
	
  	//나무 생성
  	this.DrawingTree = new tree(this.stageWidth - this.stageWidth / 4, this.stageHeight, 8, 1, 90, this.ctx);

  	//화면 크기 변경 될 경우
  	let timer = null;
  	window.addEventListener('resize', () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			this.resize();
			this.DrawingTree = new tree(this.stageWidth - this.stageWidth / 4, this.stageHeight, 8, 1, 90, this.ctx);
		}, 200);
	}, false);
  }

//
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
}


window.onload = () => {
  new App();
}