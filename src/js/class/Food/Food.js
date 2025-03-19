import {GetRandomCoordinates} from "../../utils.js";

export class Food {
    constructor(context, terrain, color, experience, segmentsToAdd) {
        this.context = context;
        this.terrain = terrain;
        this.coordinateX = 0;
        this.coordinateY = 0;
        this.color = color;
        this.experience = experience;
        this.segmentsToAdd = segmentsToAdd;
    }

    DefineCoordinates() {
        const TERRAIN = this.terrain;
        console.log("DefineCoordinate has been called.");
        let newCoordinates;
        let terrainCellToCoordinates;

        do {
            newCoordinates = GetRandomCoordinates(
                TERRAIN.terrainWidth,
                TERRAIN.terrainHeight
            );
            terrainCellToCoordinates = TERRAIN.ReadTerrainCell(newCoordinates.coordinateX, newCoordinates.coordinateY);
        } while (terrainCellToCoordinates.isOccupied === true);
    }
}