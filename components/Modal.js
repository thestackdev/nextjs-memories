import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMemory, removeMemory, updateMemory } from "redux/memory";
import { delModal } from "redux/utils";
import LoadingButton from "components/LoadingButton";
import axios from "axios";

const BASE_URL = process.env.BASE_URL + "/";

const Modal = () => {
  const utils = useSelector((state) => state.utils);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [submit, setsubmit] = useState("");
  const [loading, setLoading] = useState({
    delete: false,
    create: false,
    update: false,
  });
  const modalRef = useRef();

  useEffect(() => {
    if (utils.payload) {
      const payload = utils.payload;
      settitle(payload.title);
      setdescription(payload.description);
      setimage(payload.image);
    }
  }, []);

  useEffect(() => {
    const escape = (event) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);

  const closeModal = () => dispatch(delModal());

  const uploadImage = async () => {
    try {
      const imageData = new FormData();
      imageData.set("key", "418c7993a7a7adf16bbe1703fce77005");
      imageData.append("image", image);
      const imageResponse = await axios.post(
        "https://api.imgbb.com/1/upload",
        imageData,
        { withCredentials: false }
      );
      return imageResponse.data.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const patchMemory = async () => {
    setLoading({ ...loading, update: true });
    let payload = { title, description, image };
    try {
      if (typeof image !== "string") {
        payload.image = await uploadImage();
      }
      await axios.patch(BASE_URL + utils.payload._id, payload);
      dispatch(updateMemory({ _id: utils.payload._id, payload }));
      closeModal();
    } catch (error) {
      setLoading({ ...loading, update: false });
      console.log(error);
    }
  };

  const deleteMemory = async () => {
    setLoading({ ...loading, delete: true });
    try {
      await axios.delete(BASE_URL + utils.payload._id);
      dispatch(removeMemory(utils.payload._id));
      closeModal();
    } catch (error) {
      setLoading({ ...loading, delete: false });
      console.log(error);
    }
  };

  const postMemory = async () => {
    setLoading({ ...loading, create: true });
    let payload = { title, description, image };
    try {
      payload.image = await uploadImage();
      const response = await axios.post(BASE_URL, payload);
      dispatch(addMemory({ ...response.data, user: auth.user._id }));

      closeModal();
    } catch (error) {
      setLoading({ ...loading, create: false });
      console.log(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (submit === "Create") {
      if (utils.payload) patchMemory();
      else postMemory();
    } else deleteMemory();
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    setimage(file);
    return file;
  };

  const modalClick = (event) => {
    if (event.target.className.includes("addmemory__container")) {
      closeModal();
    }
  };

  return (
    <div className="addmemory__container" ref={modalRef} onClick={modalClick}>
      <form onSubmit={onSubmit}>
        <h1>{utils.payload ? "Update" : "New"} memory</h1>
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
              disabled={loading.delete}
              className="button button__red"
              onClick={() => setsubmit("delete")}
            >
              {loading.delete ? <LoadingButton /> : "Delete"}
            </button>
          )}

          <button
            type="submit"
            disabled={loading.create || loading.update}
            className="button button__green"
            onClick={() => setsubmit("Create")}
          >
            {utils.payload ? (
              loading.update ? (
                <LoadingButton />
              ) : (
                "Update"
              )
            ) : loading.create ? (
              <LoadingButton />
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Modal;
