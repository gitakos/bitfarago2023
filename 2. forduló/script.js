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
        for (var j = 0; j < 8; j++) {
            tablaHatterTar.push(0);
            var cella = document.createElement("td");
            cella.id = mezo;
            cella.textContent = mezo;
            sor.appendChild(cella);
            mezo++;
        }

        tabla.appendChild(sor);
    }
}
function babuGen() {
    for (let index = 0; index < babuTemplate.length; index++) {
        tablaHatterTar[index] = babuTemplate[index];
    }
    console.log(babuTemplate);
    for (
        let index = tablaHatterTar.length - 1;
        index > tablaHatterTar.length - babuTemplate.length - 1;
        index--
    ) {
        console.log(index);
        tablaHatterTar[index] =
            babuTemplate[
                index - (tablaHatterTar.length - babuTemplate.length + index)
            ];
    }
}
function kimutat() {
    var tabla = document.getElementById("tablaTartalom");
    var cellak = tabla.getElementsByTagName("td");
    for (var i = 0; i < cellak.length; i++) {
        cellak[i].textContent = tablaHatterTar[i];
    }
}
tablaGen();
babuGen();
kimutat();
