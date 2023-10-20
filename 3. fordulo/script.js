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
//document.body.appendChild(img);

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



