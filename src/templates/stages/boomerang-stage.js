import { EyeballBird } from '../../organisms/birds/eyeball-bird';
import { CorporalPig } from '../../organisms/pigs/corporal-pig';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
import { SteelSquare } from '../../organisms/obstacles/steel-square';
import { Subject } from '../../pages/subject'
import {
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_HAL,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y,
    OBSTACLE_SQUARE_LENGTH,
    PIG_SIZE_CORPORAL,
    Composite
} from '../../atoms/constants';

class BoomerangStage extends Subject {
    constructor() {
        super();
        this.composites = [];
        this.remainingBirds = 3;
        this.score = 0
        this.maxScore = 2;

        this.bird = new EyeballBird(BIRD_X, BIRD_Y, 20);
        this.ground1 = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(this.bird);
        this.pig = new CorporalPig(800, 480, PIG_SIZE_CORPORAL);

        this.steelSquare1 = new SteelSquare(600, 540, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare2 = new SteelSquare(600, 480, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare3 = new SteelSquare(600, 420, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare4 = new SteelSquare(800, 540, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);


        document.getElementById('rb-stage4').style.display = "flex";
        document.getElementById('rb-stage4-hal1').style.display = "flex";
        document.getElementById('rb-stage4-hal2').style.display = "flex";
        document.getElementById('rb-stage4-hal3').style.display = "flex";
        document.getElementById("cyclop-heading").style.animation = "fade 5s linear";
        document.getElementById("cyclop-battlecry").style.animation = "fade 5s linear";

        this.flyingBird = this.bird;
        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground1.getBody());
        this.composites.push(this.bird.getBody());
        this.composites.push(this.pig.getBody());

        this.composites.push(this.steelSquare1.getBody());
        this.composites.push(this.steelSquare2.getBody());
        this.composites.push(this.steelSquare3.getBody());
        this.composites.push(this.steelSquare4.getBody());
    }

    getComposites() {
        return this.composites;
    }

    // transmit information to ScoreDisplay
    updateScore(score) {
        this.notifySubscribers('update-score-stage4',
            { remainingBirds: this.remainingBirds },
            { scoreToAdd: score }
        )
        this.score += score
    }

    getStars() {
        if (this.score == 2) {
            return 3
        } else {
            return 0
        }
    }

    // control bird firing
    firing(world) {
        let slingshot = this.slingshot;
        let bird = this.bird;
        let newBird;

        if (this.remainingBirds == 3) {
            document.getElementById('rb-stage4-hal1').style.display = "none";
            newBird = new EyeballBird(BIRD_X, BIRD_Y, 20);
        } else if (this.remainingBirds == 2) {
            document.getElementById('rb-stage4-hal2').style.display = "none";
            newBird = new EyeballBird(BIRD_X, BIRD_Y, 20);
        } else if (this.remainingBirds == 1) {
            document.getElementById('rb-stage4-hal3').style.display = "none";
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

export { BoomerangStage }