import axios from 'axios'
const BASE = 'https://shnm.gq/'

export const login = async (payload) => {
  try {
    const response = await axios.post(BASE + 'login', payload)
    return response
  } catch (err) {
    return err.response.data
  }
}

export const register = async (payload) => {
  try {
    const response = await axios.post(BASE + 'register', payload)
    return response
  } catch (err) {
    return err.response.data
  }
}
