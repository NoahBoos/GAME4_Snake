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
     *
     * @param document
     * @param context
     * @param player
     * @param terrain
     * @param coordinateX
     * @param coordinateY
     * @param color
     * @constructor
     */
    constructor(document, context, player, terrain, coordinateX, coordinateY, color) {
        this.document = document;
        this.context = context;
        this.player = player;
        this.terrain = terrain;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.color = color;

        this.head = new Segment(this.context, this.coordinateX, this.coordinateY, this.color);
        this.segments = new Array;
        this.segments.push(this.head);
        this.segments[0].DrawSegment();

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
     *
     * @param newHeadCoordinateX
     * @param newHeadCoordinateY
     */
    MoveSnakeSegments(newHeadCoordinateX, newHeadCoordinateY) {
        if (IsThereSegmentAt(this.segments, newHeadCoordinateX, newHeadCoordinateY)) {
            // return;
            StopRAF();
        } else {
            for (let i = this.segments.length - 1; i >= 0; i--) {
                if (i === 0) {
                    // Voir "Code Review #1 - Snake" avec GPT.
                    if (this.segments.length === 1) {
                        this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                    }

                    // En lien avec miamer
                    let newPositionCellData = this.terrain.ReadTerrainCell(newHeadCoordinateX / CELL_SIZE, newHeadCoordinateY / CELL_SIZE);
                    // console.log(newPositionCellData);
                    if (newPositionCellData.type === "food") {
                        this.AddSegment(newPositionCellData.object.segmentsToAdd);
                        this.player.GainExp(newPositionCellData.object.experience);
                        CreateRandomFood(this.context, this.terrain);
                    }

                    this.segments[i].MoveSegment(newHeadCoordinateX, newHeadCoordinateY);
                    this.terrain.WriteTerrainCell(newHeadCoordinateX / CELL_SIZE, newHeadCoordinateY / CELL_SIZE, true, "head");
                } else {
                    let newCoordinateX = this.segments[i-1].coordinateX;
                    let newCoordinateY = this.segments[i-1].coordinateY;

                    if (i === this.segments.length - 1) {
                        this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                        this.terrain.WriteTerrainCell(this.segments[i].coordinateX / CELL_SIZE, this.segments[i].coordinateY / CELL_SIZE, false, "ground");
                    }
                    this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                    this.terrain.WriteTerrainCell(newCoordinateX / CELL_SIZE, newCoordinateY / CELL_SIZE, true, "segment");
                }
            }
        }
    }

    /**
     *
     * @param direction
     */
    MoveSnake(direction) {
        let newHeadCoordinateX = 0;
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
     *
     * @param segmentsToAdd
     */
    AddSegment(segmentsToAdd) {
        for (let i = 0; i < segmentsToAdd; i++) {
            const SEGMENT = new Segment(this.context, 0, 0, GetRandomColor());
            this.segments.push(SEGMENT);
        }
    }
}