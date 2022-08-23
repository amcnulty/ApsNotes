import React from 'react';
import { useSelector } from 'react-redux';
import { ModalBody, ModalFooter } from 'reactstrap';
import { selectAllLevelsCompleted } from '../../../features/maze/mazeSlice';

const SecondPage = ({ toggleModal, code }) => {
    const allLevelsCompleted = useSelector(selectAllLevelsCompleted);
    return (
        <>
            <ModalBody>
                <h4>Good Work!</h4>
                <h5>
                    You've unlocked code{' '}
                    <span className='text-success fw-bold'>{code}</span>
                </h5>
                <p className='fst-italic'>
                    (This code will automatically be added to your list of
                    unlocked codes.)
                </p>
                {allLevelsCompleted ? (
                    <p>
                        Mr. Stevens is finally full! You've also unlocked all
                        the secret codes for this note. You can play again if
                        you would like.
                    </p>
                ) : (
                    <p>
                        Mr. Stevens appreciates the help, but he's still hungry
                        for more bananas! Go on to the next level to unlock more
                        codes and fill Mr. Stevens' belly.
                    </p>
                )}
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary' onClick={toggleModal}>
                    {allLevelsCompleted ? 'Play Again' : 'Next Level'}
                </button>
            </ModalFooter>
        </>
    );
};

export default SecondPage;
