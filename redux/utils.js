import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'utils',
  initialState: {
    modal: false,
    payload: undefined,
    loading: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true
    },
    delLoading: (state, action) => {
      state.loading = false
    },
    setModal: (state, action) => {
      state.modal = true
      state.payload = action.payload
    },
    delModal: (state, action) => {
      state.modal = false
      state.payload = undefined
    },
  },
})

export const { setModal, delModal, setLoading, delLoading } = slice.actions
export default slice.reducer
