const canvasMinta = document.getElementById("minta");
const ctxMinta = canvasMinta.getContext("2d");
const imgMinta = document.createElement("img");
canvasMinta.height = 450;
canvasMinta.width = 450;
imgMinta.src="kepek/alaptorta.png";

const canvasJatek = document.getElementById("jatek");
const ctxJatek = canvasJatek.getContext("2d");
const imgJatek = document.createElement("img");
canvasJatek.height = 900;
canvasJatek.width = 900;
imgJatek.src="kepek/alaptorta.png";
var kepek = ["kepek/csokikocka.png","kepek/csokiskeksz.png","kepek/gyertya.png","kepek/marcipan_elefant.png","kepek/marcipan_macska.png","kepek/marcipan_maci.png","kepek/nyaloka.png"];
//document.body.appendChild(img);
let nehezLista =[
    {
        nehezsegNev: "konnyu",
        hanyDisz: 5,
        helyezesek: new Array(),
    },
    {
        nehezsegNev: "kozepes",
        hanyDisz: 10,
        helyezesek: new Array(),
    },
    {
        nehezsegNev: "nehez",
        hanyDisz: 15,
        helyezesek: new Array(),
    }
]

var nehezseg = 0;

function tortaRajz(img,ctx,canvas,szel,mag) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imageX = (canvasWidth - szel)/2; // Center X
    const imageY = (canvasHeight - mag)/2; // Center Y

    console.log(imageX,imageY)
    ctx.drawImage(img, imageX, imageY,szel,mag);
    console.log(img,ctx,canvas,szel,mag);
}

imgMinta.onload = function(){
    tortaRajz(imgMinta,ctxMinta,canvasMinta,450,450);
    tortaRajz(imgJatek,ctxJatek,canvasJatek,900,900);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


function indit(gomb){
    nehezseg = nehezLista.findIndex((c)=>c.nehezsegNev == document.getElementById("nehezseg").value);
    nehezseg = nehezLista[nehezseg];
    console.log("rajta cigányok!");
    keprekurziv(0,nehezseg.hanyDisz)
    gomb.disabled = "true";
}
function keprekurziv(i,limit){
    if(i==limit)
    {
        return;
    }
    var kep = document.createElement("img");
    kep.src = kepek[random(0,kepek.length)]; 
    var position = randomPozicio(canvasMinta, kep);
    nehezseg.helyezesek.push(position);
    kep.onload = function(){
        ctxMinta.shadowColor = "black";
        ctxMinta.shadowBlur = 15;
        ctxMinta.drawImage(kep, position.x, position.y, 50,50);
        keprekurziv(i+1,limit);
    }
}


function checkForOverlap(newCoordinates) {
  for (const coords of nehezseg.helyezesek) {
    const distance = Math.sqrt(
      Math.pow(coords.x - newCoordinates.x, 2) + Math.pow(coords.y - newCoordinates.y, 2)
    );
    // Set a minimum distance to consider as non-overlapping
    if (distance < 50) {
      return true; // Overlapping
    }
  }
  return false; // Non-overlapping
}

function randomPozicio(canvas, image) {
    var maxX = canvas.width-50;//-50 alap
    var maxY = canvas.height-50;
    var randomX = random(30,maxX-30);
    var randomY = random(30,maxY-30);
    let obj = { x: randomX, y: randomY }
    while(checkForOverlap(obj)){//waltuh, dont put the break into the while cycle
        randomX = random(30,maxX-30);
        randomY = random(30,maxY-30);
        obj = { x: randomX, y: randomY };
    }
    return { x: randomX, y: randomY };
}

function keplerakas(){
    var div = document.getElementById("lerakhato_elemek");
    for (let i = 0; i < kepek.length; i++) {
        var kep = document.createElement("img");
        kep.src = kepek[i];
        kep.className = "alapkep";
        kep.style.width = "200px";
        kep.style.height = "200px";

        div.appendChild(kep);
    }
}
keplerakas();



// Set up the dragstart event on the image
image.addEventListener('dragstart', (e) => {
    // Set the drag data to be the image's ID
    e.dataTransfer.setData('text/plain', image.id);
});

// Prevent the default behavior for dragover and drop events
canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();

    // Get the ID of the dragged image from the drag data
    const draggedImageId = e.dataTransfer.getData('text/plain');
    const draggedImage = document.getElementById(draggedImageId);

    // Get the mouse coordinates relative to the canvas
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    // Draw the image onto the canvas at the mouse coordinates
    ctx.drawImage(draggedImage, x, y, draggedImage.width, draggedImage.height);
});