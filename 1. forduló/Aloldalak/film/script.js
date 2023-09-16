import data from './data.json' assert { type: 'json' };
console.log(data);
// console.log(document.body.getElementsByTagName("main"));
let kep = document.getElementById("kep");
kep.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.896-CTRPJUm-rJl8u5dv0gAAAA%26pid%3DApi&f=1&ipt=f735445e08ed8b01b93fa2cdaa1274a8516b06ac646593bd5c3e151f647ad9ab&ipo=images"
kep.addEventListener("mousedown",mozg);
function mozg(){
    let szam = kep.style.left.slice(kep.style.left.length-1,2);
    console.log(szam);
    kep.style.left = kep.style.left.slice(kep.style.left.length-1,2)-0+1+"px";
}

const imageContainer = document.getElementById("image-container");
const images = Array.from(imageContainer.querySelectorAll("img"));

let currentIndex = 0;
let isSwiping = false;
let startX = 0;
let currentX = 0;

const image1 = images[0];
const image2 = images[1];

loadImages(currentIndex);

imageContainer.addEventListener("mousedown", startSwipe);
imageContainer.addEventListener("touchstart", startSwipe);

function loadImages(index) {
  image1.src = images[index].src;
  const nextIndex = (index + 1) % images.length;
  image2.src = images[nextIndex].src;

  console.log(image1,image2)
}

function startSwipe(event) {
  isSwiping = true;
  startX = event.clientX || event.touches[0].clientX;
  currentX = startX;

  document.addEventListener("mousemove", swipe);
  document.addEventListener("touchmove", swipe);

  document.addEventListener("mouseup", endSwipe);
  document.addEventListener("touchend", endSwipe);
}

function swipe(event) {
  if (!isSwiping) return;

  const x = event.clientX || event.touches[0].clientX;
  const offsetX = x - currentX;

  image1.style.transform = `translateX(${offsetX}px)`;
  image2.style.transform = `translateX(${offsetX}px)`;

  currentX = x;
}

function endSwipe(event) {
  if (!isSwiping) return;

  isSwiping = false;
  document.removeEventListener("mousemove", swipe);
  document.removeEventListener("touchmove", swipe);
  document.removeEventListener("mouseup", endSwipe);
  document.removeEventListener("touchend", endSwipe);

  const threshold = 100; // Adjust as needed
  const offset = currentX - startX;

  if (Math.abs(offset) >= threshold) {
    currentIndex = (currentIndex + 1) % images.length;
    loadImages(currentIndex);
  }

  image1.style.transform = "translateX(0)";
  image2.style.transform = "translateX(0)";
}
