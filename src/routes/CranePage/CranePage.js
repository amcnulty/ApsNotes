import React, { useMemo } from 'react';
import CodeEntry from '../../components/CodeEntry/CodeEntry';
import { NOTES } from '../../res/notes';

const CRANE_CODES = [
    'A1',
    'B2',
    'C3',
    'D4',
    'E5'
];

const CranePage = () => {
    const note = useMemo(() => NOTES.find(note => note.id === 1), []);

    return (
        <div className='CranePage' style={{ padding: '0px 10px' }}>
            <CodeEntry codes={CRANE_CODES} note={note} />
        </div>
    );
};

export default CranePage;
