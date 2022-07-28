import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import './Header.scss';

const Header = () => {
    const navigate = useNavigate();
    const title = useTitle();

    const handleBackClick = () => {
        navigate(-1);
    }

    return (
        <div className='Header pt-2 d-flex justify-content-between align-items-center'>
            <button className={`btn btn-icon fw-bold fs-1 ${title === 'Notes' ? 'invisible' : ''}`} onClick={handleBackClick}>
                &#10554;
            </button>
            <span className='fw-bold fs-4 text-center'>{title}</span>
            <button className='btn btn-icon fw-bold fs-1 invisible' onClick={handleBackClick}>
                &#10554;
            </button>
        </div>
    );
};

export default Header;
