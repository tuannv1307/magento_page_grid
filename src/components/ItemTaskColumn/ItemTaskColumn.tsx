import { ChangeEvent, useEffect, useState } from "react";
import EditDataTask from "../EditDataTask";
import {
  Magento_Page,
  Tasks,
  checkIsEdit,
  checkboxOnlyTask,
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
  keyName: string;
  value?: string;
  disable: boolean;
  columnsAll: string;
}) => {
  const { id, keyName, disable, columnsAll } = props;
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
    // currentTask[`${keyName}`] =
    //   columnsAll !== "" ? columnsAll : currentTask[`${keyName}`];
    itemTask = currentTask[`${keyName}`];
    //  abc = columnsAll !== "" ? columnsAll : currentTask[`${keyName}`];
  }

  console.log(itemTask);

  return (
    <input
      type="text"
      value={itemTask}
      onChange={handleChange}
      disabled={disable}
    />
  );
};

const EditControlSelectPo = (props: {
  id?: number;
  keyName: string;
  value?: string;
  disable: boolean;
  columnsAll: string;
}) => {
  const { id, keyName, disable, columnsAll } = props;
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
    // setCurrentValue(e.target.value);
  };
  return (
    <select
      value={!_.isUndefined(currentTask) && currentTask[`${keyName}`]}
      onChange={handleChange}
      disabled={disable}
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
  columnsAll: string;
}) => {
  const { id, keyName, disable, columnsAll } = props;
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
  columnsAll: string;
}) => {
  const { id, keyName, disable, columnsAll } = props;
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
    />
  );
};

const ItemTaskColumn = ({ task, typeColumn }: ItemTaskColumnProps) => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  // const currentEditTaks: Magento_Page = useSelector(
  //   (state: any) => state.magentopage.currentEditTaks
  // );
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

  const currentEditTaks = data.currentEditTaks;
  // console.log(currentEditTaks);

  const [disableName, setDisableName] = useState(false);
  const [disablePosition, setDisablePosition] = useState(false);
  const [disableOffice, setDisableOffice] = useState(false);
  const [disableSalary, setDisableSalary] = useState(false);
  const [disableStart_date, setDisableStart_date] = useState(false);
  const [disableExtn, setDisableExtn] = useState(false);
  const [disableStatus, setDisableStatus] = useState(false);

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

  // useEffect(() => {
  //   if (nameAllColumn !== "") setInputName(nameAllColumn);
  //   if (positionAllColumn !== "") setInputPosition(positionAllColumn);
  //   if (officeAllColumn !== "") setInputOffice(officeAllColumn);
  //   if (salaryAllColumn !== "") setInputSalary(salaryAllColumn);
  //   if (start_dateAllColumn !== "")
  //     setInputStartDate(moment(start_dateAllColumn).toDate());
  //   if (extnAllColumn !== "") setInputExtn(extnAllColumn);
  //   if (statusAllColumn !== "") setInputStatus(statusAllColumn);
  // }, [
  //   nameAllColumn,
  //   positionAllColumn,
  //   officeAllColumn,
  //   salaryAllColumn,
  //   start_dateAllColumn,
  //   extnAllColumn,
  //   statusAllColumn,
  // ]);

  const handleClickEdit = (id?: number) => {
    if (id) {
      if (lenghtIsEdit > 0) {
        //dispatch(checkIsEdit({ id, isEdit: false }));
      } else {
        dispatch(checkIsEdit({ id, isEdit: true }));
        //   dispatch(checkboxTask({ id, isSelected: !isEdit }));
        dispatch(checkboxOnlyTask({ id }));
      }
    }
  };

  const handleCloseTask = (id?: number) => {
    dispatch(checkIsEdit({ id, isEdit: false }));
  };

  const handleSaveTask = () => {
    // console.log("dta");
    dispatch(saveChange());
    // dispatch(editTask({ arrayEditDataTask }));
    // setIsEditTask(false);
    // dispatch(checkIsEdit({ id, isEdit: false }));
  };
  // console.log(data);

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
              <button onClick={handleSaveTask} className={st(classes.save)}>
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
        onDoubleClick={() => handleClickEdit(task.id)}
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
                  disable={disableName}
                  columnsAll={nameAllColumn}
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
                  disable={disablePosition}
                  columnsAll={positionAllColumn}
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
                  columnsAll={officeAllColumn}
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
                  disable={disableSalary}
                  columnsAll={salaryAllColumn}
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
                  columnsAll={start_dateAllColumn}
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
                  columnsAll={extnAllColumn}
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
                  columnsAll={statusAllColumn}
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
