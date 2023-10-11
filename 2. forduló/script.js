var data = [
    {
        babunev: "paraszt",
        pont: 1,
        lepette: false,
        szin: null,
        mj: false
    },
    {
        babunev: "futo",
        pont: 2,
        lepette: false,
        szin: null
    },
    {
        babunev: "lo",
        pont: 2,
        lepette: false,
        szin: null
    },
    {
        babunev: "kiraly",
        pont: 2,
        lepette: false,
        szin: null
    },
    {
        babunev: "bastya",
        pont: 3,
        lepette: false,
        szin: null
    },
    {
        babunev: "kiralyno", // legalábbis gondolom, a feladatban az van hogy vezér
        pont: 5,
        lepett: false,
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
var kor =0;
var maxKor;
var kivalasztott = null;
var jatekosJoker = [false,false];
var duplaKor = [false,false];
var jokerNyomvae = false;
var duplaNyomvae = false;

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
                lepette: false,
                szin: null
            },);

            var cella = document.createElement("td");
            cella.id = mezo;
            cella.dataset.sor = i;
            cella.dataset.oszlop = j;
            cella.dataset.lepheto = false;
            cella.setAttribute("onclick","katt(this)")
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
    for (let index = 96-babuTemplate.length; index < 96; index++) {
        let cucc = Object.assign({}, data.find(x=>x.babunev==babuTemplate[index-(96-babuTemplate.length)]));
        cucc.szin = "feher";
        tablaHatterTar[Math.floor(index/8)].push(cucc);
    }
}
function kimutat() {
    const tabla = document.getElementById("tablaTartalom");
    for (var i = 0; i < tablaHatterTar.length; i++) {
        const sor = tabla.rows[i]
        for (let j = 0; j < tablaHatterTar[i].length; j++) {
            const cella = sor.cells[j]
            cella.innerHTML = "";
            cella.dataset.lepheto = false;
            cella.className= "";
        }
    }


    for (var i = 0; i < tablaHatterTar.length; i++) {
        const sor = tabla.rows[i]
        for (let j = 0; j < tablaHatterTar[i].length; j++) {
            const element = tablaHatterTar[i][j];
            const cella = sor.cells[j]
            if(element.babunev != ""){
                let kep = document.createElement("img");
                kep.src = "kepek/"+element.szin+"_"+element.babunev+"_sima.png"
                kep.className = "babuKep";
                cella.appendChild(kep)
            }
        }
    }
    

}
function lephetEOda(sor,oszlop){
    if(sor>-1&&sor<12&&oszlop>-1&&oszlop<8)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function kimutatLehetsegesLepesek(lehetsegesLepesek){
    const tabla = document.getElementById("tabla")
    for (let i = 0; i < lehetsegesLepesek.length; i++) {
        const row = tabla.rows[lehetsegesLepesek[i][0]]
        const cella = row.cells[lehetsegesLepesek[i][1]]
        let kep = document.createElement("img")
        kep.src ="kepek/lephet.png"
        kep.className="lephet"
        cella.appendChild(kep);
        cella.dataset.lepheto = true;
    }
}

function paraszt_mozog(td,babu){
    var lehetsegesLepesek = new Array();
    if(babu.szin == "fekete" && babu.mj == true){
        for (let i = 1; i < 4; i++) {
            if(lephetEOda(Number(td.dataset.sor)-i,Number(td.dataset.oszlop)))
            {
                if(tablaHatterTar[Number(td.dataset.sor)-i][Number(td.dataset.oszlop)].babunev=="")
                {
                    lehetsegesLepesek.push([Number(td.dataset.sor)-i,Number(td.dataset.oszlop)])
                }
                else
                {
                    break;
                }
            }
        }
        if (lephetEOda(Number(td.dataset.sor)-1,Number(td.dataset.oszlop)+1)) {
            if (tablaHatterTar[Number(td.dataset.sor)-1][Number(td.dataset.oszlop)+1].szin == "feher") {
                lehetsegesLepesek.push([Number(td.dataset.sor)-1,Number(td.dataset.oszlop)+1]);
            }
        }
        if (lephetEOda(Number(td.dataset.sor)-1,Number(td.dataset.oszlop)-1)) {
            if (tablaHatterTar[Number(td.dataset.sor)-1][Number(td.dataset.oszlop)-1].szin == "feher") {
                lehetsegesLepesek.push([Number(td.dataset.sor)-1,Number(td.dataset.oszlop)-1]);
            }
        }
        kimutatLehetsegesLepesek(lehetsegesLepesek);
    }
    else if (babu.szin == "feher" && babu.mj == true){
        for (let i = 1; i < 4; i++) {
            if(lephetEOda(Number(td.dataset.sor)+i,Number(td.dataset.oszlop)))
            {
                if(tablaHatterTar[Number(td.dataset.sor)+i][Number(td.dataset.oszlop)].babunev=="")
                {
                    lehetsegesLepesek.push([Number(td.dataset.sor)+i,Number(td.dataset.oszlop)])
                }
                else
                {
                    break;
                }
            }
        }
        if (lephetEOda(Number(td.dataset.sor)+1,Number(td.dataset.oszlop)+1)) {
            if (tablaHatterTar[Number(td.dataset.sor)+1][Number(td.dataset.oszlop)+1].szin == "fekete") {
                lehetsegesLepesek.push([Number(td.dataset.sor)+1,Number(td.dataset.oszlop)+1]);
            }
        }
        if (lephetEOda(Number(td.dataset.sor)+1,Number(td.dataset.oszlop)-1)) {
            if (tablaHatterTar[Number(td.dataset.sor)+1][Number(td.dataset.oszlop)-1].szin == "fekete") {
                lehetsegesLepesek.push([Number(td.dataset.sor)+1,Number(td.dataset.oszlop)-1]);
            }
        }
        kimutatLehetsegesLepesek(lehetsegesLepesek);
    }
    else if(babu.szin=="fekete")
    {
        for (let i = 1; i < 4; i++) {
            if(lephetEOda(Number(td.dataset.sor)+i,Number(td.dataset.oszlop)))
            {
                if(tablaHatterTar[Number(td.dataset.sor)+i][Number(td.dataset.oszlop)].babunev=="")
                {
                    lehetsegesLepesek.push([Number(td.dataset.sor)+i,Number(td.dataset.oszlop)])
                }
                else
                {
                    break;
                }
            }
        }
        if (lephetEOda(Number(td.dataset.sor)+1,Number(td.dataset.oszlop)+1)) {
            if (tablaHatterTar[Number(td.dataset.sor)+1][Number(td.dataset.oszlop)+1].szin == "feher") {
                lehetsegesLepesek.push([Number(td.dataset.sor)+1,Number(td.dataset.oszlop)+1]);
            }
        }
        if (lephetEOda(Number(td.dataset.sor)+1,Number(td.dataset.oszlop)-1)) {
            if (tablaHatterTar[Number(td.dataset.sor)+1][Number(td.dataset.oszlop)-1].szin == "feher") {
                lehetsegesLepesek.push([Number(td.dataset.sor)+1,Number(td.dataset.oszlop)-1]);
            }
        }
        kimutatLehetsegesLepesek(lehetsegesLepesek);
    }
    else
    {
        for (let i = 1; i < 4; i++) {
            if(lephetEOda(Number(td.dataset.sor)-i,Number(td.dataset.oszlop)))
            {
                if(tablaHatterTar[Number(td.dataset.sor)-i][Number(td.dataset.oszlop)].babunev=="")
                {
                    lehetsegesLepesek.push([Number(td.dataset.sor)-i,Number(td.dataset.oszlop)])
                }
                else
                {
                    break;
                }
            }
        }
        if (lephetEOda(Number(td.dataset.sor)-1,Number(td.dataset.oszlop)+1)) {
            if (tablaHatterTar[Number(td.dataset.sor)-1][Number(td.dataset.oszlop)+1].szin == "fekete") {
                lehetsegesLepesek.push([Number(td.dataset.sor)-1,Number(td.dataset.oszlop)+1]);
            }
        }
        if (lephetEOda(Number(td.dataset.sor)-1,Number(td.dataset.oszlop)-1)) {
            if (tablaHatterTar[Number(td.dataset.sor)-1][Number(td.dataset.oszlop)-1].szin == "fekete") {
                lehetsegesLepesek.push([Number(td.dataset.sor)-1,Number(td.dataset.oszlop)-1]);
            }
        }
        kimutatLehetsegesLepesek(lehetsegesLepesek);
    }
}
function bastya_mozog(td,babu){
    var lehetsegesLepesek = new Array();
    // jobbra
    for (let i = Number(td.dataset.oszlop)+1; i < 8; i++) {
        if (tablaHatterTar[td.dataset.sor][i].babunev ==  "") {
            lehetsegesLepesek.push([td.dataset.sor,i])
        }
        else{
            if((tablaHatterTar[td.dataset.sor][i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[td.dataset.sor][i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([Number(td.dataset.sor),i]);
            }
            break;
        }
    }
    //balra
    for (let i = Number(td.dataset.oszlop)-1; i >-1; i--) {
        if (tablaHatterTar[td.dataset.sor][i].babunev ==  "") {
            lehetsegesLepesek.push([td.dataset.sor,i])
        }
        else{
            if((tablaHatterTar[td.dataset.sor][i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[td.dataset.sor][i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([Number(td.dataset.sor),i]);
            }
            break;
        }
    }
    //fel
    for (let i = Number(td.dataset.sor)-1; i >-1; i--) {
        if (tablaHatterTar[i][td.dataset.oszlop].babunev ==  "") {
            lehetsegesLepesek.push([i,td.dataset.oszlop])
        }
        else{
            if((tablaHatterTar[i][td.dataset.oszlop].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[i][td.dataset.oszlop].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([i,Number(td.dataset.oszlop)]);
            }
            break;
        }
    }
    //le
    for (let i = Number(td.dataset.sor)+1; i <12; i++) {
        if (tablaHatterTar[i][td.dataset.oszlop].babunev ==  "") {
            lehetsegesLepesek.push([i,td.dataset.oszlop])
        }
        else{
            if((tablaHatterTar[i][td.dataset.oszlop].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[i][td.dataset.oszlop].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([i,Number(td.dataset.oszlop)]);
            }
            break;
        }
    }
    kimutatLehetsegesLepesek(lehetsegesLepesek);
}
function lo_mozog(td,babu){
    var lehetsegesLepesek = new Array();
    let mezok = [[Number(td.dataset.sor)+2,Number(td.dataset.oszlop)+1],
    [Number(td.dataset.sor)+1,Number(td.dataset.oszlop)+2],
    [td.dataset.sor-2,td.dataset.oszlop-1],
    [td.dataset.sor-1,td.dataset.oszlop-2],
    [Number(td.dataset.sor)+2,td.dataset.oszlop-1],
    [Number(td.dataset.sor)+1,td.dataset.oszlop-2],
    [td.dataset.sor-2,Number(td.dataset.oszlop)+1],
    [td.dataset.sor-1,Number(td.dataset.oszlop)+2]];

    for (let i = 0; i < mezok.length; i++) {
        if (lephetEOda(mezok[i][0],mezok[i][1])) {
            if(!(tablaHatterTar[mezok[i][0]][mezok[i][1]].szin=="feher" && babu.szin=="feher") &&!(tablaHatterTar[mezok[i][0]][mezok[i][1]].szin=="fekete" && babu.szin=="fekete") )
            {
                lehetsegesLepesek.push([mezok[i][0],mezok[i][1]]);
            }
        }
    }
    kimutatLehetsegesLepesek(lehetsegesLepesek);
}


function kiraly_mozog(td,babu){
    var lehetsegesLepesek = new Array();
    // jobbra
    for (let i = Number(td.dataset.oszlop)+1; i < Number(td.dataset.oszlop)+3&&i<8; i++) {
        if (tablaHatterTar[td.dataset.sor][i].babunev ==  "") {
            lehetsegesLepesek.push([td.dataset.sor,i])
        }
        else{
            if((tablaHatterTar[td.dataset.sor][i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[td.dataset.sor][i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([td.dataset.sor,i]);
            }
            break;
        }
    }
    //balra
    for (let i = Number(td.dataset.oszlop)-1; i >Number(td.dataset.oszlop)-3&&i>-1; i--) {
        if (tablaHatterTar[td.dataset.sor][i].babunev ==  "") {
            lehetsegesLepesek.push([td.dataset.sor,i])
        }
        else{
            if((tablaHatterTar[td.dataset.sor][i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[td.dataset.sor][i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([td.dataset.sor,i]);
            }
            break;
        }
    }
    //fel
    for (let i = Number(td.dataset.sor)-1; i >Number(td.dataset.sor)-3&&i>-1; i--) {
        if (tablaHatterTar[i][td.dataset.oszlop].babunev ==  "") {
            lehetsegesLepesek.push([i,td.dataset.oszlop])
        }
        else{
            if((tablaHatterTar[i][td.dataset.oszlop].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[i][td.dataset.oszlop].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([i,td.dataset.oszlop]);
            }
            break;
        }
    }
    //le
    for (let i = Number(td.dataset.sor)+1; i <Number(td.dataset.sor)+3&&i<12; i++) {
        if (tablaHatterTar[i][td.dataset.oszlop].babunev ==  "") {
            lehetsegesLepesek.push([i,td.dataset.oszlop])
        }
        else{
            if((tablaHatterTar[i][td.dataset.oszlop].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[i][td.dataset.oszlop].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([i,td.dataset.oszlop]);
            }
            break;
        }
    }

    var sor = Number(td.dataset.sor);
    var oszlop = Number(td.dataset.oszlop);

    // le-jobbra
    for (let i = 1; i <= 8&&i<3; i++) {
        if (!lephetEOda(sor+i,oszlop+i)) {
            break;
        }
        if (tablaHatterTar[sor+i][oszlop+i].babunev ==  "") {
            lehetsegesLepesek.push([sor+i,oszlop+i])
        }
        else{
            if((tablaHatterTar[sor+i][oszlop+i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[sor+i][oszlop+i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([sor+i,oszlop+i]);
            }
            break;
        }
    }
    //balra-le
    for (let i = 1; i <= 8&&i<3; i++) {
        if (!lephetEOda(sor+i,oszlop-i)) {
            break;
        }
        if (tablaHatterTar[sor+i][oszlop-i].babunev ==  "") {
            lehetsegesLepesek.push([sor+i,oszlop-i])
        }
        else{
            if((tablaHatterTar[sor+i][oszlop-i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[sor+i][oszlop-i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([sor+i,oszlop-i]);
            }
            break;
        }
    }
    //bal-fel
    for (let i = 1; i <= 8&&i<3; i++) {
        if (!lephetEOda(sor-i,oszlop-i)) {
            break;
        }
        if (tablaHatterTar[sor-i][oszlop-i].babunev ==  "") {
            lehetsegesLepesek.push([sor-i,oszlop-i])
        }
        else{
            if((tablaHatterTar[sor-i][oszlop-i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[sor-i][oszlop-i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([sor-i,oszlop-i]);
            }
            break;
        }
    }
    //jobb fel
    for (let i = 1; i <= 8&&i<3; i++) {
        if (!lephetEOda(sor-i,oszlop+i)) {
            break;
        }
        if (tablaHatterTar[sor-i][oszlop+i].babunev ==  "") {
            lehetsegesLepesek.push([sor-i,oszlop+i])
        }
        else{
            if((tablaHatterTar[sor-i][oszlop+i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[sor-i][oszlop+i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([sor-i,oszlop+i]);
            }
            break;
        }
    }

    // sancolas jobb bastya feher
    // if (babu.lepette == false && tablaHatterTar[11][7].babunev == "bastya" && tablaHatterTar[11][7].szin == "feher" && tablaHatterTar[11][6].babunev == "" && tablaHatterTar[11][6].babunev == "") {
    //     lehetsegesLepesek.push([11,7]);
    // }


    kimutatLehetsegesLepesek(lehetsegesLepesek);
}
function futo_mozog(td,babu){
    var sor = Number(td.dataset.sor);
    var oszlop = Number(td.dataset.oszlop);
    var lehetsegesLepesek = new Array();

    // le-jobbra
    for (let i = 1; i <= 8; i++) {
        if (!lephetEOda(sor+i,oszlop+i)) {
            break;
        }
        if (tablaHatterTar[sor+i][oszlop+i].babunev ==  "") {
            lehetsegesLepesek.push([sor+i,oszlop+i])
        }
        else{
            if((tablaHatterTar[sor+i][oszlop+i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[sor+i][oszlop+i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([sor+i,oszlop+i]);
            }
            break;
        }
    }
    //balra-le
    for (let i = 1; i <= 8; i++) {
        if (!lephetEOda(sor+i,oszlop-i)) {
            break;
        }
        if (tablaHatterTar[sor+i][oszlop-i].babunev ==  "") {
            lehetsegesLepesek.push([sor+i,oszlop-i])
        }
        else{
            if((tablaHatterTar[sor+i][oszlop-i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[sor+i][oszlop-i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([sor+i,oszlop-i]);
            }
            break;
        }
    }
    //bal-fel
    for (let i = 1; i <= 8; i++) {
        if (!lephetEOda(sor-i,oszlop-i)) {
            break;
        }
        if (tablaHatterTar[sor-i][oszlop-i].babunev ==  "") {
            lehetsegesLepesek.push([sor-i,oszlop-i])
        }
        else{
            if((tablaHatterTar[sor-i][oszlop-i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[sor-i][oszlop-i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([sor-i,oszlop-i]);
            }
            break;
        }
    }
    //jobb fel
    for (let i = 1; i <= 8; i++) {
        if (!lephetEOda(sor-i,oszlop+i)) {
            break;
        }
        if (tablaHatterTar[sor-i][oszlop+i].babunev ==  "") {
            lehetsegesLepesek.push([sor-i,oszlop+i])
        }
        else{
            if((tablaHatterTar[sor-i][oszlop+i].szin=="feher" && babu.szin=="fekete") ||(tablaHatterTar[sor-i][oszlop+i].szin=="fekete" && babu.szin=="feher") )
            {
                lehetsegesLepesek.push([sor-i,oszlop+i]);
            }
            break;
        }
    }
    kimutatLehetsegesLepesek(lehetsegesLepesek);
}

function mozgaseldont(td,babu){
    kimutat();
    if(babu.babunev=="paraszt")
    {
        paraszt_mozog(td,babu);
    }
    else if(babu.babunev == "bastya"){
        bastya_mozog(td,babu);
    }
    else if (babu.babunev == "lo"){
        lo_mozog(td,babu);
    }
    else if (babu.babunev == "kiraly"){
        kiraly_mozog(td,babu);
    }
    else if (babu.babunev == "futo"){
        futo_mozog(td,babu)
    }
    else if (babu.babunev == "kiralyno"){
        futo_mozog(td,babu)
        bastya_mozog(td,babu);
    }
    
}

function katt(td){
    if(td.dataset.lepheto=="true"){
        if (tablaHatterTar[kivalasztott[0]][kivalasztott[1]].babunev == "paraszt") {
            if (Number(td.dataset.sor) == 0 || Number(td.dataset.sor) == 11) {
                tablaHatterTar[kivalasztott[0]][kivalasztott[1]].mj = !tablaHatterTar[kivalasztott[0]][kivalasztott[1]].mj
            }
        }
        tablaHatterTar[kivalasztott[0]][kivalasztott[1]].lepette = true;
        tablaHatterTar[td.dataset.sor][td.dataset.oszlop] = tablaHatterTar[kivalasztott[0]][kivalasztott[1]];
        tablaHatterTar[kivalasztott[0]][kivalasztott[1]] = {
            babunev: "",
            pont: 0,
            lepette: false,
            szin: null
        }
        kivalasztott = null;
        kimutat();
        document.getElementById("joker").disabled=true; 
        if(jokerNyomvae)
        {
            jatekosJoker[kor%2] = true;
            jokerNyomvae = false;
        }
        if(duplaKor[kor%2]==false || !duplaNyomvae){
            kor++;
            stopper(); //----------------------timer-----------------------
        }
        else{
            duplaNyomvae = false;
        }

        if(duplaKor[kor%2]==false)
        {
            document.getElementById("dupla").disabled = false;
        }
        else
        {
            document.getElementById("dupla").disabled = true;
        }
    }
    else if (tablaHatterTar[td.dataset.sor][td.dataset.oszlop].babunev != "" ) {
        const babu = tablaHatterTar[td.dataset.sor][td.dataset.oszlop];
        if (kor % 2 == 0 && babu.szin == "feher") {
            mozgaseldont(td,babu);
            kivalasztott = [td.dataset.sor,td.dataset.oszlop];
            jokerNyomvae = false;
            if(jatekosJoker[kor % 2]==false)
            {
                document.getElementById("joker").disabled=false; 
            }
        }
        else if(kor % 2 == 1 && babu.szin == "fekete"){
            mozgaseldont(td,babu);
            kivalasztott = [td.dataset.sor,td.dataset.oszlop];
            jokerNyomvae = false;
            if(jatekosJoker[kor % 2]==false)
            {
                document.getElementById("joker").disabled=false; 
            }
        }
    }
    nyertEvalaki();
}
let idozito;
let mp = 0;
let perc = 0;

function stopper() {
    clearInterval(idozito);
    mp = 0;
    perc = 0;
    idozito = setInterval(megjelenit, 1000);
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
function jokerGombGen(){

    let gomb = document.createElement("button");
    gomb.setAttribute("onclick","joker()");
    gomb.id="joker";
    gomb.innerText="Joker";
    gomb.disabled="true";
    document.getElementById("gombok").appendChild(gomb);
}

function duplaGombGen(){
    let gomb = document.createElement("button");
    gomb.setAttribute("onclick","dupla()");
    gomb.id="dupla";
    gomb.innerText="Dupla";
    gomb.enabled="true";
    document.getElementById("gombok").appendChild(gomb);
}

function dupla(){
    duplaNyomvae = true;
    duplaKor[kor%2]=true;
    document.getElementById("dupla").disabled = true;
}

function joker(){
    jokerNyomvae = true;
    kimutat();
    let tabla = document.getElementsByTagName("table")[0];
    let babu = tablaHatterTar[kivalasztott[0]][kivalasztott[1]];
    const row = tabla.rows[kivalasztott[0]]
    const cella = row.cells[kivalasztott[1]]
    futo_mozog(cella,babu);
    bastya_mozog(cella,babu);
    lo_mozog(cella,babu);
}

function alapra(){
    document.getElementById("idozito").style.display = "block"
    document.getElementById("stat").style.display = "block"
    temp = document.getElementById("max").value
    temp = Number(temp)*2;
    if (temp == NaN) {
        alert("A kör nem lett helyesen megadva")
        korValaszto();
    }
    maxKor = temp

    document.getElementById("maxdiv").remove();
}

function main(){
    alapra()
    tablaGen();
    babuGen();
    kimutat();
    jokerGombGen();
    duplaGombGen();
    nyertEvalaki();
}

function korValaszto(){
    document.getElementById("idozito").style.display = "none"
    document.getElementById("stat").style.display = "none"
    pontSzamGen();
    let div = document.createElement("div")
    div.id = "maxdiv";
    let input = document.createElement("input");
    input.id = "max";
    input.type = "number";
    let gomb = document.createElement("button");
    gomb.setAttribute("onclick","main()");
    gomb.id="korValaszto";
    input.innerHTML += "<br>";//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    gomb.innerText="Körök megadása!";
    gomb.enabled="true";
    div.appendChild(input);
    div.appendChild(gomb);
    document.body.appendChild(div);
}

function nyertEvalaki(){
    let feherBabu = new Array();
    let feketeBabu= new Array();
    let feherPont = 0;
    let feketePont = 0;

    for(let i =0; i<tablaHatterTar.length;i++)
    {
        for (let j = 0; j < tablaHatterTar[0].length; j++) {
            console.log(tablaHatterTar[i][j]);
            if(tablaHatterTar[i][j].szin=="feher")
            {
                feherBabu.push(tablaHatterTar[i][j]);
                feherPont+=tablaHatterTar[i][j].pont;
            }
            else
            {
                feketeBabu.push(tablaHatterTar[i][j]);
                feketePont+=tablaHatterTar[i][j].pont;
            }
        }
    }
    console.log(feherPont,feketePont)
    document.getElementById("fehpont").innerText="Fehér pontjai: "+feherPont;
    document.getElementById("fekpont").innerText="Fekete pontjai: "+feketePont;

    if(kor%2==0){
        document.getElementById("soron").innerText="Fehér köre";
    }
    else
    {
        document.getElementById("soron").innerText="Fekete köre";
    }
    
    if(feherPont==0)
    {
        document.getElementById("jatekosNyert").innerText="Fehér nyert!";
    }
    else if(feketePont==0)
    {
        document.getElementById("jatekosNyert").innerText="Fekete nyert!";
    }
    if(kor==Number(maxKor)){
        document.getElementById("jatekosNyert").innerText="Döntetlen!";
    }
}

function pontSzamGen(){
    let pontdiv = document.getElementById("pontszam")

    let jatekosNyert = document.createElement("h1");
    jatekosNyert.id= "jatekosNyert";
    jatekosNyert.innerText="Nyert valaki de még idk";
    pontdiv.appendChild(jatekosNyert);

    let ujrainditgomb = document.createElement("button");
    ujrainditgomb.innerText="Újraindítás";
    ujrainditgomb.setAttribute("onclick","location.reload()");
    pontdiv.appendChild(ujrainditgomb);
}

korValaszto();