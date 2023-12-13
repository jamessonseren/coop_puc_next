import Header from "@/src/components/Header"
import { setupAPIClient } from "@/src/services/api"
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import  Head  from "next/head"
import styles from './styles.module.scss'

type UserProps = {
    id: string
    cpf: string
    name: string
    email: string
    saldo: string
}
interface UserDetails {
    userDetails: UserProps
}
export default function Home({ userDetails }: UserDetails) {
    return (
        <>
            <Head>
                <title>Home - Cooperativa Bancária</title>
            </Head>
            <Header />
            <main className={styles.homeMain}>
                <h1>Seja bem-vindo ao Banco Cooperativa</h1>
                <h3>Aqui você encontra as melhores soluções financeiras para o seu bolso e para o seu futuro.</h3>
                <p>Cliente: {userDetails.name}</p>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/me')

    return {
        props: {
            userDetails: response.data
        }
    }
})