import { AxiosResponse } from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { httpClient } from '#services/httpClient'

import { Food } from '#types/food.types'

const FOODS_QUERY_KEY = ['foods']

export const useGetAllFoods = () => {
  return useQuery({
    queryKey: [FOODS_QUERY_KEY],
    queryFn: () => httpClient.get('/foods'),
    select: (response: AxiosResponse) => response.data.data,
    onError: (error) => console.log('Error:', error),
  })
}

export const useGetFood = (foodId: Food['_id']) => {
  return useQuery({
    queryKey: [FOODS_QUERY_KEY, foodId],
    queryFn: () => httpClient.get(`/foods/${foodId}`),
    select: (response: AxiosResponse) => response.data.data,
    onError: (error) => console.log('Error:', error),
  })
}

export const useCreateFood = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Food) => httpClient.post('/foods', payload),
    onSuccess: () => {
      return queryClient.invalidateQueries([FOODS_QUERY_KEY])
    },
    onError: (error) => console.log('Error:', error),
  })
}

export const useUpdateFood = (id: Food['_id']) => {
  const queryClient = useQueryClient()
  return useMutation({
    // put when updating all fields, patch when updating some fields
    mutationFn: (payload: Food) => httpClient.put(`/foods/${id}`, payload),
    onSuccess: () => {
      return queryClient.invalidateQueries([FOODS_QUERY_KEY])
    },
    onError: (error) => console.log('Error:', error),
  })
}

export const useDeleteFood = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: Food['_id']) => httpClient.delete(`/foods/${id}`),
    onSuccess: () => {
      return queryClient.invalidateQueries([FOODS_QUERY_KEY])
    },
    onError: (error) => console.log('Error:', error),
  })
}
