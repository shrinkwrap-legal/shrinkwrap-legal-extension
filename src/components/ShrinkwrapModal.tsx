import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";


export const ShrinkwrapModal : React.FC = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Modal show={show} onHide={handleClose} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Info von Shrinkwrap.legal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Zusammenfassungen für alle Suchergebnisse werden automatisch erstellt und werden danach angezeigt. Bitte haben Sie ca 20-30 Sekunden Geduld.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Nicht wieder anzeigen
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Schließen
                </Button>
            </Modal.Footer>
        </Modal>




    )
}