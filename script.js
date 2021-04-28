// -- создание и загрузка графических элементов
alert("Начать игру");
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const naruto = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();
const logo = new Image()

const gap = 90; // -- отступ
let score = 0; // --Счёт 

naruto.src = "media/img/naruto.png";
bg.src = "media/img/mt.jpg";
fg.src = "media/img/fg_pinkk.png";
pipeUp.src = "media/img/pipeUp_pink.png";
pipeBottom.src = "media/img/pipeBottom_pink.png";
logo.src = "media/img/logo.png";
// -- /создание и загрузка графических элементов


// -- создание и загрузка аудио элементов
const fly = new Audio();
const score_audio = new Audio();

fly.src = "media/audio/fly.mp3";
score_audio.src = "media/audio/score.mp3";
// -- создание и загрузка аудио элементов


// --управление naruto
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;

    fly.play();
}
// --управление naruto


// -- блоки (pipe)
let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};
// -- /блоки (pipe)

// --позиционирование naruto
let xPos = 10;
let yPos = 150;
const grav = 1.7; // --гравитация 
// --/позиционирование naruto

// -- позиционирование графических элементов
function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        // Генерация блоков (pipe) 
        if(pipe[i].x == 110) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Логика столкновения naruto и pipe
        if(xPos + naruto.width >= pipe[i].x
            && xPos <=pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipe.height
                || yPos + naruto.height >= pipe[i].y 
                + pipeUp.height + gap) 
                || yPos + naruto.height >= cvs.height - fg.height) {
                    location.reload();
                }
        
        // Счётчик 
        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(naruto, xPos, yPos);

    yPos += grav;
   
    ctx.fillStyle = "#fff";
    ctx.font = "30px Roboto";
    ctx.fillText("Счёт: " + score, 15, cvs.height - 20);

    requestAnimationFrame(draw);
}
pipeBottom.onload = draw;
// -- /позиционирование и загрузка графических элементов