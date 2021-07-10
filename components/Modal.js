import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMemory, removeMemory, updateMemory } from 'redux/memory'
import { delLoading, delModal, setLoading } from 'redux/utils'
import { delMemory, postMemory, patchMemory } from 'utils/axiosMemory'

const Modal = () => {
  const utils = useSelector((state) => state.utils)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [image, setimage] = useState('')
  const [submit, setsubmit] = useState('')
  const modalRef = useRef()

  useEffect(() => {
    if (utils.payload) {
      const payload = utils.payload
      settitle(payload.title)
      setdescription(payload.description)
      setimage(payload.image)
    }
  }, [])

  useEffect(() => {
    const escape = (event) => {
      if (event.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [])

  const closeModal = () => dispatch(delModal())

  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch(setLoading())
    if (submit === 'add') {
      const payload = { title, description, image }
      if (utils.payload) {
        const response = await patchMemory(
          payload,
          utils.payload._id,
          auth.token
        )
        if (response.data) {
          dispatch(updateMemory({ _id: utils.payload._id, payload }))
          closeModal()
        } else {
          console.log(response);
        }
      } else {
        const response = await postMemory(payload, auth.token)
        if (response.data) {
          dispatch(
            addMemory({
              ...payload,
              likes: 0,
              _id: response.data,
              user: auth.user._id,
            })
          )
          closeModal()
        } 
      }
    } else {
      const response = await delMemory(utils.payload._id, auth.token)
      if (response.data) {
        dispatch(removeMemory(utils.payload._id))
        closeModal()
      }
    }
    dispatch(delLoading())
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setimage(base64)
    return base64
  }

  const modalClick = (event) => {
    if (event.target.className.includes('addmemory__container')) {
      closeModal()
    }
  }

  return (
    <div className="addmemory__container" ref={modalRef} onClick={modalClick}>
      <form onSubmit={onSubmit}>
        <h1>{utils.payload ? 'Update' : 'New'} memory</h1>
        <div className="addmemory__input">
          <label>Title</label>
          <input
            placeholder="title"
            required
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div className="addmemory__input">
          <label>Description</label>
          <input
            placeholder="description"
            required
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div className="addmemory__input">
          <label>Image</label>
          <input
            type="file"
            accept=".jpeg , .png , .jpg"
            required={utils.payload ? false : true}
            onChange={handleFileRead}
          />
        </div>
        <div className="buttons">
          {utils.payload && (
            <button
              type="submit"
              className="button button__red"
              onClick={() => setsubmit('delete')}
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="button button__green"
            onClick={() => setsubmit('add')}
          >
            {utils.payload ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  )
}
export default Modal
