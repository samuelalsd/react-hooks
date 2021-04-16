import { useCallback, useReducer } from 'react'

const REQUEST_INIT = 'REQUEST_INIT'
const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
const REQUEST_FAILURE = 'REQUEST_FAILURE'

const defaultInitialState = {
    loading: false,
    data: null,
    error: null
}

function reducer(state, action) {
    switch (action.type) {
        case REQUEST_INIT:
            return { ...defaultInitialState, loading: true }
        case REQUEST_SUCCESS:
            return { ...state, loading: false, data: action.payload }
        case REQUEST_FAILURE:
            return { ...state, loading: false, error: action.error }
        default:
            throw new Error('error')
    }
}

async function request(instance, dispatch) {
    dispatch({ type: REQUEST_INIT })

    try {
        const response = await instance()
        const result = await response.data

        dispatch({ type: REQUEST_SUCCESS, payload: result })

        return result
    } catch (error) {
        dispatch({ type: REQUEST_FAILURE, error })

        throw error
    }
}

export default function useRequest(instance, options = {}) {
    const {
        throwError = true,
        initialState = {},
        onSuccess,
        onFailure,
    } = options

    const [state, dispatch] = useReducer(reducer, {
        ...defaultInitialState,
        ...initialState
    })

    async function requestCallback(...args) {
        try {
            const result = await request(() => instance(...args), dispatch)

            onSuccess?.(result)
            Promise.resolve(result)
        } catch (error) {
            onFailure?.(error)
            if (throwError) return Promise.reject(error)
        }
    }

    return [
        useCallback(requestCallback, []),
        state
    ]
}

export function useQuery(api, ...args) {
    let options

    if (typeof args[0] === 'object') {
        options = args[0]
    } else if ([typeof args[0], typeof args[1]].includes('function')) {
        const params = args[2]

        options = {
            onSuccess: args[0],
            initialState: params?.initialState,
            throwError: params?.throwError
        }

        if (args[1]) {
            if (typeof args[1] !== 'function') throw Error('useQuery() hook third parameter expects a function (`onFailure`).')
            options = { ...options, onFailure: args[1] }
        }
    } else {
        throw Error('useQuery() hook second parameter expects a function (`onSuccess`).')
    }

    const initialState = { ...options.initialState, loading: true }

    return useRequest(api, { ...options, initialState })
}