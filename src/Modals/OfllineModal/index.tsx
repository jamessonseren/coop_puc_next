import styles from './styles.module.scss'
import Modal from 'react-modal'
import { useState } from 'react'

import { FiX } from 'react-icons/fi';

import { customStyles } from '../OnlineModal';

import { Input } from '@/src/components/ui/input';
import { ModalProps } from '../OnlineModal';

import { api } from '@/src/services/apiClient';
import { Button } from '@/src/components/ui/button';


export function OfflineModal({ isOpen, onRequestClose, qrCode }: ModalProps) {
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>()
    const [token, setToken] = useState<string>('')


    const companyCardId = qrCode?.companyCardId
    const companyName = qrCode?.companyName
    const cardName = qrCode?.cardName
    const parcelas = qrCode?.parcelas
    const desconto = qrCode?.desconto
    const valorTotal = qrCode?.valor_a_pagar
    const valorBruto = qrCode?.valorBruto
    const cashbackComercio = qrCode?.cashbackComercio
    
    async function handleProcessPayment() {
        

        try {
            const response = await api.post('/offline-process-payment', {
                token,
                companyCardId,
                companyName,
                cardName,
                parcelas,
                desconto,
                valorTotal,
                valorBruto,
                cashbackComercio

            })
            if (response.data.confirmedStatus.status === 'confirmado') {
                setPaymentSuccess(true)
            }else if(response.data.confirmedStatus.status === 'recusado'){
                setPaymentSuccess(false)
            }

        } catch (err) {
            console.log("Offline payment request failure: ", err)
        }

    }


    return (
        <Modal
            isOpen={isOpen}
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
            <div className={styles.modalContent}>
                <label>Digite o Token de pagamento Offline</label>
                <Input
                    placeholder='token'
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
            </div>
            <Button
                type='button'
                onClick={handleProcessPayment}
                className={styles.offlineButton}
            >
                Finalizar compra
            </Button>
            {paymentSuccess && (
                <h1>Pagamento confirmado</h1>
            )}
            {paymentSuccess === false && (
                <h1>Pagamento Recusado</h1>
            )}
        </Modal>
    )
}