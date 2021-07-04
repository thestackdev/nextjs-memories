import { configureStore } from '@reduxjs/toolkit'
import auth from 'redux/auth'
import memory from 'redux/memory'
import utils from 'redux/utils'

const store = configureStore({
  reducer: { auth, memory, utils },
})

store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth))
})

export default store
