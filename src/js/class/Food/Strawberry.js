import {
    Food
} from "./Food.js";

export class Strawberry extends Food {
    static color = "#FF0000";
    static experience = 5;
    static segmentsToAdd = 1;

    constructor(context, terrain) {
        super(
            context,
            terrain,
            Strawberry.color,
            Strawberry.experience,
            Strawberry.segmentsToAdd
        );

        this.DefineCoordinates();
        this.DrawFood();
        console.log(this);
    }
}