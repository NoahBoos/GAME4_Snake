import {
    movementIndex
} from "./global.js";

// Identification du timer
let animationTimer = 0;
let startTime = 0;
// Fréquence d'affichage maximum
// const maxFPS = 60;
const moveSnakeSpeed = 15;
const interval = 1000 / moveSnakeSpeed;

// Fonction permettant de démarrer l'animation
export function StartRAF(timestamp = 0, snake) {
    animationTimer = requestAnimationFrame((t) => StartRAF(t, snake));
    if (startTime === 0) {
        startTime = timestamp;
    }
    let delta = timestamp - startTime;
    if (delta >= interval) {
        snake.MoveSnake(movementIndex);
        startTime = timestamp - (delta % interval);
    }
}

// Fonction permettant d'arrêter l'animation
export function StopRAF() {
    cancelAnimationFrame(animationTimer);
    animationTimer = 0;
}