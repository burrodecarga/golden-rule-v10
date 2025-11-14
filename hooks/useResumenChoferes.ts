import { fetchChoferSemanas } from '@/lib/complemento/api_complementos'
import { useQuery } from '@tanstack/react-query'

export const useResumenChoferes=() => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['choferesBySemanas'],
        queryFn: fetchChoferSemanas,
        staleTime: 0,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}