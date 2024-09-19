const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// ball
let x: number = canvas.width / 2;
let y: number = canvas.height - 30;
let dx: number = 2;
let dy: number = -2;
const ballRadius: number = 10;

// paddle
const paddleHeight: number = 10;
const paddleWidth: number = 75;
let paddleX: number = (canvas.width - paddleWidth) / 2;
let rightPressed: boolean = false;
let leftPressed: boolean = false;

// bricks
const brickRowCount: number = 3;
const brickColumnCount: number = 5;
const brickWidth: number = 75;
const brickHeight: number = 20;
const brickPadding: number = 10;
const brickOffsetTop: number = 30;
const brickOffsetLeft: number = 30;
const bricks: any[] = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// score
let score: number = 0;

function drawScore() {
    if (ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + score, 8, 20);
    }
}

function drawBricks() {
    if (ctx) {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                const brickX: number = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY: number = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                if (bricks[c][r].status === 1) {
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}

function drawPaddle() {
    if (ctx) { // ctxがnullでないことを確認
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

}

function drawBall() {
    if (ctx) { // ctxがnullでないことを確認
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

function draw() {
    if (ctx) { // ctxがnullでないことを確認
        judgeGameClear();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval);
            }
        }
        x += dx;
        y += dy;
        drawBall();
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
        drawPaddle();
        collisionDetection();
        drawBricks();
        drawScore();
    }
}

function keyDownHandler(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight && b.status === 1) {
                dy = -dy;
                b.status = 0;
                score++;
            }
        }
    }
}

function judgeGameClear() {
    if (score === brickRowCount * brickColumnCount) {
        alert("Congratulations! You win!");
        document.location.reload();
        clearInterval(interval);
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
const interval = setInterval(draw, 10);