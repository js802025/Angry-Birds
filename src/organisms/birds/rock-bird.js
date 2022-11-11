import { Bird } from '../../molecules/bird';

class RockBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = '../data/birds/rock.png';
        this.body.render.sprite.xScale = 0.05;
        this.body.render.sprite.yScale = 0.05;
    };

    // red bird ability
    ability() {
        if (this.isAbility) {
            let body = this.body;
            Matter.Body.scale(body, 2, 2);
            body.render.sprite.xScale = 0.8;
            body.render.sprite.yScale = 0.8;
            this.isAbility = false;
        }
    }
}

export { RockBird };