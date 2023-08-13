
const PLAYER_HEIGHT = 100;
const PLAYER_WIDTH = 20;
const BALL_START_SPEED = 2;
const COM_LEVEL = 0.2;
const BALL_DELTA_SPEED = 0.1;

let  ctx: CanvasRenderingContext2D;

interface Ball {
    x: number;
    y: number;
    radius: number;
    vX: number;
    vY: number; 
}

interface Player {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    score: number,
}

const net = {
    x: 0,
    y: 0, 
    width: 4,
    height: 20,
    color: "#FFFFFF",
}

const player1 = {
    x: 0,
    y: 0,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#FF0000",
    score: 0,
}

const player2 = {
    x: 0,
    y: 0,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#00FF00",
    score: 0,
}

const ball = {
    x: 0,
    y: 0,
    radius: 15,
    speed: BALL_START_SPEED,
    vX: 5,
    vY: 5,
    color: "#FFF000",

}

const drawRectangle = (context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) => {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

const drawCircle = (context: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) => {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

const drawNet = (context: CanvasRenderingContext2D) =>
{
    

    for(let i = 0; i < context.canvas.height; i += 30)
    {
        drawRectangle(context, net.x, net.y + i, net.width, net.height, net.color);
    }
}

export const render = (context: CanvasRenderingContext2D) => {

    update(context);
    drawRectangle(context, 0, 0, context.canvas.width, context.canvas.height, "#000000");
    drawNet(context);
    drawRectangle(context, player1.x, player1.y, player1.width, player1.height, player1.color);
    drawRectangle(context, player2.x, player2.y, player2.width, player2.height, player2.color);
    drawCircle(context, ball.x, ball.y, ball.radius, ball.color);

}

export const initVars = (context: CanvasRenderingContext2D) => {
    net.x = context.canvas.width / 2 - 1;
    player1.y = context.canvas.height/ 2 - PLAYER_HEIGHT / 2;
    player2.x = context.canvas.width - PLAYER_WIDTH;
    player2.y = context.canvas.height/ 2 - PLAYER_HEIGHT / 2;
    ball.x = context.canvas.width / 2;
    ball.y = context.canvas.height / 2;
}

const  collision = (b: any, p: any) => {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return (b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom );
}

const lerp = (a: number, b: number, t: number) => {
    return (a + (b - a) * t);
}

const resetBall = (context: CanvasRenderingContext2D) => {
    ball.x = context.canvas.width / 2;
    ball.y = context.canvas.height / 2;
    ball.speed = BALL_START_SPEED;
    ball.vX = -ball.vX;
}

const update = (context: CanvasRenderingContext2D) => {
    ball.x += ball.vX * ball.speed;
    ball.y += ball.vY * ball.speed;
    
    if(ball.y + ball.radius > context.canvas.height || ball.y -ball.radius < 0)
        ball.vY = -ball.vY;
    let selectPlayer = ball.x < context.canvas.width / 2 ? player1 : player2;
    if(collision(ball, selectPlayer))
    {
        ball.vX = -ball.vX;
        ball.speed += BALL_DELTA_SPEED;
    }
    
    let targetPos: number = ball.y - player2.height / 2;
    let currentPos: number = player2.y;
    player2.y = lerp(currentPos, targetPos, COM_LEVEL);

    context.canvas.addEventListener("mousemove", (e) => {
        let rect = context.canvas.getBoundingClientRect();
        player1.y = e.clientY - rect.top - player1.height / 2;
    });

    if(ball.x - ball.radius < 0)
    {
        player2.score++;
        console.log("Player 1: " + player1.score + " Player 2: " + player2.score);
        resetBall(context);
    } else  if(ball.x + ball.radius > context.canvas.width)
    {
        player1.score++;
        console.log("Player 1: " + player1.score + " Player 2: " + player2.score);
        resetBall(context);
    }
}