const canvas = document.getElementById("minta");
const ctx = canvas.getContext("2d");

function drawCircle() {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculate circle position at the center of the canvas
  const circleX = canvasWidth / 2; // Center X
  const circleY = canvasHeight / 2; // Center Y
  const circleRadius = 70;

  // Clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Begin drawing
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
  ctx.stroke();
}

// Initial draw
drawCircle();

// Handle window resize
window.addEventListener("resize", () => {
  // Update canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Redraw the circle at the center of the canvas after resizing
  drawCircle();
});
