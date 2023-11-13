//  2.feladat eleje
class Ball {
    constructor(posx, posy, color, direction, speed) {
        this.posx=posx;
        this.posy=posy;
        this.color=color;
        this.direction=direction;
        this.speed=speed;
        this.size=20;
    }
}



function toRadian(angle){
    return angle*Math.PI/180;
}

var ballObjects = [new Ball(50,40,"#ffcccc",toRadian(30),3.5)];

function drawPong(){
    var c = document.getElementById("feladat2");
    var ctx = c.getContext("2d");
    ctx.fillStyle="black"
    ctx.fillRect(0, pong, 10, 50);
}

pong = 225;

var speedmod=0;


function talalate(){

    var labdaPos = ballObjects[0].posy

    console.log(labdaPos,pong)
    if (pong+25 <= labdaPos+45 && pong+25 >= labdaPos-45) {
        return false;
    }
    return true;
}

function moveBall(ballObj, canvasWidth, canvasHeight){
    // Ball boundaries

    var vege;

    var xMinimum=ballObj.size;
    var xMaximum=canvasWidth-ballObj.size;
    var yMinimum=ballObj.size;
    var yMaximum=canvasHeight-ballObj.size;
    // Move the ball
    var xChange=ballObj.speed*Math.cos(ballObj.direction);
    var yChange=ballObj.speed*Math.sin(ballObj.direction);
    ballObj.posx+=xChange;
    ballObj.posy+=yChange;
    // Bounce back from the sides
    // bal fall már nincs lol
    if(ballObj.posx<xMinimum+10){
        vege = talalate();
        console.log(vege);
        if(vege){
            clearInterval(myVar)
            clearInterval(countInt);
        }
        if(!vege){
            ballObj.posx=(xMinimum+10)+((xMinimum+10)-ballObj.posx);
            if (ballObj.direction>0) ballObj.direction=Math.PI-ballObj.direction;
            else ballObj.direction=-Math.PI-ballObj.direction;
            ballObjects[0].speed+= 0.1
            speedChange();
        }
    }
    if (ballObj.posx>xMaximum)
    {
        ballObj.posx=xMaximum-(ballObj.posx-xMaximum);
        if (ballObj.direction>0) ballObj.direction=Math.PI-ballObj.direction;
        else ballObj.direction=-Math.PI-ballObj.direction;
        ballObjects[0].speed+= 0.1
        speedChange();
    }
    if (ballObj.posy<yMinimum)
    {
        ballObj.posy=yMinimum+(yMinimum-ballObj.posy);
        ballObj.direction=-ballObj.direction;
        ballObjects[0].speed+= 0.1
        speedChange();
    }
    else if (ballObj.posy>yMaximum)
    {
        ballObj.posy=yMaximum-(ballObj.posy-yMaximum);
        ballObj.direction=-ballObj.direction;
        ballObjects[0].speed+= 0.1
        speedChange();
    }
    }
    
    function updateObjects(){
    var c = document.getElementById("feladat2");
    var ctx = c.getContext("2d");
    var canvasHeight=c.offsetHeight;
    var canvasWidth=c.offsetWidth;
    for (var index=0; index<ballObjects.length; index++){
        moveBall(ballObjects[index], canvasWidth, canvasHeight);
    }
    drawPong();
}

function refreshCanvas() {
var c = document.getElementById("feladat2");
var ctx = c.getContext("2d");
var canvasHeight=c.offsetHeight;
var canvasWidth=c.offsetWidth;
ctx.clearRect(0, 0, canvasHeight, canvasWidth);

updateObjects();

for (var index=0; index<ballObjects.length; index++){
    ctx.beginPath();
    ctx.arc(ballObjects[index].posx, ballObjects[index].posy, ballObjects[index].size, 0, 2 * Math.PI);
    ctx.fillStyle = ballObjects[index].color;
    ctx.fill();
}
}

var myVar = setInterval(refreshCanvas, 30);


document.onkeydown = function(e) {
    if (e.key == "ArrowUp") {
        console.log("fel")
        if (pong >= 0) {
            pong-= 5;
        }
    }
    else if(e.key == "ArrowDown"){
        console.log("le")
        if (pong <= 450) {
            pong+= 5;
        }
    }
};

function speedChange(){
    speed = ballObjects[0].speed
    speed = speed.toFixed(1)
    document.getElementById("sebesseg").innerHTML ="Sebesség: " + speed
}

function updateTimer() {
    let mp = 1;
    countInt = setInterval(function () {
        const perc = Math.floor(mp / 60);
        const maradek = mp % 60;
        document.getElementById("counter").innerText = (perc < 10 ? '0' : '') + perc + ':' + (maradek < 10 ? '0' : '') + maradek;
        mp++;
    }, 1000);
}

let countInt;


window.onload = updateTimer;
speedChange();
