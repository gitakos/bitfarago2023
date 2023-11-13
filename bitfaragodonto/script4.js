let hattertertar= new Array();
function feladat4(){
    let div = document.getElementById("jatekter");
    for(let i = 0;i<10;i++)
    {
        let sor = document.createElement("div");
        sor.id="sor"+i;
        sor.className="sor";
        for(let j = 0;j<10;j++)
        {
            let cella = document.createElement("div");
            cella.id=j+i*10;
            cella.classList.add("cella");
            cella.dataset.x=j;
            cella.dataset.y=i;
            cella.dataset.tav = 0;
            cella.dataset.fal=false;
            cella.dataset.hovatav = 0;

            cella.setAttribute("onclick","nyom(this)")

            sor.appendChild(cella);
            /*if(Math.floor(Math.random()*10) >= 7)//fal
            {
                cella.classList.add("fal")
                cella.dataset.fal=true;
            }*/
        }
        div.appendChild(sor);
        div.innerHTML+="</br>";
    }
}
let hanyadik = 0;
let honnan = {x:0,y:0};
let hova = {x:0,y:0};

function kiertekeles(poz){
    for(i = 0;i<10;i++)
    {
        for(let j = 0;j<10;j++)
        {
            let cella = document.getElementById(i*10+j);
            if(cella.dataset.fal==true)
            {
                cella.tav == 99999999
            }
            else
            {
                cella.tav = Math.round(Math.sqrt(Math.pow(poz.x-cella.dataset.x,2)+Math.pow(poz.y-cella.dataset.y,2))); //((negyzet(x1))-(negyzet(x2)))
                cella.innerText=cella.tav;
                /*if(cella.tav%2==0)
                {
                    cella.classList.add("cel");
                }*/
            }
        }
    }
}
function kiertekelesHova(){
    for(i = 0;i<10;i++)
    {
        for(let j = 0;j<10;j++)
        {
            let cella = document.getElementById(i*10+j);
            if(cella.dataset.fal==true)
            {
                cella.hovatav == 99999999
            }
            else
            {
                cella.hovatav = Math.round(Math.sqrt(Math.pow(hova.x-cella.dataset.x,2)+Math.pow(hova.y-cella.dataset.y,2))); //((negyzet(x1))-(negyzet(x2)))
                cella.innerText=cella.hovatav+"\n";
            }
        }
    }
}
let bejart = new Array()
let index = 0;
function pathFind(poz){
    bejart.push(poz);
    kiertekeles(poz);
    let maxX = 999;
    let maxY = 999;
    let maxCella;
    for(i = -1;i<2;i++)
    {
        for(let j = -1;j<2;j++)
        {
            let ujPoz = {x: Number(poz.x)+j,y: (Number(poz.y)+i)*10}
            if(!bejart.includes(ujPoz))
            {
                //console.log((Number(ujPoz.y)+i)*10);
                //console.log(Number(ujPoz.x)+j);
                let cella = document.getElementById(ujPoz.y+ujPoz.x);
                if(cella)
                {
                    console.log(cella);
                    console.log("Belépek")
                    console.log(maxX+" "+cella.dataset.x)
                    if(maxX>Number(cella.dataset.x)&&maxY>Number(cella.dataset.y))
                    {
                        maxX = Number(cella.dataset.x);
                        maxY = Number(cella.dataset.y);
                        maxCella = cella;
                    }
                    else
                    {
                        console.log("Nem nagyobb");
                    }
                }
                maxCella.classList.add("cel");
            }
        }
    }
    if({x:maxX,y:maxY}!=hova)
    {
        pathFind({x:maxX,y:maxY})
    }
    console.log(maxCella);
    //maxCella.classList.add("cel");
}

function nyom(elem){
    if(hanyadik==0)
    {
        honnan = {x:elem.dataset.x,y:elem.dataset.y}
        elem.innerHTML+="B"
        elem.style["text-align"]="center";
        elem.style["font-size"]="larger";
        hanyadik++;
    }
    else
    {
        hova = {x:elem.dataset.x,y:elem.dataset.y}
        elem.classList.add("cel");
        kiertekelesHova();
        pathFind(honnan);
        hanyadik = 0;
    }
}
function gomb(){

}
  

feladat4();
