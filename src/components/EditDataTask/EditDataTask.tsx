import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Magento_Page,
  Tasks,
  inputEditTask,
  setInputEditDataTask,
} from "../../store/magentoPageGridReducer";
import _ from "lodash";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./DatePicker.scss";
import { st, classes } from "./EditDataTask.st.css";

export type EditDataTaskProps = {
  typeColumn: string;
  task: Tasks;
};

const EditDataTask = ({ typeColumn, task }: EditDataTaskProps) => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  let tasks = data.data.tasks;

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

  const nameEdit = data.nameEdit;

  const positionEdit = data.positionEdit;

  const salaryEdit = data.salaryEdit;

  const start_dateEdit = data.start_dateEdit;

  const officeEdit = data.officeEdit;

  const extnEdit = data.extnEdit;

  const statusEdit = data.statusEdit;

  const nameEditMul = data.nameEditMul;

  const positionEditMul = data.positionEditMul;

  const salaryEditMul = data.salaryEditMul;

  const start_dateEditMul = data.start_dateEditMul;

  const officeEditMul = data.officeEditMul;

  const extnEditMul = data.extnEditMul;

  const statusEditMul = data.statusEditMul;

  const lenghtIsEdit = _.size(_.filter(tasks, (task) => task.isEdit === true));

  useEffect(() => {
    const inputEdit = {
      id: task.id,
      nameEdit: inputName !== task.name ? inputName : nameEdit,
      positionEdit:
        inputPosition !== task.position ? inputPosition : positionEdit,
      salaryEdit: inputSalary !== task.salary ? inputSalary : salaryEdit,
      start_dateEdit:
        moment(inputStartDate).format("YYYY/MM/DD") !== task.start_date
          ? moment(inputStartDate).format("YYYY/MM/DD")
          : start_dateEdit,
      officeEdit: inputOffice !== task.office ? inputOffice : officeEdit,
      extnEdit: inputExtn !== task.extn ? inputExtn : extnEdit,
      statusEdit: inputStatus !== task.status ? inputStatus : statusEdit,
    };

    //dispatch(inputEditTask({ ...inputEdit }));
    const arrInputEdit = [];

    if (task.isEdit === true) {
      arrInputEdit.push(inputEdit);
    }

    dispatch(setInputEditDataTask({ arrInputEdit }));
  }, [
    task.isEdit,
    inputName,
    inputPosition,
    inputOffice,
    inputExtn,
    inputStartDate,
    inputStatus,
    inputSalary,
  ]);

  console.log(data);

  useEffect(() => {
    if (lenghtIsEdit > 1) {
      if (nameEditMul !== "") {
        setDisableName(true);
      } else setDisableName(false);
      if (positionEditMul !== "") {
        setDisablePosition(true);
      } else setDisablePosition(false);
      if (officeEditMul !== "") {
        setDisableOffice(true);
      } else setDisableOffice(false);
      if (salaryEditMul !== "") {
        setDisableSalary(true);
      } else setDisableSalary(false);
      if (start_dateEditMul !== "") {
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

  useEffect(() => {
    if (lenghtIsEdit > 1) {
      if (nameEdit !== "") setInputName(nameEdit);
      if (positionEdit !== "") setInputPosition(positionEdit);
      if (officeEdit !== "") setInputOffice(officeEdit);
      if (salaryEdit !== "") setInputSalary(salaryEdit);
      if (start_dateEdit !== "")
        setInputStartDate(moment(start_dateEdit).toDate());
      if (extnEdit !== "") setInputExtn(extnEdit);
      if (statusEdit !== "") setInputStatus(statusEdit);
    }
  }, [
    nameEdit,
    positionEdit,
    officeEdit,
    salaryEdit,
    start_dateEdit,
    extnEdit,
    statusEdit,
  ]);

  return (
    <div className={st(classes.root, { typeColumn })}>
      <span>{typeColumn === "id" && task.id}</span>
      <>
        {typeColumn === "name" ? (
          <input
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
            type="text"
            className={st(classes.inputEditTask)}
            disabled={disableName}
          />
        ) : typeColumn === "position" ? (
          <input
            onChange={(e) => setInputPosition(e.target.value)}
            value={inputPosition}
            type="text"
            className={st(classes.inputEditTask)}
            disabled={disablePosition}
          />
        ) : typeColumn === "office" ? (
          <select
            value={inputOffice}
            className={st(classes.selectEditTask)}
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
        ) : typeColumn === "salary" ? (
          <input
            onChange={(e) => setInputSalary(e.target.value)}
            value={inputSalary}
            type="text"
            className={st(classes.inputEditTask)}
            disabled={disableSalary}
          />
        ) : typeColumn === "start_date" ? (
          <DatePicker
            selected={inputStartDate}
            onChange={(date: Date) => setInputStartDate(date)}
            showPopperArrow={false}
            dateFormat="yyyy/MM/dd"
            className={st(classes.inputEditTask)}
            disabled={disableStart_date}
          />
        ) : typeColumn === "extn" ? (
          <input
            onChange={(e) => setInputExtn(e.target.value)}
            value={inputExtn}
            type="text"
            className={st(classes.inputEditTask)}
            disabled={disableExtn}
          />
        ) : typeColumn === "status" ? (
          <select
            value={inputStatus}
            className={st(classes.selectEditTask)}
            onChange={(e) => setInputStatus(e.target.value)}
            disabled={disableStatus}
          >
            <option value="enable">Enable</option>
            <option value="disable">Disable</option>
          </select>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default EditDataTask;
