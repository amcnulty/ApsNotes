import React, { useMemo, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import CircleButton from '../../components/CircleButton/CircleButton';
import CodeEntry from '../../components/CodeEntry/CodeEntry';
import { NOTES } from '../../res/notes';

/**
 * Codes:
 * Row 12 Column 6 Y
 * Row 13 Column 13 Q
 * Row 16 Column 7 O
 * Row 17 Column 3 K
 * Row 21 Column 1 N
 */

const CRANE_CODES = ['Y12', 'Q13', 'O16', 'K17', 'N21'];

const CranePage = () => {
    const [showModal, setShowModal] = useState(false);
    const note = useMemo(() => NOTES.find((note) => note.id === 1), []);

    return (
        <div className='CranePage' style={{ padding: '0px 10px' }}>
            <CodeEntry codes={CRANE_CODES} note={note} />
            <CircleButton onClick={() => setShowModal(!showModal)} >?</CircleButton>
            <Modal
                isOpen={showModal}
                toggle={() => setShowModal(!showModal)}
                centered
            >
                <ModalHeader toggle={() => setShowModal(!showModal)}>
                    Crane Note Codes
                </ModalHeader>
                <ModalBody>
                    <p>
                        Use the following <b>row</b> and <b>column</b> pairs as
                        coordinates for the <b>letter</b> portion of each code.
                        For each code use the <b>row</b> as the <b>number</b>{' '}
                        portion of the code.
                    </p>
                    <p>(Row 1 does not include the title and spaces between letters <b>do not</b> count as columns)</p>
                    <h4>Coordinates - <span>(row, column)</span></h4>
                    <ul>
                        <li className='fw-bold fs-4'><code>(12, 6)</code></li>
                        <li className='fw-bold fs-4'><code>(13, 13)</code></li>
                        <li className='fw-bold fs-4'><code>(16, 7)</code></li>
                        <li className='fw-bold fs-4'><code>(17, 3)</code></li>
                        <li className='fw-bold fs-4'><code>(21, 1)</code></li>
                    </ul>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default CranePage;
