import './FutureNote.scss';

const FutureNote = () => {
    return (
        <li className='FutureNote w-100 p-3 my-3 rounded position-relative'>
            <span className='fs-2 fw-bold'>Future Note</span>
            <div className='block w-50 mt-4' />
            <div className='block w-75 mt-3' />
            <div className='circle position-absolute bottom-0 end-0 m-3' />
        </li>
    );
};

export default FutureNote;