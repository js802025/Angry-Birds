import { RockBird } from '../../organisms/birds/rock-bird';
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
    PIG_SIZE_MINION,
    PIG_SIZE_CORPORAL
} from '../../atoms/constants';
import { WoodSquare } from '../../organisms/obstacles/wood-square';
import { IceSquare } from '../../organisms/obstacles/ice-square';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { CorporalPig } from '../../organisms/pigs/corporal-pig';
import { MusicBird } from '../../organisms/birds/music-bird';
import { WhirlBird } from '../../organisms/birds/whirl-bird';
import { CowBird } from '../../organisms/birds/cow-bird';
import { TearBird } from '../../organisms/birds/tear-bird';


class OgygiaStage extends Subject {
    constructor() {
        super();
        this.composites = [];
        this.remainingBirds = 3;
        this.score = 0;
        this.maxScore = 3;
        this.isOver = false;
        this.highScore = window.localStorage.getItem("stage12") || 0

        this.bird = new TearBird(BIRD_X, BIRD_Y, 15);
        this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(this.bird);
        
        this.steelSquare = new SteelSquare(800, 500, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare1 = new SteelSquare(860, 500, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare2 = new SteelSquare(920, 500, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare3 = new SteelSquare(980, 500, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare4 = new SteelSquare(1040, 500, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare5 = new SteelSquare(920, 380, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
       
        this.iceSquare = new IceSquare(860, 440, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.iceSquare1 = new IceSquare(980, 440, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.pig1 = new CorporalPig(800, 440, PIG_SIZE_CORPORAL)
        this.pig2 = new MinionPig(920, 440, PIG_SIZE_MINION)
        this.pig3 = new MinionPig(920, 320, PIG_SIZE_MINION)

        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground.getBody());
        this.composites.push(this.bird.getBody());
      //  this.composites.push(this.pig.getBody());
        this.composites.push(this.steelSquare.getBody());
        this.composites.push(this.steelSquare1.getBody());
        this.composites.push(this.steelSquare2.getBody());
        this.composites.push(this.steelSquare3.getBody());
        this.composites.push(this.steelSquare4.getBody());
        this.composites.push(this.steelSquare5.getBody());
        this.composites.push(this.iceSquare.getBody())
        this.composites.push(this.iceSquare1.getBody())
      
        this.composites.push(this.pig1.getBody());
        this.composites.push(this.pig2.getBody());
        this.composites.push(this.pig3.getBody());

        
        document.getElementById('rb-stage12').style.display = "flex";
        document.getElementById('rb-stage12-red1').style.display = "flex";
        document.getElementById('rb-stage12-red2').style.display = "flex";
        document.getElementById('rb-stage12-red3').style.display = "flex";
        document.getElementById("ogygia-heading").style.animation = "fade 5s linear";
        document.getElementById("ogygia-battlecry").style.animation = "fade 5s linear";

        this.flyingBird = this.bird;
    }

    getComposites() {
        return this.composites;
    }

    checkHighScore() {
        if (this.getStars() > this.highScore) {
            this.highScore = this.getStars();
            window.localStorage.setItem("stage12", this.score)
            var stars = ""
            for (var i = 0; i<this.getStars(); i++) {
                if (i == 2){
                stars += "⭐️"
                } else {
                    stars += "⭐️ "
                }
            }
            document.getElementById('score12').innerHTML = `high record : `+stars;
            document.getElementById('stage12-star').innerHTML = stars;
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
            document.getElementById('rb-stage12-red1').style.display = "none";
        } else if (this.remainingBirds == 2) {
            document.getElementById('rb-stage12-red2').style.display = "none";
        } else if (this.remainingBirds == 1) {
            document.getElementById('rb-stage12-red3').style.display = "none";
        }
        this.remainingBirds -= 1;
        if (this.remainingBirds == 0) {
            slingshot.elastic1.body.bodyB = null;
            slingshot.elastic2.body.bodyB = null;
            Composite.remove(world, slingshot.getLeftElastic());
            Composite.remove(world, slingshot.getRightElastic());
        } else {
            let newBird = new TearBird(BIRD_X, BIRD_Y, 15);
            this.bird = newBird;
            bird = this.bird;
            Composite.add(world, bird.getBody());
            slingshot.elastic1.body.bodyB = bird.getBody();
            slingshot.elastic2.body.bodyB = bird.getBody();
        }
    }
}

export { OgygiaStage }