import ThemedButton from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { primary } from '@/constants/Colors'
import { APIServicioRow, CargaUpdateItemProps } from '@/lib/servicios/api_servicios'
import { supabase } from '@/lib/supabase'
import { formatDate, formatTime } from '@/utils/date-utils'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import Button from '../Button'
import Card from '../ui/Card'

export interface CargaItemProps {
    items: APIServicioRow
    ver?: number
    fun: (parametro: CargaUpdateItemProps) => Promise<any>
    setCargando: (value: boolean) => void
}



const DetalleDeServicio=({ items, ver, fun, setCargando }: CargaItemProps) => {
    const [loading, setLoading]=useState(false)
    const [checked, setChecked]=useState(false)
    const [salida, setSalida]=useState(items.position)
    const [parametro, setParametro]=useState<CargaUpdateItemProps>()
    const id=items.id
    const precio=String(items.precio_de_servicio)

    //console.log(items.id, ver, items.position)

    // if (items.position!==ver) {
    //     return null
    // }

    const registrarSalida=async (item: APIServicioRow, id: string) => {
        //console.log(item.id, id)
        const newObsercacion: any=item.observaciones!+', registro de salida: '+formatDate(new Date())+' hora:'+formatTime(new Date())
        setLoading(true)
        const { data, error }=await supabase
            .from('servicios')
            .update({ observaciones: newObsercacion, estatus_servicio: 'en proceso', activo: 1, position: 1 })
            .eq('id', id)
            .select()
        if (error) {
            Alert.alert('ERROR', error.message)
            return []
        }
        setLoading(false)
        irADetalle()
    }

    const registrarLLegada=async (item: APIServicioRow, id: string) => {
        //console.log(item.id, id)
        const newObsercacion: any=item.observaciones!+', registro de llegada: '+formatDate(new Date())+' hora:'+formatTime(new Date())
        setLoading(true)
        const { data, error }=await supabase
            .from('servicios')
            .update({ observaciones: newObsercacion, estatus_servicio: 'en proceso', activo: 2, position: 2 })
            .eq('id', id)
            .select()
        if (error) {
            Alert.alert('ERROR', error.message)
            return []
        }
        setLoading(false)
        irADetalle()
    }

    const registrarCobro=async (id: string) => {
        setLoading(true)
        let pago='registro de pago con cheque '
        if (checked) {
            pago='registro de pago en efectivo'
        }
        let info='registro de forma de pago '+new Date().toLocaleDateString()+pago

        try {

            const { data, error }=await supabase
                .from('servicios')
                .update({ estatus_pago: 'por certificar', 'info_pago': info, 'forma_de_pago': pago, estatus_servicio: 'realizado', activo: 3, position: 3 })
                .eq('id', id)
                .select()
            if (error) {
                Alert.alert('ERROR', error.message)
                return []
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }


    const irADetalle=() => router.push({ pathname: "/(home)/servicios", params: { id } })



    return (

        <Card style={{ flexDirection: 'column', gap: 8, }}>
            <View style={{}}>
                <ThemedText type='subtitle'>Orden #:{items?.orden}</ThemedText>
                <ThemedText type='subtitle'>Ruta:{items?.ruta}</ThemedText>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 8 }}>
                    <ThemedText type='subtitle'>Destino:</ThemedText>
                    <ThemedText type='default'>{items?.destino}</ThemedText>

                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'baseline', gap: 2 }}>
                    <ThemedText type='subtitle'>Observaciones:</ThemedText>
                    <ThemedText numberOfLines={4} adjustsFontSizeToFit style={{ textAlign: 'justify', lineHeight: 13 }}>{items?.observaciones}</ThemedText>
                </View>
            </View>

            {items.position===0&&<ThemedButton icon='locate-outline' onPress={() => {
                Alert.alert(
                    "Registrar Inicio del Servicio?",
                    "Presiones una opción para confirmar.",
                    [
                        {
                            text: "No, mantener como PROGRAMADO",
                            onPress: () => console.log("No, continue editing")
                        },
                        {
                            text: "Si, Registrar SERVICIO ACTIVO",
                            onPress: () => registrarSalida(items, id)
                            ,
                            style: "cancel"
                        }
                    ],
                    { cancelable: false }
                )
            }}>Registrar Salida</ThemedButton>}
            {items.position===1&&<ThemedButton icon='location-outline' onPress={() => {
                Alert.alert(
                    "Registrar Llegada del Servicio?",
                    "Presiones una opción para confirmar.",
                    [
                        {
                            text: "No, mantener como SERVICIO ACTIVO",
                            onPress: () => console.log("No, continue editing")
                        },
                        {
                            text: "Si, Registrar SERVICIO REALIZADO",
                            onPress: () => registrarLLegada(items, id)
                            ,
                            style: "cancel"
                        }
                    ],
                    { cancelable: false }
                )

            }}>Registrar Llegada</ThemedButton>}
            {items.position!==3&&<ThemedButton icon='stats-chart-outline' onPress={() => registrarLLegada(items, id)}>Registrar Gasto</ThemedButton>}
            {items.position!==3&&<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>

                <ThemedButton icon='logo-usd' onPress={() => registrarCobro(id)} > Registrar Cobro de servicio </ThemedButton>
                <View style={{ backgroundColor: primary, paddingHorizontal: 10, paddingVertical: 13, borderRadius: 5, flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                    <ThemedText style={{ color: 'white', fontSize: 13 }}>{items.precio_de_servicio} $</ThemedText>
                </View>
            </View>}


            {items.position!==3&&<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginVertical: 20 }}>
                <Button title='BOL' onPress={() => router.push({ pathname: "/(home)/servicios", params: { id, doc: 'BOL' } })} />
                <Button title='POD' onPress={() => router.push({ pathname: "/(home)/servicios", params: { id, doc: 'POD' } })} />
                <Button title='RC' onPress={() => router.push({ pathname: "/(home)/servicios", params: { id, doc: 'RC' } })} />
            </View>}
        </Card>

    )
}


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
        height: 178,
        width: '100%',
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
})



export default DetalleDeServicio