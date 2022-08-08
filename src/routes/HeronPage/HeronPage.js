import React, { useMemo, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import CircleButton from '../../components/CircleButton/CircleButton';
import CodeEntry from '../../components/CodeEntry/CodeEntry';
import { NOTES } from '../../res/notes';

const HERON_CODES = ['V9', 'F10', 'M19', 'G24', 'B18'];

const HeronPage = () => {
    const [showModal, setShowModal] = useState(false);
    const note = useMemo(() => NOTES.find((note) => note.id === 3), []);
    
    return (
        <div className='HeronPage' style={{ padding: '0px 10px' }}>
            <CodeEntry codes={HERON_CODES} note={note} />
            <CircleButton onClick={() => setShowModal(!showModal)} >?</CircleButton>
            <Modal
                isOpen={showModal}
                toggle={() => setShowModal(!showModal)}
                centered
            >
                <ModalHeader toggle={() => setShowModal(!showModal)}>
                    Heron Note Codes
                </ModalHeader>
                <ModalBody>
                    <p>
                        Hmmmm... this Scantron forms a 5 x 5 grid. Could this be related to that other grid filled with codes?
                    </p>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default HeronPage;