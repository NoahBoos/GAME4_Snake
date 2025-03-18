import {
    CELL_SIZE
} from "../../global.js";
import {
    Segment
} from "./Segment.js";

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

        this.head = new Segment(this.context, this.terrain, this.coordinateX, this.coordinateY, this.color);
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
            let segment = new Segment(this.context, this.terrain, this.coordinateX, this.coordinateY + (moveIndex), "#ffe01B")
            this.segments.push(segment);
            this.segments[i+1].DrawSegment();
        }
        console.log(this.segments);
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

    MoveSnake(direction) {
        switch (direction) {
            case 0:
                for (let i = this.segments.length - 1; i >= 0; i--) {
                    if (i === 0) {
                        let newCoordinateX = this.segments[i].coordinateX;
                        let newCoordinateY = this.segments[i].coordinateY - CELL_SIZE;

                        if (this.segments.length === 1) {
                            this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                        }

                        this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                    } else {
                        // console.log(i);
                        // console.log(this.segments[i], this.segments[i-1]);
                        let newCoordinateX = this.segments[i-1].coordinateX;
                        let newCoordinateY = this.segments[i-1].coordinateY;
                        // console.log("NEW" + newCoordinateX + "; " + newCoordinateY);
                        if (i === this.segments.length - 1) {
                            this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                        }
                        this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                    }
                }
                break;
            case 1:
                for (let i = this.segments.length - 1; i >= 0; i--) {
                    if (i === 0) {
                        let newCoordinateX = this.segments[i].coordinateX;
                        let newCoordinateY = this.segments[i].coordinateY + CELL_SIZE;

                        if (this.segments.length === 1) {
                            this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                        }

                        this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                    } else {
                        // console.log(i);
                        // console.log(this.segments[i], this.segments[i-1]);
                        let newCoordinateX = this.segments[i-1].coordinateX;
                        let newCoordinateY = this.segments[i-1].coordinateY;
                        // console.log("NEW" + newCoordinateX + "; " + newCoordinateY);
                        if (i === this.segments.length - 1) {
                            this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                        }
                        this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                    }
                }
                break;
            case 2:
                for (let i = this.segments.length - 1; i >= 0; i--) {
                    if (i === 0) {
                        let newCoordinateX = this.segments[i].coordinateX - CELL_SIZE;
                        let newCoordinateY = this.segments[i].coordinateY;

                        if (this.segments.length === 1) {
                            this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                        }

                        this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                    } else {
                        // console.log(i);
                        // console.log(this.segments[i], this.segments[i-1]);
                        let newCoordinateX = this.segments[i-1].coordinateX;
                        let newCoordinateY = this.segments[i-1].coordinateY;
                        // console.log("NEW" + newCoordinateX + "; " + newCoordinateY);
                        if (i === this.segments.length - 1) {
                            this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                        }
                        this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                    }
                }
                break;
            case 3:
                for (let i = this.segments.length - 1; i >= 0; i--) {
                    if (i === 0) {
                        let newCoordinateX = this.segments[i].coordinateX + CELL_SIZE;
                        let newCoordinateY = this.segments[i].coordinateY;

                        if (this.segments.length === 1) {
                            this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                        }

                        this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                    } else {
                        // console.log(i);
                        // console.log(this.segments[i], this.segments[i-1]);
                        let newCoordinateX = this.segments[i-1].coordinateX;
                        let newCoordinateY = this.segments[i-1].coordinateY;
                        // console.log("NEW" + newCoordinateX + "; " + newCoordinateY);
                        if (i === this.segments.length - 1) {
                            this.terrain.DrawTerrainCell(this.segments[i].coordinateX, this.segments[i].coordinateY);
                        }
                        this.segments[i].MoveSegment(newCoordinateX, newCoordinateY);
                    }
                }
                break;
        }
    }

    AddSegment() {

    }
}