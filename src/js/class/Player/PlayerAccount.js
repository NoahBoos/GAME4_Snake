export class PlayerAccount {
    constructor(username) {
        this.username = username;
        this.accountLevel = 1;
        this.accountExp = 0;
        this.accountExpThreshold = 100;
        this.scalingFactor = 1.2;
    }

    GainExp(expToGain) {
        this.accountExp += expToGain;
        this.CheckLevelUp();

        const xpPercentage = (this.accountExp / this.accountExpThreshold) * 100;

        const levelTextualIndicator = document.getElementById("levelTextualIndicator");
        levelTextualIndicator.textContent = "Niveau " + this.accountLevel + " - " + this.accountExp + " / " + this.accountExpThreshold + " Exp.";
        const progressBarValue = document.getElementById("progressBarValue");
        progressBarValue.style.width = xpPercentage + "%";
    }

    CheckLevelUp() {
        while (this.accountExp >= this.accountExpThreshold) {
            this.accountExp -= this.accountExpThreshold;
            this.accountLevel++;
            this.accountExpThreshold = Math.ceil(this.accountExpThreshold * this.scalingFactor);
        }
    }
}