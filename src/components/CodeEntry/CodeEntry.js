import { useDispatch, useSelector } from 'react-redux';
import {
    cranePageCodeChanged,
    validationChanged,
    enteredCodeChanged,
    selectEnteredCodes,
    selectValidation
} from '../../features/notes/notesSlice';
import { INVALID, VALID } from '../../res/notes';
import Check from '../NoteListItem/Check';
import './CodeEntry.scss';

const CodeEntry = ({ codes, note }) => {
    const enteredCodes = useSelector(selectEnteredCodes)[note.id] ?? [];
    const validation = useSelector(selectValidation)[note.id];
    const dispatch = useDispatch();

    const handleCodeEntry = (value, index) => {
        dispatch(cranePageCodeChanged({ index, value }));
        dispatch(enteredCodeChanged({ id: note.id, index, value }));
    };

    const handleValidate = () => {
        let valid = true;
        codes.forEach((code, index) => {
            if (!enteredCodes[index]) {
                valid = false;
            } else if (code !== enteredCodes[index].toUpperCase()) {
                valid = false;
            }
        });
        if (valid) {
            dispatch(validationChanged({ id: note.id, status: VALID }));
        } else {
            dispatch(validationChanged({ id: note.id, status: INVALID }));
        }
    };

    return (
        <div className='CodeEntry text-center'>
            <p>
                Enter the codes found for this note. Codes are in a letter
                number format with no spaces.
            </p>
            <p className='fst-italic'>
                Example: <b>C17</b> or <b>T9</b> are valid codes.{' '}
                <b className='dangerText'>S 20</b> or{' '}
                <b className='dangerText'>2H</b> are invalid codes!
            </p>
            <div className='codeSection mt-4 d-flex flex-wrap justify-content-center'>
                {codes.map((code, index) => (
                    <input
                        key={code}
                        className='form-control my-4 text-center'
                        type='text'
                        placeholder='code'
                        value={enteredCodes[index] ?? ''}
                        onChange={(event) =>
                            handleCodeEntry(event.target.value, index)
                        }
                    />
                ))}
            </div>
            {validation === INVALID && (
                <p className='warningMessage dangerText fw-bold'>
                    One or more codes have been entered incorrectly!
                </p>
            )}
            <button className='btn w-75 btn-primary' onClick={handleValidate}>
                Validate
            </button>
            {validation === VALID && (
                <div className='d-flex mt-5 m-auto w-25'>
                    <Check />
                </div>
            )}
        </div>
    );
};

export default CodeEntry;
