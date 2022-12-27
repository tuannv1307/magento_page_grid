import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Magento_Page,
  Tasks,
  inputEditMultiTask,
  setArrayEditDataTask,
} from "../../store/magentoPageGridReducer";
import _ from "lodash";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./DatePicker.scss";
import { st, classes } from "./EditDataTask.st.css";
import {
  columnDataLenght,
  getPaginatedData,
} from "../ColumnPageType/ColumnPageType";

export type EditDataTaskProps = {
  task: Tasks;
};

const EditDataTask = ({ task }: EditDataTaskProps) => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  let tasks: any = data.data.tasks;
  const [inputName, setInputName] = useState(task.name);
  const [inputPosition, setInputPosition] = useState(task.position);
  const [inputOffice, setInputOffice] = useState(task.office);
  const [inputSalary, setInputSalary] = useState(task.salary);
  const [inputStartDate, setInputStartDate] = useState(
    moment(task.start_date).toDate()
  );
  const [inputExtn, setInputExtn] = useState(task.extn);
  const [inputStatus, setInputStatus] = useState(task.status);

  const [disableName, setDisableName] = useState(false);
  const [disablePosition, setDisablePosition] = useState(false);
  const [disableOffice, setDisableOffice] = useState(false);
  const [disableSalary, setDisableSalary] = useState(false);
  const [disableStart_date, setDisableStart_date] = useState(false);
  const [disableExtn, setDisableExtn] = useState(false);
  const [disableStatus, setDisableStatus] = useState(false);

  const dispatch = useDispatch();

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

  const sizeData = data.valueChange;
  const typeArr = data.typeArr;
  const currentPage = data.currentPage;

  tasks =
    typeArr === "DATA_SET_LENGTH"
      ? columnDataLenght(tasks, sizeData)
      : getPaginatedData(tasks, currentPage, sizeData);

  const lenghtIsEdit = _.size(_.filter(tasks, (task) => task.isEdit === true));
  const arrayEditDataTask = data.arrayEditDataTask;
  const arrTasks = data.arrTasks;

  console.log(arrayEditDataTask);

  // console.log(arrayEditDataTask, arrTasks);

  // useEffect(() => {
  //   const taskEdits: any = [];

  //   _.forEach(data.data.tasks, (taskEdit: any) => {
  //     if (taskEdit.id === task.id) {
  //       taskEdits.push({
  //         ...task,
  //         id: taskEdit.id,
  //         name: inputName !== task.name ? inputName : task.name,
  //         position:
  //           inputPosition !== task.position ? inputPosition : task.position,
  //         salary: inputSalary !== task.salary ? inputSalary : task.salary,
  //         start_date:
  //           moment(inputStartDate).format("YYYY/MM/DD") !== task.start_date
  //             ? moment(inputStartDate).format("YYYY/MM/DD")
  //             : task.start_date,
  //         office: inputOffice !== task.office ? inputOffice : task.office,
  //         extn: inputExtn !== task.extn ? inputExtn : task.extn,
  //         status: inputStatus !== task.status ? inputStatus : task.status,
  //       });
  //     } else taskEdits.push(taskEdit);
  //   });
  //   const arrInputEdit: Tasks[] = [];

  //   _.forEach(
  //     _.filter(taskEdits, (task) => task.isEdit === true),
  //     (taskEdit: any) => {
  //       if (taskEdit.id === task.id) {
  //         arrInputEdit.push({
  //           ...task,
  //           id: taskEdit.id,
  //           name: inputName !== task.name ? inputName : task.name,
  //           position:
  //             inputPosition !== task.position ? inputPosition : task.position,
  //           salary: inputSalary !== task.salary ? inputSalary : task.salary,
  //           start_date:
  //             moment(inputStartDate).format("YYYY/MM/DD") !== task.start_date
  //               ? moment(inputStartDate).format("YYYY/MM/DD")
  //               : task.start_date,
  //           office: inputOffice !== task.office ? inputOffice : task.office,
  //           extn: inputExtn !== task.extn ? inputExtn : task.extn,
  //           status: inputStatus !== task.status ? inputStatus : task.status,
  //         });
  //       } else arrInputEdit.push(taskEdit);
  //     }
  //   );
  //   dispatch(setArrayEditDataTask({ arrInputEdit, arrTasks: taskEdits }));
  // }, [
  //   lenghtIsEdit,
  //   inputName,
  //   inputPosition,
  //   inputExtn,
  //   inputOffice,
  //   inputSalary,
  //   inputStartDate,
  //   inputStatus,
  // ]);
  // // console.log(data);

  // useEffect(() => {
  //   if (lenghtIsEdit > 1) {
  //     if (nameEditMul !== "") {
  //       setDisableName(true);
  //     } else setDisableName(false);
  //     if (positionEditMul !== "") {
  //       setDisablePosition(true);
  //     } else setDisablePosition(false);
  //     if (salaryEditMul !== "") {
  //       setDisableOffice(true);
  //     } else setDisableOffice(false);
  //     if (start_dateEditMul !== "") {
  //       setDisableSalary(true);
  //     } else setDisableSalary(false);
  //     if (officeEditMul !== "") {
  //       setDisableStart_date(true);
  //     } else setDisableStart_date(false);
  //     if (extnEditMul !== "") {
  //       setDisableExtn(true);
  //     } else setDisableExtn(false);
  //     if (statusEditMul !== "") {
  //       setDisableStatus(true);
  //     } else setDisableStatus(false);
  //   }
  // }, [
  //   nameEditMul,
  //   positionEditMul,
  //   officeEditMul,
  //   salaryEditMul,
  //   start_dateEditMul,
  //   extnEditMul,
  //   statusEditMul,
  // ]);

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

  const columns: any = data.data.columns;
  const columnOder = data.data.columnOrder;
  return (
    <div className={st(classes.root)}>
      {/* {_.map(columnOder, (columnId: any) => (
        <div
          key={columns[columnId].id}
          className={st(classes.itemEdit, {
            typeColumn: columns[columnId].title,
          })}
        >
          {columns[columnId].title === "name" ? (
            <input
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
              type="text"
              className={st(classes.inputEditTask, {
                typeColumn: columns[columnId].title,
              })}
              disabled={disableName}
            />
          ) : columns[columnId].title === "position" ? (
            <input
              onChange={(e) => setInputPosition(e.target.value)}
              value={inputPosition}
              type="text"
              className={st(classes.inputEditTask, {
                typeColumn: columns[columnId].title,
              })}
              disabled={disablePosition}
            />
          ) : columns[columnId].title === "office" ? (
            <select
              value={inputOffice}
              className={st(classes.selectEditTask, {
                typeColumn: columns[columnId].title,
              })}
              onChange={(e) => setInputOffice(e.target.value)}
              disabled={disableOffice}
            >
              <option value="Tokyo">Tokyo</option>
              <option value="Sydney">Sydney</option>
              <option value="London">London</option>
              <option value="Singapore">Singapore</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Edinburgh">Edinburgh</option>
              <option value="New York">New York</option>
            </select>
          ) : columns[columnId].title === "salary" ? (
            <input
              onChange={(e) => setInputSalary(e.target.value)}
              value={inputSalary}
              type="text"
              className={st(classes.inputEditTask, {
                typeColumn: columns[columnId].title,
              })}
              disabled={disableSalary}
            />
          ) : columns[columnId].title === "start_date" ? (
            <DatePicker
              selected={inputStartDate}
              onChange={(date: Date) => setInputStartDate(date)}
              showPopperArrow={false}
              dateFormat="yyyy/MM/dd"
              className={st(classes.inputEditTask, {
                typeColumn: columns[columnId].title,
              })}
              disabled={disableStart_date}
            />
          ) : columns[columnId].title === "extn" ? (
            <input
              onChange={(e) => setInputExtn(e.target.value)}
              value={inputExtn}
              type="text"
              className={st(classes.inputEditTask, {
                typeColumn: columns[columnId].title,
              })}
              disabled={disableExtn}
            />
          ) : columns[columnId].title === "status" ? (
            <select
              value={inputStatus}
              className={st(classes.selectEditTask, {
                typeColumn: columns[columnId].title,
              })}
              onChange={(e) => setInputStatus(e.target.value)}
              disabled={disableStatus}
            >
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          ) : (
            ""
          )}
        </div>
      ))} */}
    </div>
  );
};

export default EditDataTask;
