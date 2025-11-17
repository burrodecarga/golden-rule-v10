import Button from "@/components/Button"
import Loading from "@/components/Loading"
import ThemeTextInput from "@/components/ThemedTextInput"
import { WIDTH } from "@/constants/constantes"
import { logo } from "@/constants/theme"
import { useThemeColor } from "@/hooks/use-theme-color"
import { useServiciosById } from "@/hooks/useServiciosById"
import { addGastoDeServicio } from "@/lib/servicios/api_gastos"
import { supabase } from "@/lib/supabase"
import { GastoDeServicioInsert } from "@/utils/types"
import { Feather } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import * as Crypto from 'expo-crypto'
import { ImageBackground } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"



const TIPO=['combustible', 'repuestos', 'reparaciones', 'impuestos', 'multas', 'estacionamiento', 'otro']



const AddGastoScreen=() => {
    const { id }=useLocalSearchParams()
    const { data: servicio, isLoading }=useServiciosById(id as string)

    //console.log('ID', id)
    const [image, setImage]=useState("")
    const [subiendo, setSubiendo]=useState(false)
    const primary=useThemeColor({}, 'primary')
    const color=primary
    const newDate=new Date()
    const [form, setForm]=useState<GastoDeServicioInsert>({
        monto: 0,
        tipo: 'otro',
        servicio_id: id as string,
        url: '',

    })
    //const queryClient=useQueryClient()
    //console.log(JSON.stringify(servicio, null, 2))
    const handlePickImage=async () => {
        const result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images']
        })
        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const handleSubmit=async (image: string) => {
        try {
            setSubiendo(true)
            let publicUrl=""
            if (image) {
                const fileExt=image.split(".").pop()
                const fileName=image.replace(/^.*[\\\/]/, "")
                const filePath=`${Date.now()}.${fileExt}`

                const formData=new FormData()
                const photo={
                    uri: image,
                    name: fileName,
                    type: `image/${fileExt}`
                } as unknown as Blob
                formData.append("file", photo)

                //console.log(photo)

                const { error }=await supabase.storage
                    .from("documentos")
                    .upload(filePath, formData)
                if (error) throw error

                try {
                    const { data }=supabase.storage.from("documentos").getPublicUrl(filePath)
                    publicUrl=data.publicUrl
                    form.url=publicUrl
                    //console.log('FORM', form, 'PUBLICURL', publicUrl)
                    addGasto()
                } catch (error) {
                    console.log(error)
                }


                Alert.alert('Servicio de carga guardado', `se guardo correctamente`)



            } else {
                addGasto()
            }

        } catch (error: any) {
            Alert.alert("Server Error", error.message)
        } finally {
            setSubiendo(false)
        }

        router.replace("/(home)/tareas")

    }

    // const addMonto=(text: string) => {

    //     setForm((prev) => ({
    //         ...prev,
    //         monto: Number(text)
    //     }))

    // }
    const addGasto=async () => {
        if (form.monto===0||form.monto==='') {
            Alert.alert('Error en registro', 'el monto debe ser superior a cero')
            return
        }
        const data=addGastoDeServicio(form)
        //console.log('DATA', form)
    }


    if (isLoading||subiendo) {
        return <Loading />
    }

    const UUID=Crypto.randomUUID()
    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={{ flex: 1 }}>
            <ScrollView style={{ paddingHorizontal: 0, backgroundColor: '#fff' }}>
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1, backgroundColor: '#fff'
                    }}

                    key={UUID}
                >

                    <View style={{ marginTop: 20, width: WIDTH*0.9, flexDirection: 'column', borderWidth: 1, borderColor: primary, padding: 8, borderRadius: 8 }}>
                        <Text style={{ fontWeight: 600, textAlign: 'center', marginVertical: 10 }}>Registro de Gasto</Text>


                        <Text>Tipo de gasto</Text>
                        <Picker
                            style={{ borderWidth: 1, backgroundColor: '#c5c5c5', borderRadius: 16, marginBottom: 20 }}
                            selectedValue={form.tipo}
                            onValueChange={(itemValue, itemIndex) =>
                                setForm({ ...form, tipo: itemValue })
                            }>
                            {TIPO.map(tipo => <Picker.Item label={tipo} value={tipo} key={UUID} />)}

                        </Picker>


                        <View style={{ height: 10 }} />
                        <Text>Monto del gasto</Text>
                        <ThemeTextInput
                            autoFocus={true}
                            placeholder='ingrese monto del gasto'
                            autoCapitalize='none'
                            keyboardType="numeric"
                            icon='logo-usd'
                            value={form.monto.toString()}
                            onChangeText={(value: any) => setForm({ ...form, monto: value })}
                        />

                        <View style={{ height: 20 }} />
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignContent: 'center', margin: 'auto', padding: 10 }}>

                            {image&&(
                                <View>
                                    <Text style={{ textAlign: 'center' }}>imagen de factura</Text>
                                    <ImageBackground source={{ uri: image }} style={styles.image}>
                                        <TouchableOpacity onPress={() => setImage("")}>
                                            <Feather name='x' size={26} color='red' style={{ backgroundColor: 'white', borderRadius: 50, textAlign: 'center' }} />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            )}
                        </View>

                        <TouchableOpacity onPress={handlePickImage} style={{ alignItems: 'center', padding: 10, marginBottom: 10 }}>
                            <Feather name='image' size={48} color={color} />
                        </TouchableOpacity>
                        <View style={styles.row}>
                            <Button
                                title='guardar'
                                onPress={() => {
                                    handleSubmit(image)
                                    setImage('')
                                }}
                            />
                            <Button
                                title='cancelar'
                                onPress={() => {
                                    setImage('')
                                    router.replace("/(home)/tareas")
                                }}
                            />
                        </View>

                    </View>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        marginHorizontal: 20,
        alignItems: "center",
        backgroundColor: logo
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    image: {
        height: 100,
        width: 100,
        //alignItems: "flex-end",
        padding: 8
    }
})



export default AddGastoScreen
