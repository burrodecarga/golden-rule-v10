import Loading from "@/components/Loading"
import ListadoDeTareas from "@/components/tareas/ListadoDeTareas"
import { ThemedText } from "@/components/themed-text"
import { HEIGTH } from "@/constants/constantes"
import { useThemeColor } from "@/hooks/use-theme-color"
import { useServiciosByChoferId } from "@/hooks/useServiciosByChoferId"
import {
    actualizarEstadoDeServicio,
    CargaUpdateItemProps
} from "@/lib/servicios/api_servicios"
import { useUserInfo } from "@/provider/UserProvider"
import React, { useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"

const TareasIndex=() => {
    const { session, profile, loading }=useUserInfo()
    const [ver, setVer]=useState(0)
    const [cargando, setCargando]=useState(false)
    const primary=useThemeColor({}, 'primary')
    if (loading) {
        return <Loading />
    }

    if (!session) {
        return <Loading />
    }
    const { data: servicios }=useServiciosByChoferId(profile?.id!)
    //const { data: servicios }=useServicios()

    const fn=async (parametro: CargaUpdateItemProps) => {
        setCargando(true)
        //console.log("PARAMETRO", parametro, parametro.id)
        await actualizarEstadoDeServicio(parametro)
        setCargando(false)
    }

    if (cargando) {
        return <Loading />
    }
    //console.log(servicios)
    return (
        <View style={{ marginHorizontal: 10, flex: 1 }}>
            <View style={{}}>
                <View style={{ height: 30 }}>
                    <ThemedText
                        type='subtitle'
                        style={{ textAlign: "center", fontSize: 14, paddingVertical: 6 }}
                    >
                        {profile?.username?.toUpperCase()}
                    </ThemedText>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: "auto",
                        gap: 5
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: ver===0? primary:"#c5c5c5",
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80
                        }}
                        onPress={() => {
                            setVer((prev) => 0)
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: ver===0? "white":"black",
                                fontSize: 11
                            }}
                        >
                            Programados
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: ver===1? primary:"#c5c5c5",
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80
                        }}
                        onPress={() => {
                            setVer((prev) => 1)
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: ver===1? "white":"black",
                                fontSize: 11
                            }}
                        >
                            Activos
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: ver===2? primary:"#c5c5c5",
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80
                        }}
                        onPress={() => {
                            setVer((prev) => 2)
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: ver===2? "white":"black",
                                fontSize: 11
                            }}
                        >
                            Realizados
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: ver===3? primary:"#c5c5c5",
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80
                        }}
                        onPress={() => {
                            setVer((prev) => 3)
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: ver===3? "white":"black",
                                fontSize: 11
                            }}
                        >
                            Cobrado
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginHorizontal: 10 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: primary,
                            paddingHorizontal: 4,
                            paddingVertical: 8,
                            borderRadius: 5,
                            marginVertical: 10,
                            width: 80
                        }}
                        onPress={() => { }}
                    >
                        <Text style={{ textAlign: "center", color: "white", fontSize: 11 }}>
                            Resúmenes
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: HEIGTH*0.6 }}>
                    <FlatList
                        data={servicios}
                        //ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                        renderItem={({ item }) => (
                            <ListadoDeTareas items={item} ver={ver} />
                        )}
                        ListEmptyComponent={() => (
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text>No Tiene servicios registrados</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}

export default TareasIndex
