import { useThemeColor } from '@/hooks/use-theme-color'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const BackRareas=() => {
    const primary=useThemeColor({}, 'primary')
    return (
        <TouchableOpacity onPress={() => router.push('/(home)/tareas')} style={{ marginHorizontal: 30 }}>
            <Ionicons name='chevron-back-circle-outline' size={28} color={primary} />
        </TouchableOpacity>
    )
}

export default BackRareas