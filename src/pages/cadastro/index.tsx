import { useContext, FormEvent, useState } from 'react'

import Head from "next/head";

import styles from './styles.module.scss'

import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';

import { AuthContext } from '@/src/components/contexts/authContext';

import { canSSRGuest } from '@/src/utils/canSSRGuest';
import Link from 'next/link';


export default function Home() {
  const { signUp } = useContext(AuthContext)

  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    if(password !== passwordConfirm) alert("As senhas devem ser as mesmas!")

    event.preventDefault()

    if (cpf === '' || password === '' || name === '' || email === '' || passwordConfirm === "") {
      alert("Preencha todos os campos")

      return
    }

    setLoading(true)

    let data = {
      cpf,
      name,
      email,
      password
    }
    
    await signUp(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Cadastro - Cooperativa Bancária</title>
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
            <h1>Cadastre-se</h1>
            <Input
              placeholder="Digite o seu nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Digite o seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <Input
              placeholder="Digite o seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Crie a sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
            <Input
              placeholder="Confirme a sua senha"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type='password'
            />

            <Button
              type='submit'
              loading={loading}>
              Cadastrar
            </Button>

          </form>
          <Link href="/" className={styles.text}>Já possui conta? Faça o login!</Link>
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