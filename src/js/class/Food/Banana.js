import {
    Food
} from "./Food.js"

export class Banana extends Food {
    static color = "#FFE01B";
    static experience = 10;
    static segmentsToAdd = 2;

    constructor(context, terrain, coordinateX, coordinateY) {
        super(
            context,
            terrain,
            Banana.color,
            Banana.experience,
            Banana.segmentsToAdd
        );

        this.DefineCoordinates();
        this.DrawFood();

        console.log(this);
    }
}