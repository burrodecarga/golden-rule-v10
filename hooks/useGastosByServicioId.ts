import { getAllGastos, getGastosById, getGastosByServicioId } from '@/lib/servicios/api_gastos'
import { useQuery } from '@tanstack/react-query'

export const useGastos=() => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['gastos'],
        queryFn: () => getAllGastos(),
        staleTime: 0,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}

export const useGastosById=(gasto: string) => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['gastosById', gasto],
        queryFn: ({ queryKey }) => getGastosById(queryKey[1]),
        staleTime: 0,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}

export const useGastosByServicioId=(servicio: string) => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['gastosByServivicioId', servicio],
        queryFn: ({ queryKey }) => getGastosByServicioId(queryKey[1]),
        staleTime: 0,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}