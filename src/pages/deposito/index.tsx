import Header from "@/src/components/Header";
import Head from "next/head";
import styles from './styles.module.scss'
import { FormEvent, useContext, useEffect } from "react";
import { AuthContext } from "@/src/components/contexts/authContext";
import { useState } from "react";
import { api } from "@/src/services/apiClient";

export default function Saque() {
    const [deposito, setDeposito] = useState('')
    const [sucessoDeposito, setSucessoDeposito] = useState('')

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

    async function handleDeposito() {

        try {
            const newValue = user.saldo + Number(deposito)

            const response = await api.post("/transaction", {
                newValue: newValue,
                transactionValue: Number(deposito),
                description: "deposito"
            })

            setSucessoDeposito("funcionando")
            setDeposito('')
            window.location.reload()

        } catch (err) {
            console.log("Erro na requisição")
        }
    }



    return (
        <>
            <Head>
                <title>Deposito - Cooperativa Bancária</title>
            </Head>
            <Header />
            <main className={styles.saqueMain}>
                <div className={styles.box}>
                    <h1>Deposito</h1>
                    <p>Saldo Disponível: {user.saldo}</p>
                    <h3>Digite um valor para depositar</h3>
                    <input
                        value={deposito}
                        onChange={(e) => setDeposito(e.target.value)}
                    />
                    <button
                        onClick={handleDeposito}
                    >Depositar</button>
                </div>

                {sucessoDeposito === "funcionando" &&
                    <p style={{ color: 'green' }}>Deposito realizado com sucesso</p>
                }


            </main>
        </>
    )
}
