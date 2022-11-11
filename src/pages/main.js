import '../../css/style.css';

import {
    Engine,
    Render,
    Runner,
    Mouse,
    Composite,
    MouseConstraint,
    Events,
    RENDER_WIDTH,
    RENDER_HEIGHT,
    BIRD_X,
    BIRD_Y
} from '../atoms/constants';

import { HomeScreen } from '../templates/screens/home-screen';
import { TutorialStage } from '../templates/stages/tutorial-stage';
import { PyramidStage } from '../templates/stages/pyramid-stage';
import { TwoPyramidStage } from '../templates/stages/two-pyramid-stage';
import { BoomerangStage } from '../templates/stages/boomerang-stage';
import { AeolianStage } from '../templates/stages/aeolian-stage';
import { ScoreDisplay } from '../templates/screens/score-display';
import { LaestrygonianStage } from '../templates/stages/laestrygonian-stage';
import { AeaeanStage } from '../templates/stages/aeaean-stage';
import { DeadStage } from '../templates/stages/dead-stage';
import { SirenStage } from '../templates/stages/siren-stage';
import { ScyllaStage } from '../templates/stages/scylla-stage';
import { HeliosStage } from '../templates/stages/helios-stage';
import { OgygiaStage } from '../templates/stages/ogygia-stage';
import { ScheriaStage } from '../templates/stages/scheria-stage';
import { IthacaStage } from '../templates/stages/ithaca-stage';

const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const stage3 = document.getElementById('stage3');
const stage4 = document.getElementById('stage4');
const stage5 = document.getElementById('stage5')
const stage6 = document.getElementById('stage6')
const stage7 = document.getElementById('stage7')
const stage8 = document.getElementById('stage8')
const stage9 = document.getElementById('stage9')
const stage10 = document.getElementById('stage10')
const stage11 = document.getElementById('stage11')
const stage12 = document.getElementById('stage12')
const stage13 = document.getElementById('stage13')
const stage14 = document.getElementById('stage14')

const stages = ["tutorial", "pyramid", "twoPyramid", "boomerang", "aeolian", "laestrygonian", "aeaean", "dead", "siren", "scylla", "helios", "ogygia", "scheria", "ithaca"]

const playHomeButton = document.getElementById('play-home');
const restartButton = document.getElementById('restart-btn');
const homeButton = document.getElementById('home-btn');
const stageButton = document.getElementById('stage-btn');
const retryBtn = document.getElementById('retry-btn');
const nextButton = document.getElementById('next-btn')

let score,
    engine,
    render,
    mouse,
    runner,
    mouseConstraint,
    homeScreen,
    tutorialStage,
    pyramidStage,
    twoPyramidStage,
    boomerangStage,
    aeolianStage,
    laestrygonianStage,
    aeaeanStage,
    deadStage,
    sirenStage,
    scyllaStage,
    heliosStage,
    ogygiaStage,
    scheriaStage,
    ithacaStage;

let stageName = "home";
let firing = false;

function setup() {
    createCanvas(0, 0)

    score = new ScoreDisplay();

    // init render canvas
    engine = Engine.create();
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: RENDER_WIDTH,
            height: RENDER_HEIGHT,
            showAngleIndicator: false,
            wireframes: false,
            background: "url(http://blackmermaps.com/Portfolio_Images/070504_Schwartz_Map_Draft04.jpg)"
        }
    })

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    // add mouse constraint to canvas
    mouse = Mouse.create(render.canvas);

    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.05,
            render: {
                visible: false
            }
        }
    });

    render.mouse = mouse;
    
}

// add composites to render canvas
function draw() {
    if (stageName == "home") {
        Composite.clear(engine.world);
        homeScreen = new HomeScreen();
        addComposites(homeScreen);
        render.options.background = "url(http://blackmermaps.com/Portfolio_Images/070504_Schwartz_Map_Draft04.jpg)";
        
    }
    else if (stageName == "tutorial") {
        Composite.clear(engine.world);
        score.score_stage1 = 0;
        tutorialStage = new TutorialStage();
        getStage(tutorialStage);
        render.options.background = "url(../../data/img/troy.jpg)";
    }
    else if (stageName == "pyramid") {
        Composite.clear(engine.world);
        score.score_stage2 = 0;
        pyramidStage = new PyramidStage();
        getStage(pyramidStage);
        render.options.background = "url(../../data/img/ismarus.jpeg)";
    }
    else if (stageName == "twoPyramid") {
        Composite.clear(engine.world);
        score.score_stage3 = 0;
        twoPyramidStage = new TwoPyramidStage();
        getStage(twoPyramidStage);
        render.options.background = "url(../../data/img/lotus.jpeg)";
    }
    else if (stageName == "boomerang") {
        Composite.clear(engine.world);
        score.score_stage4 = 0;
        boomerangStage = new BoomerangStage();
        getStage(boomerangStage);
        render.options.background = "url(../../data/img/cyclop.jpg)";
    }
else if (stageName == "aeolian") {
    Composite.clear(engine.world);
    score.score_stage5 = 0;
    aeolianStage = new AeolianStage();
    getStage(aeolianStage);
    render.options.background = "url(../../data/img/aeolion.jpeg)";
}
else if (stageName == "laestrygonian") {
    Composite.clear(engine.world);
    //score.score_stage6 = 0;
    laestrygonianStage = new LaestrygonianStage();
    getStage(laestrygonianStage);
    render.options.background = "url(../../data/img/laestrygonian.jpeg)";
}
else if (stageName == "aeaean") {
    Composite.clear(engine.world);
    //score.score_stage6 = 0;
    aeaeanStage = new AeaeanStage();
    getStage(aeaeanStage);
    render.options.background = "url(../../data/img/aeaean.jpeg)";
}
else if (stageName == "dead") {
    Composite.clear(engine.world);
    //score.score_stage6 = 0;
    deadStage = new DeadStage();
    getStage(deadStage);
    render.options.background = "url(../../data/img/houseofdead.jpeg)";
}
else if (stageName == "siren") {
    Composite.clear(engine.world);
    //score.score_stage6 = 0;
    sirenStage = new SirenStage();
    getStage(sirenStage);
    render.options.background = "url(../../data/img/siren.jpeg)";
}
else if (stageName == "scylla") {
    Composite.clear(engine.world);
    //score.score_stage6 = 0;
    scyllaStage = new ScyllaStage();
    getStage(scyllaStage);
    render.options.background = "url(../../data/img/scylla.jpeg)";
}
else if (stageName == "helios") {
    Composite.clear(engine.world);
    //score.score_stage6 = 0;
    heliosStage = new HeliosStage();
    getStage(heliosStage);
    render.options.background = "url(../../data/img/helios.jpeg)";
}
else if (stageName == "ogygia") {
    Composite.clear(engine.world);
    //score.score_stage6 = 0;
    ogygiaStage = new OgygiaStage();
    getStage(ogygiaStage);
    render.options.background = "url(../../data/img/ogygia.jpeg)";
}
else if (stageName == "scheria") {
    Composite.clear(engine.world);
    //score.score_stage6 = 0;
    scheriaStage = new ScheriaStage();
    getStage(scheriaStage);
    render.options.background = "url(../../data/img/scheria.jpeg)";
}
else if (stageName == "ithaca") {
    Composite.clear(engine.world);
    //score.score_stage6 = 0;
    ithacaStage = new IthacaStage();
    getStage(ithacaStage);
    render.options.background = "url(../../data/img/ithaca.jpeg)";
}
    noLoop();
}


// remove composites from render canvas when stage button is clicked
stage1.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("tutorial");
});

stage2.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("pyramid");
});

stage3.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("twoPyramid");
});

stage4.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("boomerang");
});

stage5.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("aeolian")
})
stage6.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("laestrygonian")
})
stage7.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("aeaean")
})
stage8.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("dead")
})
stage9.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("siren")
})
stage10.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("scylla")
})
stage11.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("helios")
})
stage12.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("ogygia")
})
stage13.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("scheria")
})
stage14.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("ithaca")
})


// home screen to stage select screen
playHomeButton.addEventListener('click', function (event) {
    event.preventDefault();
    var theme = new Audio("../../data/audio/theme.mp3")
    theme.loop = true
    theme.play()
    let awaitReset = new Promise((resolve) => {
        stageName = "selectStage";
        setTimeout(function () {
            resolve('success');
        }, 100)
    })
    awaitReset.then(() => {
        loop();
    })
});

// when user click restart button
restartButton.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage(stageName);
});
retryBtn.addEventListener('click', function (event) {
    event.preventDefault();
    restartButton.click();
});
// when user click home button at pause screen
homeButton.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("home");
});

// when user click stage select button at pause screen
stageButton.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("home");
});

nextButton.addEventListener('click', function (event) {
    event.preventDefault()
    hideStage(stageName)
    var index = stages.indexOf(stageName)

    resetStage(stages[index+1])
})

function hideStage(stageName) {
    var stageElements = {"tutorial":document.getElementById("rb-stage1"), "pyramid":document.getElementById("rb-stage2"), "twoPyramid":document.getElementById("rb-stage3")}
    stageElements[stageName].style.display = 'none';
}

// bird ability
function keyPressed() {
    if (key == ' ') {
        if (stageName == "tutorial") {
            if (tutorialStage.remainingBirds >= 0) {
                tutorialStage.flyingBird.ability();
            }
        }
        else if (stageName == "pyramid") {
            if (pyramidStage.remainingBirds >= 0) {
                pyramidStage.flyingBird.ability();
            }
        }
        else if (stageName == "twoPyramid") {
            if (twoPyramidStage.remainingBirds >= 0) {
                twoPyramidStage.flyingBird.ability();
            }
        }
        else if (stageName == "boomerang") {
            if (boomerangStage.remainingBirds >= 0) {
                boomerangStage.flyingBird.ability();
            }
        }
    }
}

// function at home and stage select stage
function mousePressed() {
    if (stageName == "home" || stageName == "selectStage") {
        homeScreen.addBody(engine.world);
    }
}

// reset events
function resetEvents() {
    if (stageName == "tutorial" || stageName == "pyramid"
        || stageName == "twoPyramid" || stageName == "boomerang") {
        Events.off(mouseConstraint, 'enddrag');
        Events.off(engine, 'afterUpdate');
    }
}

function endStage(stage) {
    if (!stage.isOver) {
    stage.isOver = true;
              document.getElementById("current-stars").innerHTML = ""
              for (let i = 0; i < 3; i++) {
                if (i+1 <= stage.getStars()) {
                    document.getElementById('current-stars').innerHTML += "⭐️";
                } else {
                    document.getElementById('current-stars').innerHTML += "★";
                }
               }
               if (stage.getStars() > 0) {
                showButton("next-btn")
               }
               showButton("retry")
               showButton("big-stars")
            }
}

// check firing events
function firingEvents(stage) {
    if (stage.remainingBirds > 0) {
        Events.on(mouseConstraint, 'startdrag', function () {
            setTimeout(function () {
                stage.slingshot.elastic1.body.render.visible = true;
                stage.slingshot.elastic2.body.render.visible = true;
            }, 100)
        })

        Events.on(mouseConstraint, 'enddrag', function (event) {
            stage.flyingBird = stage.bird;
            stage.slingshot.elastic1.body.render.visible = false;
            stage.slingshot.elastic2.body.render.visible = false;
            if (event.body == stage.bird.body) {
                firing = true;
              //  stage.remainingBirds -= 1;
                // setTimeout(() => {
                //     if (stage.remainingBirds == 0) {
                //         resetStage(stageName);
                //     }
                // },1000)
            }
        })

        Events.on(engine, 'afterUpdate', function () {
            addScore(stage)
            if (firing && Math.abs(stage.bird.body.position.x - BIRD_X) < 20
                && Math.abs(stage.bird.body.position.y - BIRD_Y) < 20) {
                stage.firing(engine.world);
                firing = false;
                console.log(stage.remainingBirds);
                if (stage.remainingBirds == 0) {
                   // score.score_stage1 = 0;
        setTimeout(function () {
        // document.getElementById('rb-stage1-red1').style.display = "flex";
        // document.getElementById('rb-stage1-red2').style.display = "flex";
        // document.getElementById('rb-stage1-red3').style.display = "flex";
                   // resetStage(stageName);
                   endStage(stage)
                }, 3000)
                
            }
            }
        
        })
    }
}

// add stage score
function addScore(stage) {
    let score = 0;
    if (stageName == "tutorial") {
        if (stage.pig.body.position.x > RENDER_WIDTH) {
            stage.pig.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    else if (stageName == "pyramid") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 2;
            stage.updateScore(score);
        }
    }
    else if (stageName == "twoPyramid") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 3;
            stage.updateScore(score);
        } if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } if (stage.pig4.body.position.x > RENDER_WIDTH) {
            stage.pig4.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    else if (stageName == "boomerang") {
        if (stage.pig.body.position.x < 700) {
            stage.pig.body.position.x = -100;
            score += 2;
            stage.updateScore(score);
        }
    } 
    else if (stageName == "aeolian") {
        if (stage.pig.body.position.x > RENDER_WIDTH) {
            stage.pig.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    else if (stageName == "laestrygonian") {
        if (stage.pig.body.position.x > RENDER_WIDTH) {
            stage.pig.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    } 
    else if (stageName == "aeaean") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    } else if (stageName == "dead") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    } 
    else if (stageName == "siren") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    else if (stageName == "scylla") {
        if (stage.pig.body.position.x > RENDER_WIDTH) {
            stage.pig.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    else if (stageName == "helios") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    else if (stageName == "ogygia") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    else if (stageName == "scheria") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    else if (stageName == "ithaca") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    if (stage.maxScore == stage.score) {
        endStage(stage)
    }
}

// add composites of stage
function addComposites(stage) {
    Composite.add(engine.world, stage.getComposites());
    Composite.add(engine.world, mouseConstraint);
}

// add composites and firing events
function getStage(stage) {
    let getStageComposite = new Promise((resolve) => {
        addComposites(stage);

        setTimeout(function () {
            resolve('success');
        }, 250)
    })

    getStageComposite.then(() => {
        stage.subscribe(score);
        firingEvents(stage);
    })
}

// reset stage and change stageName
function resetStage(stage) {
    let awaitReset = new Promise((resolve) => {
        resetEvents();
        setTimeout(function () {
            resolve('success');
        }, 100)
    })
    awaitReset.then(() => {
        stageName = stage;
    }).then(() => {
        loop();
    })
}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.mousePressed = mousePressed;