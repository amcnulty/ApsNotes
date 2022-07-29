import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import './Header.scss';

const Header = () => {
    const navigate = useNavigate();
    const title = useTitle();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='Header pt-2 d-flex justify-content-between align-items-center'>
            <button
                className={`btn btn-icon border-0 fw-bold fs-1 ${
                    title === 'Notes' ? 'invisible' : ''
                }`}
                onClick={handleBackClick}
            >
                &#10554;
            </button>
            <span className='fw-bold fs-4 text-center'>{title}</span>
            <button
                className='btn btn-icon border-0 d-flex fw-bold fs-1'
                onClick={() => navigate('codes')}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                >
                    <path d='M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z' />
                </svg>
            </button>
        </div>
    );
};

export default Header;
