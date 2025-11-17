import { useAuthInfo } from '@/provider/AuthProvider'
import { Stack } from 'expo-router'
import React from 'react'

const ChatLayout=() => {
    const { profile }=useAuthInfo()

    return (
        <Stack initialRouteName='index' screenOptions={{ headerShown: true, title: profile?.username! }} />
    )
}

export default ChatLayout