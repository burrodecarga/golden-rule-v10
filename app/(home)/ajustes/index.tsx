import { useThemeColor } from '@/hooks/use-theme-color'
import { useAuthInfo } from '@/provider/AuthProvider'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const AjustesIndex=() => {
    const { isAdmin }=useAuthInfo()
    const primary=useThemeColor({}, 'primary')


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isAdmin&&<View>
                <TouchableOpacity
                    style={{
                        backgroundColor: primary,
                        paddingHorizontal: 4,
                        paddingVertical: 8,
                        borderRadius: 5,
                        marginVertical: 10,
                        width: 80
                    }}
                    onPress={() => {
                        router.push('/(home)/ajustes/vehiculos')
                    }}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: 11 }}>
                        Usuarios
                    </Text>
                </TouchableOpacity>
            </View>}
            {isAdmin&&<View>
                <TouchableOpacity
                    style={{
                        backgroundColor: primary,
                        paddingHorizontal: 4,
                        paddingVertical: 8,
                        borderRadius: 5,
                        marginVertical: 10,
                        width: 80
                    }}
                    onPress={() => {
                        router.push('/(home)/ajustes/plataformas')
                    }}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: 11 }}>
                        Plataformas
                    </Text>
                </TouchableOpacity>
            </View>}
            {isAdmin&&<View>
                <TouchableOpacity
                    style={{
                        backgroundColor: primary,
                        paddingHorizontal: 4,
                        paddingVertical: 8,
                        borderRadius: 5,
                        marginVertical: 10,
                        width: 80
                    }}
                    onPress={() => {
                        router.push('/(home)/ajustes/vehiculos')
                    }}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: 11 }}>
                        vehiculos
                    </Text>
                </TouchableOpacity>
            </View>}

            <View>
                <TouchableOpacity
                    style={{
                        backgroundColor: primary,
                        paddingHorizontal: 4,
                        paddingVertical: 8,
                        borderRadius: 5,
                        marginVertical: 10,
                        width: 80
                    }}
                    onPress={() => {
                        router.push('/(home)/ajustes/profile')
                    }}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: 11 }}>
                        Profile
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default AjustesIndex