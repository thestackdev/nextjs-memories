import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'utils',
  initialState: { active: false, type: 'New', payload: {} },
  reducers: {
    openModal: (state, action) => {
      state.active = true
    },
    closeModal: (state, action) => {
      state.active = true
    },
    toggle: (state, action) => {
      state.active = !state.active
    },
    payload: (state, action) => {
      state.type = action.payload.type
      state.payload = action.payload?.payload
    },
  },
})

export const { openModal, closeModal, toggle, payload } = slice.actions
export default slice.reducer
