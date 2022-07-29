import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    enteredCodesMap: {},
    noteStatusMap: {}
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        validationChanged: (state, action) => {
            state.noteStatusMap[action.payload.id] = action.payload.status;
        },
        enteredCodeChanged: (state, action) => {
            const codes = state.enteredCodesMap[action.payload.id];
            if (!codes) {
                state.enteredCodesMap[action.payload.id] = [];
            }
            state.enteredCodesMap[action.payload.id][action.payload.index] =
                action.payload.value;
        }
    }
});

export const { validationChanged, enteredCodeChanged } = notesSlice.actions;

export const selectEnteredCodes = (state) => state.notes.enteredCodesMap;
export const selectNoteStatusMap = (state) => state.notes.noteStatusMap;

export default notesSlice.reducer;
