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
import { GoldBird } from '../../organisms/birds/gold-bird';
import { SwordBird } from '../../organisms/birds/sword-bird';


class IthacaStage extends Subject {
    constructor() {
        super();
        this.composites = [];
        this.remainingBirds = 3;
        this.score = 0;
        this.maxScore = 3;
        this.isOver = false;
        this.highScore = window.localStorage.getItem("stage14") || 0

        this.bird = new SwordBird(BIRD_X, BIRD_Y, 15);
        this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(this.bird);
        
        this.steelSquare = new SteelSquare(800, 600, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare1 = new SteelSquare(860, 600, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare2 = new SteelSquare(920, 600, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare3 = new SteelSquare(800, 420, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare4 = new SteelSquare(860, 420, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare5 = new SteelSquare(920, 420, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare6 = new SteelSquare(800, 240, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare7 = new SteelSquare(860, 240, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare8 = new SteelSquare(920, 240, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare9 = new SteelSquare(800, 60, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare10 = new SteelSquare(860, 60, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.steelSquare11 = new SteelSquare(920, 60, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare = new WoodSquare(800, 480, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare1 = new WoodSquare(920, 480, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare2 = new WoodSquare(800, 540, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare3 = new WoodSquare(920, 540, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare4 = new WoodSquare(800, 300, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare5 = new WoodSquare(920, 300, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare6 = new WoodSquare(800, 360, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare7 = new WoodSquare(920, 360, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare8 = new WoodSquare(800, 120, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare9 = new WoodSquare(920, 120, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare10 = new WoodSquare(800, 180, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.woodSquare11 = new WoodSquare(920, 180, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH)
        this.pig1 = new KingPig(860, 540, PIG_SIZE_KING)
        this.pig2 = new KingPig(860, 360, PIG_SIZE_KING)
        this.pig3 = new KingPig(860, 180, PIG_SIZE_KING)

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
        this.composites.push(this.steelSquare6.getBody())
        this.composites.push(this.steelSquare7.getBody())
        this.composites.push(this.steelSquare8.getBody());
        this.composites.push(this.steelSquare9.getBody());
        this.composites.push(this.steelSquare10.getBody());
        this.composites.push(this.steelSquare11.getBody())
        this.composites.push(this.woodSquare.getBody())
        this.composites.push(this.woodSquare1.getBody())
        this.composites.push(this.woodSquare2.getBody())
        this.composites.push(this.woodSquare3.getBody())
        this.composites.push(this.woodSquare4.getBody())
        this.composites.push(this.woodSquare5.getBody())
        this.composites.push(this.woodSquare6.getBody())
        this.composites.push(this.woodSquare7.getBody())
        this.composites.push(this.woodSquare8.getBody())
        this.composites.push(this.woodSquare9.getBody())
        this.composites.push(this.woodSquare10.getBody())
        this.composites.push(this.woodSquare11.getBody())
      
        this.composites.push(this.pig1.getBody());
        this.composites.push(this.pig2.getBody());
        this.composites.push(this.pig3.getBody());

        
        document.getElementById('rb-stage14').style.display = "flex";
        document.getElementById('rb-stage14-red1').style.display = "flex";
        document.getElementById('rb-stage14-red2').style.display = "flex";
        document.getElementById('rb-stage14-red3').style.display = "flex";
        document.getElementById("ithaca-heading").style.animation = "fade 5s linear";
        document.getElementById("ithaca-battlecry").style.animation = "fade 5s linear";

        this.flyingBird = this.bird;
    }

    getComposites() {
        return this.composites;
    }

    checkHighScore() {
        if (this.getStars() > this.highScore) {
            this.highScore = this.getStars();
            window.localStorage.setItem("stage14", this.score)
            var stars = ""
            for (var i = 0; i<this.getStars(); i++) {
                if (i == 2){
                stars += "⭐️"
                } else {
                    stars += "⭐️ "
                }
            }
            document.getElementById('score14').innerHTML = `high record : `+stars;
            document.getElementById('stage14-star').innerHTML = stars;
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
            document.getElementById('rb-stage14-red1').style.display = "none";
        } else if (this.remainingBirds == 2) {
            document.getElementById('rb-stage14-red2').style.display = "none";
        } else if (this.remainingBirds == 1) {
            document.getElementById('rb-stage14-red3').style.display = "none";
        }
        this.remainingBirds -= 1;
        if (this.remainingBirds == 0) {
            slingshot.elastic1.body.bodyB = null;
            slingshot.elastic2.body.bodyB = null;
            Composite.remove(world, slingshot.getLeftElastic());
            Composite.remove(world, slingshot.getRightElastic());
        } else {
            let newBird = new SwordBird(BIRD_X, BIRD_Y, 15);
            this.bird = newBird;
            bird = this.bird;
            Composite.add(world, bird.getBody());
            slingshot.elastic1.body.bodyB = bird.getBody();
            slingshot.elastic2.body.bodyB = bird.getBody();
        }
    }
}

export { IthacaStage }