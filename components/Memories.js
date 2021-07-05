import { useSelector, useDispatch } from 'react-redux'
import { payload, toggle } from 'redux/utils'
import moment from 'moment'

const Memories = () => {
  const dispatch = useDispatch()
  const { memory, auth } = useSelector((state) => state)

  const options = (memory) => {
    dispatch(toggle())
    dispatch(payload({ type: 'Update', payload: memory }))
  }

  return (
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
  )
}
export default Memories
