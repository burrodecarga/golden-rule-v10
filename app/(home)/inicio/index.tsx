import { FAB } from "@/components/FAB"
import Loading from "@/components/Loading"
import DetalleCalendario from "@/components/servicios/DetalleCalendario"
import { ThemedText } from "@/components/themed-text"
import Card from "@/components/ui/Card"

import { semanaDeAno, WIDTH } from "@/constants/constantes"
import { useThemeColor } from "@/hooks/use-theme-color"
import {
    APIServicioRow,
    APIServicios,
    GetAllServicios
} from "@/lib/servicios/api_servicios"
import { useUserInfo } from "@/provider/UserProvider"
import { router } from "expo-router"
import React, { useEffect, useState } from "react"
import {
    Alert,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View
} from "react-native"
import { Calendar, DateData } from "react-native-calendars"

const InicioIndex=() => {
    const hoy=new Date()
    const initial=hoy.toISOString().split("T")[0]
    const numSemana=semanaDeAno()+1
    const [filtro, setFiltro]=useState<DateData>()
    const [selected, setSelected]=useState(initial)
    const [data, setData]=useState<APIServicios|[]>()
    const [loading, setLoading]=useState(false)
    const [renderizar, setRenderizar]=useState(false)

    const primary=useThemeColor({}, "primary")
    let filtrados: APIServicios|[]|any=[]

    const { role, userId, isAdmin }=useUserInfo()
    console.log(role, isAdmin, userId)
    const getServicios=async () => {
        setLoading(true)

        try {
            const res=await GetAllServicios()
            setData(res)
        } catch (error) {
            Alert.alert(
                "Error en Petición",
                "ha ocurrido un error en la petición: "+error
            )
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const getFiltrados=() => {
        //console.log(profile?.role)
        if (isAdmin) {
            filtrados=data?.filter(
                (s: APIServicioRow) => s.fecha_carga===selected
            )
        } else {
            filtrados=data?.filter(
                (s: APIServicioRow) =>
                    s.fecha_carga===selected&&userId===s.chofer_id
            )
        }
    }

    //console.warn(JSON.stringify(servicios, null, 2))
    useEffect(() => {
        setSelected(initial)
    }, [])

    useEffect(() => {
        getServicios()
    }, [renderizar])

    if (loading) {
        <Loading />
    }

    if (data) {
        getFiltrados()
    }

    return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Calendar
                headerStyle={{ width: WIDTH }}
                onDayPress={(day) => {
                    //console.log('selected day', day)
                    setFiltro(day)
                    setSelected(day.dateString)
                }}
                markedDates={{
                    [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: primary
                    }
                }}
            />
            <FlatList
                data={filtrados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DetalleCalendario
                        servicio={item}
                        filtro={filtro}
                        selected={selected}
                    />
                )}
                ListEmptyComponent={() => (
                    <Card>
                        {filtro?.dateString!==undefined? (
                            <Text className='text-sm uppercase'>
                                {`No Tiene Servicios registrados para el ${filtro?.dateString}`}{" "}
                            </Text>
                        ):(
                            <Text className='text-sm uppercase'>
                                {`No Tiene Servicios registrados para el ${hoy.toISOString().split("T")[0]
                                    }`}{" "}
                            </Text>
                        )}
                    </Card>
                )}
                ListHeaderComponent={() => (
                    <Card style={{ marginHorizontal: 0 }}>
                        <ThemedText>
                            Servicios Registrados para el día: {selected}
                        </ThemedText>
                        <Text style={{ textAlign: "center", fontSize: 12 }}>
                            Número de Servicios: {filtrados?.length}
                        </Text>
                    </Card>
                )}
            />

            {isAdmin&&(
                <FAB
                    iconName='add-circle-outline'
                    onPress={() => router.replace("/(home)/inicio/paso_1")}
                />
            )}
        </View>
    )
}

export default InicioIndex

const styles=StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8
    },
    reactLogo: {
        height: Dimensions.get("screen").height*0.3,
        width: Dimensions.get("screen").width,
        bottom: 0,
        left: 0,
        position: "absolute"
    }
})
