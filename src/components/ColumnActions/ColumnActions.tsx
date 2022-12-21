import { useState } from "react";
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
  getPaginatedData,
  searchFilters,
} from "../ColumnPageType/ColumnPageType";
import OutsideClickHandler from "react-outside-click-handler";

export type ColumnActionsProps = {
  column: {
    id: string | number;
    title: string;
    tasks: {
      id: string | number;
      name: string;
      position: string;
      salary: string;
      start_date: string;
      office: string;
      extn: string;
      status: string;
      selected: boolean;
    }[];
  };
  index?: any;
  typeColumn: string;
};

const ColumnActions = ({ column, typeColumn }: ColumnActionsProps) => {
  let data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  let tasks: any = data.data.tasks;
  let sizeData = data.valueChange;
  let typeArr = data.typeArr;
  let currentPage = data.currentPage;
  let searchData = data.searchData;
  tasks = searchFilters(tasks, searchData);

  const handleShow = (id: number) => {
    if (id) {
      dispatch(setIsAction({ id }));
    }
  };
  const handleDelete = (id: number) => {
    if (id) {
      dispatch(DeleteTask({ id }));
    }
  };
  const handleBlur = (id: number) => {
    handleShow(id);
  };
  return (
    <div className={st(classes.root)}>
      <p className={st(classes.titleColumn)}>{column.title}</p>
      {tasks.length > 0 &&
        _.map(
          typeArr === "DATA_SET_LENGTH"
            ? columnDataLenght(tasks, sizeData)
            : getPaginatedData(tasks, currentPage, sizeData),
          (task: any, index) => (
            <div className={st(classes.itemColumn)} key={index}>
              <button
                className={st(classes.selectActions)}
                onClick={() => handleShow(task.id)}
                onBlur={() => handleBlur(task.id)}
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
                <div className={st(classes.dropDownAction)}>
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
  );
};

export default ColumnActions;
