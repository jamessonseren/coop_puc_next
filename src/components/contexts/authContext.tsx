import { createContext, ReactNode, useState, useEffect } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { api } from '@/src/services/apiClient'

type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean,
    signUp: (credentials: SignUpProps) => Promise<void>
    signIn: (credentials: SignInProps) => Promise<void>,
    signOut: () => void
}

type SignUpProps = {
    cpf: string,
    password: string,
    email: string,
    name: string
}

type UserProps = {
    id: string,
    cpf: string,
    saldo: number
}

type SignInProps = {
    cpf: string,
    password: string
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')

        delete api.defaults.headers['Authorization'];
        Router.push('/')
    }catch{
        console.log("erro ao deslogar")
    }
}

export function AuthProvider( { children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({id: '', cpf: '', saldo: 0})
    const isAuthenticated = !!user

    useEffect(() => {
        
        //pegar dados no cookie
        const { '@nextauth.token': token } = parseCookies()

        if(token){
            api.get('/me').then(response => {
                const { id, cpf, saldo } = response.data

                setUser({
                    id,
                    cpf,
                    saldo
                })
            })
            .catch(() => {

                console.log("Error in requesting company user details")
                signOut()
            })
        } 
        
    },[])

    async function signUp({ name, email, cpf, password}: SignUpProps){
        try{
            const response = await api.post('/users', {
                name,
                email,
                cpf,
                password
            })

            Router.push('/')

        }catch(err){
            console.log("SignUp error: ", err)
        }
    }

    async function signIn( {cpf, password}: SignInProps){
        try{
            const response = await api.post('/login', {
                cpf,
                password
            })
            const { id, token, saldo} = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // expires in one month
                path:"/"
            })

            setUser({
                id, 
                cpf,
                saldo
            })
            // console.log("userName: ", user.userName)
            //Passar para próximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //Redirecionar o usuário para proxima página
            Router.push('/home')
            
        }catch(err){
            console.log("Login Error: ", err)
        }   
    }
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signUp, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}