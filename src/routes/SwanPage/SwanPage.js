import React, { useMemo } from 'react';
import CodeEntry from '../../components/CodeEntry/CodeEntry';
import { NOTES } from '../../res/notes';

const SWAN_CODES = [
    'C1',
    'S2',
    'T3',
    'H4',
    'A5',
    'P6'
];

const SwanPage = () => {
    const note = useMemo(() => NOTES.find(note => note.id === 2), []);

    return (
        <div className='SwanPage' style={{ padding: '0px 10px' }}>
            <CodeEntry codes={SWAN_CODES} note={note} />
        </div>
    );
};

export default SwanPage;