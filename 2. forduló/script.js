var data = [
    {
        babunev: "paraszt",
        pont: 1,
        lepette: false,
        szin: null
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
var kivalasztott = null;


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
            const cella = sor.cells[j]
            cella.innerHTML = "";
            cella.dataset.lepheto = false;
        }
    }


    for (var i = 0; i < tablaHatterTar.length; i++) {
        const sor = tabla.rows[i]
        for (let j = 0; j < tablaHatterTar[i].length; j++) {
            const element = tablaHatterTar[i][j];
            const cella = sor.cells[j]
            if(element.babunev != ""){
                if (element.szin == "feher") {
                    cella.className = "feher";
                }
                else{
                    cella.className = "fekete";
                }
                cella.innerHTML = element.babunev;
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
        cella.innerHTML = "lephetsz ide te cigo"
        cella.dataset.lepheto = true;
    }
}

function paraszt_mozog(td,babu){
    var lehetsegesLepesek = new Array();
    kimutat();
    if(babu.szin=="fekete")
    {
        if(babu.lepette==false)
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
        }
        else
        {
            if (lephetEOda(Number(td.dataset.sor)+1,Number(td.dataset.oszlop))) {
                if (tablaHatterTar[Number(td.dataset.sor)+1][Number(td.dataset.oszlop)].babunev == "") {
                    lehetsegesLepesek.push([Number(td.dataset.sor)+1,Number(td.dataset.oszlop)]);
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
        }
        kimutatLehetsegesLepesek(lehetsegesLepesek);
    }
    else
    {
        if(babu.lepette==false)
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
        }
        else
        {
            if (lephetEOda(Number(td.dataset.sor)-1,Number(td.dataset.oszlop))) {
                if (tablaHatterTar[Number(td.dataset.sor)-1][Number(td.dataset.oszlop)].babunev == "") {
                    lehetsegesLepesek.push([Number(td.dataset.sor)-1,Number(td.dataset.oszlop)]);
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
        }
        kimutatLehetsegesLepesek(lehetsegesLepesek);
    }
}

function mozgaseldont(td,babu){
    if(babu.babunev=="paraszt")
    {
        // console.log("teszt")
        paraszt_mozog(td,babu);
    }
}

function katt(td){
    console.log(td)
    if(td.dataset.lepheto=="true"){
        console.log("teszt")
        tablaHatterTar[kivalasztott[0]][kivalasztott[1]].lepette= true;
        tablaHatterTar[td.dataset.sor][td.dataset.oszlop] = tablaHatterTar[kivalasztott[0]][kivalasztott[1]];
        tablaHatterTar[kivalasztott[0]][kivalasztott[1]] = {
            babunev: "",
            pont: 0,
            lepette: false,
            szin: null
        }
        kivalasztott = null;
        kimutat();
        kor++
    }
    else if (tablaHatterTar[td.dataset.sor][td.dataset.oszlop].babunev != "" ) {
        const babu = tablaHatterTar[td.dataset.sor][td.dataset.oszlop];
        if (kor % 2 == 0 && babu.szin == "feher") {
            mozgaseldont(td,babu);
            kivalasztott = [td.dataset.sor,td.dataset.oszlop];
        }
        else if(kor % 2 == 1 && babu.szin == "fekete"){
            mozgaseldont(td,babu);
            kivalasztott = [td.dataset.sor,td.dataset.oszlop];
        }
    }
}

tablaGen();
babuGen();
kimutat();
