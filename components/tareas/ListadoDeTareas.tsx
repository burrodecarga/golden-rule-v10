import { useThemeColor } from '@/hooks/use-theme-color'
import { APIServicioRow } from '@/lib/servicios/api_servicios'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import GastosByServicio from '../gastos/GastosByServicio'
import Label from '../Label'
import LabelCol from '../LabelCol'
import Card from '../ui/Card'

export interface CargaItemProps {
    items: APIServicioRow
    ver?: number

}

const ListadoDeTareas=({ items, ver }: CargaItemProps) => {
    const primary=useThemeColor({}, 'primary')


    const itemId=items.id as string
    if (items.position!==ver) {
        return null
    }

    return (
        <Card key={items.id}>
            <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderColor: primary, borderWidth: 1, gap: 6, marginHorizontal: 0 }}>
                <Label title='Semana' value={items?.semana!} />
                <Label title='fecha' value={items?.fecha_carga!} />
                <Label title='Orden #' value={items?.orden!} />
            </Card>
            <Label title='Orden #' value={items?.orden!} />
            <Label title='Broker' value={items?.broker!} />
            <Label title='Ruta' value={items?.ruta!} />
            <LabelCol
                title='Origen'
                value={items?.origen!}
                numberOfLines={4}
                textTextSize={10}
            />
            <LabelCol
                title='Destino'
                value={items?.destino!}
                numberOfLines={4}
                textTextSize={10}
            />
            <Label title='Chofer' value={items?.chofer!} />
            <Label title='Vehículo' value={items?.vehiculo!} />
            <Label title='Tipo de Carga' value={items?.tipo_de_carga!} />
            <Label title='Millas' value={items?.millas!} />
            <Label title='Peso' value={items?.peso!+" lbs"} />
            <Label title='Despachador' value={items?.despachador!} />
            <LabelCol
                title='Observaciones'
                value={items?.observaciones!}
                numberOfLines={4}
                textTextSize={10}
            />
            <Label title='Monto a Cobrar' value={items?.precio_de_servicio!+" $"} />
            <Label title='Forma de Pago' value={items?.forma_de_pago!} textTextSize={10} />
            <Label title='Estatús de Pago' value={items?.estatus_pago!} textTextSize={10} />
            <Label title='Gasto Estimado' value={items?.gasto_estimado!+" $"} />
            <Card>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Text>Gastos Reportados</Text>
                    <TouchableOpacity onPress={() => {
                        //console.log(itemId)
                        router.push({ pathname: '/(home)/tareas/gastos/add_gasto', params: { id: itemId } })
                    }}><Ionicons name='add-circle-outline' size={28} color={primary} /></TouchableOpacity>
                </View>
                <View>
                    <GastosByServicio id={itemId} />
                </View>
            </Card>
            <View style={{ flexDirection: 'column', flex: 1 }}>
                <TouchableOpacity onPress={

                    () => {
                        const id=String(items.id)
                        router.replace({
                            pathname: '/(home)/tareas/[id]', params: { id }

                        })
                    }} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: primary, borderWidth: 1, padding: 6, marginTop: 10 }}>
                    <Text style={{ fontSize: 16 }}>Agregar Detalles a tarea</Text>
                    <Ionicons name='newspaper-outline' size={24} color={primary} />
                </TouchableOpacity>
            </View>
        </Card>
    )
}

export default ListadoDeTareas