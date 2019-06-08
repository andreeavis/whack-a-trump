const scoreBoard = document.querySelector('.score');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const game = document.getElementById("game");

let score = 0;
let lastHole;
let timeUp = false;
let images = ['images/trump1.png', 'images/trump2.png', 'images/trump3.png', 'images/trump4.png', 'images/trump5.png', 'images/trump6.png',];

let modal = document.getElementById('rulesModal');
let modalBtn = document.getElementById('modalBtn');
let closeBtn = document.getElementById('closeBtn');

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

function openModal() {
	modal.style.display = "block";
}

function closeModal() {
	modal.style.display = "none";
}

function startGame() {
	scoreBoard.textContent = 0;
	timeUp = false;
	score = 0;
	peep();

	setTimeout(() => timeUp = true, 20000);
}

function randomTime(min, max) {
	return Math.round(Math.random() * (max-min) + min);
};

function randomHole(holes) {
	
	const index = Math.floor(Math.random() * (holes.length));
	const hole = holes[index];

	if(hole == lastHole) {
		return randomHole(holes); 
	};
	lastHole = hole;
	return hole;
};

function peep() {
	const time = randomTime(1000, 2000);
	const hole = randomHole(holes);
	const image = Math.floor(Math.random() * images.length);
	const imageURL = images[image];

	let allMoles = document.getElementsByClassName("mole");
		for (let i = 0; i < allMoles.length; i++) {
			allMoles[i].style.backgroundImage = `url('${imageURL}')`;
		};
	hole.classList.add('up');

	setTimeout(() => {
		hole.classList.remove('up');
		if(!timeUp) peep();
	}, time);

};

function bonk(e) {
	if(!e.isTrusted) return;
	this.classList.remove('up');

	setTimeout(() => {
		game.style.cursor = "url('images/mallet.png'), auto";	
	}, 100)
	game.style.cursor = "url('images/mallet-hit.png'), auto";
	
	let img = getImage();
	bonkAudio();

	switch(img) {
		case "Trump1":
			score += 200;
			playSound("Trump1");
			break;
		case "Trump2":
			score += 400;
			playSound("Trump2");
		case "Trump3":
			score +=300;
			playSound("Trump3");
		case "Trump4":
			score += 100;
			playSound("Trump4");
		case "Trump5":
			score += 600;
			playSound("Trump5");
		case "Trump6":
			score +- 150;
			playSound("Trump6");
	}
	scoreBoard.textContent = score;
};

moles.forEach(mole => mole.addEventListener('click', bonk));

function getImage() {
	let currentImg = document.getElementsByClassName('mole')[1].style.backgroundImage;
	currentImg = currentImg.slice(4, -1).replace(/"/g, "");

	switch(currentImg) {
		case "images/trump1.png":
			return "Trump1";
			break;
		case "images/trump2.png":
			return "Trump2";
			break;
		case "images/trump3.png":
			return "Trump3";
			break;
		case "images/trump4.png":
			return "Trump4";
			break;
		case "images/trump5.png":
			return "Trump5";
			break;
		case "images/trump6.png":
			return "Trump6";
			break;
}
};

function bonkAudio() {
	let bonkAudio = document.querySelector(`audio[id="bonk"]`);
	if(!bonkAudio) return;

	bonkAudio.play();
}

function playSound(identifier) {
	let audio  = document.querySelector(`audio[id="${identifier}"]`);
	if(!audio) return;

	audio.currentTime = 0;
	audio.play();
}






































