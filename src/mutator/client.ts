import axios, { AxiosRequestConfig, AxiosError, Method, AxiosResponse } from 'axios'

type FetchHeaders = {
  Authorization?: string
}

type FetchOptions<I = undefined, H = undefined> = {
  url: string
  /**
   * The HTTP method
   * @default 'GET'
   */
  method?: Method
  body?: I
  headers?: H | {}
  signal?: AbortSignal
  timeout?: number
}

function fetch<I, O, H extends FetchHeaders = {}>({
  url,
  method = 'GET',
  body,
  headers = {},
  signal,
  timeout,
}: FetchOptions<I, H>): Promise<O> {
  const config: AxiosRequestConfig = {
    url,
    method,
    data: body,
    headers, //: enrichHeadersWithCSRFToken<H>(url, headers),
    signal,
    timeout,
  }

  return axios.request<O>(config).then((response: AxiosResponse<O>) => response.data)
}

const baseUrl =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).env?.FOO || ''

type Arg = {
  url: string
  method: Method
  params?: { [key: string]: string | string[] | number | boolean | undefined }
  data?: unknown
  headers?: Record<string, string>
  signal?: AbortSignal
  responseType?: string | Blob
}

type Options = {
  timeout?: number
}

export const client = async <T>(
  { url, method = 'GET', params, data, headers, signal }: Arg,
  options?: Options
): Promise<T> => {
  const urlParams = params
    ? new URLSearchParams(
        Object.keys(params).reduce(
          (acc, key) => (params[key] === undefined ? { ...acc } : { ...acc, [key]: params[key] }),
          {}
        )
      )
    : ''

  return fetch({
    url: `${baseUrl}${url}${params ? `?${urlParams}` : ''}`,
    method,
    headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
    signal,
    timeout: options?.timeout,
  })
}

// Axios errors will return data in a different way our generated client with TError is expecting,
// so we are adding it here so our generated client will know
// For example when we throw a 400 with a key we can get it like `mutation.error?.response?.data?.key`
// same to know its status etc its now correctly typed since we are using Axios
export type ErrorType<Error> = AxiosError<Error>
