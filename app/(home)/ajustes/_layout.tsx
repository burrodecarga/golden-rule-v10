import { useUserInfo } from '@/provider/UserProvider'
import { Stack } from 'expo-router'
import React from 'react'

const AjustesLayout=() => {
    const { isAdmin }=useUserInfo()


    return (
        <Stack screenOptions={{ headerShown: false }} initialRouteName='index' >
            <Stack.Protected guard={isAdmin}>
                <Stack.Screen name='usuarios' />
                <Stack.Screen name='plataformas' />
                <Stack.Screen name='vehiculos' />
            </Stack.Protected>
            <Stack.Screen name='index' />

        </Stack>
    )
}

export default AjustesLayout