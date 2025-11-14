import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { router } from 'expo-router'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthData={
    loading: boolean,
    isAdmin: boolean,
    session: Session|null
}

const AuthContex=createContext<AuthData>({
    loading: true,
    isAdmin: false,
    session: null
})

interface Props {
    children: React.ReactNode
}

export default function AuthProvider(props: Props) {
    const [loading, setLoading]=useState<boolean>(true)
    const [isAdmin, setIsAdmin]=useState(false)
    const [session, setSession]=useState<Session|null>(null)

    useEffect(() => {
        async function getSession() {
            const { data, error }=await supabase.auth.getSession()
            if (error) {
                throw error
            } else {
                if (data.session) {
                    setSession(data.session)
                    setIsAdmin(true)
                } else {
                    router.replace('/(auth)/login')
                }
            }
            //console.log('SESION', session)
            setLoading(false)
        }
        getSession()
        const { data: eventAuthListener }=supabase.auth.onAuthStateChange(async (_, session) => {
            setSession(session)
            setLoading(false)
            if (session) {
                router.replace('/(tabs)')
            } else {
                router.replace('/(auth)/login')
            }

            return () => eventAuthListener?.subscription.unsubscribe()


        })
    }, [])

    return (
        <AuthContex.Provider value={{ loading, isAdmin, session }}>
            {props.children}
        </AuthContex.Provider>
    )
}

export function useAuthInfo() {
    return useContext(AuthContex)
}
