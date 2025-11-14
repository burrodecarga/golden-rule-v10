import { useGastosByServicioId } from '@/hooks/useGastosByServicioId'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Label from '../Label'
interface Props {
    id: string
}
const GastosByServicio=({ id }: Props) => {
    const { data, error }=useGastosByServicioId(id)
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <View key={item.id}><Label title={item.tipo!} value={item.monto+' $'} /></View>}
                ListEmptyComponent={() => (
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text>No Tiene gastos registrados</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default GastosByServicio