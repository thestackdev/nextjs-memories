import { createSlice } from '@reduxjs/toolkit'

let initialState = { token: '', user: {} }
if (typeof window !== 'undefined') {
  const auth = JSON.parse(localStorage.getItem('auth'))
  if (auth) initialState = auth
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    delUser: (state, action) => {
      state.token = ''
      state.user = {}
    },
  },
})

export const { setUser, delUser } = slice.actions
export default slice.reducer
