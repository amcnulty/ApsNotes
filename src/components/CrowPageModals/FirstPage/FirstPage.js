import { ModalBody, ModalFooter } from 'reactstrap';
import Sloth from '../../../routes/CrowPage/sloth.png';

const FirstPage = ({ toggleModal }) => {
    return (
        <>
            <ModalBody>
                <p>
                    Oh no! Mr. Stevens is lost in a maze and he's really really
                    hungry too! If only he could reach that sweet banana
                    everything would be alright.
                </p>
                <img className='d-flex mx-auto' src={Sloth} alt='Mr. Stevens' />
                <p>
                    Help Mr. Stevens through the maze to unlock a secret code!
                </p>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary' onClick={toggleModal}>
                    Let's Go!
                </button>
            </ModalFooter>
        </>
    );
};

export default FirstPage;
