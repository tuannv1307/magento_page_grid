import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  checkboxOnlyAction,
  checkboxOnlyTask,
  checkboxTask,
  checkIsEdit,
  DeleteTask,
  editInputMultiTask,
  inputEditMultiTask,
  Magento_Page,
  setIsAction,
  Tasks,
} from "../../store/magentoPageGridReducer";
import {
  columnDataLenght,
  fiterDataByKeyword,
  getPaginatedData,
  searchFilters,
} from "../ColumnPageType/ColumnPageType";
import OutsideClickHandler from "react-outside-click-handler";
import moment from "moment";
import { st, classes } from "./ColumnActions.st.css";

export type ColumnActionsProps = {
  column: {
    id: string;
    title: string;
  };
  index: string;
  typeColumn: string;
};

const ColumnActions = ({ column, typeColumn, index }: ColumnActionsProps) => {
  let data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  const refOutsideClick = useRef<any>(null);
  const dispatch = useDispatch();
  let tasks: any = data.data.tasks;
  const sizeData = data.valueChange;
  const typeArr = data.typeArr;
  const currentPage = data.currentPage;
  const searchData = data.searchData;
  const objFilters: any = data.objFilters;
  if (_.some(objFilters, (obj) => obj.value !== "")) {
    tasks = fiterDataByKeyword(tasks, objFilters);
  }
  if (searchData !== "") {
    tasks = searchFilters(tasks, searchData);
  }

  const handleDelete = (id?: number) => {
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
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refOutsideClick]);

  const lenghtIsEdit = _.size(_.filter(tasks, (task) => task.isEdit === true));

  const handleEditTask = (id?: number) => {
    dispatch(checkIsEdit({ id, isEdit: true }));
    setTimeout(() => {
      dispatch(setIsAction({ id }));
      dispatch(checkboxTask({ id, isSelected: true }));
      if (lenghtIsEdit === 0) dispatch(checkboxOnlyTask({ id }));
    }, 200);
  };

  const [disableBtn, setDisableBtn] = useState(true);

  const nameAllColumn = data.nameAllColumn;

  const positionAllColumn = data.positionAllColumn;

  const salaryAllColumn = data.salaryAllColumn;

  const start_dateAllColumn = data.start_dateAllColumn;

  const officeAllColumn = data.officeAllColumn;

  const extnAllColumn = data.extnAllColumn;

  const statusAllColumn = data.statusAllColumn;

  const nameEditMul = data.nameEditMul;

  const positionEditMul = data.positionEditMul;

  const salaryEditMul = data.salaryEditMul;

  const start_dateEditMul = data.start_dateEditMul;

  const officeEditMul = data.officeEditMul;

  const extnEditMul = data.extnEditMul;

  const statusEditMul = data.statusEditMul;

  useEffect(() => {
    if (
      nameEditMul !== "" ||
      positionEditMul !== "" ||
      salaryEditMul !== "" ||
      start_dateEditMul !== "" ||
      officeEditMul !== "" ||
      extnEditMul !== "" ||
      statusEditMul !== ""
    ) {
      setDisableBtn(false);
    }
  }, [
    nameEditMul,
    positionEditMul,
    salaryAllColumn,
    start_dateEditMul,
    officeEditMul,
    extnEditMul,
    statusEditMul,
  ]);

  const currentEditTaks = data.currentEditTaks;

  const handleApply = () => {
    if (_.size(currentEditTaks) > 1) {
      dispatch(
        editInputMultiTask({
          nameAllColumn: nameEditMul !== "" ? nameEditMul : nameAllColumn,
          positionAllColumn:
            positionEditMul !== "" ? positionEditMul : positionAllColumn,
          salaryAllColumn:
            salaryEditMul !== "" ? salaryEditMul : salaryAllColumn,
          start_dateAllColumn:
            moment(start_dateEditMul).format("YYYY/MM/DD") !== "Invalid date"
              ? moment(start_dateEditMul).format("YYYY/MM/DD")
              : start_dateAllColumn,
          officeAllColumn:
            officeEditMul !== "" ? officeEditMul : officeAllColumn,
          extnAllColumn: extnEditMul !== "" ? extnEditMul : extnAllColumn,
          statusAllColumn:
            statusEditMul !== "" ? statusEditMul : statusAllColumn,
        })
      );
      dispatch(
        inputEditMultiTask({
          nameEditMul: "",
          positionEditMul: "",
          salaryEditMul: "",
          start_dateEditMul: "",
          officeEditMul: "",
          extnEditMul: "",
          statusEditMul: "",
        })
      );
      setTimeout(() => {
        dispatch(
          editInputMultiTask({
            nameAllColumn: "",
            positionAllColumn: "",
            salaryAllColumn: "",
            start_dateAllColumn: "",
            officeAllColumn: "",
            extnAllColumn: "",
            statusAllColumn: "",
          })
        );
      }, 100);
    }
  };

  const handleShow = (id?: number) => {
    if (id) {
      // if (lenghtIsAction > 0) {
      //   dispatch(setIsAction({ id }));
      //   // dispatch(checkboxOnlyAction({ id }));
      // }
      dispatch(setIsAction({ id }));
    }
  };

  return (
    <Draggable
      draggableId={column?.id}
      index={_.toNumber(index)}
      isDragDisabled
    >
      {(provided, snapshot) => (
        <div
          className={st(classes.root)}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <p className={st(classes.titleColumn)}>{column.title}</p>
          {lenghtIsEdit > 1 && (
            <div className={st(classes.itemColumnEdit, { disableBtn })}>
              <button disabled={disableBtn} onClick={() => handleApply()}>
                Apply
              </button>
            </div>
          )}
          {tasks.length > 0 &&
            _.map(
              typeArr === "DATA_SET_LENGTH"
                ? columnDataLenght(tasks, sizeData)
                : getPaginatedData(tasks, currentPage, sizeData),
              (task: Tasks) => (
                <div className={st(classes.itemColumn)} key={task.id}>
                  <button
                    className={st(classes.selectActions)}
                    onClick={() => handleShow(task.id)}
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
                    <div
                      className={st(classes.dropDownAction)}
                      ref={refOutsideClick}
                    >
                      <div className={st(classes.edit)}>
                        <button onClick={() => handleEditTask(task.id)}>
                          Edit
                        </button>
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
