const canvas = document.getElementById("flowers-canvas");
const ctx = canvas.getContext("2d");

const NUM = 150;
let radius = 100;
const centerx = 300;
const centery = 300;

const settings = {
  radius: 100,
  period: 15,
  amp: 40,
  color: 0,
  numberOfCircles: 20
};

// gui
const gui = new dat.GUI();
gui.add(settings, "amp").min(0).max(40).step(1);
gui.add(settings, "period").min(0).max(40).step(1);
gui.add(settings, "color").min(0).max(360);
gui.add(settings, "numberOfCircles").min(1).max(40).step(1);

function DrawCircle(radius, color, offset) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < NUM; i++) {
        const teta = (i * 2 * Math.PI) / NUM;
        let VarRadius =
            radius + settings.amp * Math.sin(teta * settings.period + offset);
        const x = centerx + VarRadius * Math.cos(teta);
        const y = centery + VarRadius * Math.sin(teta);
        // ctx.fillRect(x, y, 2, 2);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.strokeStyle = "#ffffff";
    // ctx.stroke();
    ctx.fill();
}

let time = 0;

function Draw() {
    time++;
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < settings.numberOfCircles; i++) {
        let color = i % 2 ? "black" : "white";
        color = "black";
        // color = `hsl(0,50%,50%)`
        DrawCircle(
            200 - i * 10,
            `hsl(${settings.color + i * 5},50%,50%)`,
            (i * time) / 100
        );
    }
}

function render() {
    Draw();
    requestAnimationFrame(render);
}

render();