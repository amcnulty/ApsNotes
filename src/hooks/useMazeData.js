
import Maze6x6 from '../res/images/maze/maze6x6.gif';
import Maze8x8 from '../res/images/maze//maze8x8.gif';
import Maze15x15 from '../res/images/maze//maze15x15.gif';
import Maze20x20 from '../res/images/maze//maze20x20.gif';
import Maze25x25 from '../res/images/maze//maze25x25.gif';
import { useEffect, useMemo, useRef } from 'react';

const LEVEL_DATA = [
    {
        slothX: 0,
        slothY: 5,
        bananaX: 5,
        bananaY: 0
    },
    // {
    //     // test
    //     slothX: 4,
    //     slothY: 0,
    //     bananaX: 5,
    //     bananaY: 0
    // },
    {
        slothX: 2,
        slothY: 0,
        bananaX: 2,
        bananaY: 7
    },
    // {
    //     // test
    //     slothX: 2,
    //     slothY: 6,
    //     bananaX: 2,
    //     bananaY: 7
    // },
    {
        slothX: 14,
        slothY: 14,
        bananaX: 14,
        bananaY: 2
    },
    // {
    //     // test
    //     slothX: 13,
    //     slothY: 2,
    //     bananaX: 14,
    //     bananaY: 2
    // },
    {
        slothX: 19,
        slothY: 0,
        bananaX: 10,
        bananaY: 0
    },
    // {
    //     // test
    //     slothX: 10,
    //     slothY: 1,
    //     bananaX: 10,
    //     bananaY: 0
    // },
    {
        slothX: 13,
        slothY: 24,
        bananaX: 24,
        bananaY: 4
    },
    // {
    //     // test
    //     slothX: 24,
    //     slothY: 5,
    //     bananaX: 24,
    //     bananaY: 4
    // },
]

const useMazeData = () => {
    const promiseResolver = useRef();
    const mazeDataLoader = useMemo(() => new Promise((resolve) => {
        promiseResolver.current = resolve;
    }), []);

    useEffect(() => {
        const maze6x6Loader = new Promise((resolve) => {
            const maze6x6Img = new Image();
            maze6x6Img.src = Maze6x6;
            maze6x6Img.onload = () => resolve(maze6x6Img);
        });
        const maze8x8Loader = new Promise((resolve) => {
            const maze8x8Img = new Image();
            maze8x8Img.src = Maze8x8;
            maze8x8Img.onload = () => resolve(maze8x8Img);
        });
        const maze15x15Loader = new Promise((resolve) => {
            const maze15x15Img = new Image();
            maze15x15Img.src = Maze15x15;
            maze15x15Img.onload = () => resolve(maze15x15Img);
        });
        const maze20x20Loader = new Promise((resolve) => {
            const maze20x20Img = new Image();
            maze20x20Img.src = Maze20x20;
            maze20x20Img.onload = () => resolve(maze20x20Img);
        });
        const maze25x25Loader = new Promise((resolve) => {
            const maze25x25Img = new Image();
            maze25x25Img.src = Maze25x25;
            maze25x25Img.onload = () => resolve(maze25x25Img);
        });
        Promise.all([maze6x6Loader, maze8x8Loader, maze15x15Loader, maze20x20Loader, maze25x25Loader]).then((mazeData) => {
            LEVEL_DATA[0].maze = mazeData[0];
            LEVEL_DATA[1].maze = mazeData[1];
            LEVEL_DATA[2].maze = mazeData[2];
            LEVEL_DATA[3].maze = mazeData[3];
            LEVEL_DATA[4].maze = mazeData[4];
            promiseResolver.current(LEVEL_DATA);
        });
    }, []);

    return mazeDataLoader;
}

export default useMazeData;