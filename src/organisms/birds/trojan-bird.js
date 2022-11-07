import { Bird } from '../../molecules/bird';

class TrojanBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = '../data/birds/trojan.png';
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

export { TrojanBird };