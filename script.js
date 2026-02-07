const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const container = document.getElementById("main");

function moveNoButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

yesBtn.addEventListener("click", () => {
  container.innerHTML = `
    <h1>YAAAAAY 💖</h1>
    <p>Je savais que tu dirais oui,<br><strong>Ma petite Gi</strong> 😍</p>
    <img src="https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif" width="200">
  `;
  startHearts();
});

const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function startHearts() {
  for (let i = 0; i < 250; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 1,
      alpha: Math.random(),
    });
  }
  animateHearts();
}

function drawHeart(x, y, size, alpha) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#e91e63";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size, y - size, x - size * 2, y + size / 2, x, y + size * 2);
  ctx.bezierCurveTo(x + size * 2, y + size / 2, x + size, y - size, x, y);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach(h => {
    drawHeart(h.x, h.y, h.size, h.alpha);
    h.y -= h.speed;

    if (h.y < -50) {
      h.y = canvas.height + 50;
      h.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animateHearts);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
