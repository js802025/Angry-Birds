import { Bird } from '../../molecules/bird';

class GoldBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = 'https://github.com/js802025/Angry-Birds/raw/main/data/birds/gold.webp';
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

export { GoldBird };