import { AuthContext } from '../contexts/authContext'
import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
// import { FiLogOut } from 'react-icons/fi'

export default function Header() {

    const { user, signOut } = useContext(AuthContext)
    return (
        <>
            <header className={styles.header}>
                <div className={styles.left}>
                    <Link className={styles.logo} href="/home">Cooperativa Bancária</Link>
                </div>
                <nav className={styles.right}>
                    <Link href="/home">Página Inicial</Link>
                    <Link href="/saque">Saque</Link>
                    <Link href="/deposito">Depósito</Link>
                    <Link href="/extrato">Extrato</Link>
                    <button onClick={signOut}>Sair</button>
                </nav>
            </header>
        </>
    )
}