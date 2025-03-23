import {Strawberry} from "../SweetFruit/Strawberry.js";
import {Grape} from "../SweetFruit/Grape.js";
import {Lemon} from "../SourFruit/Lemon.js";
import {Lime} from "../SourFruit/Lime.js";
import {Mango} from "../SweetFruit/Mango.js";
import {RedApple} from "../SweetFruit/RedApple.js";
import {Peach} from "../SweetFruit/Peach.js";
import {Blueberry} from "../SourFruit/Blueberry.js";
import {Tangerine} from "../SourFruit/Tangerine.js";
import {Melon} from "../SweetFruit/Melon.js";
import {Banana} from "../SweetFruit/Banana.js";

export class PlayerAccount {
    /**
     * Le constructeur de la classe Segment.
     * @param {string} username - Le nom d'utilisateur du joueur.
     * @constructor
     */
    constructor(username) {
        this.username = username;
        this.accountLevel = 1;
        this.accountExp = 0;
        /**
         * @type {number} - accountExpThreshold
         * Le nombre de points d'expériences à obtenir avant de passer au niveau supérieur.
         */
        this.accountExpThreshold = 100;
        /**
         * @type {number} - scalingFactor
         * Facteur d'accroissement du total de points d'expériences à obtenir avant de passer au niveau supérieur.
         * @legacy
         */
        this.scalingFactor = 1.2;
        /**
         * Charge les données du joueur depuis LocalStorage.
         */
        if (localStorage.length > 0) {
            this.LoadFromLocalStorage();
        }
        /**
         * @type {Array} - availableFruits
         * Une array contenant les fruits disponibles pour le joueur.
         */
        this.availableFruits = [
            Strawberry
        ];
        /**
         * Appel de méthodes.
         */
        console.log(this.availableFruits);
        this.SetAvailableFruit();
    }

    /**
     * Charge des données depuis l'API LocalStorage.
     */
    LoadFromLocalStorage() {
        this.username = localStorage.getItem("username");
        this.accountLevel = parseInt(localStorage.getItem("accountLevel"));
        this.accountExp = parseInt(localStorage.getItem("accountExp"));
        this.accountExpThreshold = parseInt(localStorage.getItem("accountExpThreshold"));
    }

    /**
     * Sauvegarde des données dans l'API LocalStorage.
     */
    SaveToLocalStorage() {
        localStorage.setItem("username", this.username);
        localStorage.setItem("accountLevel", this.accountLevel.toString());
        localStorage.setItem("accountExp", this.accountExp.toString());
        localStorage.setItem("accountExpThreshold", this.accountExpThreshold.toString());
    }

    /**
     * Ajoute de l'expérience au compteur d'expérience du joueur.
     * Modifie les interfaces liées à l'affichage de l'expérience.
     * @param {number} expToGain - L'expérience à ajouter au compteur d'expérience.
     */
    GainExp(expToGain) {
        /**
         * Met à jour l'expérience et le niveau du joueur.
         */
        this.accountExp += expToGain;
        this.CheckLevelUp();
        this.UpdateExperienceUI();
    }

    /**
     * Vérifie si l'utilisateur possède assez de points d'expériences pour monter de niveau.
     * Soustrait le nombre de points d'expériences necéssaire à la montée de niveau au nombre de points d'expériences du compte.
     * Augmente le niveau de l'utilisateur.
     * Détermine le nouveau nombre de points d'expériences à obtenir avant une montée de niveau.
     */
    CheckLevelUp() {
        while (this.accountExp >= this.accountExpThreshold) {
            this.accountExp -= this.accountExpThreshold;
            this.accountLevel++;
            this.accountExpThreshold = Math.ceil(this.accountExpThreshold + 100);
        }
    }

    /**
     * Met à jour les compteurs de points d'expériences de l'interface utilisateur.
     */
    UpdateExperienceUI() {
        /**
         * @type {number} xpPercentage
         * Le pourcentage d'expérience par rapport à la somme d'expérience nécessaire à la montée de niveau.
         */
        const xpPercentage = (this.accountExp / this.accountExpThreshold) * 100;
        /**
         * @type {HTMLElement} levelTextualIndicator
         * Un indicateur textuel du niveau. Il est mis à jour sous la forme "Niveau X - XXX/XXX Exp.".
         */
        const levelTextualIndicator = document.getElementById("levelTextualIndicator");
        levelTextualIndicator.textContent = "Niveau " + this.accountLevel + " - " + this.accountExp + " / " + this.accountExpThreshold + " Exp.";
        const progressBarValue = document.getElementById("progressBarValue");
        progressBarValue.style.width = xpPercentage + "%";
    }

    /**
     * Permet de mettre à jour les fruits disponibles pour le serpent à partir du niveau du joueur.
     */
    SetAvailableFruit() {
        switch (true) {
            case this.accountLevel >= 2:
                this.availableFruits.push(Grape);
                break;
            case this.accountLevel >= 3:
                this.availableFruits.push(Lemon);
                break;
            case this.accountLevel >= 5:
                this.availableFruits.push(Peach);
                break;
            case this.accountLevel >= 7:
                this.availableFruits.push(Blueberry);
                break;
            case this.accountLevel >= 10:
                this.availableFruits.push(Mango);
                break;
            case this.accountLevel >= 12:
                this.availableFruits.push(Tangerine);
                break;
            case this.accountLevel >= 14:
                this.availableFruits.push(Melon);
                break;
            case this.accountLevel >= 15:
                this.availableFruits.push(Lime);
                break;
            case this.accountLevel >= 17:
                this.availableFruits.push(Banana);
                break;
            case this.accountLevel >= 20:
                this.availableFruits.push(RedApple);
                break;
            case this.accountLevel >= 25:
                break;
        }
    }
}