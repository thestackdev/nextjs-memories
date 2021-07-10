import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMemory } from 'utils/axiosMemory'
import { initMemory } from 'redux/memory'
import { setModal } from 'redux/utils'
import { delUser } from 'redux/auth'
import Modal from 'components/Modal'
import moment from 'moment'

const Memories = () => {
  const dispatch = useDispatch()
  const { memory, auth, utils } = useSelector((state) => state)

  const options = (memory) => dispatch(setModal(memory))

  useEffect(() => {
    const func = async () => {
      const response = await getMemory()
      if (response.data) dispatch(initMemory(response.data))
      else dispatch(delUser())
    }
    func()
  }, [])

  return (
    <>
      {utils.modal && <Modal />}
      <div className="memories__container">
        {memory.memories.map((memory, key) => (
          <div className="memories__card" key={key}>
            {auth.user._id === memory.user && (
              <button
                className="memories__options"
                onClick={() => options(memory)}
              >
                ...
              </button>
            )}
            <img src={memory.image} />
            <span className="memories__title">{memory.title}</span>
            <span className="memories__description">{memory.description}</span>
            <span className="memories__footer">
              <span>
                <img className="icon" src="/icons/thumsup.svg" />
                <span>{memory.likes}</span>
              </span>
              <span>{moment(memory.updatedAt).fromNow()}</span>
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
export default Memories
