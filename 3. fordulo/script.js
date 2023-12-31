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
let nehezLista =[
    {
        nehezsegNev: "konnyu",
        hanyDisz: 5,
        helyezesek: new Array(),
        felhasznaloLerakott: new Array(),
    },
    {
        nehezsegNev: "kozepes",
        hanyDisz: 10,
        helyezesek: new Array(),
        felhasznaloLerakott: new Array(),
    },
    {
        nehezsegNev: "nehez",
        hanyDisz: 15,
        helyezesek: new Array(),
        felhasznaloLerakott: new Array(),
    }
]

var nehezseg = 0;

function tortaRajz(img,ctx,canvas,szel,mag) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imageX = (canvasWidth - szel)/2; // Center X
    const imageY = (canvasHeight - mag)/2; // Center Y
    ctx.drawImage(img, imageX, imageY,szel,mag);
}

imgMinta.onload = function(){
    tortaRajz(imgMinta,ctxMinta,canvasMinta,450,450);
    tortaRajz(imgJatek,ctxJatek,canvasJatek,900,900);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function megjelenit() {
    mp++;
    if (mp == 60) {
        mp = 0;
        perc++;
    }
    let p = document.getElementById("stopper");
    percStr = perc.toString().padStart(2, '0');
    mpStr = mp.toString().padStart(2, '0');
    p.innerText = percStr + ":" + mpStr;
}

let idozito;
let mp = 0;
let perc = 0;

function indit(gomb){
    nehezseg = nehezLista.findIndex((c)=>c.nehezsegNev == document.getElementById("nehezseg").value);
    nehezseg = nehezLista[nehezseg];
    keprekurziv(0,nehezseg.hanyDisz)
    gomb.disabled = "true";
    eventRak();
    //timer start + reset
    clearInterval(idozito);
    mp = 0;
    perc = 0;
    idozito = setInterval(megjelenit, 1000);
    document.getElementById("stopper").innerText = "00:00";
}
function keprekurziv(i,limit){
    if(i==limit)
    {
        return;
    }
    var kep = document.createElement("img");
    kep.src = kepek[random(0,kepek.length)]; 
    var position = randomPozicio(canvasMinta, kep);
    nehezseg.helyezesek.push({position,kep});
    kep.onload = function(){
        ctxMinta.shadowColor = "black";
        ctxMinta.shadowBlur = 15;
        ctxMinta.drawImage(kep, position.x, position.y, 50,50);
        keprekurziv(i+1,limit);
    }
}


function checkForOverlap(ujk) {
  for (const coords of nehezseg.helyezesek) {
    const distance = Math.sqrt(
      Math.pow(coords.position.x - ujk.x, 2) + Math.pow(coords.position.y - ujk.y, 2)
    );
    if (distance < 50) {
      return true;
    }
  }
  return false;
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
        kep.style.width = "100px";
        kep.style.height = "100px";
        kep.id=i+"_kep";
        kep.addEventListener('dragstart', function (e) {
            var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
            e.dataTransfer.setData('kepId', this.id);
            e.dataTransfer.setData('kepOffsetX', e.clientX-this.offsetLeft);
            e.dataTransfer.setData('kepOffsetY', e.clientY-(this.offsetTop-Number(scrollTop)));
            // e.dataTransfer.setData('ranyomOffest',kep.)
        });

        div.appendChild(kep);
    }
}
keplerakas();

function ResetGomb(){
    //törlés aztán újra rajz
    ctxJatek.globalCompositeOperation = 'destination-out';
    ctxJatek.fillRect(0, 0, canvasJatek.width, canvasJatek.height);
    ctxJatek.globalCompositeOperation = 'source-over';
    tortaRajz(imgJatek,ctxJatek,canvasJatek,900,900);
}

function PontozGomb(){
    let tavolsagok = new Array();
    for(let i= 0;i<nehezseg.helyezesek.length;i++)
    {
        let elem = pontozas_legkoz(nehezseg.helyezesek[i]);
        if(document.getElementById(elem.elem.draggedImageId).src==nehezseg.helyezesek[i].kep.src)
        {
            tavolsagok.push(Math.floor(elem.min));
        }
        else{
            tavolsagok.push(900);
        }
    }
    vegsoPontozas(tavolsagok.reduce((partialSum, a) => partialSum + a, 0));
    clearInterval(idozito);
    mp = 0;
    perc = 0;
}

function vegsoPontozas(pontszam){
    let eredmeny = nehezseg.helyezesek.length*900-pontszam;
    let gg = Math.floor(eredmeny/(nehezseg.helyezesek.length*900)*1000);
    ranglista(gg);
    alert("az ön pontszáma: 1000/"+gg);
    restart();
}

function eventRak(){
    // Prevent the default behavior for dragover and drop events
    canvasJatek.addEventListener('dragover',function (e) {
        e.preventDefault();
    });

    canvasJatek.addEventListener('drop',function (e) {
        e.preventDefault();
        var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
        // Get the ID of the dragged image from the drag data
        const draggedImageId = e.dataTransfer.getData('kepId');
        const kepOffsetX = e.dataTransfer.getData('kepOffsetX');
        const kepOffsetY = e.dataTransfer.getData('kepOffsetY');
        const draggedImage = document.getElementById(draggedImageId);

        // Get the mouse coordinates relative to the canvas

        const x = e.clientX - canvasJatek.offsetLeft-Number(kepOffsetX);
        const y = e.clientY - canvasJatek.offsetTop+scrollTop-Number(kepOffsetY);
        nehezseg.felhasznaloLerakott.push({x,y,draggedImageId});

        // Draw the image onto the canvas at the mouse coordinates
        ctxJatek.drawImage(draggedImage, x, y, draggedImage.width, draggedImage.height);
    });
}


function pontozas_legkoz(koordinata){
    let min = 99999999999;
    let elem = undefined;
    for(let i = 0; i <nehezseg.felhasznaloLerakott.length;i++)
    {
        var temp = Math.sqrt(Math.pow(koordinata.position.x*2 - nehezseg.felhasznaloLerakott[i].x,2) + Math.pow(koordinata.position.y*2 - nehezseg.felhasznaloLerakott[i].y,2));
        if (temp < min){
            min = temp;
            elem = nehezseg.felhasznaloLerakott[i];
        }
    }
    return({elem,min});
}

function ranglista(pont){
    let div = document.getElementById(nehezseg.nehezsegNev);
    let legjobbPont = div.innerText.split(" ")[0];
    if(div.innerHTML=="xxx xx:xx")
    {
        div.innerHTML="";
        let par = document.createElement("p");
        par.innerText=pont+" "+document.getElementById("stopper").innerHTML;
        div.appendChild(par);
    }
    else if(Number(legjobbPont) < Number(pont)){
        div.innerHTML="";
        let par = document.createElement("p");
        par.innerText=pont+" "+document.getElementById("stopper").innerHTML;
        div.appendChild(par);
    }
}

function restart(){
    nehezseg.helyezesek = new Array();
    nehezseg.felhasznaloLerakott = new Array();
    nehezseg = 0;

    ctxMinta.globalCompositeOperation = 'destination-out';
    ctxMinta.fillRect(0, 0, canvasMinta.width, canvasMinta.height);
    ctxMinta.globalCompositeOperation = 'source-over';
    tortaRajz(imgMinta,ctxMinta,canvasMinta,450,450);

    ResetGomb();
    
    document.getElementById("start").disabled=false;
}