import { getProfile } from '@/lib/usuarios/api_usuarios'
import { useQuery } from '@tanstack/react-query'

export const useProfilesById=(id: string) => {
    const { data, isLoading, isError, error, isPending, isFetching }=useQuery({
        queryKey: ['profilesById', id],
        queryFn: ({ queryKey }) => getProfile(queryKey[1] as string),
        staleTime: 100,//12 horas

    })

    return { data, isError, isLoading, isPending, error, isFetching }
}