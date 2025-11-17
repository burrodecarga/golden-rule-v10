import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { router } from 'expo-router'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthData={
    loading: boolean,
    session: Session|null,
}

const AuthContex=createContext<AuthData>({
    loading: true,
    session: null,

})

interface Props {
    children: React.ReactNode
}


export default function AuthProvider(props: Props) {
    const [loading, setLoading]=useState<boolean>(true)
    const [session, setSession]=useState<Session|null>(null)


    useEffect(() => {
        async function getSession() {
            const { data, error }=await supabase.auth.getSession()
            if (error) {
                throw error
            } else {
                if (data.session) {
                    setSession(data.session)
                    router.replace('/(home)/inicio')
                } else {
                    router.replace('/(auth)/login')
                }
            }
            setLoading(false)
        }
        getSession()
        const { data: eventAuthListener }=supabase.auth.onAuthStateChange(async (_, session) => {
            setSession(session)
            setLoading(false)
            if (session) {
                router.replace('/(home)/inicio')
            } else {
                router.replace('/(auth)/login')
            }

            return () => eventAuthListener?.subscription.unsubscribe()


        })
    }, [])



    return (
        <AuthContex.Provider value={{ loading, session }}>
            {props.children}
        </AuthContex.Provider>
    )
}

export function useAuthInfo() {
    return useContext(AuthContex)
}
