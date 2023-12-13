import Header from "@/src/components/Header";
import Head from "next/head";
import styles from './styles.module.scss'
import { FormEvent, useContext, useEffect } from "react";
import { AuthContext } from "@/src/components/contexts/authContext";
import { useState } from "react";
import { api } from "@/src/services/apiClient";

export default function Saque() {
    const [saque, setSaque] = useState('')
    const [sucessoSaque, setSucessoSaque] = useState('')

    const { user } = useContext(AuthContext)

    const [saldo, setSaldo] = useState<number>()

    async function getSaldo() {

        const response = await api.get('/me')
        
        setSaldo(response.data.saldo)
        console.log(saldo)
    }

    useEffect(() => {

        getSaldo()

    }, [])


    async function handleSaque(){
        if(+saque > user.saldo){
            alert("Saldo insuficiente")
            return
        }
        const newValue = user.saldo - Number(saque)

        const response = await api.post("/transaction",{
            newValue: newValue,
            transactionValue: Number(saque),
            description:"saque"
        })

        setSucessoSaque("funcionando")
        setSaque("")

        window.location.reload()
    }

    

    return (
        <>
            <Head>
                <title>Saque - Cooperativa Bancária</title>
            </Head>
            <Header />
            <main className={styles.saqueMain}>
                <div className={styles.box}>
                    <h1>Saque</h1>
                    <p>Saldo Disponível: {user.saldo}</p>
                    <h3>Digite um valor para sacar</h3>
                    <input 
                        value={saque}
                        onChange={(e) => setSaque(e.target.value)}
                    />
                    <button
                        onClick={handleSaque}
                    >Sacar</button>
                </div>

                {sucessoSaque === "funcionando" && 
                    <p style={{color:'green'}}>Saque realizado com sucesso</p>
                }

                
            </main>
        </>
    )
}
