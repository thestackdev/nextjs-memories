import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'memory',
  initialState: { memories: [] },
  reducers: {
    initMemory: (state, action) => {
      action.payload.forEach((element) => {
        state.memories.push(element)
      })
    },
    clearMemory: (state, action) => {
      state.memories = state.memories.filter(
        (mem) => mem._id !== action.payload
      )
    },
    addMemory: (state, action) => {
      state.memories.push(action.payload)
    },
    delMemory: (state, action) => {
      state.memories = state.memories.filter(
        (mem) => mem._id !== action.payload
      )
    },
    updateMemory: (state, action) => {
      state.memories.map((memory) => {
        if (memory._id === action.payload._id) {
          memory.title = action.payload.payload.title
          memory.description = action.payload.payload.description
          memory.image = action.payload.payload?.image
        }
      })
    },
  },
})

export const { addMemory, delMemory, updateMemory, clearMemory, initMemory } =
  slice.actions
export default slice.reducer
