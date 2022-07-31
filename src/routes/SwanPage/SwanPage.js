import React, { useMemo, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import CircleButton from '../../components/CircleButton/CircleButton';
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
    const [showModal, setShowModal] = useState(false);
    const note = useMemo(() => NOTES.find(note => note.id === 2), []);

    return (
        <div className='SwanPage' style={{ padding: '0px 10px' }}>
            <CodeEntry codes={SWAN_CODES} note={note} />
            <CircleButton onClick={() => setShowModal(!showModal)} >?</CircleButton>
            <Modal
                isOpen={showModal}
                toggle={() => setShowModal(!showModal)}
                centered
            >
                <ModalHeader toggle={() => setShowModal(!showModal)}>
                    Swan Note Codes
                </ModalHeader>
                <ModalBody>
                    <p>
                        Look at Michael Aaron's Crossword to find the codes. (Think letter number pairs)
                    </p>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default SwanPage;