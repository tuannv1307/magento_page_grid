import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
import DatePicker from "react-datepicker";
import {
  Magento_Page,
  Tasks,
  checkIsEdit,
  checkboxOnlyTask,
  changeTask,
} from "../../store/magentoPageGridReducer";
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
  keyName: string;
  value?: string;
  disable: boolean;
}) => {
  const { id, keyName, disable } = props;

  const dispatch = useDispatch();

  const currentEditTaks: Magento_Page = useSelector(
    (state: any) => state.magentopage.currentEditTaks
  );

  const currentTask: any = _.find(
    currentEditTaks,
    (task: Tasks) => _.toNumber(task?.id) === id
  );

  const handleChange = (e?: any) => {
    id &&
      e &&
      dispatch(
        changeTask({
          id,
          keyName,
          value: e.target.value,
        })
      );
  };

  let itemTask;

  if (!_.isUndefined(currentTask)) {
    itemTask = currentTask[`${keyName}`];
  }

  return (
    <input
      type="text"
      value={itemTask}
      onChange={handleChange}
      disabled={disable}
      data-hook="input-edit"
    />
  );
};

const EditControlSelectPo = (props: {
  id?: number;
  keyName: string;
  value?: string;
  disable: boolean;
}) => {
  const { id, keyName, disable } = props;

  const dispatch = useDispatch();

  const currentEditTaks: Magento_Page = useSelector(
    (state: any) => state.magentopage.currentEditTaks
  );

  const currentTask: any = _.find(
    currentEditTaks,
    (task: Tasks) => _.toNumber(task?.id) === id
  );

  const handleChange = (e?: any) => {
    id &&
      e &&
      dispatch(
        changeTask({
          id,
          keyName,
          value: e.target.value,
        })
      );
  };

  return (
    <select
      value={!_.isUndefined(currentTask) && currentTask[`${keyName}`]}
      onChange={handleChange}
      disabled={disable}
      data-hook="select-value-office"
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
  keyName: string;
  value?: string;
  disable: boolean;
}) => {
  const { id, keyName, disable } = props;

  const dispatch = useDispatch();

  const currentEditTaks: Magento_Page = useSelector(
    (state: any) => state.magentopage.currentEditTaks
  );

  const currentTask: any = _.find(
    currentEditTaks,
    (task: Tasks) => _.toNumber(task?.id) === id
  );

  const handleChange = (e?: any) => {
    id &&
      e &&
      dispatch(
        changeTask({
          id,
          keyName,
          value: e.target.value,
        })
      );
  };

  return (
    <select
      value={!_.isUndefined(currentTask) && currentTask[`${keyName}`]}
      onChange={handleChange}
      disabled={disable}
      data-hook="select-value-status"
    >
      <option value="enable">Enable</option>
      <option value="disable">Disable</option>
    </select>
  );
};

const EditControlDate = (props: {
  id?: number;
  keyName: string;
  value?: string;
  disable: boolean;
}) => {
  const { id, keyName, disable } = props;

  const dispatch = useDispatch();

  const currentEditTaks: Magento_Page = useSelector(
    (state: any) => state.magentopage.currentEditTaks
  );

  const currentTask: any = _.find(
    currentEditTaks,
    (task: Tasks) => task?.id === id
  );

  const handleChange = (valueDate?: any) => {
    id &&
      dispatch(
        changeTask({
          id,
          keyName,
          value: moment(valueDate).format("YYYY/MM/DD"),
        })
      );
  };

  return (
    <DatePicker
      selected={
        !_.isUndefined(currentTask)
          ? moment(currentTask[`${keyName}`]).toDate()
          : new Date()
      }
      showPopperArrow={false}
      dateFormat="yyyy/MM/dd"
      onChange={handleChange}
      disabled={disable}
      data-hook="input-date"
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

  const nameEditMul = data.nameEditMul;

  const positionEditMul = data.positionEditMul;

  const salaryEditMul = data.salaryEditMul;

  const start_dateEditMul = data.start_dateEditMul;

  const officeEditMul = data.officeEditMul;

  const extnEditMul = data.extnEditMul;

  const statusEditMul = data.statusEditMul;

  const [disableName, setDisableName] = useState(false);
  const [disablePosition, setDisablePosition] = useState(false);
  const [disableOffice, setDisableOffice] = useState(false);
  const [disableSalary, setDisableSalary] = useState(false);
  const [disableStart_date, setDisableStart_date] = useState(false);
  const [disableExtn, setDisableExtn] = useState(false);
  const [disableStatus, setDisableStatus] = useState(false);

  let currentEditTaks = data.currentEditTaks;

  useEffect(() => {
    if (_.size(currentEditTaks) > 1) {
      if (nameEditMul !== "") {
        setDisableName(true);
      } else setDisableName(false);
      if (positionEditMul !== "") {
        setDisablePosition(true);
      } else setDisablePosition(false);
      if (salaryEditMul !== "") {
        setDisableOffice(true);
      } else setDisableOffice(false);
      if (start_dateEditMul !== "") {
        setDisableSalary(true);
      } else setDisableSalary(false);
      if (officeEditMul !== "") {
        setDisableStart_date(true);
      } else setDisableStart_date(false);
      if (extnEditMul !== "") {
        setDisableExtn(true);
      } else setDisableExtn(false);
      if (statusEditMul !== "") {
        setDisableStatus(true);
      } else setDisableStatus(false);
    }
  }, [
    nameEditMul,
    positionEditMul,
    officeEditMul,
    salaryEditMul,
    start_dateEditMul,
    extnEditMul,
    statusEditMul,
  ]);

  const handleClickEdit = (id?: number) => {
    if (id) {
      if (lenghtIsEdit > 0) {
      } else {
        dispatch(checkIsEdit({ id, isEdit: true }));

        dispatch(checkboxOnlyTask({ id }));
      }
    }
  };

  return (
    <div className={st(classes.root)}>
      <div
        className={st(classes.taskItem)}
        onDoubleClick={() => handleClickEdit(task.id)}
        data-hook="task-item"
      >
        <>{typeColumn === "id" && <span>{task.id}</span>}</>
        <>
          {typeColumn === "name" && (
            <span className={st(classes.itemTask)}>
              {!task?.isEdit && task.name}
              {task?.isEdit && (
                <EditControlInput
                  id={task.id}
                  keyName={typeColumn}
                  value={task.name}
                  disable={disableName}
                />
              )}
            </span>
          )}
        </>
        <>
          {typeColumn === "position" && (
            <span className={st(classes.itemTask)}>
              {!task?.isEdit && task.position}
              {task?.isEdit && (
                <EditControlInput
                  id={task.id}
                  keyName={typeColumn}
                  value={task.position}
                  disable={disablePosition}
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
                  disable={disableOffice}
                />
              )}
            </span>
          )}
        </>
        <>
          {typeColumn === "salary" && (
            <span className={st(classes.itemTask)}>
              {!task.isEdit && <>${task.salary}</>}
              {task.isEdit && (
                <EditControlInput
                  id={task.id}
                  keyName={typeColumn}
                  value={task.salary}
                  disable={disableSalary}
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
                  disable={disableStart_date}
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
                  disable={disableExtn}
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
                  disable={disableStatus}
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
