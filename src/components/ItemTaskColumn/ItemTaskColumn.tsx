import { ChangeEvent, useState } from "react";
import EditDataTask from "../EditDataTask";
import {
  Magento_Page,
  Tasks,
  checkIsEdit,
  checkboxOnlyTask,
  checkboxTask,
  changeTask,
  saveChange,
} from "../../store/magentoPageGridReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
import DatePicker from "react-datepicker";
import {
  columnDataLenght,
  getPaginatedData,
} from "../ColumnPageType/ColumnPageType";
import "./DatePicker.scss";
import { st, classes } from "./ItemTaskColumn.st.css";

type ItemTaskColumnProps = {
  task: Tasks;
  typeColumn: string;
};

const EditControlInput = (props: {
  id?: number;
  keyName?: string;
  value?: string;
}) => {
  const { id, keyName } = props;
  const dispatch = useDispatch();
  const currentEditTaks: Magento_Page = useSelector(
    (state: any) => state.magentopage.currentEditTaks
  );

  const currentTask: any = _.find(
    currentEditTaks,
    (task) => _.toNumber(task?.id) === id
  );

  const handleChange = (e?: any) => {
    id && e && dispatch(changeTask({ id, keyName, value: e.target.value }));
    // setCurrentValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={!_.isUndefined(currentTask) && currentTask.keyName}
      onChange={handleChange}
    />
  );
};

const EditControlSelectPo = (props: {
  id?: number;
  keyName?: string;
  value?: string;
}) => {
  const { id, keyName, value } = props;
  const dispatch = useDispatch();
  const currentEditTaks: Magento_Page = useSelector(
    (state: any) => state.magentopage.currentEditTaks
  );

  const currentTask: any = _.find(
    currentEditTaks,
    (task) => _.toNumber(task?.id) === id
  );

  const handleChange = (e?: any) => {
    id && e && dispatch(changeTask({ id, keyName, value: e.target.value }));
    // setCurrentValue(e.target.value);
  };
  return (
    <select
      value={!_.isUndefined(currentTask) && currentTask.keyName}
      onChange={handleChange}
    >
      <option value="Tokyo">Tokyo</option>
      <option value="Sydney">Sydney</option>
      <option value="London">London</option>
      <option value="Singapore">Singapore</option>
      <option value="San Francisco">San Francisco</option>
      <option value="Edinburgh">Edinburgh</option>
      <option value="New York">New York</option>
    </select>
  );
};

const EditControlSelectSta = (props: {
  id?: number;
  keyName?: string;
  value?: string;
}) => {
  const { id, keyName, value } = props;
  const dispatch = useDispatch();
  const currentEditTaks: Magento_Page = useSelector(
    (state: any) => state.magentopage.currentEditTaks
  );

  const currentTask: any = _.find(
    currentEditTaks,
    (task) => _.toNumber(task?.id) === id
  );

  const handleChange = (e?: any) => {
    id && e && dispatch(changeTask({ id, keyName, value: e.target.value }));
    // setCurrentValue(e.target.value);
  };
  return (
    <select
      value={!_.isUndefined(currentTask) && currentTask.keyName}
      onChange={handleChange}
    >
      <option value="enable">Enable</option>
      <option value="disable">Disable</option>
    </select>
  );
};

const EditControlDate = (props: {
  id?: number;
  keyName?: string;
  value?: string;
}) => {
  const { id, keyName, value } = props;
  const dispatch = useDispatch();
  const handleChange = (e?: any) => {
    id && dispatch(changeTask({ id, keyName, value }));
  };
  return (
    <DatePicker
      selected={moment(value).toDate()}
      showPopperArrow={false}
      dateFormat="yyyy/MM/dd"
      onChange={handleChange}
    />
  );
};

const ItemTaskColumn = ({ task, typeColumn }: ItemTaskColumnProps) => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  let tasks: any = data.data.tasks;
  const lenghtIsEdit = _.size(_.filter(tasks, (task) => task.isEdit === true));

  const dispatch = useDispatch();

  const sizeData = data.valueChange;
  const typeArr = data.typeArr;
  const currentPage = data.currentPage;
  tasks =
    typeArr === "DATA_SET_LENGTH"
      ? columnDataLenght(tasks, sizeData)
      : getPaginatedData(tasks, currentPage, sizeData);

  const handleClickEdit = (id?: number, isEdit?: boolean) => {
    if (id) {
      if (lenghtIsEdit === 1) {
        dispatch(checkIsEdit({ id, isEdit: true }));
        dispatch(checkboxTask({ id, isSelected: !isEdit }));
        dispatch(checkboxOnlyTask({ id }));
      } else {
        dispatch(checkIsEdit({ id, isEdit: false }));
      }
    }
  };

  const handleCloseTask = (id?: number) => {
    dispatch(checkIsEdit({ id, isEdit: false }));
  };

  const handleSaveTask = (id?: number) => {
    // console.log("dta");
    dispatch(saveChange({ id }));
    // dispatch(editTask({ arrayEditDataTask }));
    // setIsEditTask(false);
    // dispatch(checkIsEdit({ id, isEdit: false }));
  };

  return (
    <div className={st(classes.root)}>
      {task.isEdit ? (
        <div className={st(classes.editTask)}>
          {/* <EditDataTask
            // typeColumn={typeColumn}
            task={task}

            // key={task.id}
            // handleChangeValues={handleChangeValues}
          /> */}

          {lenghtIsEdit === 1 && (
            <div className={st(classes.actionClose)}>
              <button
                onClick={() => handleCloseTask(task.id)}
                className={st(classes.cancel)}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveTask(task.id)}
                className={st(classes.save)}
              >
                Save
              </button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      <div
        className={st(classes.taskItem)}
        onDoubleClick={() => handleClickEdit(task.id, task.isEdit)}
      >
        <>{typeColumn === "id" && <span>{task.id}</span>}</>
        <>
          {typeColumn === "name" && (
            <span className={st(classes.itemTask)}>
              {!task.isEdit && task.name}
              {task.isEdit && (
                <EditControlInput
                  id={task.id}
                  keyName={typeColumn}
                  value={task.name}
                />
              )}
            </span>
          )}
        </>
        <>
          {typeColumn === "position" && (
            <span className={st(classes.itemTask)}>
              {!task.isEdit && task.position}
              {task.isEdit && (
                <EditControlInput
                  id={task.id}
                  keyName={typeColumn}
                  value={task.position}
                />
              )}
            </span>
          )}
        </>
        <>
          {typeColumn === "office" && (
            <span className={st(classes.itemTask)}>
              {!task.isEdit && task.office}
              {task.isEdit && (
                <EditControlSelectPo
                  id={task.id}
                  keyName={typeColumn}
                  value={task.office}
                />
              )}
            </span>
          )}
        </>
        <>
          {typeColumn === "salary" && (
            <span className={st(classes.itemTask)}>
              {!task.isEdit && task.salary}
              {task.isEdit && (
                <EditControlInput
                  id={task.id}
                  keyName={typeColumn}
                  value={task.salary}
                />
              )}
            </span>
          )}
        </>

        <>
          {typeColumn === "start_date" && (
            <span className={st(classes.itemTask)}>
              {!task.isEdit && moment(task.start_date).format("yyyy/MM/DD")}
              {task.isEdit && (
                <EditControlDate
                  id={task.id}
                  keyName={typeColumn}
                  value={task.start_date}
                />
              )}
            </span>
          )}
        </>
        <>
          {typeColumn === "extn" && (
            <span className={st(classes.itemTask)}>
              {!task.isEdit && task.extn}
              {task.isEdit && (
                <EditControlInput
                  id={task.id}
                  keyName={typeColumn}
                  value={task.extn}
                />
              )}
            </span>
          )}
        </>
        <>
          {typeColumn === "status" && (
            <span className={st(classes.itemTask)}>
              {!task.isEdit && task.status}
              {task.isEdit && (
                <EditControlSelectSta
                  id={task.id}
                  keyName={typeColumn}
                  value={task.status}
                />
              )}
            </span>
          )}
        </>
      </div>
    </div>
  );
};

export default ItemTaskColumn;
