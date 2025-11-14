import ParallaxScrollView from '@/components/parallax-scroll-view'
import ThemedButton from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import ThemedTextInput from '@/components/ThemedTextInput'
import { useThemeColor } from '@/hooks/use-theme-color'
import { supabase } from '@/lib/supabase'
import { SignInWithPasswordCredentials } from '@supabase/supabase-js'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Dimensions, KeyboardAvoidingView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'

const LoginScreen=() => {
    const { height }=useWindowDimensions()
    const [loading, setLoading]=useState(false)
    const [form, setForm]=useState({
        email: '',
        password: ''
    })

    const primary=useThemeColor({}, 'primary')


    const handleLogin=async (credentials: SignInWithPasswordCredentials) => {
        if (!("email" in credentials)) return
        setLoading(true)
        const { email, password }=credentials
        const { error, data }=await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            Alert.alert(error.message)
            setLoading(false)
            return
        }
        if (data.session) {
            //console.log('DE DATA', data)
            setLoading(false)
            router.replace('/_sitemap')
        }
    }


    const onLogin=async () => {
        const { email, password }=form
        //console.log({ email, password })
        if (email.length===0||password.length===0) {
            return
        }

        setLoading(true)
        handleLogin({ email, password })
        setLoading(false)
    }

    return (

        <KeyboardAvoidingView
            behavior='padding'
            style={{ flex: 1 }}>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                headerImage={
                    <Image
                        source={require('@/assets/images/icono.png')}
                        style={styles.reactLogo}
                    />
                }>

                <View style={{}}>


                    <ThemedText type='subtitle' style={{ borderWidth: 1, borderRadius: 5, padding: 10, borderColor: primary, textAlign: 'center', marginBottom: 10, color: primary }}>GOLDEN RULE CARGO LLC</ThemedText>
                    <ThemedText style={{ color: primary }}>Para continuar, por favor ingrese sus datos</ThemedText>
                </View>
                <View style={{ marginTop: 0 }} />
                <ThemedTextInput
                    placeholder='correo electrónico'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    icon='mail-outline'
                    value={form.email}
                    onChangeText={(value) => setForm({ ...form, email: value })}
                />

                <ThemedTextInput
                    placeholder='contraseña'
                    autoCapitalize='none'
                    //secureTextEntry
                    icon='lock-closed-outline'
                    value={form.password}
                    onChangeText={(value) => setForm({ ...form, password: value })}
                />
                <View style={{ marginTop: 10 }} />
                <ThemedButton icon='arrow-forward-circle-outline' onPress={onLogin} >Ingresar</ThemedButton>
                <View style={{ padding: 10, borderColor: 'red', backgroundColor: '#fbb9ba', borderRadius: 8 }}>

                    <ThemedText style={{ marginVertical: 0, fontSize: 11, fontWeight: 'bold' }}>ATENCIÓN</ThemedText>
                    <ThemedText style={{ marginVertical: 0, fontSize: 11, wordWrap: 'wrap', textAlign: 'justify' }}>
                        Esta aplicación pertenece al <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Ing. Saro Di Frisco Durant</Text>,
                        Esta diseñada para ser usada única y exclusivamente por las personas que el <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Ing. Saro Di Frisco Durant</Text> autorice.
                        Cualquier persona que lo use sin autorización se debe atener a las consecuencias legales que amerite.</ThemedText>


                    <ThemedText style={{ fontSize: 10, marginBottom: 10 }}>Desarrollo: Edwin Henriquez, edwinhenriquezh@gmail.com</ThemedText>
                </View>

            </ParallaxScrollView>
        </KeyboardAvoidingView>


    )
}

export default LoginScreen


const styles=StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: Dimensions.get('screen').height*0.3,
        width: Dimensions.get('screen').width,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
})
