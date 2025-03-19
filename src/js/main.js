import '../css/style.css';
import '../css/game.css';

import {
    Terrain
} from "./class/Terrain.js";
import {
    Snake
} from "./class/Snake/Snake.js";
import {
    GetRandomColor, GetRandomCoordinates
} from "./utils.js";
import {Strawberry} from "./class/Food/Strawberry.js";
import {StartRAF} from "./requestAnimationFrame.js";
import {PlayerAccount} from "./class/Player/PlayerAccount.js";

const player = new PlayerAccount("Rift");

// Display level
// document.addEventListener("keydown", (event) => {
//     if (event.key === "Enter") {
//         console.log(player);
//     }
// })

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const terrain = new Terrain(context, 30, 30);
terrain.DrawTerrain();

const snake = new Snake(document, context, player, terrain, 40, 100, GetRandomColor());
snake.segments[0].DrawSegment();

StartRAF(0, snake);

const strawberry = new Strawberry(context, terrain);

// ASIDE HTML ELEMENTS

const aside = document.getElementById('container__aside');

const h1 = document.createElement("h1");
h1.textContent = "Bienvenue, " + player.username + " !";
aside.appendChild(h1);
const h2 = document.createElement("h2");
h2.id = "levelTextualIndicator";
// h2.textContent = "Niveau de compte";
h2.textContent = "Niveau " + player.accountLevel + " - " + player.accountExp + " / " + player.accountExpThreshold + " Exp.";
aside.appendChild(h2);

// Progress paragraph
// const progressParagraph = document.createElement("p");
// progressParagraph.textContent = "Niveau " + player.accountLevel + " - " + player.accountExp + " / " + player.accountExpThreshold + " Exp.";
// aside.appendChild(progressParagraph);

// Progress bar
const progressBar = document.createElement("div");
progressBar.id = "progressBar";
progressBar.className = "progressBar";
const progressBarValue = document.createElement("div");
progressBarValue.id = "progressBarValue";
progressBarValue.className = "progressBarValue";
progressBar.appendChild(progressBarValue);
aside.appendChild(progressBar);
