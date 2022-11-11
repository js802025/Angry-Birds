import { Bird } from '../../molecules/bird';

class CowBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = 'https://github.com/js802025/Angry-Birds/raw/main/data/birds/cow.png';
        this.body.render.sprite.xScale = 0.05;
        this.body.render.sprite.yScale = 0.05;
    };

    // red bird ability
    ability() {
        if (this.isAbility) {
            console.log("I'm cute!!")
            this.isAbility = false;
        }
    }
}

export { CowBird };