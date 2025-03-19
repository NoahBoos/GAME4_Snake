import {
    Food
} from "./Food.js"

/**
 *
 */
export class Banana extends Food {
    static color = "#FFE01B";
    static experience = 10;
    static segmentsToAdd = 2;

    /**
     *
     * @param context
     * @param terrain
     * @constructor
     */
    constructor(context, terrain) {
        super(
            context,
            terrain,
            Banana.color,
            Banana.experience,
            Banana.segmentsToAdd
        );

        this.DefineCoordinates();
        this.WriteFoodCell();
        this.DrawFood();

        console.log(this);
    }
}