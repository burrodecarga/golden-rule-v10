import GastoItem from '@/components/gastos/GastosItem'
import Loading from '@/components/Loading'
import MiniLogo from '@/components/MiniLogo'
import { ThemedText } from '@/components/ThemedText'
import { useGastos } from '@/hooks/useGastosByServicioId'
import { APIServicioRow } from '@/lib/servicios/api_servicios'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const ListadoDeGastosDeTareaScreen=() => {
    const { data: gastos, isLoading }=useGastos()
    const { id }=useLocalSearchParams()
    const [renderizar, setRenderizar]=useState(false)
    const [servicio, setServicio]=useState<APIServicioRow>()
    const [orden, setOrden]=useState<string|null>('0000')




    if (isLoading===true) {
        <Loading />
    }

    //console.log('GASTOS xx', gastos)

    return (
        <>

            <View style={{ height: '15%', marginBottom: 0 }}>
                <MiniLogo />
            </View>
            <ThemedText type='subtitle' style={{ textAlign: 'center', marginBottom: 0, paddingBottom: 0 }}>Listado de Gastos</ThemedText>
            <View style={{ height: '60%', marginBottom: 0 }}>
                <FlatList
                    data={[]}
                    keyExtractor={item => item!}
                    renderItem={({ item }) => <GastoItem item={item} />}
                    ListEmptyComponent={() => <View><Text>No hay registros</Text></View>}

                />
            </View>

        </>
    )
}


export default ListadoDeGastosDeTareaScreen

const styles=StyleSheet.create({})