import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    objectId: 512,
    apiData: { }
}

export const dataSlice = createSlice({
    name: 'data', 
    initialState,
    reducers: {
        setData: (state, action) => {
            return { ...state, apiData: action.payload}
        },
        incrementId: (state) => {
            return { ...state, objectId: state.objectId + 1}
        },
        decrementId: (state) => {
            return { ...state, objectId: state.objectId - 1}

        },
        inputId: (state, action) => {
            return { ...state, objectId: action.payload}
        },
        clear: () => {
            return initialState
        }
    }
})

export const fetchData = () => {
    const dataThunk = async (dispatch, getState) => {
        let state = getState()
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}
        `)
        const resData = await response.json()
        console.log('fetch data parsed:', resData)
        dispatch(setData(resData))
        state = getState()
        console.log(state)
    }

    return dataThunk
}

export const { setData, incrementId, decrementId, inputId, clear } = dataSlice.actions

export default dataSlice.reducer