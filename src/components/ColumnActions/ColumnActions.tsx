import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { initialData } from "../../constants";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteTask,
  Magento_Page,
  setIsAction,
} from "../../store/magentoPageGridReducer";
import { st, classes } from "./ColumnActions.st.css";
import {
  columnDataLenght,
  fiterDataByKeyword,
  getPaginatedData,
  searchFilters,
} from "../ColumnPageType/ColumnPageType";
import OutsideClickHandler from "react-outside-click-handler";

import Edit from "./edit.svg";

export type ColumnActionsProps = {
  column: any;
  index?: any;
  typeColumn: string;
};

const ColumnActions = ({ column, typeColumn, index }: ColumnActionsProps) => {
  let data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const refOutsideClick = useRef<any>(null);
  const dispatch = useDispatch();
  let tasks: any = data.data.tasks;
  let sizeData = data.valueChange;
  let typeArr = data.typeArr;
  let currentPage = data.currentPage;
  let searchData = data.searchData;
  let objFilters: any = data.objFilters;
  if (searchData !== "") {
    tasks = searchFilters(tasks, searchData);
  }

  if (_.some(objFilters, (obj) => obj.value !== "")) {
    tasks = fiterDataByKeyword(tasks, objFilters);
  }

  const handleShow = (id: number) => {
    if (id) {
      dispatch(setIsAction({ id }));
      console.log("dadw");
    } else {
      console.log("dawddddd");
    }
  };

  const handleDelete = (id: number) => {
    if (id) {
      dispatch(DeleteTask({ id }));
    }
  };

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (
        refOutsideClick.current &&
        !refOutsideClick.current.contains(event.target)
      ) {
        //setSelectAction(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refOutsideClick]);

  // const handleBlur = (id: number) => {
  //   handleShow(id);
  // };

  return (
    <Draggable draggableId={column.id} index={index} isDragDisabled>
      {(provided, snapshot) => (
        <div
          className={st(classes.root)}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <p className={st(classes.titleColumn)}>{column.title}</p>
          {tasks.length > 0 &&
            _.map(
              typeArr === "DATA_SET_LENGTH"
                ? columnDataLenght(tasks, sizeData)
                : getPaginatedData(tasks, currentPage, sizeData),
              (task: any, index) => (
                <div className={st(classes.itemColumn)} key={task.id}>
                  <button
                    className={st(classes.selectActions)}
                    onClick={() => handleShow(task.id)}
                    //  onBlur={() => handleBlur(task.id)}
                  >
                    {typeColumn === "actions" && "Select"}
                  </button>

                  <span onClick={() => handleShow(task.id)}>
                    {task.isAction ? (
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
                      // <>
                      //   <img src={Edit} alt="Edit" />
                      // </>
                      // <>
                      //   <img src={Edit} alt="Edit" />
                      // </>
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
                  </span>

                  {task.isAction && (
                    <div
                      className={st(classes.dropDownAction)}
                      ref={refOutsideClick}
                    >
                      <div className={st(classes.edit)}>
                        <button>Edit</button>
                      </div>
                      <div className={st(classes.delete)}>
                        <button onClick={() => handleDelete(task.id)}>
                          Delete
                        </button>
                      </div>
                      <div className={st(classes.view)}>
                        <button>View</button>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
        </div>
      )}
    </Draggable>
  );
};

export default ColumnActions;
