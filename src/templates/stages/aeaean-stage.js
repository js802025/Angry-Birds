
import { KingPig } from '../../organisms/pigs/king-pig';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
import { SteelSquare } from '../../organisms/obstacles/steel-square';
import { Subject } from '../../pages/subject'
import {
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    PIG_SIZE_KING,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y,
    OBSTACLE_SQUARE_LENGTH,
    Composite,
    PIG_SIZE_MINION
} from '../../atoms/constants';
import { WoodSquare } from '../../organisms/obstacles/wood-square';
import { PotionBird } from '../../organisms/birds/potion-bird';
import { Pig } from '../../molecules/pig';
import { MinionPig } from '../../organisms/pigs/minion-pig';


class AeaeanStage extends Subject {
    constructor() {
        super();
        this.composites = [];
        this.remainingBirds = 3;
        this.score = 0;
        this.maxScore = 1;
        this.isOver = false;
        this.highScore = window.localStorage.getItem("stage7") || 0

        this.bird = new PotionBird(BIRD_X, BIRD_Y, 15);
        this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(this.bird);
        this.pig1 = new MinionPig(1000, 465, PIG_SIZE_MINION);
        this.pig2 = new MinionPig(1120, 240, PIG_SIZE_MINION);
        this.pig3 = new MinionPig(900, 540, PIG_SIZE_MINION)
        this.steelSquare = new SteelSquare(1000, 525, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare1 = new SteelSquare(1120, 300, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare2 = new SteelSquare(900, 600, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground.getBody());
        this.composites.push(this.bird.getBody());
        this.composites.push(this.pig1.getBody());
        this.composites.push(this.pig2.getBody());
        this.composites.push(this.pig3.getBody());
        this.composites.push(this.steelSquare.getBody());
        this.composites.push(this.steelSquare1.getBody());
        this.composites.push(this.steelSquare2.getBody());
        
        document.getElementById('rb-stage7').style.display = "flex";
        document.getElementById('rb-stage7-red1').style.display = "flex";
        document.getElementById('rb-stage7-red2').style.display = "flex";
        document.getElementById('rb-stage7-red3').style.display = "flex";
        document.getElementById("aeaean-heading").style.animation = "fade 5s linear";
        document.getElementById("aeaean-battlecry").style.animation = "fade 5s linear";

        this.flyingBird = this.bird;
    }

    getComposites() {
        return this.composites;
    }

    checkHighScore() {
        if (this.getStars() > this.highScore) {
            this.highScore = this.getStars();
            window.localStorage.setItem("stage7", this.score)
            var stars = ""
            for (var i = 0; i<this.getStars(); i++) {
                if (i == 2){
                stars += "⭐️"
                } else {
                    stars += "⭐️ "
                }
            }
            document.getElementById('score7').innerHTML = `high record : `+stars;
            document.getElementById('stage7-star').innerHTML = stars;
        }
    }

    // transmit information to ScoreDisplay
    updateScore(score) {
        // this.notifySubscribers('update-score-stage1',
        //     { remainingBirds: this.remainingBirds },
        //     { scoreToAdd: score }
        // )
        this.score += score;
        this.checkHighScore();
    }

    getStars() {
        return this.score
    }

    // control bird firing
    firing(world) {
        let slingshot = this.slingshot;
        let bird = this.bird;

        if (this.remainingBirds == 3) {
            document.getElementById('rb-stage7-red1').style.display = "none";
        } else if (this.remainingBirds == 2) {
            document.getElementById('rb-stage7-red2').style.display = "none";
        } else if (this.remainingBirds == 1) {
            document.getElementById('rb-stage7-red3').style.display = "none";
        }
        this.remainingBirds -= 1;
        if (this.remainingBirds == 0) {
            slingshot.elastic1.body.bodyB = null;
            slingshot.elastic2.body.bodyB = null;
            Composite.remove(world, slingshot.getLeftElastic());
            Composite.remove(world, slingshot.getRightElastic());
        } else {
            let newBird = new PotionBird(BIRD_X, BIRD_Y, 15);
            this.bird = newBird;
            bird = this.bird;
            Composite.add(world, bird.getBody());
            slingshot.elastic1.body.bodyB = bird.getBody();
            slingshot.elastic2.body.bodyB = bird.getBody();
        }
    }
}

export { AeaeanStage }