/**
 * @type {number} CELL_SIZE
 * La taille d'une cellule. Puisqu'une cellule est nécessairement carrée, on n'entrepose qu'une valeur.
 */
export const CELL_SIZE = 20;
/**
 * @type {number} movementIndex
 * L'index de mouvement déterminant la direction du serpent.
 * - -1 : Statique, le serpent ne bougera pas.
 * - 0 : Le serpent ira de l'avant (en-haut).
 * - 1 : Le serpent ira de l'arrière (en-bas).
 * - 2 : Le serpent ira vers sa droite.
 * - 3 : Le serpent ira vers sa gauche.
 */
export let movementIndex = -1;
/**
 * Met à jour l'index de mouvement.
 * @param {number} newMovementIndex - L'index de mouvement déterminant la direction du serpent.
 */
export function MovementIndex(newMovementIndex) {
    movementIndex = newMovementIndex;
}
/**
 * @type {*[]} obstaclesOrigin
 * Permet de stocker les origines des obstacles générés sur le terrain.
 */
export let obstaclesOrigin = new Array;