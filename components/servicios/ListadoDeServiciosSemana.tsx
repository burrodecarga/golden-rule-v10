import { APIServicioRow } from '@/lib/servicios/api_servicios'
import { formatDate } from '@/utils/date-utils'
import React, { useState } from 'react'
import { View } from 'react-native'
import Label from '../Label'
import LabelCol from '../LabelCol'
import Card from '../ui/Card'

export interface CargaItemProps {
    items: APIServicioRow
    ver?: number


}

const ListadoDeServiciosSemana=({ items, ver }: CargaItemProps) => {
    const [servicios, setServicios]=useState([])

    if (items.semana!==ver) {
        return null
    }


    return (
        <Card>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Label title='Semana N°' value={items.semana} />
                <Label title='Fecha' value={formatDate(items.fecha_carga as string)} />

            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Label title='Orden #' value={items.orden!} />
                <Label title='Broker' value={formatDate(items.broker!)} />
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


            </View>
            <View className='flex-1 p-2 mx-2 my-0 border-2 border-slate-400' key={items.id}>




                {/* <View style={{ padding: 6, backgroundColor: '#f7f7f8' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={() => { }}>
                        <Text style={{ fontSize: 16 }}>Ver detalles : </Text>
                        <Ionicons name='eye-outline' size={24} />
                    </TouchableOpacity>
                </View> */}


            </View>
        </Card>
    )
}

export default ListadoDeServiciosSemana