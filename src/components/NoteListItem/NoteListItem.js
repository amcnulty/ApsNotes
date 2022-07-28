import { Link } from 'react-router-dom';
import './NoteListItem.scss';
import Check from './Check';
import Cross from './Cross';
import Question from './Question';

const NoteListItem = ({ note }) => {
    return (
        <li
            className='NoteListItem w-100 p-3 my-3 rounded d-flex'
            style={{ backgroundImage: `url(${note.image})` }}
        >
            <Link
                className='fw-bold text-decoration-none w-100 position-relative'
                to={note.path}
            >
                <span className='fs-2'>{note.name}</span>
                <span className='statusIcon position-absolute bottom-0 end-0'>
                    {/* <Cross /> */}
                    <Check />
                    {/* <Question /> */}
                </span>
            </Link>
        </li>
    );
};

export default NoteListItem;
