import { Bird } from '../../molecules/bird';

class SwordBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = '../../data/birds/sword.webp';
        this.body.render.sprite.xScale = 0.3;
        this.body.render.sprite.yScale = 0.3;
    };

    // red bird ability
    ability() {
        if (this.isAbility) {
            console.log("I'm cute!!")
            this.isAbility = false;
        }
    }
}

export { SwordBird };