import { useState } from 'react';
import { NOTES } from '../../res/notes';
import NoteListItem from '../NoteListItem/NoteListItem';

const NotesList = () => {
    const [notes] = useState(NOTES);

    return (
        <ul className='NotesList list-unstyled mx-3'>
            {notes.map((note) => (
                <NoteListItem key={note.id} note={note} />
            ))}
        </ul>
    );
};

export default NotesList;
