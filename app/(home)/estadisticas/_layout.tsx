import { Stack } from 'expo-router'
import React from 'react'

const ResumenesLayout=() => {
    // const { profile }=useUserInfo()
    // const isAdmin=profile?.role==='admin'

    return (
        <Stack screenOptions={{ headerShown: false }} initialRouteName='principal'>
            <Stack.Screen name="principal" />
            <Stack.Screen name='by_chofer' />
            <Stack.Screen name='by_plataforma' />
            <Stack.Screen name='by_vehiculo' />
            <Stack.Screen name='resumenes' />
        </Stack>
    )
}

export default ResumenesLayout