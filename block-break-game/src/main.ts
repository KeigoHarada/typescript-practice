const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (!ctx) {
    throw new Error('Canvas context not supported');
}

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = 'green';
ctx.fill();
ctx.closePath();
