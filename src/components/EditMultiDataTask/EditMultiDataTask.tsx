import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import _ from "lodash";
import {
  Magento_Page,
  inputEditMultiTask,
} from "../../store/magentoPageGridReducer";
import "./DatePicker.scss";
import { st, classes } from "./EditMultiDataTask.st.css";

export type EditMultiDataTaskProps = {
  typeColumn: string;
};

const EditMultiDataTask = ({ typeColumn }: EditMultiDataTaskProps) => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const [inputName, setInputName] = useState("");
  const [inputPosition, setInputPosition] = useState("");
  const [inputOffice, setInputOffice] = useState("");
  const [inputSalary, setInputSalary] = useState("");
  const [inputStartDate, setInputStartDate] = useState<any>("");
  const [inputExtn, setInputExtn] = useState("");
  const [inputStatus, setInputStatus] = useState("");
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

  const handleBlurInput = () => {
    dispatch(
      inputEditMultiTask({
        nameEditMul: inputName !== "" ? inputName : nameEditMul,
        positionEditMul: inputPosition !== "" ? inputPosition : positionEditMul,
        salaryEditMul: inputSalary !== "" ? inputSalary : salaryEditMul,
        start_dateEditMul:
          inputStartDate !== ""
            ? moment(inputStartDate).format("YYYY/MM/DD")
            : start_dateEditMul,
        officeEditMul: inputOffice !== "" ? inputOffice : officeEditMul,
        extnEditMul: inputExtn !== "" ? inputExtn : extnEditMul,
        statusEditMul: inputStatus !== "" ? inputStatus : statusEditMul,
      })
    );
  };

  useEffect(() => {
    handleBlurInput();
  }, [inputOffice, inputStatus, inputStartDate]);

  useEffect(() => {
    if (
      nameAllColumn === nameEditMul ||
      positionAllColumn === positionEditMul ||
      salaryAllColumn === salaryEditMul ||
      officeAllColumn === officeEditMul ||
      extnAllColumn === extnEditMul ||
      start_dateAllColumn === start_dateEditMul ||
      statusAllColumn === statusEditMul
    ) {
      setInputName("");
      setInputPosition("");
      setInputExtn("");
      setInputSalary("");
      setInputOffice("");
      setInputStartDate("");
      setInputStatus("");
    }
  }, [
    nameAllColumn,
    positionAllColumn,
    salaryAllColumn,
    officeAllColumn,
    extnAllColumn,
    start_dateAllColumn,
    statusAllColumn,
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
              onBlur={handleBlurInput}
              data-hook="input-name"
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
              onBlur={handleBlurInput}
              data-hook="input-position"
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
              onBlur={handleBlurInput}
            >
              <option value=""></option>
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
              onBlur={handleBlurInput}
            />
          </>
        )}

        {typeColumn === "start_date" && (
          <>
            <label>All in column</label>
            <DatePicker
              selected={inputStartDate}
              onChange={(date: Date) => setInputStartDate(date)}
              name={typeColumn}
              showPopperArrow={false}
              dateFormat="yyyy/MM/dd"
              className={st(classes.inputEditTask)}
              onBlur={handleBlurInput}
            />
          </>
        )}

        {typeColumn === "extn" && (
          <>
            <label>All in column</label>
            <input
              type="text"
              className={st(classes.inputEditTask)}
              value={inputExtn}
              onChange={(e) => setInputExtn(e.target.value)}
              onBlur={handleBlurInput}
            />
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
              onBlur={handleBlurInput}
              data-hook="input-status"
            >
              <option value=""></option>
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
