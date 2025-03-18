import {
    CELL_SIZE
} from "../../global.js";
import {
    Segment
} from "./Segment.js";
import {
    IsThereSegmentAt
} from "../../utils.js";

export class Snake {
    /**
     *
     * @param document
     * @param context
     * @param coordinateX
     * @param coordinateY
     * @param color
     * @constructor
     */
    constructor(document, context, terrain, coordinateX, coordinateY, color) {
        this.document = document;
        this.context = context;
        this.terrain = terrain;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.color = color;

        this.head = new Segment(this.context, this.coordinateX, this.coordinateY, this.color);
        this.segments = new Array;
        this.segments.push(this.head);
        this.segments[0].DrawSegment();

        // TEST
        for (let i = 0; i <= 3; i++) {
            // console.log(i);
            let index = i + 1;
            // console.log(index);
            let moveIndex = 20 * -index;
            // console.log(moveIndex);
            let segment = new Segment(this.context, this.coordinateX, this.coordinateY + (moveIndex), "#ffe01B")
            this.segments.push(segment);
            this.segments[i+1].DrawSegment();
        }
        // console.log(this.segments);
        // ENDTEST

        this.document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case 'z':
                    this.MoveSnake(0);
                    break;
                case 's':
                    this.MoveSnake(1);
                    break;
                case 'q':
                    this.MoveSnake(2);
                    break;
                case 'd':
                    this.MoveSnake(3);
                    break;
            }
        })
    }

    MoveSnakeSegments(newHeadCoordinateX, newHeadCoordinateY) {
        if (IsThereSegmentAt(this.segments, newHeadCoordinateX, newHeadCoordinateY)) {
            return;
        } else {
            for (let i = this.segments.length - 1; i >= 0; i--) {
                if (i === 0) {
                    if (this.segments.length === 1) {
                        this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                    }
                    this.segments[i].MoveSegment(newHeadCoordinateX, newHeadCoordinateY);
                } else {
                    let newCoordinateX = this.segments[i-1].coordinateX;
                    let newCoordinateY = this.segments[i-1].coordinateY;

                    if (i === this.segments.length - 1) {
                        this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                    }
                    this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                }
            }
        }
    }

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

    AddSegment() {

    }
}