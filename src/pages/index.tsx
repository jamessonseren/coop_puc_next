import { useContext, FormEvent, useState } from 'react'

import Head from "next/head";

import styles from '../../styles/Home.module.scss'

import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button";

import { AuthContext } from '../components/contexts/authContext';

import { canSSRGuest } from '../utils/canSSRGuest';
import Link from 'next/link';


export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (cpf === '' || password === '') {
      alert("Preencha os dados")

      return
    }

    setLoading(true)

    let data = {
      cpf,
      password
    }
    
    await signIn(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Plataforma Comercio</title>
        <meta name="Cooperativa Bancária" content="Plataforma com Next app" />
        <meta name="viewport" content="width-device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className={styles.containerCenter}>

        <div className={styles.login}>
          <h1
            style={{ color: "#000", fontSize: "45px" }}
          >Cooperativa Bancária</h1>

          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <Input
              placeholder="Digite o cpf ou CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <Input
              placeholder="Digite a sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />

            <Button
              type='submit'
              loading={loading}>
              Acessar
            </Button>

          </form>
          <Link href="/cadastro" className={styles.text}>Não possui conta? Cadastre-se</Link>
        </div>
      </div>

    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})