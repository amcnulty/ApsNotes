import React, { useCallback, useEffect, useRef, useState } from 'react';
import Sloth from './sloth.png';
import Banana from './banana.png';
import MazeGif from './maze6x6.gif'
// import MazeGif from './maze2.gif'
// import MazeGif from './maze3.gif'
import './CrowPage.scss';
import Arrow from './Arrow';

const LEFT = 'LEFT'
const UP = 'UP';
const RIGHT = 'RIGHT';
const DOWN = 'DOWN';
const MOVEMENT_AMOUNT = 3;
const PATH_WIDTH = 20;
const WALL_WIDTH = 2;
const SLOTH_SIZE = 15;
const BANANA_SIZE = 20;

const CrowPage = () => {
    const [dimensions, setDimensions] = useState([10, 10]);
    const slothStartX = useRef(0);
    const slothStartY = useRef(5);
    const bananaStartX = useRef(5);
    const bananaStartY = useRef(0);
    const canvas = useRef();
    const context = useRef();
    const moveInterval = useRef();
    const currRectX = useRef();
    const currRectY = useRef();
    const mazeWidth = useRef();
    const mazeHeight = useRef();
    const slothImg = useRef();

    const canMoveTo = useCallback((destX, destY) => {
        const imgData = context.current.getImageData(destX, destY, SLOTH_SIZE, SLOTH_SIZE);
        const data = imgData.data;
        let canMove = 1; // 1 means: the rectangle can move
        if (destX >= PATH_WIDTH && destX <= mazeWidth.current - SLOTH_SIZE && destY >= PATH_WIDTH && destY <= mazeHeight.current - PATH_WIDTH - SLOTH_SIZE) {
            for (let y = 0; y < SLOTH_SIZE; y++) {
                for (let x = 0; x < SLOTH_SIZE; x++) {
                    if (x > MOVEMENT_AMOUNT - 1 && y > MOVEMENT_AMOUNT - 1
                        && x < SLOTH_SIZE - MOVEMENT_AMOUNT && y > SLOTH_SIZE - MOVEMENT_AMOUNT) continue;
                    let i = x * 4 + y * 4 * SLOTH_SIZE;
                    if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
                        canMove = 0; // 0 means: the rectangle can't move
                        break;
                    }
                    else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) { // #00FF00
                        canMove = 2; // 2 means: the end point is reached
                        break;
                    }
                }
            }
        }
        else {
            canMove = 0;
        }
        return canMove;
    }, []);
    
    const drawRectangle = useCallback((x, y, style) => {
        makeWhite(currRectX.current, currRectY.current, SLOTH_SIZE, SLOTH_SIZE);
        currRectX.current = x;
        currRectY.current = y;
        context.current.drawImage(slothImg.current, x, y , SLOTH_SIZE, SLOTH_SIZE);
    }, []);

    const moveRect = useCallback((direction) => {
        let newX;
        let newY;
        let movingAllowed;
        switch (direction) {
            case UP:
                newX = currRectX.current;
                newY = currRectY.current - MOVEMENT_AMOUNT;
                break;
            case LEFT:
                newX = currRectX.current - MOVEMENT_AMOUNT;
                newY = currRectY.current;
                break;
            case DOWN:
                newX = currRectX.current;
                newY = currRectY.current + MOVEMENT_AMOUNT;
                break;
            case RIGHT:
                newX = currRectX.current + MOVEMENT_AMOUNT;
                newY = currRectY.current;
                break;
            default: return;
        }
        movingAllowed = canMoveTo(newX, newY);
        if (movingAllowed === 1) {      // 1 means 'the rectangle can move'
            drawRectangle(newX, newY, "#0000FF");
            currRectX.current = newX;
            currRectY.current = newY;
        }
        else if (movingAllowed === 2) { // 2 means 'the rectangle reached the end point'
            makeWhite(0, 0, canvas.current.width, canvas.current.height);
            context.current.font = "40px Arial";
            context.current.fillStyle = "blue";
            context.current.textAlign = "center";
            context.current.textBaseline = "middle";
            context.current.fillText("Congratulations!", canvas.current.width / 2, canvas.current.height / 2);
        }
    }, [canMoveTo, drawRectangle]);

    const drawMazeAndRectangle = useCallback((rectX, rectY) => {
        const mazeImg = new Image();
        mazeImg.src = MazeGif;
        mazeImg.onload = (e) => {
            setDimensions([
                e.path[0].width,
                e.path[0].height
            ]);
            mazeWidth.current = e.path[0].width;
            mazeHeight.current = e.path[0].height;
            setTimeout(() => {
                // Draw the maze
                context.current = canvas.current?.getContext("2d");
                context.current.drawImage(mazeImg, 0, 0);
                // Draw the circle
                // context.current.beginPath();
                // context.current.arc(542, 122, 7, 0, 2 * Math.PI, false);
                // context.current.closePath();
                // context.current.fillStyle = '#00FF00';
                // context.current.fill();
            });
        };
        slothImg.current = new Image();
        slothImg.current.src = Sloth;
        slothImg.current.onload = (e) => {
            currRectX.current = (rectX + 1) * (PATH_WIDTH + WALL_WIDTH);
            currRectY.current = (rectY + 1) * (PATH_WIDTH + WALL_WIDTH);
            drawRectangle(currRectX.current, currRectY.current, "#0000FF");
        }
        const bananaImg = new Image();
        bananaImg.src = Banana;
        bananaImg.onload = () => {
            const bananaRenderX = (bananaStartX.current + 1) * (PATH_WIDTH + WALL_WIDTH);
            const bananaRenderY = (bananaStartY.current + 1) * (PATH_WIDTH + WALL_WIDTH);
            context.current.drawImage(bananaImg, bananaRenderX, bananaRenderY, BANANA_SIZE, BANANA_SIZE);
        }
    }, [drawRectangle]);

    useEffect(() => {
        drawMazeAndRectangle(slothStartX.current, slothStartY.current);
    }, [drawMazeAndRectangle]);

    const makeWhite = (x, y, w, h) => {
        context.current.beginPath();
        context.current.rect(x, y, w, h);
        context.current.closePath();
        context.current.fillStyle = '#669999';
        context.current.fill();
    }

    const startMoving = (e, direction) => {
        console.log(e?.target?.classList.add('hoveringState'));
        stopMoving();
        moveInterval.current = setInterval(() => {
            moveRect(direction);
        }, 40);
    }
    
    const stopMoving = (e) => {
        console.log(e?.target?.classList.remove('hoveringState'));
        clearInterval(moveInterval.current);
    }

    return (
        <div className='CrowPage' style={{ padding: '0px 10px' }}>
            <canvas width={dimensions[0]} height={dimensions[1]} id='mazecanvas' ref={canvas}>
                Can't load the maze game, because your browser doesn't support
                HTML5.
            </canvas>
            <div className='controls'>
                <div className='d-flex justify-content-center'>
                    <button
                        className='btn btn-outline-primary fs-1 fw-bold px-5'
                        onTouchStart={(e) => startMoving(e, UP)}
                        onTouchEnd={stopMoving}
                    >
                        <div className='arrowButton'>
                            <Arrow direction={UP}/>
                        </div>
                    </button>
                    </div>
                <div className='d-flex justify-content-center my-3'>
                    <button
                        className='btn btn-outline-primary fs-1 fw-bold me-5 px-5'
                        onTouchStart={(e) => startMoving(e, LEFT)}
                        onTouchEnd={stopMoving}
                    >
                    <div className='arrowButton'>
                        <Arrow direction={LEFT}/>
                    </div></button>
                    <button
                        className='btn btn-outline-primary fs-1 fw-bold ms-5 px-5'
                        onTouchStart={(e) => startMoving(e, RIGHT)}
                        onTouchEnd={stopMoving}
                    >
                    <div className='arrowButton'>
                        <Arrow direction={RIGHT}/>
                    </div></button>
                    </div>
                <div className='d-flex justify-content-center'>
                    <button
                        className='btn btn-outline-primary fs-1 fw-bold px-5'
                        onTouchStart={(e) => startMoving(e, DOWN)}
                        onTouchEnd={stopMoving}
                    >
                    <div className='arrowButton'>
                        <Arrow direction={DOWN} />
                    </div></button>
                    </div>

            </div>
        </div>
    );
};

export default CrowPage;
