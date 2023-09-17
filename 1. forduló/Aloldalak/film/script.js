import data from "./data.json" assert { type: "json" };
console.log(data);
// console.log(document.body.getElementsByTagName("main"));

const imageContainer = document.getElementById("image-container");
const leirasDiv = document.getElementById("leiras");
const nevDiv = document.getElementById("nev");
var images = [];
var leirasok = [];
var nevek = [];
adatListarendezes(data);

let currentIndex = 0;
let isSwiping = false;
let startX = 0;
let currentX = 0;
let imageTranslation = 0;

const image = document.createElement("img");
image.setAttribute("draggable","false");
image.setAttribute("class","image");
imageContainer.appendChild(image);
const leiras = document.createElement("span");
leiras.setAttribute("draggable","false");
leiras.setAttribute("class","leiras");
leirasDiv.appendChild(leiras);
const nev = document.createElement("span");
nev.setAttribute("draggable","false");
nev.setAttribute("class","nev");
nevDiv.appendChild(nev);

// kell az alap kép
loadImages(currentIndex);

// tudjuk hogy rálett e nyomva
imageContainer.addEventListener("mousedown", startSwipe);
imageContainer.addEventListener("touchstart", startSwipe);

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
  }, 600); // változás hossza 
}

function startSwipe(event) {
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
    console.log(imageTranslation);
    if (imageTranslation > 50) {
      console.log("jobb swipe");
    } else {
      console.log("bal swipe");
    }
    // már swipe van tehát kell a kövi kép
    currentIndex = (currentIndex + 1) % images.length;
    loadImages(currentIndex);
  }

  // berakja középre
  imageTranslation = 0;
  image.style.transform = `translateX(${imageTranslation}px)`;
}

function adatListarendezes(data){

  data.elemek.forEach(element => {
    images.push("kepek/"+element.kategorianev+".jpg");
    leirasok.push(element.leiras);
    nevek.push(element.kategorianev);
  });
}