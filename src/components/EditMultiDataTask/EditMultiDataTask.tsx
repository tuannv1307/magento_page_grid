import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type {
  Magento_Page,
  checkIsEdit,
  editTask,
  inputEditTask,
} from "../../store/magentoPageGridReducer";
import DatePicker from "react-datepicker";
import moment from "moment";
import _ from "lodash";
import "./DatePicker.scss";
import { st, classes } from "./EditMultiDataTask.st.css";
export type EditMultiDataTaskProps = {
  typeColumn: string;
  // task: any;
  // column: any;
  // handleEdittask: any;
};

const EditMultiDataTask = ({ typeColumn }: EditMultiDataTaskProps) => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  let tasks = data.data.tasks;
  const [isShow, setIsShow] = useState(false);

  const [inputName, setInputName] = useState("");
  const [inputPosition, setInputPosition] = useState("");
  const [inputOffice, setInputOffice] = useState("");
  const [inputSalary, setInputSalary] = useState("");
  const [inputStartDate, setInputStartDate] = useState<any>("");
  const [inputExtn, setInputExtn] = useState("");
  const [inputStatus, setInputStatus] = useState("");

  const dispatch = useDispatch();

  const nameEdit = data.nameEdit;

  const positionEdit = data.positionEdit;

  const salaryEdit = data.salaryEdit;

  const start_dateEdit = data.start_dateEdit;

  const officeEdit = data.officeEdit;

  const extnEdit = data.extnEdit;

  const statusEdit = data.statusEdit;

  useEffect(() => {}, [
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
      <>{typeColumn === "id" && <div> </div>}</>
      <div className={st(classes.contentEdit)}>
        {typeColumn === "name" && (
          <>
            <label>All in column</label>
            <input
              type="text"
              className={st(classes.inputEditTask)}
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </>
        )}

        {typeColumn === "position" && (
          <>
            <label>All in column</label>
            <input
              type="text"
              className={st(classes.inputEditTask)}
              value={inputPosition}
              onChange={(e) => setInputPosition(e.target.value)}
            />
          </>
        )}

        {typeColumn === "office" && (
          <>
            <label>All in column</label>
            <select
              name={typeColumn}
              value={inputOffice}
              className={st(classes.selectEditTask)}
              onChange={(e) => setInputOffice(e.target.value)}
            >
              <option></option>
              <option value="Tokyo">Tokyo</option>
              <option value="Sydney">Sydney</option>
              <option value="London">London</option>
              <option value="Singapore">Singapore</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Edinburgh">Edinburgh</option>
              <option value="New York">New York</option>
            </select>
          </>
        )}

        {typeColumn === "salary" && (
          <>
            <label>All in column</label>
            <input
              type="text"
              className={st(classes.inputEditTask)}
              value={inputSalary}
              onChange={(e) => setInputSalary(e.target.value)}
            />
          </>
        )}

        {typeColumn === "start_date" && (
          <>
            <label>All in column</label>
            <DatePicker
              selected={inputStartDate}
              onChange={(date: Date) => setInputStartDate(date)}
              // onKeyDown={handleKeyDow}
              name={typeColumn}
              showPopperArrow={false}
              dateFormat="yyyy/MM/dd"
              className={st(classes.inputEditTask)}
            />
          </>
        )}

        {typeColumn === "extn" && (
          <>
            <label>All in column</label>
            <input type="text" className={st(classes.inputEditTask)} />
          </>
        )}

        {typeColumn === "status" && (
          <>
            <label>All in column</label>
            <select
              name={typeColumn}
              value={inputStatus}
              className={st(classes.selectEditTask)}
              onChange={(e) => setInputStatus(e.target.value)}
            >
              <option></option>
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          </>
        )}
      </div>
    </div>
  );
};

export default EditMultiDataTask;
