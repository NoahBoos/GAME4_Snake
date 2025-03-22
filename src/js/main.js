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
import {Strawberry} from "./class/SweetFruit/Strawberry.js";
import {StartRAF} from "./requestAnimationFrame.js";
import {PlayerAccount} from "./class/Player/PlayerAccount.js";
import {GenerateTObstacle, GenerateUObstacle} from "./class/Obstacle/ObstacleTemplate.js";

const player = new PlayerAccount("Rift");

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const terrain = new Terrain(context, 50, 35);
terrain.DrawTerrain();

const snake = new Snake(document, context, player, terrain, 40, 100);
snake.segments[0].DrawSegment();

StartRAF(0, snake);

GenerateUObstacle(context, terrain);
GenerateUObstacle(context, terrain);
GenerateTObstacle(context, terrain);
const strawberry = new Strawberry(context, terrain);

// ASIDE HTML ELEMENTS

const aside = document.getElementById('container__aside');

const h1 = document.createElement("h1");
h1.textContent = "Bienvenue, " + player.username + " !";
aside.appendChild(h1);
const h2 = document.createElement("h2");
h2.id = "levelTextualIndicator";
h2.textContent = "Niveau " + player.accountLevel + " - " + player.accountExp + " / " + player.accountExpThreshold + " Exp.";
aside.appendChild(h2);

// Progress bar
const progressBar = document.createElement("div");
progressBar.id = "progressBar";
progressBar.className = "progressBar";
const progressBarValue = document.createElement("div");
progressBarValue.id = "progressBarValue";
progressBarValue.className = "progressBarValue";
progressBar.appendChild(progressBarValue);
aside.appendChild(progressBar);

player.UpdateExperienceUI();