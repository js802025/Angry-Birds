import { WineBird } from '../../organisms/birds/wine-bird';
import { ChuckBird } from '../../organisms/birds/chuck-bird';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { CorporalPig } from '../../organisms/pigs/corporal-pig';
import { WoodSquare } from '../../organisms/obstacles/wood-square';
import { IceSquare } from '../../organisms/obstacles/ice-square';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
import { Subject } from '../../pages/subject'

import {
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    BIRD_SIZE_CHUCK,
    PIG_SIZE_MINION,
    PIG_SIZE_CORPORAL,
    GROUND_HEIGHT,
    OBSTACLE_SQUARE_LENGTH,
    GROUND_X,
    GROUND_Y,
    Composite
} from '../../atoms/constants';

class PyramidStage extends Subject {
    constructor() {
        super();
        this.composites = [];
        this.remainingBirds = 3;
        this.isOver = false
        this.score = 0;
        this.maxScore = 4;


        this.bird = new WineBird(BIRD_X, BIRD_Y, 20);
        this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(this.bird);
        this.pig1 = new MinionPig(710, 180, PIG_SIZE_MINION);
        this.pig2 = new MinionPig(650, 180, PIG_SIZE_MINION);
        this.pig3 = new CorporalPig(771, 180, PIG_SIZE_CORPORAL);

        this.pyramid = Matter.Composites.pyramid(500, 200, 7, 7, 0, 0, function (x, y) {
            let box
            if (x == 620 || x == 740) {
                box = new IceSquare(x, y, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
            } else {
                box = new WoodSquare(x, y, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
            }
            return box.getBody()
        });
        document.getElementById('rb-stage2').style.display = "flex";
        document.getElementById('rb-stage2-red1').style.display = "flex";
        document.getElementById('rb-stage2-chuck1').style.display = "flex";
        document.getElementById('rb-stage2-chuck2').style.display = "flex";
        document.getElementById("ismarus-heading").style.animation = "fade 5s linear";

        this.flyingBird = this.bird;

        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground.getBody());
        this.composites.push(this.bird.getBody());
        this.composites.push(this.pig1.getBody());
        this.composites.push(this.pig2.getBody());
        this.composites.push(this.pig3.getBody());
        this.composites.push(this.pyramid);
    }

    getComposites() {
        return this.composites;
    }

    // transmit information to ScoreDisplay
    updateScore(score) {
        this.notifySubscribers('update-score-stage2',
            { remainingBirds: this.remainingBirds },
            { scoreToAdd: score }
        )
        this.score += score
    }

    getStars() {
        console.log("SCORE"+this.score)
        if (this.score == 1) {
            return 1
        } else if (this.score == 2 || this.score == 3) {
            return 2
        } else if (this.score == 4) {
            return 3
        }
    }

    // control bird firing
    firing(world) {
        let slingshot = this.slingshot;
        let bird = this.bird;

        if (this.remainingBirds == 3) {
            document.getElementById('rb-stage2-red1').style.display = "none";
        } else if (this.remainingBirds == 2) {
            document.getElementById('rb-stage2-chuck1').style.display = "none";
        } else if (this.remainingBirds == 1) {
            document.getElementById('rb-stage2-chuck2').style.display = "none";
        }
        this.remainingBirds -= 1;
        if (this.remainingBirds == 0) {
            slingshot.elastic1.body.bodyB = null;
            slingshot.elastic2.body.bodyB = null;
            Composite.remove(world, slingshot.getLeftElastic());
            Composite.remove(world, slingshot.getRightElastic());
        } else {
            let newBird = new WineBird(BIRD_X, BIRD_Y, 20);
            this.bird = newBird;
            bird = this.bird;
            Composite.add(world, bird.getBody());
            slingshot.elastic1.body.bodyB = bird.getBody();
            slingshot.elastic2.body.bodyB = bird.getBody();
        }
    }
}

export { PyramidStage }