import { APIServicioRow } from "@/lib/servicios/api_servicios"
import React from "react"
import { Text, View } from "react-native"
import { DateData } from "react-native-calendars"
import Card from "../ui/Card"

interface Props {
    servicio: APIServicioRow
    filtro?: DateData
    selected?: string
}
const DetalleCalendario=({ servicio, filtro, selected }: Props) => {
    return (
        <>
            <Card>
                <View>
                    <View>
                        <Text>Orden:{servicio.orden}</Text>
                        <Text>Origen:{servicio.origen}</Text>
                        <Text>Destino:{servicio.destino}</Text>
                        <Text>Chofer:{servicio.chofer}</Text>
                        <Text>Vehículo:{servicio.vehiculo}</Text>
                    </View>
                    <View>
                        <Text>Precio:{servicio.precio_de_servicio}$</Text>
                        <Text>Status:{servicio.estatus_servicio}</Text>
                        <Text>Pago:{servicio.estatus_pago}</Text>
                    </View>
                </View>
            </Card>
        </>
    )
}

export default DetalleCalendario
