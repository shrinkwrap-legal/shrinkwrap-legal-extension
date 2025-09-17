import React, {useCallback, useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";


export const ShrinkwrapModalInitial : React.FC = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Info von Shrinkwrap.legal</Modal.Title>
            </Modal.Header>
            <Modal.Body><div>
                <p className={"mt-0"}>
                    Herzlich Willkommen bei shrinkwrap.legal!
                </p>
                <p>
                    Benutzen Sie einfach wie gewohnt das RIS. Bei der Judikatursuche erstellt shrinkwrap.legal automatisch
                    passende Zusammenfassungen für gefundene Entscheidungen.
                </p>
            </div>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Schließen
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
