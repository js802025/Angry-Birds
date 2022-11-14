import { Bird } from '../../molecules/bird';

class LotusBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = 'https://github.com/js802025/Angry-Birds/raw/main/data/birds/lotus.png';
        this.body.render.sprite.xScale = 0.07;
        this.body.render.sprite.yScale = 0.07;
    };

    // red bird ability
    ability() {
        if (this.isAbility) {
            console.log("I'm cute!!")
            this.isAbility = false;
        }
    }
}

export { LotusBird };