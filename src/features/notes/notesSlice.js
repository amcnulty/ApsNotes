import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notes: [{ name: 'Crane Note 2' }, { name: 'Swan Note 2' }]
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        noteAdded: (state, action) => {
            state.notes.push(action.payload);
        }
    }
});

export const { noteAdded } = notesSlice.actions;

export const selectNotes = (state) => {
    console.log('state :>> ', state);
    return state.notes.notes;
}

export default notesSlice.reducer;
