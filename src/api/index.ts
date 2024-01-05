/**
 * Generated by orval v6.23.0 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import type { CreatePetsBody, Error, ListPetsParams, Pet, Pets } from './index.schemas'
import { client } from '../mutator/client'
import type { ErrorType } from '../mutator/client'

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never

/**
 * @summary List all pets
 */
export const listPets = (params?: ListPetsParams, options?: SecondParameter<typeof client>, signal?: AbortSignal) => {
  return client<Pets>({ url: `/pets`, method: 'GET', params, signal }, { timeout: 30000, ...options })
}

export const getListPetsQueryKey = (params?: ListPetsParams) => {
  return [`/pets`, ...(params ? [params] : [])] as const
}

export const getListPetsQueryOptions = <TData = Awaited<ReturnType<typeof listPets>>, TError = ErrorType<Error>>(
  params?: ListPetsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof listPets>>, TError, TData>>
    request?: SecondParameter<typeof client>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getListPetsQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof listPets>>> = ({ signal }) =>
    listPets(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listPets>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type ListPetsQueryResult = NonNullable<Awaited<ReturnType<typeof listPets>>>
export type ListPetsQueryError = ErrorType<Error>

/**
 * @summary List all pets
 */
export const useListPets = <TData = Awaited<ReturnType<typeof listPets>>, TError = ErrorType<Error>>(
  params?: ListPetsParams,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof listPets>>, TError, TData>>
    request?: SecondParameter<typeof client>
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getListPetsQueryOptions(params, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Create a pet
 */
export const createPets = (createPetsBody: CreatePetsBody, options?: SecondParameter<typeof client>) => {
  return client<void>(
    { url: `/pets`, method: 'POST', headers: { 'Content-Type': 'application/json' }, data: createPetsBody },
    options
  )
}

export const getCreatePetsMutationOptions = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPets>>, TError, { data: CreatePetsBody }, TContext>
  request?: SecondParameter<typeof client>
}): UseMutationOptions<Awaited<ReturnType<typeof createPets>>, TError, { data: CreatePetsBody }, TContext> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof createPets>>, { data: CreatePetsBody }> = (props) => {
    const { data } = props ?? {}

    return createPets(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreatePetsMutationResult = NonNullable<Awaited<ReturnType<typeof createPets>>>
export type CreatePetsMutationBody = CreatePetsBody
export type CreatePetsMutationError = ErrorType<Error>

/**
 * @summary Create a pet
 */
export const useCreatePets = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPets>>, TError, { data: CreatePetsBody }, TContext>
  request?: SecondParameter<typeof client>
}) => {
  const mutationOptions = getCreatePetsMutationOptions(options)

  return useMutation(mutationOptions)
}

/**
 * @summary Info for a specific pet
 */
export const showPetById = (petId: string, options?: SecondParameter<typeof client>, signal?: AbortSignal) => {
  return client<Pet>({ url: `/pets/${petId}`, method: 'GET', signal }, options)
}

export const getShowPetByIdQueryKey = (petId: string) => {
  return [`/pets/${petId}`] as const
}

export const getShowPetByIdQueryOptions = <TData = Awaited<ReturnType<typeof showPetById>>, TError = ErrorType<Error>>(
  petId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof showPetById>>, TError, TData>>
    request?: SecondParameter<typeof client>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getShowPetByIdQueryKey(petId)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof showPetById>>> = ({ signal }) =>
    showPetById(petId, requestOptions, signal)

  return { queryKey, queryFn, enabled: !!petId, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof showPetById>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type ShowPetByIdQueryResult = NonNullable<Awaited<ReturnType<typeof showPetById>>>
export type ShowPetByIdQueryError = ErrorType<Error>

/**
 * @summary Info for a specific pet
 */
export const useShowPetById = <TData = Awaited<ReturnType<typeof showPetById>>, TError = ErrorType<Error>>(
  petId: string,
  options?: {
    query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof showPetById>>, TError, TData>>
    request?: SecondParameter<typeof client>
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getShowPetByIdQueryOptions(petId, options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}
