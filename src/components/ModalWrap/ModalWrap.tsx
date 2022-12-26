import { useDispatch, useSelector } from "react-redux";
import {
  Magento_Page,
  clearSelected,
  setShowModal,
} from "../../store/magentoPageGridReducer";
import { st, classes } from "./ModalWrap.st.css";

const ModalWrap = () => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const isShowModal = data.isShowModal;
  const isItemTaskSelectd = data.isItemTaskSelectd;
  const titleModal = data.titleModal;
  const contentModal = data.contentModal;

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(
      setShowModal({
        isShowModal: !isShowModal,
        isItemTaskSelectd,
        titleModal,
        contentModal,
      })
    );
  };
  const handleOKModal = () => {
    if (isItemTaskSelectd) {
      dispatch(clearSelected());
      dispatch(
        setShowModal({
          isShowModal: !isShowModal,
          isItemTaskSelectd,
          titleModal,
          contentModal,
        })
      );
    } else {
      dispatch(
        setShowModal({
          isShowModal: !isShowModal,
          isItemTaskSelectd,
          titleModal,
          contentModal,
        })
      );
    }
  };
  return (
    <div className={st(classes.root, { isShowModal })}>
      <header className={st(classes.modalHeader)}>
        <h1 className={st(classes.title)}>{titleModal}</h1>
        <button className={st(classes.hideModal)} onClick={handleCloseModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button>
      </header>
      <div className={st(classes.modalContent)}>
        <div>{contentModal}</div>
      </div>
      <footer className={st(classes.modalFooter)}>
        {isItemTaskSelectd && (
          <button className={st(classes.cancel)} onClick={handleCloseModal}>
            Cancel
          </button>
        )}

        <button className={st(classes.ok)} onClick={handleOKModal}>
          OK
        </button>
      </footer>
    </div>
  );
};

export default ModalWrap;
