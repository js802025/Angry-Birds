import { Bird } from '../../molecules/bird';

class EyeballBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = '../data/birds/eyeball.png';
        this.body.render.sprite.xScale = 0.03;
        this.body.render.sprite.yScale = 0.03;
    };

    // red bird ability
    ability() {
        if (this.isAbility) {
            let body = this.body;
            if (body.force.x == 0) {
                body.force.x -= 0.5
                setTimeout(() => {
                    body.force.x -= 0.1
                }, 100)
                setTimeout(() => {
                    body.force.x -= 0.1
                }, 100)
                setTimeout(() => {
                    body.force.x -= 0.1
                }, 100)
                setTimeout(() => {
                    body.force.x -= 0.1
                }, 100)
                body.force.y += 0.5
                body.torque += 5;
                setTimeout(() => {
                    body.force.x = 0
                    body.force.y = 0
                }, 500)
            }
            this.isAbility = false;
        }
    }
}

export { EyeballBird };