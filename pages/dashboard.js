import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initMemory } from "redux/memory";
import { setModal } from "redux/utils";
import Modal from "components/Modal";
import moment from "moment";
import axios from "axios";
import Loading from "components/Loading";

const BASE_URL = process.env.BASE_URL + "/";

const Memories = () => {
  const dispatch = useDispatch();
  const { memory, auth, utils } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  const options = (memory) => dispatch(setModal(memory));

  const fetchMemories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL);
      dispatch(initMemory(response.data));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  if (auth.user === null) return <></>;

  if (loading) return <Loading />;

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
  );
};
export default Memories;
