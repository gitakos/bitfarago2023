var kapcsolo = true;
var vadaszok_szama = 0;
var bitek_szama = 0;
var vadasz = "V";
var bit = "B";
var tabla = document.createElement("table");
var levadaszottbitek = 0;

function vege_e(){
    if(levadaszottbitek == 3){
        
        alert("Vége a játéknak mint a három bitet sikeresen levadásztad");
        location.reload();
    }
}

function tablaGeneralas() {
    var div = document.getElementById("jatekter");
    for (let i = 0; i < 8; i++) {
        var row = document.createElement("tr");
        for (let j = 0; j < 8; j++) {
            var cell = document.createElement("td");
            cell.id = i + " " + j;
            cell.addEventListener("click", katt(cell));

            row.appendChild(cell);
        }
        tabla.appendChild(row);
    }

    div.appendChild(tabla);
}

tablaGeneralas();

let pozicio = "0 0";

function katt(cell) {
    return function() {
        if (kapcsolo){
            cell.innerText = vadasz;
            vadaszok_szama++;
            var p = document.getElementById("aktualisankivalasztva");
            p.innerText = "Aktuálisan kiválasztva: B(it)";
            kapcsolo = false;

            pozicio = cell.id;


        }
            
        else{
            cell.innerText = bit;           
            bitek_szama++;
            if(bitek_szama ==3){
                bit = "";
                takarit(tabla);
                setTimeout(function() {
                    jatekIndul();
                }, 1000);
            }

        }          
    };
}

function jatekIndul(){
    alert("indul a játék");
    document.getElementById("aktualisankivalasztva").innerText = "A játék folyamatban van";
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(document.getElementById(i + " " + j).innerText == "V"){
                document.getElementById(i + " " + j).style.backgroundColor = "red";
            }
        }
    }
}

function takarit(table) {
    var cells = table.getElementsByTagName("td"); 
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        var newCell = cell.cloneNode(true); 
        cell.parentNode.replaceChild(newCell, cell);
    }
}

document.onkeydown = function(e) {
    console.log(pozicio);
    document.getElementById(pozicio).innerText="";
    if (e.key == "ArrowDown") {
        console.log("le");       
        if(pozicio[0]-0+1<8)
        {
            pozicio= pozicio[0]-0+1+" "+pozicio[2];
        }
    }
    else if(e.key == "ArrowUp"){
        console.log("fel");
        if(pozicio[0]-1>=0)
        {
            pozicio= pozicio[0]-0-1+" "+pozicio[2];
        }
    }
    else if (e.key == "ArrowRight") {
        console.log("jobb");
        if (Number(pozicio.split(' ')[1]) + 1 < 8) {
            pozicio = pozicio.split(' ')[0] + " " + (Number(pozicio.split(' ')[1]) + 1);
        }
    }
    else if (e.key == "ArrowLeft") {
        console.log("balra");
        if (Number(pozicio.split(' ')[1]) - 1 >= 0) {
            pozicio = pozicio.split(' ')[0] + " " + (Number(pozicio.split(' ')[1]) - 1);
        }
    }
    console.log(pozicio);
    if(document.getElementById(pozicio).innerText == "B"){

        levadaszottbitek++;
    }
    vege_e();
    document.getElementById(pozicio).innerText="V";
};