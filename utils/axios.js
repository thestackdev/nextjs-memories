import axios from 'axios'
const URL = 'https://memories.shnm.ml/'

export const getMemories = async () => {
  try {
    const response = await axios.get(URL + 'api')
    return { success: response.data }
  } catch (error) {
    return error.response.data
  }
}

export const deleteMemories = async (_id, token) => {
  try {
    const response = await axios.delete(URL + 'api/' + _id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { success: response.data }
  } catch (error) {
    return error.response.data
  }
}

export const postMemories = async (payload, token) => {
  try {
    const response = await axios.post(URL + 'api', payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { success: response.data }
  } catch (error) {
    return error.response.data
  }
}
export const patchMemory = async (payload, _id, token) => {
  try {
    const response = await axios.patch(URL + 'api/' + _id, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return { success: response.data }
  } catch (error) {
    return error.response.data
  }
}

export const login = async (payload) => {
  try {
    const response = await axios.post(URL + 'login', payload)
    return { success: response.data }
  } catch (error) {
    return error.response.data
  }
}

export const register = async (payload) => {
  try {
    const response = await axios.post(URL + 'register', payload)
    return { success: response.data }
  } catch (error) {
    return error.response.data
  }
}
