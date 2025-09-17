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
            <Modal.Body><div>
                <p className={"mt-0"}>
                    Während Sie im RIS surfen, erstellt shrinkwrap.legal automatisch
                    Zusammenfassungen für Entscheidungstexte in der RIS-Judikatursuche.
                </p>
                <p>
                    Diese Ergebnisse werden mit KI generiert und danach angezeigt. Bitte haben
                    Sie deshalb etwas Geduld, die Erstellung benötigt beim ersten Mal etwa 20-30 Sekunden.
                </p>
            </div>
                </Modal.Body>
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
