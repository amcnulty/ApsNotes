import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectEnteredCodes,
    selectNoteStatusMap
} from '../../features/notes/notesSlice';
import { VALID } from '../../res/notes';

const CodesList = () => {
    const enteredCodes = useSelector(selectEnteredCodes);
    const noteStatusMap = useSelector(selectNoteStatusMap);

    const codeSpans = useMemo(() => Object.keys(enteredCodes).map((key) => {
        if (noteStatusMap[key] === VALID) {
            return enteredCodes[key].map((code) => (
                <span className='col-3 fw-bold fs-3 my-4' key={code}>
                    {code}
                </span>
            ));
        }
        return undefined;
    }), [enteredCodes, noteStatusMap]);

    const totalCodes = useMemo(() => {
        return [].concat(...codeSpans.filter((spans) => !!spans)).length;
    }, [codeSpans]);

    return (
        <div className='CodesList text-center' style={{ padding: '0px 10px' }}>
            <p className='mt-3'>All valid codes you've entered are listed here.</p>
            <h3 className='fw-bold text-success'>{totalCodes} / 26</h3>
            <div className='row'>
                {codeSpans}
            </div>
        </div>
    );
};

export default CodesList;
