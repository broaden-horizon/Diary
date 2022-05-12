import {fadeInOut, Nabi} from "./flyingNabi.js"
import {App} from "./app.js"

new Nabi(100);
new App(28);
document.addEventListener("DOMContentLoaded", function(){
 fadeInOut('in');
});

document.querySelector('.btn').addEventListener("click", () => {
	fadeInOut('out');
	setTimeout(() => {location.href = '/login.jsp'}, 1900);
})