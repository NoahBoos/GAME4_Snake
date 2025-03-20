import {
    CELL_SIZE, MovementIndex, movementIndex
} from "../../global.js";
import {
    Segment
} from "./Segment.js";
import {
    CreateRandomFood,
    GetRandomColor,
    IsThereSegmentAt
} from "../../utils.js";
import {
    StopRAF
} from "../../requestAnimationFrame.js";

export class Snake {
    /**
     * Le constructeur de la classe Snake.
     * @param {Document} document - Document du DOM.
     * @param {CanvasRenderingContext2D} context - Contexte utilisé pour interagir sur le canvas.
     * @param {PlayerAccount} player - Instance de la classe PlayerAccount.
     * @param {Terrain} terrain - Instance de la classe Terrain.
     * @param {number} coordinateX - Coordonnée X de la tête du serpent.
     * @param {number} coordinateY - Coordonnée Y de la tête du serpent.
     * @param {string} color - Couleur de la tête du serpent.
     * @constructor
     */
    constructor(document, context, player, terrain, coordinateX, coordinateY, color) {
        /**
         * Assignation des objets et des variables externes.
         */
        this.document = document;
        this.context = context;
        this.player = player;
        this.terrain = terrain;
        /**
         * Attributs liés à la position et à la couleur du serpent en lui-même.
         */
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.color = color;
        /**
         *  Attributs liés au corps du serpent (Tête et Array contenant les segments du serpent.)
         */
        this.head = new Segment(this.context, this.coordinateX, this.coordinateY, this.color);
        this.segments = new Array;
        this.segments.push(this.head);
        this.segments[0].DrawSegment();
        /**
         * Ajout d'un event listener sur le DOM permettant de récupérer des inputs et déclencher le mouvement du serpent.
         */
        this.document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case 'z':
                    MovementIndex(0);
                    break;
                case 's':
                    MovementIndex(1);
                    break;
                case 'q':
                    MovementIndex(2);
                    break;
                case 'd':
                    MovementIndex(3);
                    break;
            }
        })
    }
    /**
     * Permet de mouvoir les segments du snake. Le comportement diffère selon si le segment à mouvoir est la tête ou une partie du corps.
     * @param {number} newHeadCoordinateX - Nouvelle coordonnée X de la tête.
     * @param {number} newHeadCoordinateY - Nouvelle coordonnée Y de la tête.
     */
    MoveSnakeSegments(newHeadCoordinateX, newHeadCoordinateY) {
        if (IsThereSegmentAt(this.segments, newHeadCoordinateX, newHeadCoordinateY)) {
            StopRAF();
        } else {
            for (let i = this.segments.length - 1; i >= 0; i--) {
                if (i === 0) {
                    /**
                     * Permet de redessiner une cellule de terrain si la tête du serpent est son seul segment.
                     */
                    if (this.segments.length === 1) {
                        this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                    }
                    /**
                     * @type {Object} newPositionCellData
                     * Objet contenant les données de la cellule de terrain où la tête va se déplacer.
                     */
                    let newPositionCellData = this.terrain.ReadTerrainCell(newHeadCoordinateX / CELL_SIZE, newHeadCoordinateY / CELL_SIZE);
                    /**
                     * Si cette cellule est de type "sweetFruit", alors on effectue une série d'actions ;
                     * Sinon, si cette cellule est de type "sourFruit", alors on effectue une autre série d'actions.
                     */
                    if (newPositionCellData.type === "sweetFruit") {
                        this.AddSegment(newPositionCellData.object.segmentsToAdd);
                        this.player.GainExp(newPositionCellData.object.experience);
                        CreateRandomFood(this.context, this.terrain);
                    } else if (newPositionCellData.type === "sourFruit") {
                        this.RemoveSegment(newPositionCellData.object.segmentsToRemove);
                        this.player.GainExp(newPositionCellData.object.experience);
                        CreateRandomFood(this.context, this.terrain);
                    }
                    /**
                     * Redessine la tête du serpent à sa nouvelle position.
                     * Redéfinit également les données de cette cellule :
                     * - isOccupied = true ;
                     * - type = "head" ;
                     * - object = this
                     */
                    this.segments[i].MoveSegment(newHeadCoordinateX, newHeadCoordinateY);
                    this.terrain.WriteTerrainCell(newHeadCoordinateX / CELL_SIZE, newHeadCoordinateY / CELL_SIZE, true, "head", this);
                } else {
                    /**
                     * Définit les coordonnées d'un n comme les coordonnées du segment n-1.
                     * C'est-à-dire qu'un segment aura pour prochaine coordonnée les coordonnées du segment devant lui.
                     */
                    let newCoordinateX = this.segments[i-1].coordinateX;
                    let newCoordinateY = this.segments[i-1].coordinateY;
                    /**
                     * Redessine une cellule de terrain à la précédente position du dernier segment.
                     * Réinitialise également les données de cette cellule :
                     * - isOccupied = false ;
                     * - type = "ground" ;
                     * - object = null
                     */
                    if (i === this.segments.length - 1) {
                        this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                        this.terrain.WriteTerrainCell(this.segments[i].coordinateX / CELL_SIZE, this.segments[i].coordinateY / CELL_SIZE, false, "ground", null);
                    }
                    /**
                     * Redessine un segment à sa nouvelle position (à savoir l'ancienne position de la cellule avant elle dans segments[]).
                     * Redéfinit également les données de cette cellule :
                     * - isOccupied = true ;
                     * - type = "segment" ;
                     * - object = this
                     */
                    this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                    this.terrain.WriteTerrainCell(newCoordinateX / CELL_SIZE, newCoordinateY / CELL_SIZE, true, "segment", this);
                }
            }
        }
    }
    /**
     * Calcule les coordonnées de la tête du serpent (et donc sa direction), avant de lancer MoveSnakeSegments() pour mouvoir le serpent dans son entièreté.
     * @param {number} direction - Variable définissant la direction du mouvement. 0 = Avant ; 1 = Arrière ; 2 = Gauche ; 3 = Droite.
     */
    MoveSnake(direction) {
        /**
         * @type {number} newHeadCoordinateX
         * Nouvelle coordonnée X de la tête du serpent.
         */
        let newHeadCoordinateX = 0;
        /**
         * @type {number} newHeadCoordinateY
         * Nouvelle coordonnée Y de la tête du serpent.
         */
        let newHeadCoordinateY = 0;
        switch (direction) {
            case 0:
                newHeadCoordinateX = this.segments[0].coordinateX;
                newHeadCoordinateY = this.segments[0].coordinateY - CELL_SIZE;
                this.MoveSnakeSegments(newHeadCoordinateX, newHeadCoordinateY);
                break;
            case 1:
                newHeadCoordinateX = this.segments[0].coordinateX;
                newHeadCoordinateY = this.segments[0].coordinateY + CELL_SIZE;
                this.MoveSnakeSegments(newHeadCoordinateX, newHeadCoordinateY);
                break;
            case 2:
                newHeadCoordinateX = this.segments[0].coordinateX - CELL_SIZE;
                newHeadCoordinateY = this.segments[0].coordinateY;
                this.MoveSnakeSegments(newHeadCoordinateX, newHeadCoordinateY);
                break;
            case 3:
                newHeadCoordinateX = this.segments[0].coordinateX + CELL_SIZE;
                newHeadCoordinateY = this.segments[0].coordinateY;
                this.MoveSnakeSegments(newHeadCoordinateX, newHeadCoordinateY);
                break;
        }
    }
    /**
     * Ajoute autant de segments que passés en paramètre au serpent.
     * @param {number} segmentsToAdd - Nombre de segments à ajouter.
     */
    AddSegment(segmentsToAdd) {
        for (let i = 0; i < segmentsToAdd; i++) {
            const SEGMENT = new Segment(this.context, 0, 0, GetRandomColor());
            this.segments.push(SEGMENT);
        }
    }
    /**
     * Retire autant de segments que passés en paramètre au serpent.
     * Redessine également une cellule de terrain par-dessus le segment qui a été retiré.
     * @param {number} segmentsToRemove - Nombre de segments à retirer.
     */
    RemoveSegment(segmentsToRemove) {
        for (let i = 0; i < segmentsToRemove; i++) {
            const SEGMENT_NUMBER = this.segments.length - 1 - i;

            if (SEGMENT_NUMBER === 0) {
                return;
            } else {
                const removedSegmentCoordinateX = this.segments[SEGMENT_NUMBER - 1].coordinateX;
                const removedSegmentCoordinateY = this.segments[SEGMENT_NUMBER - 1].coordinateY;
                this.terrain.DrawTerrainCell(removedSegmentCoordinateX, removedSegmentCoordinateY);
                this.segments.splice(this.segments.length - 1, 1);
            }
        }
    }
}