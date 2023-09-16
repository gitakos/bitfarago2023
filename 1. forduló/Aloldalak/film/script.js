import data from "./data.json" assert { type: "json" };
console.log(data);
// console.log(document.body.getElementsByTagName("main"));


const imageContainer = document.getElementById("image-container");
const images = Array.from(imageContainer.querySelectorAll("img"));
images.forEach((img, index) => {
  if (index !== 0) {
    img.style.opacity = 0;
  }
});

let currentIndex = 0;
let isSwiping = false;
let startX = 0;
let currentX = 0;
let image1Translation = 0;
let image2Translation = 0;

const image1 = images[0];
const image2 = images[1];

loadImages(currentIndex);

imageContainer.addEventListener("mousedown", startSwipe);
imageContainer.addEventListener("touchstart", startSwipe);

function loadImages(index) {
  // Fade out the current image
  image1.style.opacity = 0;

  setTimeout(function () {
    // Set the new image source
    image1.src = images[index].src;

    // Preload the next image
    const nextIndex = (index + 1) % images.length;
    const nextImage = new Image();
    nextImage.src = images[nextIndex].src;

    // Show the new image with a fade-in effect
    setTimeout(function () {
      image1.style.opacity = 1;
    }, 100); // Adjust the delay as needed

    // Reset the translation of both images after the transition
    image1Translation = 0;
    image2Translation = 0;
    image1.style.transform = `translateX(${image1Translation}px)`;
    image2.style.transform = `translateX(${image2Translation}px)`;
  }, 600); // Adjust the duration of the transition
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

  // Calculate the maximum allowed movement based on the current translation
  const maxOffsetX = 75 - image1Translation; // Adjust as needed
  const minOffsetX = -75 - image1Translation; // Adjust as needed

  // Clamp the offsetX value within the limits
  const clampedOffsetX = Math.min(Math.max(offsetX, minOffsetX), maxOffsetX);

  image1Translation += clampedOffsetX;
  image2Translation += clampedOffsetX;

  image1.style.transform = `translateX(${image1Translation}px)`;
  image2.style.transform = `translateX(${image2Translation}px)`;

  currentX = x;
}


function endSwipe(event) {
  if (!isSwiping) return;

  isSwiping = false;
  document.removeEventListener("mousemove", swipe);
  document.removeEventListener("touchmove", swipe);
  document.removeEventListener("mouseup", endSwipe);
  document.removeEventListener("touchend", endSwipe);

  const threshold = 50; // Adjust as needed

  if (Math.abs(image1Translation) > threshold) {
    console.log("Swiped");
    currentIndex = (currentIndex + 1) % images.length;
  }

  // Load the new images
  loadImages(currentIndex);

  // Reset the translation of both images
  image1Translation = 0;
  image2Translation = 0;
  image1.style.transform = `translateX(${image1Translation}px)`;
  image2.style.transform = `translateX(${image2Translation}px)`;
}