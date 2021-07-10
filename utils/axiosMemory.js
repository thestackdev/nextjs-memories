import axios from 'axios'
const BASE = 'https://memories.shnm.ml/'

export const getMemory = async () => {
  try {
    const response = await axios.get(BASE)
    return response
  } catch (err) {
    return err.response.data
  }
}

export const delMemory = async (_id, token) => {
  try {
    const response = await axios.delete(BASE + _id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response
  } catch (err) {
    return err.response.data
  }
}

export const postMemory = async (payload, token) => {
  try {
    const response = await axios.post(BASE, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response
  } catch (err) {
    return err.response.data
  }
}
export const patchMemory = async (payload, _id, token) => {
  try {
    const response = await axios.patch(BASE + _id, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response
  } catch (err) {
    return err.response.data
  }
}
