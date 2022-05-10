//dom
const yearBox = document.querySelector(".year");

//functions
function yearClick(index, ym) {
	//dom 객체 생성
	const monthBox = document.querySelector(".month-"+index);
	let popUp = null;
	let popDown = null;
	
	if(ym==="year") {
		popUp = monthBox;
		popDown = yearBox;
	} else {
		popUp = yearBox;
		popDown = monthBox;
	}
	popUp.classList.toggle("d-none");
	
	setTimeout(() => {
		popUp.classList.toggle("top-50");
		popUp.classList.toggle("top-100");
		popUp.style.opacity = 1;	
	}, 0);
	
	popDown.classList.toggle("top-50");
	popDown.classList.toggle("top-100");
	popDown.style.opacity = 0;
	
	
	setTimeout(() => {
		popDown.classList.toggle("d-none");	
	}, 500);
	
}