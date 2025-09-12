import React, {useCallback, useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {getSetting, storeSetting} from "../service/storage";


export const ShrinkwrapModal : React.FC = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function getBrowserSettings() {
            const settingInfoModal = await getSetting("disableInfoModal");
            console.log('stored infoModal: ', settingInfoModal);
            if(settingInfoModal !== 'Y') {
                setShow(true);
            }
        }
        getBrowserSettings();
    }, []);

    const handleDisableInfoModal = useCallback(() => {
        storeSetting("disableInfoModal", "Y")
        setShow(false);
    }, []);


    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Info von Shrinkwrap.legal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Zusammenfassungen für alle Suchergebnisse werden automatisch erstellt und werden danach angezeigt. Bitte haben Sie ca 20-30 Sekunden Geduld.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDisableInfoModal}>
                    Nicht wieder anzeigen
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Schließen
                </Button>
            </Modal.Footer>
        </Modal>




    )
}