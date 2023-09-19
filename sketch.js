var gameChar_x;
var gameChar_y;
var floorPos_y;
var cameraPosX;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;

var collectables;
var canyons;
var trees_x;
var treePos_y;
var clouds;
var mountains;

var game_score;
var flagpole;
var lives;

var jumpSound;
var collectableSound;
var playerDeadSound;
var backgroundMusic;

function preload() {
    soundFormats('mp3', 'wav');
    //jump
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.2);
    //getting collectable
    collectableSound = loadSound('assets/collectable.wav');
    collectableSound.setVolume(0.2);
    //player dead
    playerDeadSound = loadSound('assets/playerdead.wav');
    playerDeadSound.setVolume(0.2);
    //background music
    backgroundMusic = loadSound('assets/backgroundmusic.mp3');
    backgroundMusic.setVolume(0.1);
}

function setup() {
    createCanvas(1024, 576);
    floorPos_y = (height * 5) / 6;
    lives = 3;
    startGame();
}

function startGame() {
    if (lives < 3) {
        setTimeout(playBackgroundMusic, 3000);
    } else {
        playBackgroundMusic();
    }
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;
    cameraPosX = 0;
    game_score = 0;

    isLeft = false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;

    flagpole = {
        x_pos: 1500,
        isReached: false
    };

    collectables = [{
            x_pos: 155,
            y_pos: floorPos_y - 8,
            size: 16,
            isFound: false
        },
        {
            x_pos: 600,
            y_pos: floorPos_y - 8,
            size: 16,
            isFound: false
        },
        {
            x_pos: 1000,
            y_pos: floorPos_y - 8,
            size: 16,
            isFound: false
        }
    ];

    canyons = [{
            x_pos: 250,
            y_pos: floorPos_y,
            width: 75
        },
        {
            x_pos: -500,
            y_pos: floorPos_y,
            width: 350
        },
        {
            x_pos: 700,
            y_pos: floorPos_y,
            width: 50
        },
        {
            x_pos: 790,
            y_pos: floorPos_y,
            width: 50
        },
        {
            x_pos: 890,
            y_pos: floorPos_y,
            width: 25
        },
        {
            x_pos: 1200,
            y_pos: floorPos_y,
            width: 80
        }
    ];

    trees_x = [30, 500, 900, 1150];
    treePos_y = floorPos_y;

    clouds = [{
            x_pos: 100,
            y_pos: 80
        },
        {
            x_pos: -100,
            y_pos: 120
        },
        {
            x_pos: -300,
            y_pos: 50
        },
        {
            x_pos: 400,
            y_pos: 94
        },
        {
            x_pos: 600,
            y_pos: 200
        },
        {
            x_pos: 800,
            y_pos: 124
        },
        {
            x_pos: 1200,
            y_pos: 60
        },
    ];

    mountains = [{
        x_pos: 1200
    }, {
        x_pos: 200
    }];
}

function draw() {
    ///////////DRAWING CODE//////////
    cameraPosX = gameChar_x - width / 2;
    background(100, 155, 255);
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    push();
    translate(-cameraPosX, 0);
    //drawing background objects
    drawClouds();
    drawMountains();
    drawTrees();
    drawScoreboard();
    //drawing interactive objects
    renderCanyons();
    renderFlagpole();

    //the game character

    if (isLeft && isFalling) {
        // add your jumping-left code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y - 60, 33);

        //eye
        fill(0);
        ellipse(gameChar_x - 5, gameChar_y - 60, 10);
        noFill();
        stroke(50);
        ellipse(gameChar_x - 5, gameChar_y - 60, 10, 20);

        //body
        noStroke();
        fill(0, 0, 255);
        rect(gameChar_x - 13, gameChar_y - 45, 25, 35);

        //lower limb
        fill(0);
        rect(gameChar_x - 18, gameChar_y - 10, 10, 10);
        rect(gameChar_x + 2, gameChar_y - 10, 10, 10);
    } else if (isRight && isFalling) {
        // add your jumping-right code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y - 60, 33);

        //eye
        fill(0);
        ellipse(gameChar_x + 5, gameChar_y - 60, 10);
        noFill();
        stroke(50);
        ellipse(gameChar_x + 5, gameChar_y - 60, 10, 20);

        //body
        noStroke();
        fill(0, 0, 255);
        rect(gameChar_x - 13, gameChar_y - 45, 25, 35);

        //lower limb
        fill(0);
        rect(gameChar_x - 13, gameChar_y - 10, 10, 10);
        rect(gameChar_x + 7, gameChar_y - 10, 10, 10);
    } else if (isLeft) {
        // add your walking left code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y - 55, 33);

        //eye
        fill(0);
        ellipse(gameChar_x - 5, gameChar_y - 55, 10);
        noFill();
        stroke(50);
        ellipse(gameChar_x - 5, gameChar_y - 55, 10, 20);

        //body
        noStroke();
        fill(0, 0, 255);
        rect(gameChar_x - 13, gameChar_y - 40, 25, 30);

        //lower limb
        fill(0);
        rect(gameChar_x - 18, gameChar_y - 10, 10, 10);
        rect(gameChar_x + 2, gameChar_y - 10, 10, 10);
    } else if (isRight) {
        // add your walking right code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y - 55, 33);

        //eye
        fill(0);
        ellipse(gameChar_x + 5, gameChar_y - 55, 10);
        noFill();
        stroke(50);
        ellipse(gameChar_x + 5, gameChar_y - 55, 10, 20);

        //body
        noStroke();
        fill(0, 0, 255);
        rect(gameChar_x - 13, gameChar_y - 40, 25, 30);

        //lower limb
        fill(0);
        rect(gameChar_x - 13, gameChar_y - 10, 10, 10);
        rect(gameChar_x + 7, gameChar_y - 10, 10, 10);
    } else if (isFalling || isPlummeting) {
        // add your jumping facing forwards code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y - 60, 33);

        //eye
        fill(0);
        ellipse(gameChar_x, gameChar_y - 60, 10);
        noFill();
        stroke(50);
        ellipse(gameChar_x, gameChar_y - 60, 10, 20);

        //body
        noStroke();
        fill(0, 0, 255);
        rect(gameChar_x - 13, gameChar_y - 45, 25, 35);

        //lower limb
        fill(0);
        rect(gameChar_x - 13, gameChar_y - 10, 10, 10);
        rect(gameChar_x + 2, gameChar_y - 10, 10, 10);
    } else {
        // add your standing front facing code
        //head
        fill(200, 150, 150);
        ellipse(gameChar_x, gameChar_y - 55, 33);

        //eye
        fill(0);
        ellipse(gameChar_x, gameChar_y - 55, 10);
        noFill();
        stroke(50);
        ellipse(gameChar_x, gameChar_y - 55, 10, 20);

        //body
        noStroke();
        fill(0, 0, 255);
        rect(gameChar_x - 13, gameChar_y - 40, 25, 30);

        //lower limb
        fill(0);
        rect(gameChar_x - 13, gameChar_y - 10, 10, 10);
        rect(gameChar_x + 2, gameChar_y - 10, 10, 10);
    }
    pop();
    checkFlagpole();
    checkPlayerDie();
    // Game over message
    gameOver();
    // Level complete message
    levelComplete();


    ///////////INTERACTION CODE//////////
    //Put conditional statements to move the game character below here
    //to check is charecter is over a canyon
    for (var i = 0; i < canyons.length; i++) {
        if (
            gameChar_x > canyons[i].x_pos &&
            gameChar_x < canyons[i].x_pos + canyons[i].width &&
            gameChar_y >= floorPos_y
        ) {
            isPlummeting = true;
            isFalling = true;
            gameChar_y += 50;
        }
    }
    if (isLeft == true) {
        gameChar_x -= 2;
    }
    //walk right when right key is pressed
    if (isRight == true) {
        gameChar_x += 2;
    }
    //gravity
    if (gameChar_y < floorPos_y) {
        gameChar_y += 2;
        isFalling = true;
    }
    //stop gravity
    if (gameChar_y == floorPos_y) {
        isFalling = false;
    }
}

function keyPressed() {
    if (keyCode == 37) {
        isLeft = true;
    } else if (keyCode == 39) {
        isRight = true;
    }
    if (keyCode == 38 && !isFalling && !isPlummeting && !flagpole.isReached) {
        gameChar_y -= 100;
        jumpSound.play();
    }
}

function keyReleased() {
    if (keyCode == 37) {
        isLeft = false;
    } else if (keyCode == 39) {
        isRight = false;
    }
}

function drawClouds() {
    // //draw cloud
    for (var i = 0; i < clouds.length; i++) {
        fill(255, 255, 255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos - 25, 150, 50);
        ellipse(clouds[i].x_pos - 50, clouds[i].y_pos, 150, 50);
        ellipse(clouds[i].x_pos + 50, clouds[i].y_pos, 150, 50);
        ellipse(clouds[i].x_pos + 25, clouds[i].y_pos + 20, 150, 50);
    }
}

function drawMountains() {
    // //draw mountains
    for (var i = 0; i < mountains.length; i++) {
        fill(174, 139, 222);
        triangle(
            mountains[i].x_pos,
            floorPos_y - 300,
            mountains[i].x_pos + 300,
            floorPos_y,
            mountains[i].x_pos - 460,
            floorPos_y
        );
        beginShape();
        fill(231, 241, 255);
        vertex(mountains[i].x_pos - 40, floorPos_y - 300);
        vertex(mountains[i].x_pos + 85, floorPos_y - 200);
        vertex(mountains[i].x_pos + 5, 250);
        vertex(mountains[i].x_pos - 20, 290);
        vertex(mountains[i].x_pos - 70, 260);
        vertex(mountains[i].x_pos - 160, 286);
        endShape();
    }
}

function drawTrees() {
    // //draw trees
    for (var i = 0; i < trees_x.length; i++) {
        fill(139, 69, 19);
        rect(trees_x[i] - 10, treePos_y - 145, 20, 145);
        fill(46, 139, 87);
        ellipse(trees_x[i], treePos_y - 83, 70, 70);
        ellipse(trees_x[i], treePos_y - 117, 52.5, 52.5);
        ellipse(trees_x[i], treePos_y - 132, 35, 35);
        noStroke();
        fill(255);
    }
}

function drawCollectable(t_collectable) {
    if (t_collectable.isFound == false) {
        fill(255, 215, 0);
        ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size);
        fill(184, 134, 11);
        ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size - 10);
    }
}

function checkCollectable(t_collectable) {
    if (
        !t_collectable.isFound &&
        dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20
    ) {
        t_collectable.isFound = true;
        game_score += 1;
        collectableSound.play();
    }
}

function drawCanyon(t_canyon) {
    for (var i = 0; i < canyons.length; i++) {
        fill(220, 20, 60);
        rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, t_canyon.y_pos + 192);
    }
}

function renderCanyons() {
    for (var i = 0; i < canyons.length; i++) {
        drawCanyon(canyons[i]);
    }
    for (var i = 0; i < collectables.length; i++) {
        drawCollectable(collectables[i]);
        checkCollectable(collectables[i]);
    }

}

function renderFlagpole() {
    push();
    strokeWeight(5);
    stroke(100);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    if (flagpole.isReached) {
        fill(0, 0, 200);
        rect(flagpole.x_pos - 20, floorPos_y - 250, 20, 20);
    } else {
        fill(255, 0, 0);
        rect(flagpole.x_pos, floorPos_y - 250, 20, 20);
    }
    pop();
}

function checkFlagpole() {
    var d = abs(gameChar_x - flagpole.x_pos);
    if (d < 15) {
        flagpole.isReached = true;
        isLeft = false;
        isRight = false;
    }
}

function checkPlayerDie() {
    if (gameChar_y > floorPos_y + 100) {
        lives -= 1;
        if (lives > 0) {
            backgroundMusic.stop();
            playerDeadSound.play();
            startGame();
        }
        isLeft = false;
        isRight = false;

    }
}

function gameOver() {
    if (lives < 1) {
        push();
        fill(0);
        textSize(32);
        textAlign(CENTER);
        text("Game over. Press space to restart.", width / 2, height / 2);
        backgroundMusic.stop();
        pop();
        lives = 0;
        if (keyCode == 32) {
            if (lives < 1) {
                startGame();
                lives = 3;
            }
        }
        return;
    }
}

function levelComplete() {
    if (flagpole.isReached) {
        push();
        fill(0);
        textSize(32);
        textAlign(CENTER);
        text("Level complete. Press space to restart game (Next level not available).", width / 2, height / 2);
        pop();
        backgroundMusic.stop();
        gameChar_y = floorPos_y;
        if (keyCode == 32) {
            if (flagpole.isReached) {
                startGame();
                lives = 3;
            }
        }
        return;
    }
}

function drawScoreboard() {
    push();
    fill(0, 150, 150, 95);
    rect(gameChar_x - 410, 0, 100, 60);
    fill(0);
    noStroke();
    textSize(20);
    text("Score: " + game_score, gameChar_x - 400, 20);
    fill(0);
    noStroke();
    text("Lives: " + lives, gameChar_x - 400, 40);
    pop();
}

function playBackgroundMusic() {
    backgroundMusic.loop();
}