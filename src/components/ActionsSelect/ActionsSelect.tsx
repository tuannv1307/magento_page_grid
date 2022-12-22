import { useState } from "react";
import { initialData } from "../../constants";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatusTask,
  checkboxTask,
  checkboxTaskAll,
  DeleteTask,
  Magento_Page,
  setIsAction,
  setShowModal,
} from "../../store/magentoPageGridReducer";
import { st, classes } from "./ActionsSelect.st.css";
import {
  columnDataLenght,
  getPaginatedData,
  searchFilters,
} from "../ColumnPageType/ColumnPageType";
import ModalWrap from "../ModalWrap/ModalWrap";
import OutsideClickHandler from "react-outside-click-handler";

const ActionsSelect = () => {
  let data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  let tasks: any = data.data.tasks;

  let isShowModal = data.isShowModal;
  let isItemTaskSelectd = data.isItemTaskSelectd;
  let titleModal = data.titleModal;
  let contentModal = data.contentModal;
  let searchData = data.searchData;
  tasks = searchFilters(tasks, searchData);

  const lengthTask = _.size(_.filter(tasks, (task) => task.selected === true));
  let taskByLength;
  let taskbyPaginate;

  const handleShow = () => {
    setIsShow(!isShow);
  };
  const handleCheckbox = (id: number, isSelected: boolean) => {
    if (id) {
      dispatch(checkboxTask({ id, isSelected: !isSelected }));
    }
  };
  const checkedAll = _.every(data.data.tasks, ["selected", true]);
  const checkedTask = _.some(data.data.tasks, ["selected", true]);
  const deselect = _.some(data.data.tasks, ["selected", true]);

  const handleCheckboxAll = () => {
    if (checkedAll) {
      dispatch(checkboxTaskAll({ checkedAll: false }));
    } else {
      dispatch(checkboxTaskAll({ checkedAll: true }));
    }
  };

  const ShowModal = (type: string) => {
    handleShow();
    if (checkedTask && type === "DELETE") {
      isItemTaskSelectd = true;
      titleModal = "Delete items";
      contentModal = `Are you sure you want to delete selected items? (${lengthTask} record)`;
      dispatch(
        setShowModal({
          isShowModal: !isShowModal,
          isItemTaskSelectd: checkedTask,
          titleModal,
          contentModal,
        })
      );
    }
    if (checkedTask === false) {
      isItemTaskSelectd = false;
      titleModal = "Attention";
      contentModal = "You haven't selected any items!";
      if (type === "DELETE") {
        dispatch(
          setShowModal({
            isShowModal: !isShowModal,
            isItemTaskSelectd: checkedTask,
            titleModal,
            contentModal,
          })
        );
      }
      if (type === "DISABLE") {
        dispatch(
          setShowModal({
            isShowModal: !isShowModal,
            isItemTaskSelectd: checkedTask,
            titleModal,
            contentModal,
          })
        );
      }
      if (type === "ENABLE") {
        dispatch(
          setShowModal({
            isShowModal: !isShowModal,
            isItemTaskSelectd: checkedTask,
            titleModal,
            contentModal,
          })
        );
      }
      if (type === "Edit") {
        dispatch(
          setShowModal({
            isShowModal: !isShowModal,
            isItemTaskSelectd: checkedTask,
            titleModal,
            contentModal,
          })
        );
      }
    }
    if (checkedTask) {
      if (type === "DISABLE") {
        dispatch(
          changeStatusTask({
            nameStatus: "disable",
          })
        );
      }
      if (type === "ENABLE") {
        dispatch(
          changeStatusTask({
            nameStatus: "enable",
          })
        );
      }
    }
  };
  const handleOutsideClick = () => {
    setIsShow(false);
  };

  return (
    <>
      <div className={st(classes.root)}>
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <div className={st(classes.actionBtnSelect)}>
            <button className={st(classes.actionSelect)} onClick={handleShow}>
              Actions
            </button>
            <button
              className={st(classes.seclectMenuToggle)}
              onClick={handleShow}
              // onBlur={handleBlur}
            >
              {isShow ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  className="bi bi-caret-up-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              )}
            </button>
            {isShow && (
              <ul className={st(classes.actionMenu)}>
                <li onClick={() => ShowModal("DELETE")}>Delete</li>

                <li onClick={() => ShowModal("DISABLE")}>Disable</li>

                <li onClick={() => ShowModal("ENABLE")}>Enable</li>
                <li onClick={() => ShowModal("EDIT")}>Edit</li>
              </ul>
            )}
          </div>
        </OutsideClickHandler>

        <div>
          {_.size(data.data.tasks)} records found{" "}
          {lengthTask > 0 && `( ${lengthTask} selected)`}{" "}
        </div>
      </div>
    </>
  );
};

export default ActionsSelect;
