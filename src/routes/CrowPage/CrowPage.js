import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import Sloth from './sloth.png';
import Banana from './banana.png';
import './CrowPage.scss';
import Arrow from './Arrow';
import useMazeData from '../../hooks/useMazeData';
import { useDispatch, useSelector } from 'react-redux';
import {
    levelCompleted,
    selectAllLevelsCompleted,
    selectCurrentLevel,
    setLevel
} from '../../features/maze/mazeSlice';
import { Modal, ModalHeader } from 'reactstrap';
import FirstPage from '../../components/CrowPageModals/FirstPage/FirstPage';
import SecondPage from '../../components/CrowPageModals/SecondPage/SecondPage';
import {
    enteredCodeChanged,
    validationChanged
} from '../../features/notes/notesSlice';
import { NOTES, VALID } from '../../res/notes';

const LEFT = 'LEFT';
const UP = 'UP';
const RIGHT = 'RIGHT';
const DOWN = 'DOWN';
const MOVEMENT_AMOUNT = 3;
const PATH_WIDTH = 20;
const WALL_WIDTH = 2;
const SLOTH_SIZE = 15;
const BANANA_SIZE = 20;
const CROW_CODES = ['Z7', 'D26', 'X8', 'I25', 'L11'];

const CrowPage = () => {
    const note = useMemo(() => NOTES.find((note) => note.id === 4), []);
    const [dimensions, setDimensions] = useState([10, 10]);
    const canvas = useRef();
    const context = useRef();
    const moveInterval = useRef();
    const currSlothX = useRef();
    const currSlothY = useRef();
    const currBananaX = useRef();
    const currBananaY = useRef();
    const mazeWidth = useRef();
    const mazeHeight = useRef();
    const slothImg = useRef();
    const bananaImg = useRef();
    const getMazeData = useMazeData();
    const currentLevel = useSelector(selectCurrentLevel);
    const allLevelsCompleted = useSelector(selectAllLevelsCompleted);
    const [showModal, setShowModal] = useState(
        !allLevelsCompleted && currentLevel === 0
    );
    const dispatch = useDispatch();

    const canMoveTo = useCallback((destX, destY) => {
        const imgData = context.current.getImageData(
            destX,
            destY,
            SLOTH_SIZE,
            SLOTH_SIZE
        );
        const data = imgData.data;
        let canMove = 1; // 1 means: the sloth can move
        if (
            destX >= PATH_WIDTH &&
            destX <= mazeWidth.current - SLOTH_SIZE &&
            destY >= PATH_WIDTH &&
            destY <= mazeHeight.current - PATH_WIDTH - SLOTH_SIZE
        ) {
            // Check for victory
            const slothCenterX = currSlothX.current + SLOTH_SIZE / 2;
            const slothCenterY = currSlothY.current + SLOTH_SIZE / 2;
            if (
                slothCenterX >= currBananaX.current &&
                slothCenterX <= currBananaX.current + (BANANA_SIZE - 1) &&
                slothCenterY >= currBananaY.current &&
                slothCenterY <= currBananaY.current + (BANANA_SIZE - 1)
            ) {
                return 2;
            }
            for (let y = 0; y < SLOTH_SIZE; y++) {
                for (let x = 0; x < SLOTH_SIZE; x++) {
                    if (
                        x > MOVEMENT_AMOUNT - 1 &&
                        y > MOVEMENT_AMOUNT - 1 &&
                        x < SLOTH_SIZE - MOVEMENT_AMOUNT &&
                        y > SLOTH_SIZE - MOVEMENT_AMOUNT
                    )
                        continue;
                    let i = x * 4 + y * 4 * SLOTH_SIZE;
                    if (
                        // if black
                        data[i] === 0 &&
                        data[i + 1] === 0 &&
                        data[i + 2] === 0
                    ) {
                        canMove = 0; // 0 means: the sloth can't move
                        break;
                    }
                }
            }
        } else {
            canMove = 0;
        }
        return canMove;
    }, []);

    const renderSloth = useCallback((x, y) => {
        makeWhite(
            currSlothX.current,
            currSlothY.current,
            SLOTH_SIZE,
            SLOTH_SIZE
        );
        currSlothX.current = x;
        currSlothY.current = y;
        context.current.drawImage(
            slothImg.current,
            x,
            y,
            SLOTH_SIZE,
            SLOTH_SIZE
        );
    }, []);

    const initMaze = useCallback(
        ({ maze, slothX, slothY, bananaX, bananaY }) => {
            setDimensions([maze.width, maze.height]);
            mazeWidth.current = maze.width;
            mazeHeight.current = maze.height;
            setTimeout(() => {
                context.current = canvas.current?.getContext('2d');
                context.current.drawImage(maze, 0, 0);
                currSlothX.current = (slothX + 1) * (PATH_WIDTH + WALL_WIDTH);
                currSlothY.current = (slothY + 1) * (PATH_WIDTH + WALL_WIDTH);
                renderSloth(currSlothX.current, currSlothY.current, '#0000FF');
                currBananaX.current = (bananaX + 1) * (PATH_WIDTH + WALL_WIDTH);
                currBananaY.current = (bananaY + 1) * (PATH_WIDTH + WALL_WIDTH);
                context.current.drawImage(
                    bananaImg.current,
                    currBananaX.current,
                    currBananaY.current,
                    BANANA_SIZE,
                    BANANA_SIZE
                );
            });
        },
        [renderSloth]
    );

    const setNextLevel = useCallback(() => {
        if (!allLevelsCompleted && currentLevel === 0) {
            return;
        } else if (allLevelsCompleted) {
            if (currentLevel === 4) {
                getMazeData.then((mazeData) => {
                    dispatch(setLevel(0));
                    initMaze(mazeData[0]);
                });
            } else {
                getMazeData.then((mazeData) => {
                    initMaze(mazeData[currentLevel + 1]);
                });
            }
        } else {
            getMazeData.then((mazeData) => initMaze(mazeData[currentLevel]));
        }
    }, [allLevelsCompleted, currentLevel, dispatch, getMazeData, initMaze]);

    const move = useCallback(
        (direction) => {
            let newX;
            let newY;
            let movingAllowed;
            switch (direction) {
                case UP:
                    newX = currSlothX.current;
                    newY = currSlothY.current - MOVEMENT_AMOUNT;
                    break;
                case LEFT:
                    newX = currSlothX.current - MOVEMENT_AMOUNT;
                    newY = currSlothY.current;
                    break;
                case DOWN:
                    newX = currSlothX.current;
                    newY = currSlothY.current + MOVEMENT_AMOUNT;
                    break;
                case RIGHT:
                    newX = currSlothX.current + MOVEMENT_AMOUNT;
                    newY = currSlothY.current;
                    break;
                default:
                    return;
            }
            movingAllowed = canMoveTo(newX, newY);
            if (movingAllowed === 1) {
                // 1 means 'the sloth can move'
                renderSloth(newX, newY, '#0000FF');
                currSlothX.current = newX;
                currSlothY.current = newY;
            } else if (movingAllowed === 2) {
                // 2 means 'the sloth reached the end point'
                stopMoving();
                dispatch(levelCompleted());
                if (allLevelsCompleted) {
                    setNextLevel();
                } else {
                    dispatch(
                        enteredCodeChanged({
                            id: note.id,
                            index: currentLevel,
                            value: CROW_CODES[currentLevel]
                        })
                    );
                    dispatch(validationChanged({ id: note.id, status: VALID }));
                    setShowModal((showModal) => !showModal);
                }
            }
        },
        [canMoveTo, renderSloth, dispatch, allLevelsCompleted, setNextLevel, note.id, currentLevel]
    );

    useEffect(() => {
        // dispatch(setLevel(0)); // Used for debugging issues
        const bananaImgLoader = new Promise((resolve) => {
            bananaImg.current = new Image();
            bananaImg.current.src = Banana;
            bananaImg.current.onload = resolve;
        });
        const slothImgLoader = new Promise((resolve) => {
            slothImg.current = new Image();
            slothImg.current.src = Sloth;
            slothImg.current.onload = resolve;
        });
        Promise.all([bananaImgLoader, slothImgLoader, getMazeData]).then(
            ([, , mazeData]) => {
                initMaze(mazeData[currentLevel]);
            }
        );
    }, [currentLevel, getMazeData, initMaze]);

    const makeWhite = (x, y, w, h) => {
        context.current.beginPath();
        context.current.rect(x, y, w, h);
        context.current.closePath();
        context.current.fillStyle = '#669999';
        context.current.fill();
    };

    const startMoving = (e, direction) => {
        e?.target?.classList.add('hoveringState');
        stopMoving();
        moveInterval.current = setInterval(() => {
            move(direction);
        }, 40);
    };

    const stopMoving = (e) => {
        e?.target?.classList.remove('hoveringState');
        clearInterval(moveInterval.current);
    };

    const handleModalClose = () => {
        setShowModal(!showModal);
        setNextLevel();
    };

    return (
        <div className='CrowPage' style={{ padding: '0px 10px' }}>
            <h4 className='text-center'>Level {currentLevel + 1}</h4>
            <p className='text-center m-0 fw-bold'>
                Help Mr. Stevens reach the banana!
            </p>
            <canvas
                width={dimensions[0]}
                height={dimensions[1]}
                id='mazecanvas'
                ref={canvas}
            >
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
                            <Arrow direction={UP} />
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
                            <Arrow direction={LEFT} />
                        </div>
                    </button>
                    <button
                        className='btn btn-outline-primary fs-1 fw-bold ms-5 px-5'
                        onTouchStart={(e) => startMoving(e, RIGHT)}
                        onTouchEnd={stopMoving}
                    >
                        <div className='arrowButton'>
                            <Arrow direction={RIGHT} />
                        </div>
                    </button>
                </div>
                <div className='d-flex justify-content-center'>
                    <button
                        className='btn btn-outline-primary fs-1 fw-bold px-5'
                        onTouchStart={(e) => startMoving(e, DOWN)}
                        onTouchEnd={stopMoving}
                    >
                        <div className='arrowButton'>
                            <Arrow direction={DOWN} />
                        </div>
                    </button>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                toggle={handleModalClose}
                centered
                backdrop='static'
            >
                <ModalHeader toggle={handleModalClose}>
                    Michael Aaron's Maze Game!
                </ModalHeader>
                {currentLevel === 0 && (
                    <FirstPage toggleModal={handleModalClose} />
                )}
                {currentLevel > 0 && (
                    <SecondPage
                        code={
                            allLevelsCompleted
                                ? CROW_CODES[currentLevel]
                                : CROW_CODES[currentLevel - 1]
                        }
                        toggleModal={handleModalClose}
                    />
                )}
            </Modal>
        </div>
    );
};

export default CrowPage;
