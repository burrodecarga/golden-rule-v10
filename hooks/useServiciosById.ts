import { actualizarEstadoDeServicio, CargaUpdateItemProps, getServicioById } from '@/lib/servicios/api_servicios'
import { useQuery } from '@tanstack/react-query'

export const useServiciosById=(id: string) => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['serviciosById', id],
        queryFn: ({ queryKey }) => getServicioById(queryKey[1] as string),
        staleTime: 10*1000,

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}

export const useUpdateServiciosById=(params: CargaUpdateItemProps) => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['serviciosById', params],
        queryFn: ({ queryKey }) => actualizarEstadoDeServicio(queryKey[0] as CargaUpdateItemProps),
        staleTime: 10*1000,

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}


