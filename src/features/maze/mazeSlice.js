import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentLevel: 0,
    allLevelsCompleted: false
};

const mazeSlice = createSlice({
    name: 'maze',
    initialState,
    reducers: {
        setLevel: (state, action) => {
            state.currentLevel = action.payload;
        },
        levelCompleted: (state, action) => {
            if (state.currentLevel < 4) {
                state.currentLevel = state.currentLevel + 1;
            } else if (state.currentLevel === 4) {
                state.allLevelsCompleted = true;
            }
        }
    }
});

export const { levelCompleted, setLevel } = mazeSlice.actions;

export const selectCurrentLevel = (state) => state.maze.currentLevel;
export const selectAllLevelsCompleted = (state) =>
    state.maze.allLevelsCompleted;

export default mazeSlice.reducer;
