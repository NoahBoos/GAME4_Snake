import '../css/style.css';
import '../css/game.css';

import {Terrain} from "./class/Terrain.js";
import {Snake} from "./class/Snake/Snake.js";
import {Strawberry} from "./class/SweetFruit/Strawberry.js";
import {StartRAF, StopRAF} from "./requestAnimationFrame.js";
import {PlayerAccount} from "./class/Player/PlayerAccount.js";
import {
    GenerateObstacleBorder,
    GenerateReversedUObstacle,
    GenerateTObstacle,
    GenerateUObstacle
} from "./class/Obstacle/ObstaclePattern.js";
import {CreateRandomFood, GetRandomCoordinatesWithConstraint} from "./utils.js";
import {CELL_SIZE, obstaclesOrigin} from "./global.js";
import {PlaceObstacleRandomly} from "./class/Obstacle/ObstacleUtils.js";

const player = new PlayerAccount("Rift");

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let terrain = new Terrain(context, 35, 35);
terrain.DrawTerrain();

let snake = new Snake(document, context, player, terrain, 80, 100);
snake.segments[0].DrawSegment();

StartRAF(0, snake);

GenerateObstacleBorder(context, terrain);
PlaceObstacleRandomly(context, terrain);
CreateRandomFood(context, player, terrain);
CreateRandomFood(context, player, terrain);
CreateRandomFood(context, player, terrain);

// Reload button

const reloadButton = document.getElementById('button__reload');

reloadButton.addEventListener('click', (e) => {
    StopRAF(context, terrain);
    terrain = null;
    terrain = new Terrain(context, 35, 35);
    terrain.DrawTerrain();

    snake = null;
    snake = new Snake(document, context, player, terrain, 80, 100);
    snake.segments[0].DrawSegment();

    StartRAF(0, snake);

    PlaceObstacleRandomly(context, terrain);
    GenerateObstacleBorder(context, terrain);
    CreateRandomFood(context, player, terrain);
    CreateRandomFood(context, player, terrain);
    CreateRandomFood(context, player, terrain);
})

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