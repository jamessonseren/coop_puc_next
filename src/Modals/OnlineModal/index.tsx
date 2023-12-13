import Modal from 'react-modal'
import { useState } from 'react';
import { QrCodeProps } from "@/src/pages/processamento"

import styles from './styles.module.scss'

import { FiX } from 'react-icons/fi';
import QRCode from 'react-qr-code';

export interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    qrCode: QrCodeProps | undefined;
}

export const customStyles = {
    content: {
        top: '50%',
        bottom: 'auto',
        left: '50%',
        right: 'auto',
        width: '100%',
        maxWidth:'800px',
        minHeight:'500px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'aliceblue',
        
    }
}
export function OnlineModal({ isOpen, onRequestClose, qrCode }: ModalProps) {

    const [qrCodeIsVisible, setQrCodeisVisible] = useState(false)


    function handleQrCodeVisible() {
        setQrCodeisVisible(true)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0 }}

            >
                <FiX size={45} color="#012B42" />
            </button>

            <div className={styles.container}>
                <h2>Confirme os dados da compra</h2>
                <div className={styles.details}>
                    <div className={styles.detailsItems}>
                        <span>Carteira:  {qrCode?.cardName}</span>
                        <span>Parcelas: {qrCode?.parcelas} de R$ {qrCode?.valorParcela}</span>

                    </div>
                    <div className={styles.detailsItems}>
                        <span>Total: R$ {qrCode?.valorBruto}</span>
                        <span>Desconto: {qrCode?.desconto}%</span>
                    </div>
                    <span className={styles.amount}>Valor a pagar: R$ {qrCode?.valor_a_pagar}</span>

                </div>

                <button className={styles.confirmButton} onClick={handleQrCodeVisible}>
                    Confirmar dados
                </button>

                {qrCodeIsVisible && (
                    <>
                        < QRCode
                            value={JSON.stringify(qrCode)}
                            className={styles.qrCode}
                        />
                        <h2>Solicite a leitura do qr code</h2>
                    </>
                )}
            </div>
        </Modal>


    )
}
