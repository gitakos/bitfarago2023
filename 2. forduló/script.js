var data = [
    {
        babunev: "paraszt",
        pont: 1,
        "lepett-e": false,
        szin: null
    },
    {
        babunev: "futo",
        pont: 2,
        "lepett-e": false,
        szin: null
    },
    {
        babunev: "lo",
        pont: 2,
        "lepett-e": false,
        szin: null
    },
    {
        babunev: "kiraly",
        pont: 2,
        "lepett-e": false,
        szin: null
    },
    {
        babunev: "bastya",
        pont: 3,
        "lepett-e": false,
        szin: null
    },
    {
        babunev: "kiralyno", // legalábbis gondolom, a feladatban az van hogy vezér
        pont: 5,
        "lepett-e": false,
        szin: null
    },
];

const babuTemplate = [
    "bastya",
    "lo",
    "futo",
    "kiraly",
    "kiralyno",
    "futo",
    "lo",
    "bastya",
    "paraszt",
    "paraszt",
    "paraszt",
    "paraszt",
    "paraszt",
    "paraszt",
    "paraszt",
    "paraszt",
];
var tablaHatterTar = [];
function tablaGen() {
    var tabla = document.getElementById("tablaTartalom");
    var mezo = 0;
    for (var i = 0; i < 12; i++) {
        var sor = document.createElement("tr");
        tablaHatterTar.push(new Array());
        for (var j = 0; j < 8; j++) {
            // tele pakolom mindegyik-et majd kesobb kiszedem
            tablaHatterTar[i].push( {
                babunev: "",
                pont: 0,
                "lepett-e": false,
                szin: null
            },);

            var cella = document.createElement("td");
            cella.id = mezo;
            cella.dataset.sor = i;
            cella.dataset.oszlop = j;
            // cella.textContent = mezo;
            sor.appendChild(cella);
            mezo++;
        }

        tabla.appendChild(sor);
    }
}
function babuGen() {
    tablaHatterTar[0] = new Array();
    tablaHatterTar[1] = new Array();
    tablaHatterTar[10] = new Array();
    tablaHatterTar[11] = new Array();
    for (let index = 0; index < babuTemplate.length; index++) {
        let cucc = Object.assign({}, data.find(x=>x.babunev==babuTemplate[index]));
        cucc.szin = "fekete";
        tablaHatterTar[Math.floor(index/8)].push(cucc);
    }
    babuTemplate.reverse();
    console.log(tablaHatterTar);
    for (let index = 96-babuTemplate.length; index < 96; index++) { 
        let cucc = Object.assign({}, data.find(x=>x.babunev==babuTemplate[index-(96-babuTemplate.length)]));
        cucc.szin = "feher";
        console.log(Math.floor(index/8));
        tablaHatterTar[Math.floor(index/8)].push(cucc);
    }
    console.log(tablaHatterTar);
}
function kimutat() {
    const tabla = document.getElementById("tablaTartalom");
    for (var i = 0; i < tablaHatterTar.length; i++) {
        const sor = tabla.rows[i]
        for (let j = 0; j < tablaHatterTar[i].length; j++) {
            const element = tablaHatterTar[i][j];
            const cella = sor.cells[j]
            if(element.babunev != ""){
                cella.innerHTML = element.babunev;
            }
        }
    }
}

function mozgas(){

}
tablaGen();
babuGen();
kimutat();
