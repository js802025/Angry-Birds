import { Bird } from '../../molecules/bird';

class WineBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = 'https://github.com/js802025/Angry-Birds/raw/main/data/birds/wine.webp';
        this.body.render.sprite.xScale = 0.03;
        this.body.render.sprite.yScale = 0.03;
    };

    // red bird ability
    ability() {
        if (this.isAbility) {
            let body = this.body;
            if (body.force.x == 0) {
                body.force.x += 0.7
                setTimeout(() => {
                    body.force.x = 0
                }, 500)
            }
            this.isAbility = false;
        }
    }
}

export { WineBird };