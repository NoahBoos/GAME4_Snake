import {GetRandomCoordinates} from "../../utils.js";
import {CELL_SIZE} from "../../global.js";

/**
 *
 */
export class Food {
    /**
     *
     * @param context
     * @param terrain
     * @param color
     * @param experience
     * @param segmentsToAdd
     * @constructor
     */
    constructor(context, terrain, color, experience, segmentsToAdd) {
        this.context = context;
        this.terrain = terrain;
        this.coordinateX = 0;
        this.coordinateY = 0;
        this.color = color;
        this.experience = experience;
        this.segmentsToAdd = segmentsToAdd;
    }

    /**
     *
     */
    DrawFood() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.coordinateX, this.coordinateY, CELL_SIZE, CELL_SIZE);
    }

    /**
     *
     */
    WriteFoodCell() {
        this.terrain.WriteTerrainCell(this.coordinateX / CELL_SIZE, this.coordinateY / CELL_SIZE, true, "food", this);
    }

    /**
     *
     */
    DefineCoordinates() {
        const TERRAIN = this.terrain;
        let newCoordinates;
        let terrainCellToCoordinates;

        do {
            newCoordinates = GetRandomCoordinates(
                TERRAIN.terrainWidth,
                TERRAIN.terrainHeight
            );
            terrainCellToCoordinates = TERRAIN.ReadTerrainCell(newCoordinates.coordinateX, newCoordinates.coordinateY);
        } while (terrainCellToCoordinates.isOccupied === true);

        this.coordinateX = newCoordinates.coordinateX * CELL_SIZE;
        this.coordinateY = newCoordinates.coordinateY * CELL_SIZE;
    }
}