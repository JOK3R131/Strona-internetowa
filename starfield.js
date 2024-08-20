const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 200; // Liczba gwiazd

// Dostosowanie rozmiaru canvasu do rozmiaru okna
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Inicjalizacja gwiazd
function initStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.5 + 0.2
        });
    }
}

// Rysowanie gwiazd
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Aktualizacja pozycji gwiazd
function updateStars() {
    for (let star of stars) {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }
}

// Animacja
function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

// Inicjalizacja i start animacji
resizeCanvas();
initStars();
animate();

// Obsługa zmiany rozmiaru okna
window.addEventListener("resize", function () {
    resizeCanvas();
    stars = [];
    initStars();
});
