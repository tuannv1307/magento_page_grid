import React, { useEffect, useState } from "react";
import { st, classes } from "./EditDataTask.st.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Magento_Page,
  checkIsEdit,
  editTask,
  inputEditTask,
  // inputEditTask,
} from "../../store/magentoPageGridReducer";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./DatePicker.scss";
import _ from "lodash";

export type EditDataTaskProps = {
  typeColumn: string;
  task: any;
  column: any;
  handleEdittask: any;
};

const EditDataTask = ({
  typeColumn,
  task,
  column,
  handleEdittask,
}: EditDataTaskProps) => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const [isShow, setIsShow] = useState(false);

  const [inputName, setInputName] = useState(task.name);
  const [inputPosition, setInputPosition] = useState(task.position);
  const [inputOffice, setInputOffice] = useState(task.office);
  const [inputSalary, setInputSalary] = useState(task.salary);

  const [inputStartDate, setInputStartDate] = useState(
    moment(task.start_date).toDate()
  );

  const [inputExtn, setInputExtn] = useState(task.extn);

  const [inputStatus, setInputStatus] = useState(task.status);

  const dispatch = useDispatch();

  let nameEdit = data.nameEdit;

  let positionEdit = data.positionEdit;

  let salaryEdit = data.salaryEdit;

  let start_dateEdit = data.start_dateEdit;

  let officeEdit = data.officeEdit;

  let extnEdit = data.extnEdit;

  let statusEdit = data.statusEdit;

  // nameEdit = task.name;
  // positionEdit = task.position;
  // salaryEdit = task.salary;
  // start_dateEdit = task.start_date;
  // officeEdit = task.office;
  // extnEdit = task.extn;
  // statusEdit = task.status;

  useEffect(() => {
    dispatch(
      inputEditTask({
        nameEdit:
          inputName !== task.name
            ? //&& nameEdit !== inputName
              // &&
              // nameEdit !== task.name
              inputName
            : nameEdit,
        positionEdit:
          inputPosition !== task.position
            ? //&& positionEdit !== inputPosition
              inputPosition
            : positionEdit,
        salaryEdit: inputSalary !== task.salary ? inputSalary : salaryEdit,
        start_dateEdit:
          moment(inputStartDate).format("YYYY/MM/DD") !== task.start_date
            ? moment(inputStartDate).format("YYYY/MM/DD")
            : start_dateEdit,
        officeEdit: inputOffice !== task.office ? inputOffice : officeEdit,
        extnEdit: inputExtn !== task.extn ? inputExtn : extnEdit,
        statusEdit: inputStatus !== task.status ? inputStatus : statusEdit,
      })
    );
  }, [
    inputName,
    inputPosition,
    inputOffice,
    inputExtn,
    inputStartDate,
    inputStatus,
    inputSalary,
  ]);

  return (
    <div className={st(classes.root, { typeColumn })}>
      <span>{typeColumn === "id" && task.id}</span>
      <>
        {typeColumn === "name" ? (
          <input
            onChange={(e) => setInputName(e.target.value)}
            name={typeColumn}
            value={inputName}
            type="text"
            className={st(classes.inputEditTask)}
          />
        ) : typeColumn === "position" ? (
          <input
            onChange={(e) => setInputPosition(e.target.value)}
            name={typeColumn}
            value={inputPosition}
            type="text"
            className={st(classes.inputEditTask)}
          />
        ) : typeColumn === "office" ? (
          <select
            name={typeColumn}
            value={inputOffice}
            className={st(classes.selectEditTask)}
            onChange={(e) => setInputOffice(e.target.value)}
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
            name={typeColumn}
            value={inputSalary}
            type="text"
            className={st(classes.inputEditTask)}
          />
        ) : typeColumn === "start date" ? (
          <DatePicker
            selected={inputStartDate}
            onChange={(date: Date) => setInputStartDate(date)}
            // onKeyDown={handleKeyDow}
            name={typeColumn}
            showPopperArrow={false}
            dateFormat="yyyy/MM/dd"
            className={st(classes.inputEditTask)}
          />
        ) : typeColumn === "extn" ? (
          <input
            onChange={(e) => setInputExtn(e.target.value)}
            name={typeColumn}
            value={inputExtn}
            type="text"
            className={st(classes.inputEditTask)}
          />
        ) : typeColumn === "status" ? (
          <select
            name={typeColumn}
            value={inputStatus}
            className={st(classes.selectEditTask)}
            onChange={(e) => setInputStatus(e.target.value)}
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
