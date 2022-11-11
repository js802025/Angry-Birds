import { WindBird } from '../../organisms/birds/wind-bird';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
import { SteelSquare } from '../../organisms/obstacles/steel-square';
import { Subject } from '../../pages/subject'
import {
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    PIG_SIZE_MINION,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y,
    OBSTACLE_SQUARE_LENGTH,
    Composite
} from '../../atoms/constants';
import { IceSquare } from '../../organisms/obstacles/ice-square';


class AeolianStage extends Subject {
    constructor() {
        super();
        this.composites = [];
        this.remainingBirds = 3;
        this.score = 0;
        this.maxScore = 3;
        this.isOver = false;

        this.bird = new WindBird(BIRD_X, BIRD_Y, 20);
        this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(this.bird);
        this.pig = new MinionPig(1000, 440, PIG_SIZE_MINION);
        this.pig1 = new MinionPig(1060, 380, PIG_SIZE_MINION);
        this.pig2 = new MinionPig(1120, 440, PIG_SIZE_MINION);
        this.steelSquare1 = new SteelSquare(1000, 500, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare2 = new SteelSquare(1060, 500, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare3 = new SteelSquare(1120, 500, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.iceSquare = new IceSquare(1060, 440, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);


        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground.getBody());
        this.composites.push(this.bird.getBody());
        this.composites.push(this.pig.getBody());
        this.composites.push(this.pig1.getBody());
        this.composites.push(this.pig2.getBody());
        this.composites.push(this.steelSquare1.getBody());
        this.composites.push(this.steelSquare2.getBody());
        this.composites.push(this.steelSquare3.getBody());
        this.composites.push(this.iceSquare.getBody());
        
        document.getElementById('rb-stage5').style.display = "flex";
        document.getElementById('rb-stage5-red1').style.display = "flex";
        document.getElementById('rb-stage5-red2').style.display = "flex";
        document.getElementById('rb-stage5-red3').style.display = "flex";
        document.getElementById("aeolian-heading").style.animation = "fade 5s linear";
        document.getElementById("aeolian-battlecry").style.animation = "fade 5s linear";

        this.flyingBird = this.bird;
    }

    getComposites() {
        return this.composites;
    }

    // transmit information to ScoreDisplay
    updateScore(score) {
        this.notifySubscribers('update-score-stage5',
            { remainingBirds: this.remainingBirds },
            { scoreToAdd: score }
        )
        this.score += score;
        console.log("SCORE"+this.score)
    }

    getStars() {
        return this.score
    }

    // control bird firing
    firing(world) {
        let slingshot = this.slingshot;
        let bird = this.bird;

        if (this.remainingBirds == 3) {
            document.getElementById('rb-stage5-red1').style.display = "none";
        } else if (this.remainingBirds == 2) {
            document.getElementById('rb-stage5-red2').style.display = "none";
        } else if (this.remainingBirds == 1) {
            document.getElementById('rb-stage5-red3').style.display = "none";
        }
        this.remainingBirds -= 1;
        if (this.remainingBirds == 0) {
            slingshot.elastic1.body.bodyB = null;
            slingshot.elastic2.body.bodyB = null;
            Composite.remove(world, slingshot.getLeftElastic());
            Composite.remove(world, slingshot.getRightElastic());
        } else {
            let newBird = new WindBird(BIRD_X, BIRD_Y, 20);
            this.bird = newBird;
            bird = this.bird;
            Composite.add(world, bird.getBody());
            slingshot.elastic1.body.bodyB = bird.getBody();
            slingshot.elastic2.body.bodyB = bird.getBody();
        }
    }
}

export { AeolianStage }