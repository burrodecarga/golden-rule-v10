import { supabase } from '@/lib/supabase'
import { downloadAvatar, Profile } from '@/lib/usuarios/api_usuarios'
import { ProfileProps } from '@/utils/types'
import * as ImagePicker from "expo-image-picker"
import { useEffect, useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../Button'
import { ThemedView } from '../themed-view'
import ThemedTextInput from '../ThemedTextInput'
import Avatar from './Avatar'

interface ProfileFormProps {
    profile: Profile|undefined|any
    loading: boolean
    setLoading: (value: boolean) => void
}
const ProfileForm=({ profile, loading, setLoading }: ProfileFormProps) => {

    const [avatarUrl, setAvatarUrl]=useState("")
    const [avatarUpdated, setAvatarUpdated]=useState(false)
    const [form, setForm]=useState<ProfileProps>(profile)
    const [date, setDate]=useState(new Date())
    const [showPicker, setShowPicker]=useState(false)
    const [render, setRender]=useState(false)

    const handlePickImage=async () => {
        const result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
        })
        if (!result.canceled) {
            setAvatarUrl(result.assets[0].uri)
            setAvatarUpdated(true)
        }
    }

    const onChangeDate=(event: any, selectedDate: any) => {
        const currentDate=selectedDate||date
        setShowPicker(Platform.OS==='ios') // Hide picker on Android after selection
        setDate(currentDate)
        handleChange("birthday", currentDate)
    }

    const handleChange=(name: string, text: string): void => {

        setForm((prev) => ({
            ...prev,
            [name]: text
        }))
    }

    const saveProfile=async (
        updatedProfile: Profile,
        avatarUpdated: boolean
    ) => {
        console.log('entrando', updatedProfile)



        console.log('MECATRON', updatedProfile.avatar_url, avatarUpdated)

        if (updatedProfile.avatar_url&&avatarUpdated) {
            console.log('actualizando avatar')
            const { avatar_url }=updatedProfile

            const fileExt=avatar_url.split(".").pop()
            const fileName=avatar_url.replace(/^.*[\\\/]/, "")
            const filePath=`${Date.now()}.${fileExt}`

            const formData=new FormData()
            const photo={
                uri: avatar_url,
                name: fileName,
                type: `image/${fileExt}`
            } as unknown as Blob
            formData.append("file", photo)

            const { error }=await supabase.storage
                .from("avatars")
                .upload(filePath, formData)
            if (error) throw error
            updatedProfile.avatar_url=filePath
        }

        console.log('ACTUALIZADO AVATAR XX')
        //setLoading(true)

        const { error }=await supabase
            .from("profiles")
            .update(
                updatedProfile
            )
            .eq("id", profile.id)
        if (error) {
            console.log('ERROR', error)
        } else {
            console.log("PROFILE SAVED")
            Alert.alert("Profile saved", 'profile save')
        }
        console.log('FIN')
        //setLoading(false)
    }

    const handleSubmit=() => {
        console.log('saliendo')
        saveProfile({ ...profile, username: form.username, first_name: form.first_name, last_name: form.last_name, birthday: form.birthday, avatar_url: avatarUrl }, avatarUpdated)
    }

    useEffect(() => {

        if (form?.avatar_url) {
            downloadAvatar(form.avatar_url).then(setAvatarUrl)
        }
    }, [form])


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS==="ios"? "padding":"height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ThemedView style={styles.inner}>
                        <ThemedView style={styles.input}>
                            <TouchableOpacity
                                style={styles.avatarButton}
                                onPress={handlePickImage}
                            >
                                <Avatar uri={avatarUrl} size={120} />
                            </TouchableOpacity>

                        </ThemedView>
                        <View style={{}}>
                            <Text>username</Text>
                            <ThemedTextInput
                                style={{ color: "black" }}
                                icon='id-card-outline'
                                value={form.username}
                                onChangeText={(text) => handleChange("username", text)}
                            />
                        </View>
                        <View style={{}}>
                            <Text>nombres</Text>
                            <ThemedTextInput
                                style={{ color: "black" }}
                                icon='card-outline'
                                value={form.first_name}
                                onChangeText={(text) => handleChange("first_name", text)}
                            />
                        </View>

                        <View style={{}}>
                            <Text>apellidos</Text>
                            <ThemedTextInput
                                style={{ color: "black" }}
                                icon='card-outline'
                                value={form.last_name}
                                onChangeText={(text) => handleChange("last_name", text)}
                            />
                        </View>

                        <View style={{}}>
                            <Text>phone</Text>
                            <ThemedTextInput
                                style={{ color: "black" }}
                                icon='arrow-redo-circle-outline'
                                value={form.phone}
                                onChangeText={(text) => handleChange("phone", text)}
                            />
                        </View>


                        <ThemedView style={styles.input}>
                            <Button
                                title="Guardar cambios"
                                onPress={() => handleSubmit()}
                                disabled={loading}
                            />
                        </ThemedView>
                    </ThemedView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 16,
        flex: 1,
    },
    input: {
        paddingVertical: 8,
    },
    avatarButton: {
        alignItems: "center",
        marginBottom: 16,
    },
})


export default ProfileForm

