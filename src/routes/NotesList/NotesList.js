import { useState } from 'react';
import NoteListItem from '../../components/NoteListItem/NoteListItem';
import { NOTES } from '../../res/notes';
import FutureNote from '../../components/FutureNote/FutureNote';

const NotesList = () => {
    const [notes] = useState(NOTES);

    return (
        <ul className='NotesList list-unstyled mx-3'>
            {notes.map((note) => (
                <NoteListItem key={note.id} note={note} />
            ))}
            <FutureNote />
        </ul>
    );
};

export default NotesList;
