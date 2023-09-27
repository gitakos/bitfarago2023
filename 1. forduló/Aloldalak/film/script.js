var data=
[
  {
    "kategorianev": "Horror",
    "leiras": "Ahol az elcseszett döntéseid és a legrosszabb pillanataid válnak életveszélyessé, és a sikítások a legjobb zene."
},
{
    "kategorianev": "Sci-fi",
    "leiras": "Ahol a technológia megold minden problémát, kivéve az emberi hülyeséget."
},
{
    "kategorianev": "Akció",
    "leiras": "Amikor a gravitáció csak egy vágyálom, és a robbanások a dialógusokat váltják fel."
},
{
    "kategorianev": "Családi",
    "leiras": "Amikor az összes konfliktust egyetlen ölelés oldja meg, és mindenki boldogan él, miután megosztották a meleg szívű tanulságokat."
},
{
    "kategorianev": "Romantikus",
    "leiras": "Az igaz szerelem mindig akkor talál rád, amikor éppen nem készültél rá, és a legtöbb problémát egy jóbeszédű legyintéssel lehet megoldani."
},
{
    "kategorianev": "Komédia",
    "leiras": "Ahol a nevetés a legjobb gyógyszer, és a poénok gyorsabbak, mint egy rossz nap."
},
{
    "kategorianev": "Bűnügyi",
    "leiras": "Amikor a tettes mindig egy lépéssel előtted jár, de a szuperintelligens nyomozók mindig megoldják az ügyet a legváratlanabb pillanatban."
},
{
    "kategorianev": "Dráma",
    "leiras": "Amikor az érzelmek a plafonon vannak, és a legtöbb problémát egy jóbeszédű jelenet megoldja, amit az emberek egész évben próbálnak elkerülni."
}
]


var film =
[
  {
      "cim": "A keresztapa",
      "kategoriak": "Dráma Bűnügyi",
      "pontok": 0,
      "megjelenes" : 1972
  },
  {
      "cim": "Forest Gump",
      "kategoriak": "Dráma Romantikus",
      "pontok": 0,
      "megjelenes" :1994
  },
  {
      "cim": "Vissza a jövőbe",
      "kategoriak": "Komédia Sci-fi",
      "pontok": 0,
      "megjelenes" :1985
  },
  {
      "cim": "Top Gun Maverick",
      "kategoriak": "Dráma Akció",
      "pontok": 0,
      "megjelenes" : 2022
  },
  {
      "cim": "Péntek 13",
      "kategoriak": "Horror",
      "pontok": 0,
      "megjelenes" : 1980
  },
  {
      "cim": "Titanic",
      "kategoriak": "Dráma Romantikus",
      "pontok": 0,
      "megjelenes" :1997
  },
  {
      "cim": "Mátrix",
      "kategoriak": "Sci-fi Akció",
      "pontok": 0,
      "megjelenes" : 1999
  },
  {
      "cim": "Terminátor",
      "kategoriak": "Sci-fi Akció",
      "pontok": 0,
      "megjelenes" :1984
  },
  {
      "cim": "A sötét lovag",
      "kategoriak": "Akció Bűnügyi",
      "pontok": 0,
      "megjelenes" : 2009
  },
  {
      "cim": "Az oroszlánkirály",
      "kategoriak": "Családi Dráma",
      "pontok": 0,
      "megjelenes" :1994
  },
  {
      "cim": "Aladin",
      "kategoriak": "Családi Romantikus",
      "pontok": 0,
      "megjelenes" :2019
  },
  {
      "cim": "Szörny Rt",
      "kategoriak": "Családi Komédia",
      "pontok": 0,
      "megjelenes" : 2001
  },
  {
      "cim": "Gyerekjáték",
      "kategoriak": "Horror",
      "pontok": 0,
      "megjelenes" : 1988
  }
]

const main = document.body.getElementsByTagName("main")[0];
var imageContainer;
var leirasDiv;
var nevDiv;
var images = [];
var leirasok = [];
var nevek = [];
var szunet = false;
adatListarendezes(data);

var ujratoltgomb = document.createElement("button");
ujratoltgomb.setAttribute("class","ujra_gomb");
ujratoltgomb.innerText = "Újratöltés";
ujratoltgomb.setAttribute("onclick","location.reload()")
document.body.getElementsByTagName("footer")[0].appendChild(ujratoltgomb);

let currentIndex = 0;
let isSwiping = false;
let startX = 0;
let currentX = 0;
let imageTranslation = 0;
let kerdes = document.getElementById("question");
kerdes.style.display="none"

var image;
var leiras;
var nev;

function loadImages(index) {
  // ami már ellet huzva tüntessük ell
  image.style.opacity = 0;
  leiras.style.opacity = 0;
  nev.style.opacity = 0;

  setTimeout(function () {
    image.src = images[index]; // kell az új kép src
    image.style.opacity = 1;

    leiras.innerText = leirasok[index];
    leiras.style.opacity = 1;

    nev.innerText = nevek[index];
    nev.style.opacity = 1;
    szunet = false;
  }, 600); // változás hossza 

}

function startSwipe(event) {
  if (szunet) {
    return;
  }
  isSwiping = true;

  //kezdeti egér pozi
  startX = event.clientX || event.touches[0].clientX;
  currentX = startX;

  // rányomtunk kell tudni hogy merre mozog az egér
  document.addEventListener("mousemove", swipe);
  //mobil
  document.addEventListener("touchmove", swipe);

  // kell tudni mikor engedjük el az egeret
  document.addEventListener("mouseup", endSwipe);
  document.addEventListener("touchend", endSwipe);
}

function swipe(event) {
  if (!isSwiping) return;

  const x = event.clientX; // hol az egér (event.touches[0].clientX; ez csak telefonnál számít)
  const offsetX = x - currentX; // most balra vagy jobbra megyünk

  // menyire mehet el a kép balra meg jobbra
  const maxOffsetX = 75 - imageTranslation;
  const minOffsetX = -75 - imageTranslation;

  // csak anyire lehessen altolni amenyi a limit
  const clampedOffsetX = Math.min(Math.max(offsetX, minOffsetX), maxOffsetX);

  imageTranslation += clampedOffsetX;
  image.style.transform = `translateX(${imageTranslation}px)`;
  currentX = x;
}
function pontadas(szam){
  for (let i = 0; i < film.length; i++) {
    let kategoriak_temp = film[i].kategoriak.split(" ");
    if(kategoriak_temp.includes(data[currentIndex].kategorianev))
    {
      film[i].pontok += szam;
    }
  }
}

function endSwipe(event) {
  if (!isSwiping) return;

  // már nem swipeol hisz vége van tehát már nem igaz
  isSwiping = false;
  document.removeEventListener("mousemove", swipe);
  document.removeEventListener("touchmove", swipe);
  document.removeEventListener("mouseup", endSwipe);
  document.removeEventListener("touchend", endSwipe);

  //ennyi pixel után már swipenak lehet számitani
  const threshold = 50;

  //swipe-e
  if (Math.abs(imageTranslation) > threshold) {
    szunet = true;
    if (imageTranslation > 50) {
      pontadas(1);
    } else {
      pontadas(-1);
      
    }
    // már swipe van tehát kell a kövi kép
    currentIndex++;
    if(currentIndex==images.length)
    {
      filmKimutato();
      return;
    }
    loadImages(currentIndex);

  }

  // berakja középre
  imageTranslation = 0;
  image.style.transform = `translateX(${imageTranslation}px)`;
}

function adatListarendezes(data){

  for (let i = 0; i < data.length; i++) {
    images.push("kepek/"+data[i].kategorianev+".png");
    leirasok.push(data[i].leiras);
    nevek.push(data[i].kategorianev);
  }
}
function ertekBetolt(){
  imageContainer = document.createElement("div");
  imageContainer.setAttribute("id","image-container");
  main.appendChild(imageContainer);

  let tartalom = document.createElement("div");
  tartalom.setAttribute("id","tartalom");
  main.appendChild(tartalom);

  nevDiv = document.createElement("div");
  nevDiv.setAttribute("id","nev");
  tartalom.appendChild(nevDiv);

  leirasDiv = document.createElement("div");
  leirasDiv.setAttribute("id","leiras");
  tartalom.appendChild(leirasDiv);

  images = [];
  leirasok = [];
  nevek = [];
  adatListarendezes(data);

  currentIndex = 0;
  isSwiping = false;
  startX = 0;
  currentX = 0;
  imageTranslation = 0;
}
function elemBetolt(){
  image = document.createElement("img");
  image.setAttribute("draggable","false");
  image.setAttribute("class","image");
  imageContainer.appendChild(image);

  leiras = document.createElement("span");
  leiras.setAttribute("draggable","false");
  leiras.setAttribute("class","leiras");
  leirasDiv.appendChild(leiras);

  nev = document.createElement("span");
  nev.setAttribute("draggable","false");
  nev.setAttribute("class","nev");
  nevDiv.appendChild(nev);

  loadImages(currentIndex);

  // tudjuk hogy rálett e nyomva
  imageContainer.addEventListener("mousedown", startSwipe);
  imageContainer.addEventListener("touchstart", startSwipe);
}
function oldalBetolt(){
  main.innerHTML = "";
  ertekBetolt();
  kerdes.style.display= "block"
  elemBetolt();
}
function kezdoKepernyoBetolt(){
  main.innerHTML= "";
  let div = document.createElement("div");
  div.setAttribute("class","belepes_div");
  main.appendChild(div);
  let gomb = document.createElement("button");
  gomb.setAttribute("class","belepes_bt");
  gomb.innerText = "Belépés";
  gomb.onclick = function () {
    oldalBetolt();
  };
  div.appendChild(gomb);
  let belep_leir = document.createElement("span");
  belep_leir.innerText="A Findr a legjobb filmkereső oldal egész Magyarországon, talán ön is megtalálhatja kedvenc kategóriái alapján kedvenc filmeit! Ne késlekedjen, lépjen be MOST!";
  belep_leir.setAttribute("class","belepes_leir");
  div.append(belep_leir);
}
function filmValaszt(div,rossz_div,div_film_cim,rossz_div_film_cim){
  for(let i = 0; i<film.length;i++)
  {
    let cim = document.createElement("span");
    cim.setAttribute("class","film_cim");
    cim.innerText=film[i].cim+" ("+film[i].megjelenes+") Kategória: "+film[i].kategoriak;
    let img = document.createElement("img");
    img.setAttribute("class","film_kep");
    img.src = "kepek/"+film[i].cim+".png";
    if(film[i].pontok > 0)
    {
      if(div.innerHTML=="Nem kedvelsz semmilyen filmet 🤓")
      {
        div.innerHTML = "";
      }
      div.appendChild(img);
      div_film_cim.appendChild(cim);
    }
    else if(film[i].pontok < 0)
    {
      if(rossz_div.innerHTML=="Nem utálsz semmilyen filmet 🤓")
      {
        rossz_div.innerHTML = "";
      }
      rossz_div.appendChild(img);
      rossz_div_film_cim.appendChild(cim);
    }
  }
}
function filmKimutato(){
  kerdes.style.display="none"
  main.innerHTML = "";
  let div = document.createElement("div");
  div.setAttribute("class","film");
  let div_film_cimek = document.createElement("div");
  div_film_cimek.setAttribute("class","film_cimek");
  let rossz_div_film_cimek = document.createElement("div");
  rossz_div_film_cimek.setAttribute("class","film_cimek");
  let rossz_div = document.createElement("div");
  rossz_div.setAttribute("class","film");
  let rossz_div_cim = document.createElement("h1");
  rossz_div_cim.setAttribute("class","cim");
  let div_cim = document.createElement("h1");
  div_cim.setAttribute("class","cim");

  div_cim.innerText="A filmek amiket kedvelsz:";
  rossz_div_cim.innerText="A filmek amiket nem kedvelsz:";
  div.innerHTML="Nem kedvelsz semmilyen filmet 🤓";
  rossz_div.innerHTML="Nem utálsz semmilyen filmet 🤓";

  main.appendChild(div_cim);
  main.appendChild(div_film_cimek);
  main.appendChild(div);
  main.appendChild(rossz_div_cim);
  main.appendChild(rossz_div_film_cimek);
  main.appendChild(rossz_div);

  filmValaszt(div,rossz_div,div_film_cimek,rossz_div_film_cimek);
}
kezdoKepernyoBetolt();