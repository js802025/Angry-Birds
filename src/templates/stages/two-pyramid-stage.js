import { LotusBird } from '../../organisms/birds/lotus-bird';
import { ChuckBird } from '../../organisms/birds/chuck-bird';
import { BombBird } from '../../organisms/birds/bomb-bird';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { KingPig } from '../../organisms/pigs/king-pig';
import { WoodSquare } from '../../organisms/obstacles/wood-square';
import { SteelSquare } from '../../organisms/obstacles/steel-square';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
import { Subject } from '../../pages/subject'
import {
    Composites,
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    BIRD_SIZE_CHUCK,
    BIRD_SIZE_BOMB,
    PIG_SIZE_MINION,
    PIG_SIZE_KING,
    GROUND_HEIGHT,
    OBSTACLE_SQUARE_LENGTH,
    GROUND_X,
    GROUND_Y,
    Composite
} from '../../atoms/constants';

class TwoPyramidStage extends Subject {
    constructor() {
        super();
        this.composites = [];
        this.remainingBirds = 3;
        this.score = 0;
        this.isOver = false;
        this.maxScore = 6;

        this.bird = new LotusBird(BIRD_X, BIRD_Y, 20);
        this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(this.bird);
        this.pig1 = new MinionPig(990, 300, PIG_SIZE_MINION);
        this.pig2 = new KingPig(960, 170, PIG_SIZE_KING);
        this.pig3 = new MinionPig(930, 300, PIG_SIZE_MINION);
        this.pig4 = new MinionPig(1050, 300, PIG_SIZE_MINION);
        this.steelSquare1 = new SteelSquare(900, 250, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare2 = new SteelSquare(960, 250, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare3 = new SteelSquare(1020, 250, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.pyramid = Matter.Composites.pyramid(840, 400, 5, 5, 0, 0, function (x, y) {
            let box = new WoodSquare(x, y, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
            return box.getBody()
        });
        this.flyingBird = this.bird;

        document.getElementById('rb-stage3').style.display = "flex";
        document.getElementById('rb-stage3-red1').style.display = "flex";
        document.getElementById('rb-stage3-chuck1').style.display = "flex";
        document.getElementById('rb-stage3-bomb1').style.display = "flex";
        document.getElementById("lotus-heading").style.animation = "fade 5s linear";
        document.getElementById("lotus-battlecry").style.animation = "fade 5s linear";

        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground.getBody());
        this.composites.push(this.bird.getBody());
        this.composites.push(this.pig1.getBody());
        this.composites.push(this.pig2.getBody());
        this.composites.push(this.pig3.getBody());
        this.composites.push(this.pig4.getBody());
        this.composites.push(this.steelSquare1.getBody());
        this.composites.push(this.steelSquare2.getBody());
        this.composites.push(this.steelSquare3.getBody());
        this.composites.push(this.pyramid);
    }

    getComposites() {
        return this.composites;
    }

    getStars() {
        if (this.score <= 2) {
            return 1
        } else if (this.score > 2 && this.score < 6) {
            return 2
        } else if (this.score == 6) {
            return 3
        }
    }

    // transmit information to ScoreDisplay
    updateScore(score) {
        this.notifySubscribers('update-score-stage3',
            { remainingBirds: this.remainingBirds },
            { scoreToAdd: score }
        )
        this.score += score
    }



    // control bird firing
    firing(world) {
        let slingshot = this.slingshot;
        let bird = this.bird;
        let newBird;

        if (this.remainingBirds == 3) {
            document.getElementById('rb-stage3-red1').style.display = "none";
            newBird = new LotusBird(BIRD_X, BIRD_Y, 20);
        } else if (this.remainingBirds == 2) {
            document.getElementById('rb-stage3-chuck1').style.display = "none";
            newBird = new LotusBird(BIRD_X, BIRD_Y, 20);
        } else if (this.remainingBirds == 1) {
            document.getElementById('rb-stage3-bomb1').style.display = "none";
        }
        this.remainingBirds -= 1;
        if (this.remainingBirds == 0) {
            slingshot.elastic1.body.bodyB = null;
            slingshot.elastic2.body.bodyB = null;
            Composite.remove(world, slingshot.getLeftElastic());
            Composite.remove(world, slingshot.getRightElastic());
        } else {
            this.bird = newBird;
            bird = this.bird;
            Composite.add(world, bird.getBody());
            slingshot.elastic1.body.bodyB = bird.getBody();
            slingshot.elastic2.body.bodyB = bird.getBody();
        }
    }
}

export { TwoPyramidStage }