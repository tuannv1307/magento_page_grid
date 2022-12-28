import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import OutsideClickHandler from "react-outside-click-handler";
import moment from "moment";
import {
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
import { st, classes } from "./ColumnActions.st.css";

const ShowActions = ({
  typeColumn,
  id,
}: {
  typeColumn?: string;
  id?: number;
}) => {
  let data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  const dispatch = useDispatch();

  let tasks: any = data.data.tasks;

  const lenghtIsEdit = _.size(_.filter(tasks, (task) => task.isEdit === true));

  const [isShow, setIsShow] = useState(false);

  const handleShow = () => {
    setIsShow(!isShow);
  };

  const handleEditTask = (id?: number) => {
    dispatch(checkIsEdit({ id, isEdit: true }));
    setIsShow(false);
    setTimeout(() => {
      dispatch(setIsAction({ id }));
      dispatch(checkboxTask({ id, isSelected: true }));
      if (lenghtIsEdit === 0) dispatch(checkboxOnlyTask({ id }));
    }, 200);
  };

  const handleDelete = (id?: number) => {
    if (id) {
      dispatch(DeleteTask({ id }));
    }
  };

  const handleOutsideClick = () => {
    setIsShow(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <button
        className={st(classes.selectActions)}
        onClick={() => handleShow()}
        data-hook="btn-show-column-action"
      >
        {typeColumn === "actions" && "Select"}
      </button>
      <span onClick={() => handleShow()} className={st(classes.icon)}>
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
      </span>
      {isShow && (
        <div className={st(classes.dropDownAction)}>
          <div className={st(classes.edit)}>
            <button data-hook="item-actions" onClick={() => handleEditTask(id)}>
              Edit
            </button>
          </div>
          <div className={st(classes.delete)}>
            <button data-hook="item-actions" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </OutsideClickHandler>
  );
};

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

  const lenghtIsEdit = _.size(_.filter(tasks, (task) => task.isEdit === true));

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

  return (
    <Draggable
      draggableId={column?.id}
      index={_.toNumber(index)}
      isDragDisabled
    >
      {(provided) => (
        <div
          className={st(classes.root)}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <p className={st(classes.titleColumn)}>{column.title}</p>
          {lenghtIsEdit > 1 && (
            <div className={st(classes.itemColumnEdit, { disableBtn })}>
              <button
                disabled={disableBtn}
                onClick={() => handleApply()}
                data-hook="btn-apply"
              >
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
                  <ShowActions typeColumn={typeColumn} id={task.id} />
                </div>
              )
            )}
        </div>
      )}
    </Draggable>
  );
};

export default ColumnActions;
