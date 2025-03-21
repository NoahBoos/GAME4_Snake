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
         */
        this.scalingFactor = 1.2;
        /**
         * Charge les données du joueur depuis LocalStorage.
         */
        if (localStorage.length > 0) {
            this.LoadFromLocalStorage();
            console.log(this.accountExp);
        }
        // localStorage.clear();
    }

    LoadFromLocalStorage() {
        this.username = localStorage.getItem("username");
        this.accountLevel = parseInt(localStorage.getItem("accountLevel"));
        this.accountExp = parseInt(localStorage.getItem("accountExp"));
        this.accountExpThreshold = parseInt(localStorage.getItem("accountExpThreshold"));
    }

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
        // console.log(this.accountExp);
        // console.log(expToGain);
        this.accountExp += expToGain;
        this.CheckLevelUp();
        this.UpdateExperienceUI();
        // console.log(this.accountExp);
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
            this.accountExpThreshold = Math.ceil(this.accountExpThreshold * this.scalingFactor);
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
}