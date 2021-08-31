import React, { useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router';
import Header from '../Header/Header';
import ActionButton from '../ActionButton/ActionButton';
import './MintbeanBreakout.scss';

const MintbeanBreakout = () => {
  const history = useHistory();
  const [userWon, setUserWon] = useState<boolean>(false);
  const [userLost, setUserLost] = useState<boolean>(false);
  const [gameCount, setGameCount] = useState<number>(0);

  useLayoutEffect(() => {
    let score = 0;
    const obstacleColor = 'white';
    const canvas = document.getElementById('mintbean-breakout-canvas') as any;
    const ctx = canvas?.getContext('2d');
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;
    const ballRadius = 10;
    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    let animationFrame: number;
    let lives = 3;

    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;
    const bricks: { x: number; y: number; status: number }[][] = [];

    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
      }
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
      }
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      const relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler, false);
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    const drawLives = () => {
      ctx.font = '16px Arial';
      ctx.fillStyle = obstacleColor;
      ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
    };

    const drawScore = () => {
      ctx.font = '16px Arial';
      ctx.fillStyle = obstacleColor;
      ctx.fillText('Score: ' + score, 8, 20);
    };

    const collisionDetection = () => {
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              dy = -dy;
              b.status = 0;
              score++;
            }

            if (score === brickRowCount * brickColumnCount) {
              setUserWon(true);
              cancelAnimationFrame(animationFrame);
              return true;
            }
          }
        }
      }
    };

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = obstacleColor;
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    };

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = obstacleColor;
      ctx.fill();
      ctx.closePath();
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = obstacleColor;
      ctx.fill();
      ctx.closePath();
    };

    const drawElements = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      return collisionDetection();
    };

    const draw = () => {
      const isGameOver = drawElements();

      if (isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#bf0000';
        ctx.font = '40px Arial';
        ctx.fillText('You win!', 160, canvas.height / 2);
        return;
      }

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          lives--;
          if (!lives) {
            drawElements();
            setUserLost(true);
            cancelAnimationFrame(animationFrame);
            return;
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 3;
            dy = -3;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }

      x += dx;
      y += dy;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [gameCount]);

  return (
    <main className="mintbean-breakout-container">
      <Header
        text="Mintbean Breakout"
        subText={
          'Using a single ball, the player must knock down as many bricks as possible by using the walls and/or the paddle below to hit the ball against the bricks and eliminate them.'
        }
      />
      <canvas id="mintbean-breakout-canvas" width="480" height="320"></canvas>

      <div className="mintbean-breakout-actions">
        <ActionButton
          onClick={() => {
            history.push('/');
          }}
        >
          Go Home
        </ActionButton>

        <ActionButton
          disabled={!(userLost || userWon)}
          onClick={() => {
            setUserWon(false);
            setUserLost(false);
            setGameCount((c) => c + 1);
          }}
        >
          Play Again
        </ActionButton>
      </div>
    </main>
  );
};

export default MintbeanBreakout;
