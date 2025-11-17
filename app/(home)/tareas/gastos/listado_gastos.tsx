import GastoItem from '@/components/gastos/GastosItem'
import Loading from '@/components/Loading'
import MiniLogo from '@/components/MiniLogo'
import { ThemedText } from '@/components/ThemedText'
import { useGastosByServicioId } from '@/hooks/useGastosByServicioId'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const ListadoDeGastosDeTareaScreen=() => {
    const { id }=useLocalSearchParams()
    const { data: gastos, isLoading }=useGastosByServicioId(id as string)





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
                    data={gastos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <GastoItem item={item} />}
                    ListEmptyComponent={() => <View style={{ padding: 20, flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>No hay gastos registrados</Text></View>}

                />
            </View>

        </>
    )
}


export default ListadoDeGastosDeTareaScreen

const styles=StyleSheet.create({})