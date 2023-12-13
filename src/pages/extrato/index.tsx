import Header from "@/src/components/Header";
import Head from "next/head";
import styles from './styles.module.scss'
import { FormEvent, useContext, useEffect } from "react";
import { AuthContext } from "@/src/components/contexts/authContext";
import { useState } from "react";
import { api } from "@/src/services/apiClient";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";

type TransactionProps = {
    id: string
    descricao: string,
    valor: number,
    data: Date
}
interface TransactionDetails {
    transactionsList: TransactionProps[]
}
export default function Extrato({ transactionsList }: TransactionDetails) {
    const [transactions, setTransactions] = useState(transactionsList || [])


    return (
        <>
            <Head>
                <title>Extrato - Cooperativa Bancária</title>
            </Head>
            <Header />
            <main className={styles.extratoMain}>
                <div className={styles.box}>
                    <h1>Extrato de Transações</h1>

                </div>

                {transactions.map((transaction, index) => {
                    return (
                        <div key={transaction.id} className={styles.transactionList}>
                            <ul className={styles.transactionDetails}>
                                <li>{transaction.descricao}</li>
                                <li>Valor: R$ {transaction.valor},00</li>
                                <li>Data: {new Date(transaction.data).toLocaleString()}</li>
                            </ul>
                        </div>
                    )
                })}

            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/transaction')

    return {
        props: {
            transactionsList: response.data
        }
    }
})
