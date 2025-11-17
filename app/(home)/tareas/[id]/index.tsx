import Button from "@/components/Button"
import FotoBtn from "@/components/FotoBtn"
import Label from "@/components/Label"
import LabelCol from "@/components/LabelCol"
import MiniLogo from "@/components/MiniLogo"
import ThemedButton from "@/components/ThemedButton"
import { ThemedText } from "@/components/ThemedText"
import Card from "@/components/ui/Card"
import { ESTATUS_SERVICIO } from "@/constants/constantes"
import { Paleta } from "@/constants/theme"
import { useServiciosById } from "@/hooks/useServiciosById"
import { APIServicio, APIServicioRow } from "@/lib/servicios/api_servicios"
import { supabase } from "@/lib/supabase"
import { formatDate, formatTime } from "@/utils/date-utils"
import { router, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"

const DetalleDeTareaScreen=() => {
    const { id }=useLocalSearchParams()
    const idString=id as string
    const [loading, setLoading]=useState(false)
    const [checked, setChecked]=useState(false)

    //const [servicio, setServicio]=useState<ServicioRow>()
    const { isPending, data, isError, error }=useServiciosById(idString)

    const servicio=data as APIServicio

    const handleButton=(id: string) => {
        // router.push({ pathname: "/(home)/tareas/gastos/listado_gastos", params: { id } })
    }

    const registrarSalida=async (item: APIServicioRow, id: string) => {
        //console.log(item.id, id)
        const newObsercacion: any=
            item.registros!+
            ", registro de salida: "+
            formatDate(new Date())+
            " hora:"+
            formatTime(new Date())+
            "*"
        //setLoading(true)
        const { data, error }=await supabase
            .from("servicios")
            .update({
                registros: newObsercacion,
                estatus_servicio: "en proceso",
                activo: 1,
                position: 1
            })
            .eq("id", id)
            .select()
        if (error) {
            Alert.alert("ERROR", error.message)
            return []
        }
        router.push("/tareas")
    }

    const registrarLLegada=async (item: APIServicioRow, id: string) => {
        //console.log(item.id, id)
        const newObsercacion: any=
            item.registros!+
            ", registro de llegada: "+
            formatDate(new Date())+
            " hora:"+
            formatTime(new Date())+
            "*"
        setLoading(true)
        const { data, error }=await supabase
            .from("servicios")
            .update({
                registros: newObsercacion,
                estatus_servicio: "en proceso",
                activo: 2,
                position: 2
            })
            .eq("id", id)
            .select()
        if (error) {
            Alert.alert("ERROR", error.message)
            return []
        }
        setLoading(false)
        router.push("/tareas")

    }

    const registrarCobro=async (val: number, item: APIServicioRow, id: string) => {
        setLoading(true)
        let pago="registro de pago con cheque "
        if (val===1) {
            pago="registro de pago en efectivo"
        }
        let info=
            "registro de forma de pago "+
            new Date().toLocaleDateString()+
            pago+
            "*"

        const newObsercacion: any=
            item.registros!+info

        try {
            const { data, error }=await supabase
                .from("servicios")
                .update({
                    estatus_pago: "por certificar",
                    info_pago: info,
                    forma_de_pago: pago,
                    estatus_servicio: "realizado",
                    activo: 3,
                    position: 3,
                    registros: newObsercacion
                })
                .eq("id", id)
                .select()
            if (error) {
                Alert.alert("ERROR", error.message)
                return []
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        router.push("/tareas")
    }

    return (
        <>
            <View style={{ height: "15%", marginBottom: 0 }}>
                <MiniLogo />
            </View>
            <ThemedText
                type='subtitle'
                style={{
                    textAlign: "center",
                    marginBottom: 0,
                    paddingBottom: 0,
                    fontSize: 16
                }}
            >
                Detalle de Carga # {servicio?.orden}
            </ThemedText>
            <ThemedText
                type='subtitle'
                style={{
                    textAlign: "center",
                    marginBottom: 0,
                    paddingBottom: 0,
                    fontSize: 16
                }}
            >
                Estado del servicio:{ESTATUS_SERVICIO[servicio?.position!]}
            </ThemedText>
            <ScrollView>
                <Card
                    style={{
                        height: "100%",
                        marginBottom: 0,
                        marginHorizontal: 10
                    }}
                >
                    <View style={styles.container}>
                        <View
                            style={{
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}
                        >
                            <Label title="Semana N° :" value={servicio?.semana!} />
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    gap: 4,
                                    alignItems: "center",
                                    marginVertical: 5
                                }}
                            >
                                <Label title="Broker:" value={servicio?.broker!} />
                                <Label title="Tabla :" value={servicio?.plataforma!} />

                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    gap: 4,
                                    alignItems: "center",
                                    marginVertical: 5
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: 6
                                    }}
                                >
                                    <Text
                                        style={{
                                            textTransform: "uppercase",
                                            fontSize: 12,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Orden ID:
                                    </Text>
                                    <Text
                                        style={{
                                            textTransform: "uppercase",
                                            fontSize: 12,
                                            fontWeight: "300"
                                        }}
                                    >
                                        {servicio?.orden}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: 6
                                    }}
                                >
                                    <Text
                                        style={{
                                            textTransform: "uppercase",
                                            fontSize: 12,
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Fecha:
                                    </Text>
                                    <Text
                                        style={{
                                            textTransform: "uppercase",
                                            fontSize: 12,
                                            fontWeight: "300"
                                        }}
                                    >
                                        {servicio?.fecha_carga}
                                    </Text>
                                </View>
                            </View>
                            <Label title="Fecha de Carga" value={servicio&&formatDate(servicio?.fecha_carga as string)} />
                            <Label title="Fecha de Entrega" value={servicio&&formatDate(servicio?.fecha_entrega as string)} />
                        </View>
                        <Label title="Ruta " value={servicio?.ruta!} />



                        <View
                            style={{
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "flex-start"
                            }}
                        >
                            <Label title='Origen' value={servicio?.origen!} />
                            <Label title='Destino' value={servicio?.destino!} />
                            <Label title='Chofer' value={servicio?.chofer!} />
                            <Label title='Vehículo' value={servicio?.vehiculo!} />
                            <Label title='Millas' value={servicio?.millas!} />
                            <Label title='Peso' value={servicio?.peso!+" lbs"} />
                            <Label title='Despachador' value={servicio?.despachador!} />
                            <LabelCol
                                title='Observaciones'
                                value={servicio?.observaciones!}
                                numberOfLines={4}
                                textTextSize={10}
                            />

                            {servicio?.estatus_pago==="no cobrado"&&(
                                <View>
                                    <Label title='Información del pago' value='No cobrado' />
                                </View>
                            )}

                            {servicio?.estatus_pago!=="no cobrado"&&(
                                <View>
                                    <Label
                                        title='Forma de Pago'
                                        value={servicio?.forma_de_pago!}
                                    />
                                    <Label
                                        title='Información del pago'
                                        value={servicio?.info_pago!}
                                    />
                                </View>
                            )}
                        </View>
                        <View
                            style={{
                                flexDirection: "column",
                                justifyContent: "space-between",
                                gap: 4,
                                alignItems: "flex-start"
                            }}
                        >
                            <Label
                                title='Ingreso por Servicio'
                                value={servicio?.precio_de_servicio!+" $"}
                            />
                            <Label
                                title='Gastos Estimados del Servicio'
                                value={servicio?.gasto_estimado!+" $"}
                            />
                            <View
                                style={{
                                    height: 50,
                                    padding: 5
                                }}
                            >
                                <Button
                                    title='Detalle de Gastos'
                                    onPress={() => {
                                        handleButton(servicio?.id as string)
                                    }}
                                    variant='outline'
                                    size='small'
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", marginVertical: 15 }}>
                            <FotoBtn uri={servicio?.bol} name='BOL' />
                            <FotoBtn uri={servicio?.pod} name='POD' />
                            <FotoBtn uri={servicio?.rc} name='RC' />
                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            {servicio?.fotos_servicios.length!==0&&(servicio?.fotos_servicios.map(foto => {
                                //console.log(foto.url)
                                return <FotoBtn uri={foto.url} key={foto.id} name="carga" />
                            }))}
                        </View>
                    </View>
                    <View style={{ gap: 10 }}>
                        {servicio?.position!==3&&<ThemedButton icon='stats-chart-outline' onPress={() => handleButton(idString)}>Registrar Gasto</ThemedButton>}

                        {servicio?.position===0&&(
                            <ThemedButton
                                icon='locate-outline'
                                onPress={() => {
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
                                                onPress: () => registrarSalida(servicio, servicio.id!),
                                                style: "cancel"
                                            }
                                        ],
                                        { cancelable: false }
                                    )
                                }}
                            >
                                Registrar Salida
                            </ThemedButton>
                        )}

                        {servicio?.position===1&&(
                            <ThemedButton
                                icon='locate-outline'
                                onPress={() => {
                                    Alert.alert(
                                        "Registrar Culminación del Servicio?",
                                        "Presiones una opción para confirmar.",
                                        [
                                            {
                                                text: "No, mantener como Activo",
                                                onPress: () => console.log("No, continue editing")
                                            },
                                            {
                                                text: "Si, Registrar SERVICIO REALIZADO",
                                                onPress: () => registrarLLegada(servicio, servicio.id!),
                                                style: "cancel"
                                            }
                                        ],
                                        { cancelable: false }
                                    )
                                }}
                            >
                                Registrar Llegada
                            </ThemedButton>
                        )}

                        {servicio?.position!==3&&(
                            <ThemedButton
                                icon='locate-outline'
                                onPress={() => {
                                    Alert.alert(
                                        "Registrar Cobro del Servicio?",
                                        "Presiones una opción para confirmar.",
                                        [
                                            {
                                                text: "No, mantener como No Cobrado",
                                                onPress: () => console.log("No, continue editing")
                                            },
                                            {
                                                text: "Si, Registrar Cobro con CHEQUE",
                                                onPress: () => registrarCobro(0, servicio, servicio.id!),
                                                style: "cancel"
                                            },
                                            {
                                                text: "Si, Registrar Cobro con EFECTIVO",
                                                onPress: () => registrarCobro(1, servicio, servicio.id!),
                                                style: "cancel"
                                            }
                                        ],
                                        { cancelable: false }
                                    )
                                }}
                            >
                                Registrar Cobro de Servicio
                            </ThemedButton>
                        )}

                    </View>
                </Card>
            </ScrollView>
        </>
    )
}

const styles=StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 16,
        backgroundColor: Paleta.card,
        borderRadius: 12,
        marginBottom: 12,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2
    },
    completedContainer: {
        opacity: 0.7
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Paleta.primary,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2
    },
    checkboxChecked: {
        backgroundColor: Paleta.primary
    },
    content: {
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: Paleta.text,
        marginBottom: 4
    },
    completedTitle: {
        textDecorationLine: "line-through",
        color: Paleta.textSecondary
    },
    description: {
        fontSize: 14,
        color: Paleta.textSecondary,
        marginBottom: 8
    },
    completedText: {
        color: Paleta.textSecondary
    },
    metaContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
    },
    dateTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 8
    },
    dateTime: {
        fontSize: 12,
        color: Paleta.textSecondary,
        marginLeft: 4,
        marginRight: 8
    },
    overdue: {
        color: Paleta.danger
    },
    badgesContainer: {
        flexDirection: "row",
        gap: 8
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: "stretch",
        aspectRatio: 1
    }
})

export default DetalleDeTareaScreen
