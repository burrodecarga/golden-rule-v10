import { fetchPlataformas } from '@/lib/complemento/api_complementos'
import { useQuery } from '@tanstack/react-query'

export const usePlataformas=() => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['plataformas'],
        queryFn: fetchPlataformas,
        staleTime: 1000*60*60,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}