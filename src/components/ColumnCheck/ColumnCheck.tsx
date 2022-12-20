import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { initialData } from "../../constants";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import type {
  DeleteTask,
  Magento_Page,
  setIsAction,
} from "../../store/magentoPageGridReducer";
import { st, classes } from "./ColumnCheck.st.css";
import {
  columnDataLenght,
  getPaginatedData,
  searchFilters,
} from "../ColumnPageType/ColumnPageType";

const ColumnCheck = () => {
  let data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  let tasks: any = data.data.tasks;
  let sizeData = data.valueChange;
  let typeArr = data.typeArr;
  let currentPage = data.currentPage;
  let searchData = data.searchData;
  tasks = searchFilters(tasks, searchData);

  const handleShow = () => {
    setIsShow(!isShow);
  };
  return (
    <div className={st(classes.root)}>
      <p className={st(classes.titleColumn)}>
        <input type="checkbox" />
        <button onClick={handleShow}>
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
      </p>
      {tasks.length > 0 &&
        _.map(
          typeArr === "DATA_SET_LENGTH"
            ? columnDataLenght(tasks, sizeData)
            : getPaginatedData(tasks, currentPage, sizeData),
          (task: any, index) => (
            <div className={st(classes.itemColumn)} key={index}>
              <input type="checkbox" />
            </div>
          )
        )}
    </div>
  );
};

export default ColumnCheck;
