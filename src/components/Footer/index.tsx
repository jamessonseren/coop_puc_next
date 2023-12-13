import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Footer(){

    const { user } = useContext(AuthContext)
    return(

        <>
            <h1>footer</h1>
           
        </>
    )
}

