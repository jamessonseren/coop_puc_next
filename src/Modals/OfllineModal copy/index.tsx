import styles from './styles.module.scss'
import { useState } from 'react';
import Modal from 'react-modal'
import { Button } from '@/src/components/ui/button';

import { FiX } from 'react-icons/fi';

import { customStyles } from '../OnlineModal';

import { Input } from '@/src/components/ui/input';

import { api } from '@/src/services/apiClient';

import { ModalProps } from '../OnlineModal';


export async function OfflineModal({ isOpen, onRequestClose, qrCode }: ModalProps) {

    // const [paymentSuccess, setPaymentSucess] = useState(false)
    // const [token, setToken] = useState<string>('')


    
    // async function handleProcessPayment(){
    //     try {
    //         const response = await api.post('/offline-process-payment', {
    //             token,
    //             qrCode
    
    //         })

    //         if(response.data.status === 'confirmado') {
    //             setPaymentSucess(true)
    //         }
    
    //     } catch (err) {
    //         console.log("Offline payment request failure: ", err)
    //     }
        
    // }


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
            {/* <div className={styles.modalContent}>
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
            )} */}
        </Modal>
    )
}