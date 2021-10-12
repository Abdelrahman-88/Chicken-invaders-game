"use strict"

let inlineRadio1 = document.getElementById("inlineRadio1");
let inlineRadio2 = document.getElementById("inlineRadio2");
let inlineRadio3 = document.getElementById("inlineRadio3");



// home


let chicken = document.getElementById("chicken");
let weapon = document.querySelector(".weapon");
let bullet = document.querySelector(".bullet");
let weaponTrack = document.querySelector("#weaponTrack");
let gameOverTrack = document.getElementById("gameOverTrack");
let victoryTrack = document.querySelector(".victoryTrack");
let gameOver = document.getElementById("gameOver");
let winLevel1 = document.getElementById("winLevel1");
let home = document.getElementById("home");
let gameOverScore = document.getElementById("gameOverScore");
let victoryScore = document.querySelector(".victoryScore");
let start = document.querySelector(".start");
let score = document.querySelector(".score");
let scorePoints = document.getElementById("scorePoints");
let level1Intro = document.getElementById("level1Intro");

let weaponPlace = {
    left: 50,
    top: 80
};

let bulletGroup = [];

let chickenGroup = [
    { left: 10, top: 5 },
    { left: 20, top: 5 },
    { left: 30, top: 5 },
    { left: 40, top: 5 },
    { left: 50, top: 5 },
    { left: 60, top: 5 },
    { left: 70, top: 5 },
    { left: 80, top: 5 },
    { left: 90, top: 5 },
    { left: 10, top: 18 },
    { left: 20, top: 18 },
    { left: 30, top: 18 },
    { left: 40, top: 18 },
    { left: 50, top: 18 },
    { left: 60, top: 18 },
    { left: 70, top: 18 },
    { left: 80, top: 18 },
    { left: 90, top: 18 }
];

function addChicken() {
    let cartona = "";
    for (let i = 0; i < chickenGroup.length; i++) {
        cartona += `
                <img src="img/chicken1.png" alt="chicken" style = "left:${chickenGroup[i].left}% ; top:${chickenGroup[i].top}%">`
    }
    chicken.innerHTML = cartona;
}

function moveChicken() {
    for (let i = 0; i < chickenGroup.length; i++) {
        if (chickenGroup[i].top < weaponPlace.top - 11) {
            chickenGroup[i].top = chickenGroup[i].top + 1;
            if (chickenGroup[i].top >= weaponPlace.top - 11) {
                home.classList.add("d-none");
                score.classList.add("d-none");
                winLevel1.classList.add("d-none");
                gameOver.classList.remove("d-none");
                gameOverScore.innerHTML = `Your score ${(18 - chickenGroup.length) * 10}`;
                gameOverTrack.play();
                bulletGroup = [];
                chickenGroup = [];
                clearGame();
                tryAgain();
            }
            scorePoints.innerHTML = (18 - chickenGroup.length) * 10;
        }

    }

}

function addBullet() {
    let cartona = "";
    for (let i = 0; i < bulletGroup.length; i++) {
        cartona += `
                <img src="img/bullet1.png" alt="bullet" style = "left:${bulletGroup[i].left}% ; top:${bulletGroup[i].top}%">`
    }
    bullet.innerHTML = cartona;
}

function moveBullet() {
    for (let i = 0; i < bulletGroup.length; i++) {
        bulletGroup[i].top = bulletGroup[i].top - 2;
    }
}

function controls() {
    document.addEventListener("keydown", function (e) {
        if (e.key == "ArrowLeft") {
            if (weaponPlace.left > 5) {
                weaponPlace.left = weaponPlace.left - 1
            }
        }
        if (e.key == "ArrowRight") {
            if (weaponPlace.left < 95) {
                weaponPlace.left = weaponPlace.left + 1
            }
        }
        if (e.key == " ") {
            bulletGroup.push({ left: weaponPlace.left, top: weaponPlace.top - 3 })
            addBullet();
            weaponTrack.play();
        }
        addWeapon();
    })
}

function addWeapon() {
    weapon.style.left = weaponPlace.left + "%";
    weapon.style.top = weaponPlace.top + "%";
}

function killChicken() {

    for (let i = 0; i < chickenGroup.length; i++) {
        for (let e = 0; e < bulletGroup.length; e++) {
            if (chickenGroup.length > 0 && bulletGroup.length > 0) {
                if (bulletGroup[e].left >= chickenGroup[i].left - 3 && bulletGroup[e].left <= chickenGroup[i].left + 3
                    && bulletGroup[e].top <= chickenGroup[i].top + 10) {
                    bulletGroup.splice(e, 1);
                    chickenGroup.splice(i, 1)
                    if (chickenGroup.length == 0) {
                        weapon.classList.add("weaponMove");
                        move();
                    }
                }
                else if (bulletGroup[e].top < chickenGroup[i].top - 30) {

                    bulletGroup.splice(e, 1);

                }
            }
        }
    }
}

function move() {
    setTimeout(() => {
        home.classList.add("d-none");
        score.classList.add("d-none");
        winLevel1.classList.remove("d-none");
        gameOver.classList.add("d-none");
        victoryScore.innerHTML = `Your score ${(18 - chickenGroup.length) * 10}`;
        victoryTrack.play();
        clearGame();
        playLevel2();
    }, 1000);
}

function tryAgain() {
    document.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && winLevel1.classList.contains("d-none")) {
            location.href = "index.html";
        }

    })
}


let gameInterval;
let chickenInterval;

function gameLoop() {
    addChicken();
    addBullet();
    moveBullet();
    killChicken();
}

function chickenLoop() {
    moveChicken();
}

function clearGame() {
    clearInterval(gameInterval);
    clearInterval(chickenInterval);
}


    document.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && weapon.classList.contains("d-none") && e.target == inlineRadio1) {
            sessionStorage.setItem("mode", JSON.stringify(inlineRadio1.value));
            start.classList.add("d-none");
            home.style.backgroundImage = "url(img/background.jpg)"
            score.classList.remove("d-none");
            weapon.classList.remove("d-none");
            gameInterval = setInterval(gameLoop, 50);
            chickenInterval = setInterval(chickenLoop, 1500);
            level1Intro.play();
            controls();
        }
        else if (e.key == "Enter" && weapon.classList.contains("d-none") && e.target == inlineRadio2) {
            sessionStorage.setItem("mode", JSON.stringify(inlineRadio2.value));
            start.classList.add("d-none");
            home.style.backgroundImage = "url(img/background.jpg)"
            score.classList.remove("d-none");
            weapon.classList.remove("d-none");
            gameInterval = setInterval(gameLoop, 50);
            chickenInterval = setInterval(chickenLoop, 1000);
            level1Intro.play();
            controls();
        }
        else if (e.key == "Enter" && weapon.classList.contains("d-none") && e.target == inlineRadio3) {
            sessionStorage.setItem("mode", JSON.stringify(inlineRadio3.value));
            start.classList.add("d-none");
            home.style.backgroundImage = "url(img/background.jpg)"
            score.classList.remove("d-none");
            weapon.classList.remove("d-none");
            gameInterval = setInterval(gameLoop, 50);
            chickenInterval = setInterval(chickenLoop, 500);
            level1Intro.play();
            controls();
        }
    })


function playLevel2() {
    document.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && home.classList.contains("d-none")) {
            location.href = "level2.html";
            clearGame();
        }

    })
}

// level2

let chickenLevel2 = document.getElementById("chickenLevel2");
let weaponLevel2 = document.querySelector(".weaponLevel2");
let bulletLevel2 = document.querySelector(".bulletLevel2");
let weaponTrackLevel2 = document.querySelector(".weaponTrackLevel2");
let gameOverTrackLevel2 = document.getElementById("gameOverTrackLevel2");
let victoryTrackLevel2 = document.querySelector(".victoryTrackLevel2");
let gameOverLevel2 = document.getElementById("gameOverLevel2");
let winLevel2 = document.getElementById("winLevel2");
let level2 = document.getElementById("level2");
let gameOverScoreLevel2 = document.getElementById("gameOverScoreLevel2");
let victoryScoreLevel2 = document.querySelector(".victoryScoreLevel2");
let startLevel2 = document.querySelector(".startLevel2");
let scoreLevel2 = document.querySelector(".scoreLevel2");
let scoreLevel2Points = document.getElementById("scoreLevel2Points");
let level2Intro = document.getElementById("level2Intro");

let weaponPlaceLevel2 = {
    left: 50,
    top: 80
};

let bulletGroupLevel2 = [];

let chickenGroupLevel2 = [
    { left: 10, top: 5 },
    { left: 20, top: 5 },
    { left: 30, top: 5 },
    { left: 40, top: 5 },
    { left: 50, top: 5 },
    { left: 60, top: 5 },
    { left: 70, top: 5 },
    { left: 80, top: 5 },
    { left: 90, top: 5 },
    { left: 10, top: 18 },
    { left: 20, top: 18 },
    { left: 30, top: 18 },
    { left: 40, top: 18 },
    { left: 50, top: 18 },
    { left: 60, top: 18 },
    { left: 70, top: 18 },
    { left: 80, top: 18 },
    { left: 90, top: 18 }
];

function addChickenLevel2() {
    let cartona = "";
    for (let i = 0; i < chickenGroupLevel2.length; i++) {
        cartona += `
                <img src="img/chicken1.png" alt="chicken" style = "left:${chickenGroupLevel2[i].left}% ; top:${chickenGroupLevel2[i].top}%">`
    }
    chickenLevel2.innerHTML = cartona;
}

function moveChickenLevel2() {
    for (let i = 0; i < chickenGroupLevel2.length; i++) {
        if (chickenGroupLevel2[i].top < weaponPlaceLevel2.top - 10) {

            chickenGroupLevel2[i].top = chickenGroupLevel2[i].top + 1;
            if (chickenGroupLevel2[i].left < 50) {
                chickenGroupLevel2[i].left = chickenGroupLevel2[i].left + 1;
            }
            if (chickenGroupLevel2[i].left > 50) {
                chickenGroupLevel2[i].left = chickenGroupLevel2[i].left - 1;
            }
            if (chickenGroupLevel2[i].left == 50) {
                chickenGroupLevel2[i].top = chickenGroupLevel2[i].top + 4;
            }

            if (chickenGroupLevel2[i].top >= weaponPlaceLevel2.top - 10) {
                level2.classList.add("d-none");
                scoreLevel2.classList.add("d-none");
                winLevel2.classList.add("d-none");
                gameOverLevel2.classList.remove("d-none");
                gameOverScoreLevel2.innerHTML = `Your score ${(18 - chickenGroupLevel2.length) * 10}`;
                gameOverTrackLevel2.play();
                bulletGroupLevel2 = [];
                chickenGroupLevel2 = [];
                clearGameLevel2();
                tryAgainLevel2();
            }
            scoreLevel2Points.innerHTML = (18 - chickenGroupLevel2.length) * 10;
        }
    }
}

function addBulletLevel2() {
    let cartona = "";
    for (let i = 0; i < bulletGroupLevel2.length; i++) {
        cartona += `
                <img src="img/bullet1.png" alt="bullet" style = "left:${bulletGroupLevel2[i].left}% ; top:${bulletGroupLevel2[i].top}%">`
    }
    bulletLevel2.innerHTML = cartona;
}

function moveBulletLevel2() {
    for (let i = 0; i < bulletGroupLevel2.length; i++) {
        bulletGroupLevel2[i].top = bulletGroupLevel2[i].top - 2;
    }
}

function controlsLevel2() {
    document.addEventListener("keydown", function (e) {
        if (e.key == "ArrowLeft") {
            if (weaponPlaceLevel2.left > 5) {
                weaponPlaceLevel2.left = weaponPlaceLevel2.left - 1
            }
        }
        if (e.key == "ArrowRight") {
            if (weaponPlaceLevel2.left < 95) {
                weaponPlaceLevel2.left = weaponPlaceLevel2.left + 1
            }
        }
        if (e.key == " ") {
            bulletGroupLevel2.push({ left: weaponPlaceLevel2.left, top: weaponPlaceLevel2.top - 3 })
            addBulletLevel2();
            weaponTrackLevel2.play();
        }
        addWeaponLevel2();
    })
}

function addWeaponLevel2() {
    weaponLevel2.style.left = weaponPlaceLevel2.left + "%";
    weaponLevel2.style.top = weaponPlaceLevel2.top + "%";
}

function killChickenLevel2() {

    for (let i = 0; i < chickenGroupLevel2.length; i++) {
        for (let e = 0; e < bulletGroupLevel2.length; e++) {
            if (chickenGroupLevel2.length > 0 && bulletGroupLevel2.length > 0) {
                if (bulletGroupLevel2[e].left >= chickenGroupLevel2[i].left - 3 && bulletGroupLevel2[e].left <= chickenGroupLevel2[i].left + 3
                    && bulletGroupLevel2[e].top <= chickenGroupLevel2[i].top + 10) {
                    bulletGroupLevel2.splice(e, 1);
                    chickenGroupLevel2.splice(i, 1)
                    if (chickenGroupLevel2.length == 0) {
                        weaponLevel2.classList.add("weaponMove");
                        moveLevel2();
                    }
                }
                else if (bulletGroupLevel2[e].top < chickenGroupLevel2[i].top - 30) {

                    bulletGroupLevel2.splice(e, 1);

                }

            }
        }
    }
}

function moveLevel2() {
    setTimeout(() => {
        level2.classList.add("d-none");
        scoreLevel2.classList.add("d-none");
        winLevel2.classList.remove("d-none");
        gameOverLevel2.classList.add("d-none");
        victoryScoreLevel2.innerHTML = `Your score ${(18 - chickenGroupLevel2.length) * 10}`;
        victoryTrackLevel2.play();
        clearGameLevel2();
        playLevel3();
    }, 1000);
}

function tryAgainLevel2() {
    document.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && winLevel2.classList.contains("d-none")) {
            location.href = "index.html";
        }

    })
}



let gameIntervalLevel2;
let chickenIntervalLevel2;

function gameLoopLevel2() {
    addBulletLevel2();
    moveBulletLevel2();
    addChickenLevel2();
    killChickenLevel2();
}

function chickenLoopLevel2() {
    moveChickenLevel2();
}

function clearGameLevel2() {
    clearInterval(gameIntervalLevel2);
    clearInterval(chickenIntervalLevel2);
}


document.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && weaponLevel2.classList.contains("d-none") && JSON.parse(sessionStorage.getItem("mode")) == "option1") {
        startLevel2.classList.add("d-none");
        level2.style.backgroundImage = "url(img/background.jpg)"
        scoreLevel2.classList.remove("d-none");
        weaponLevel2.classList.remove("d-none");
        gameIntervalLevel2 = setInterval(gameLoopLevel2, 50);
        chickenIntervalLevel2 = setInterval(chickenLoopLevel2, 1500);
        level2Intro.play();
        controlsLevel2();
    }
    else if (e.key == "Enter" && weaponLevel2.classList.contains("d-none") && JSON.parse(sessionStorage.getItem("mode")) == "option2") {
        startLevel2.classList.add("d-none");
        level2.style.backgroundImage = "url(img/background.jpg)"
        scoreLevel2.classList.remove("d-none");
        weaponLevel2.classList.remove("d-none");
        gameIntervalLevel2 = setInterval(gameLoopLevel2, 50);
        chickenIntervalLevel2 = setInterval(chickenLoopLevel2, 1000);
        level2Intro.play();
        controlsLevel2();
    }
    else if (e.key == "Enter" && weaponLevel2.classList.contains("d-none") && JSON.parse(sessionStorage.getItem("mode")) == "option3") {
        startLevel2.classList.add("d-none");
        level2.style.backgroundImage = "url(img/background.jpg)"
        scoreLevel2.classList.remove("d-none");
        weaponLevel2.classList.remove("d-none");
        gameIntervalLevel2 = setInterval(gameLoopLevel2, 50);
        chickenIntervalLevel2 = setInterval(chickenLoopLevel2, 500);
        level2Intro.play();
        controlsLevel2();
    }
})


function playLevel3() {
    document.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && level2.classList.contains("d-none")) {
            location.href = "level3.html";
            clearGameLevel2();
        }

    })
}




// level3



let chickenLevel3 = document.getElementById("chickenLevel3");
let weaponLevel3 = document.querySelector(".weaponLevel3");
let bulletLevel3 = document.querySelector(".bulletLevel3");
let weaponTrackLevel3 = document.querySelector(".weaponTrackLevel3");
let gameOverTrackLevel3 = document.getElementById("gameOverTrackLevel3");
let victoryTrackLevel3 = document.querySelector(".victoryTrackLevel3");
let gameOverLevel3 = document.getElementById("gameOverLevel3");
let winLevel3 = document.getElementById("winLevel3");
let level3 = document.getElementById("level3");
let gameOverScoreLevel3 = document.getElementById("gameOverScoreLevel3");
let victoryScoreLevel3 = document.querySelector(".victoryScoreLevel3");
let startLevel3 = document.querySelector(".startLevel3");
let scoreLevel3 = document.querySelector(".scoreLevel3");
let scoreLevel3Points = document.getElementById("scoreLevel3Points");
let bigChickenLevel3 = document.getElementById("bigChickenLevel3");
let eggLevel3 = document.getElementById("eggLevel3");
let level3Intro = document.getElementById("level3Intro");

let weaponPlaceLevel3 = {
    left: 50,
    top: 80
};

let bulletGroupLevel3 = [];

let eggGroupLevel3 = [

];

let chickenGroupLevel3 = [
    { left: 10, top: 5 },
    { left: 20, top: 5 },
    { left: 30, top: 5 },
    { left: 40, top: 5 },
    { left: 50, top: 5 },
    { left: 60, top: 5 },
    { left: 70, top: 5 },
    { left: 80, top: 5 },
    { left: 90, top: 5 },
    { left: 10, top: 18 },
    { left: 20, top: 18 },
    { left: 30, top: 18 },
    { left: 40, top: 18 },
    { left: 50, top: 18 },
    { left: 60, top: 18 },
    { left: 70, top: 18 },
    { left: 80, top: 18 },
    { left: 90, top: 18 }
];

let bigChickenGroupLevel3 = [
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 },
    { left: 50, top: -50 }
];

function addChickenLevel3() {
    let cartona = "";
    for (let i = 0; i < chickenGroupLevel3.length; i++) {
        cartona += `
                    <img src="img/chicken1.png" alt="chicken" style = "left:${chickenGroupLevel3[i].left}% ; top:${chickenGroupLevel3[i].top}%">`
    }
    chickenLevel3.innerHTML = cartona;

    let cartona2 = "";
    for (let i = 0; i < bigChickenGroupLevel3.length; i++) {
        cartona2 += `
                    <img src="img/big.png" alt="chicken" style = "left:${bigChickenGroupLevel3[i].left}% ; top:${bigChickenGroupLevel3[i].top}%">`
    }
    bigChickenLevel3.innerHTML = cartona2;
}

function moveChickenLevel3() {
    for (let i = 0; i < chickenGroupLevel3.length; i++) {
        if (chickenGroupLevel3[i].top < weaponPlaceLevel3.top - 10) {

            chickenGroupLevel3[i].top = chickenGroupLevel3[i].top + 1;
            if (chickenGroupLevel3[i].left < 50) {
                chickenGroupLevel3[i].left = chickenGroupLevel3[i].left + 1;
            }
            if (chickenGroupLevel3[i].left > 50) {
                chickenGroupLevel3[i].left = chickenGroupLevel3[i].left - 1;
            }
            if (chickenGroupLevel3[i].left == 50) {
                chickenGroupLevel3[i].top = chickenGroupLevel3[i].top + 4;
            }

            if (chickenGroupLevel3[i].top >= weaponPlaceLevel3.top - 10) {
                level3.classList.add("d-none");
                scoreLevel3.classList.add("d-none");
                winLevel3.classList.add("d-none");
                gameOverLevel3.classList.remove("d-none");
                gameOverScoreLevel3.innerHTML = `Your score ${(36 - (chickenGroupLevel3.length + bigChickenGroupLevel3.length)) * 10}`;
                gameOverTrackLevel3.play();
                bulletGroupLevel3 = [];
                bigChickenGroupLevel3 = [];
                chickenGroupLevel3 = [];
                eggGroupLevel3 = [];
                clearGameLevel3();
                tryAgainLevel3();
            }
            scoreLevel3Points.innerHTML = (36 - (chickenGroupLevel3.length + bigChickenGroupLevel3.length)) * 10;
        }
    }

    for (let i = 0; i < bigChickenGroupLevel3.length; i++) {
        if (bigChickenGroupLevel3[i].top < weaponPlaceLevel3.top - 40) {

            bigChickenGroupLevel3[i].top = bigChickenGroupLevel3[i].top + 2;

            if (bigChickenGroupLevel3[i].top >= weaponPlaceLevel3.top - 40) {
                level3.classList.add("d-none");
                scoreLevel3.classList.add("d-none");
                winLevel3.classList.add("d-none");
                gameOverLevel3.classList.remove("d-none");
                gameOverScoreLevel3.innerHTML = `Your score ${(36 - (bigChickenGroupLevel3.length + chickenGroupLevel3.length)) * 10}`;
                gameOverTrackLevel3.play();
                bulletGroupLevel3 = [];
                bigChickenGroupLevel3 = [];
                chickenGroupLevel3 = [];
                eggGroupLevel3 = [];
                clearGameLevel3();
                tryAgainLevel3();
            }
            scoreLevel3Points.innerHTML = (36 - (bigChickenGroupLevel3.length + chickenGroupLevel3.length)) * 10;
        }
    }
}

function addBulletLevel3() {
    let cartona = "";
    for (let i = 0; i < bulletGroupLevel3.length; i++) {
        cartona += `
                    <img src="img/bullet1.png" alt="bullet" style = "left:${bulletGroupLevel3[i].left}% ; top:${bulletGroupLevel3[i].top}%">`
    }
    bulletLevel3.innerHTML = cartona;
}

function moveBulletLevel3() {
    for (let i = 0; i < bulletGroupLevel3.length; i++) {
        bulletGroupLevel3[i].top = bulletGroupLevel3[i].top - 2;
    }
}

function addEggLevel3() {

    let cartona = "";
    for (let i = 0; i < eggGroupLevel3.length; i++) {
        cartona += `
                    <img src="img/Egg.png" alt="bullet" style = "left:${eggGroupLevel3[i].left}% ; top:${eggGroupLevel3[i].top}%">`
    }
    eggLevel3.innerHTML = cartona;
}

function moveEggLevel3() {
    for (let i = 0; i < eggGroupLevel3.length; i++) {
        eggGroupLevel3[i].top = eggGroupLevel3[i].top + 1;
        if (eggGroupLevel3[i].top == weaponPlaceLevel3.top - 3 && eggGroupLevel3[i].left <= weaponPlaceLevel3.left + 2 &&
            eggGroupLevel3[i].left >= weaponPlaceLevel3.left - 2) {
            level3.classList.add("d-none");
            scoreLevel3.classList.add("d-none");
            winLevel3.classList.add("d-none");
            gameOverLevel3.classList.remove("d-none");
            gameOverScoreLevel3.innerHTML = `Your score ${(36 - (bigChickenGroupLevel3.length + chickenGroupLevel3.length)) * 10}`;
            gameOverTrackLevel3.play();
            bulletGroupLevel3 = [];
            bigChickenGroupLevel3 = [];
            chickenGroupLevel3 = [];
            eggGroupLevel3 = [];
            clearGameLevel3();
            tryAgainLevel3();
        }
    }
}

function controlsLevel3() {
    document.addEventListener("keydown", function (e) {
        if (e.key == "ArrowLeft") {
            if (weaponPlaceLevel3.left > 5) {
                weaponPlaceLevel3.left = weaponPlaceLevel3.left - 1
            }
        }
        if (e.key == "ArrowRight") {
            if (weaponPlaceLevel3.left < 95) {
                weaponPlaceLevel3.left = weaponPlaceLevel3.left + 1
            }
        }
        if (e.key == " ") {
            bulletGroupLevel3.push({ left: weaponPlaceLevel3.left, top: weaponPlaceLevel3.top - 3 })
            eggGroupLevel3.push({ left: bigChickenGroupLevel3[0].left, top: bigChickenGroupLevel3[0].top + 40 });

            addBulletLevel3();
            weaponTrackLevel3.play();
        }
        addWeaponLevel3();
    })
}

function addWeaponLevel3() {
    weaponLevel3.style.left = weaponPlaceLevel3.left + "%";
    weaponLevel3.style.top = weaponPlaceLevel3.top + "%";
}

function killChickenLevel3() {

    for (let i = 0; i < chickenGroupLevel3.length; i++) {
        for (let e = 0; e < bulletGroupLevel3.length; e++) {
            if (chickenGroupLevel3.length > 0 && bulletGroupLevel3.length > 0) {
                if (bulletGroupLevel3[e].left >= chickenGroupLevel3[i].left - 3 && bulletGroupLevel3[e].left <= chickenGroupLevel3[i].left + 3
                    && bulletGroupLevel3[e].top <= chickenGroupLevel3[i].top + 10) {
                    bulletGroupLevel3.splice(e, 1);
                    chickenGroupLevel3.splice(i, 1)
                    if (chickenGroupLevel3.length == 0 && bigChickenGroupLevel3.length == 0) {
                        weaponLevel3.classList.add("weaponMove");
                        moveLevel3();
                    }

                }
                else if (bulletGroupLevel3[e].top < chickenGroupLevel3[i].top - 30) {

                    bulletGroupLevel3.splice(e, 1);

                }

            }
        }
    }

    for (let i = 0; i < bigChickenGroupLevel3.length; i++) {
        for (let e = 0; e < bulletGroupLevel3.length; e++) {
            if (bigChickenGroupLevel3.length > 0 && bulletGroupLevel3.length > 0) {
                if (bulletGroupLevel3[e].left >= bigChickenGroupLevel3[i].left - 6 && bulletGroupLevel3[e].left <= bigChickenGroupLevel3[i].left + 6
                    && bulletGroupLevel3[e].top <= bigChickenGroupLevel3[i].top + 40) {
                    bulletGroupLevel3.splice(e, 1);
                    bigChickenGroupLevel3.splice(i, 1)
                    if (bigChickenGroupLevel3.length == 0 && chickenGroupLevel3.length == 0) {
                        weaponLevel3.classList.add("weaponMove");
                        moveLevel3();
                    }

                }
                else if (bulletGroupLevel3[e].top < bigChickenGroupLevel3[i].top - 30) {

                    bulletGroupLevel3.splice(e, 1);

                }

            }
        }
    }
}

function moveLevel3() {
    setTimeout(() => {
        level3.classList.add("d-none");
        scoreLevel3.classList.add("d-none");
        winLevel3.classList.remove("d-none");
        gameOverLevel3.classList.add("d-none");
        victoryScoreLevel3.innerHTML = `Your score ${(36 - (bigChickenGroupLevel3.length + chickenGroupLevel3.length)) * 10}`;
        victoryTrackLevel3.play();
        clearGameLevel3();
        playAgain();
    }, 1000);
}


function tryAgainLevel3() {
    document.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && winLevel3.classList.contains("d-none")) {
            location.href = "index.html";
        }

    })
}

let gameIntervalLevel3;
let chickenIntervalLevel3;
let eggIntervalLevel3;

function gameLoopLevel3() {
    addBulletLevel3();
    moveBulletLevel3();
    addEggLevel3();

    addChickenLevel3();
    killChickenLevel3();
}

function chickenLoopLevel3() {
    moveChickenLevel3();

}

function eggLoopLevel3() {
    moveEggLevel3();

}

function clearGameLevel3() {
    clearInterval(gameIntervalLevel3);
    clearInterval(chickenIntervalLevel3);
    clearInterval(eggIntervalLevel3);
}


document.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && weaponLevel3.classList.contains("d-none") && JSON.parse(sessionStorage.getItem("mode")) == "option1") {
        startLevel3.classList.add("d-none");
        level3.style.backgroundImage = "url(img/background.jpg)"
        scoreLevel3.classList.remove("d-none");
        weaponLevel3.classList.remove("d-none");
        gameIntervalLevel3 = setInterval(gameLoopLevel3, 50);
        chickenIntervalLevel3 = setInterval(chickenLoopLevel3, 1500);
        eggIntervalLevel3 = setInterval(eggLoopLevel3, 200);
        level3Intro.play();
        controlsLevel3();
    }
    else if (e.key == "Enter" && weaponLevel3.classList.contains("d-none") && JSON.parse(sessionStorage.getItem("mode")) == "option2") {
        startLevel3.classList.add("d-none");
        level3.style.backgroundImage = "url(img/background.jpg)"
        scoreLevel3.classList.remove("d-none");
        weaponLevel3.classList.remove("d-none");
        gameIntervalLevel3 = setInterval(gameLoopLevel3, 50);
        chickenIntervalLevel3 = setInterval(chickenLoopLevel3, 1000);
        eggIntervalLevel3 = setInterval(eggLoopLevel3, 150);
        level3Intro.play();
        controlsLevel3();
    }
    else if (e.key == "Enter" && weaponLevel3.classList.contains("d-none") && JSON.parse(sessionStorage.getItem("mode")) == "option3") {
        startLevel3.classList.add("d-none");
        level3.style.backgroundImage = "url(img/background.jpg)"
        scoreLevel3.classList.remove("d-none");
        weaponLevel3.classList.remove("d-none");
        gameIntervalLevel3 = setInterval(gameLoopLevel3, 50);
        chickenIntervalLevel3 = setInterval(chickenLoopLevel3, 500);
        eggIntervalLevel3 = setInterval(eggLoopLevel3, 100);
        level3Intro.play();
        controlsLevel3();
    }
})


function playAgain() {
    document.addEventListener("keydown", function (e) {
        if (e.key == "Enter" && level3.classList.contains("d-none")) {
            location.href = "index.html";
            clearGameLevel3();
        }

    })
}









