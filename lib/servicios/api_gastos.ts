import { Database } from "@/db_types"
import { supabase } from "@/lib/supabase"

export interface GastoRow {
    fecha: string|null
    id: string
    monto: number|null
    servicio_id: string
    tipo: string|null
    url: string|null
}

const GASTO=`  
id,
          fecha,
          monto,
          servicio_id,
          tipo,
          url
    `



export const getAllGastos=async () => {
    const { data, error }=await supabase
        .from("gastos_servicios")
        .select(GASTO)
        .order("fecha", {
            ascending: false
        })
    if (!error) {
        return data
    } else {
        console.log(error)
        return []
    }
}

export const getGastosById=async (id: string) => {
    const { data, error }=await supabase
        .from("gastos_servicios")
        .select(GASTO)
        .eq('id', id)
        .order("fecha", {
            ascending: false
        })
    if (!error) {
        return data
    } else {
        console.log(error)
        return []
    }
}

export const getGastosByServicioId=async (id: string) => {
    const { data, error }=await supabase
        .from("gastos_servicios")
        .select(GASTO)
        .eq('servicio_id', id)
        .order("fecha", {
            ascending: false
        })
    if (!error) {
        return data
    } else {
        console.log(error)
        return []
    }
}


export type APIGastos=Awaited<ReturnType<typeof getAllGastos>>
export type APIGastosRow=Database["public"]["Tables"]["gastos_servicios"]["Row"]

export const addGastoDeServicio=async (datos: any) => {
    const { data, error }=await supabase
        .from('gastos_servicios')
        .insert(
            datos
        )
        .select()

    if (error) {
        console.log("error", error)
        return []
    } else {
        //console.log('GANO')
        return data
    }
}


