import React, { useEffect, useState } from "react";
import { st, classes } from "./EditDataTask.st.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Magento_Page,
  checkIsEdit,
  editTask,
  inputEditTask,
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
  const [inputEdit, setInputEdit] = useState({
    name: task.name,
    position: task.position,
    office: task.office,
    salary: task.salary,
    start_date: moment(task.start_date).toDate(),
    extn: task.extn,
    status: task.status,
  });

  let { name, position, office, salary, start_date, extn, status } = inputEdit;

  const dispatch = useDispatch();

  const handleOnChangeInputEdit = (e: any) => {
    setInputEdit({ ...inputEdit, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(
      inputEditTask({
        nameEdit: name,
        positionEdit: position,
        salaryEdit: salary,
        start_dateEdit: start_date,
        officeEdit: office,
        extnEdit: extn,
        statusEdit: status,
      })
    );
  }, [inputEdit]);
  console.log(data);
  return (
    <div className={st(classes.root, { typeColumn })}>
      <span>{typeColumn === "id" && task.id}</span>
      <>
        {typeColumn === "name" ? (
          <input
            onChange={handleOnChangeInputEdit}
            name={typeColumn}
            value={name}
            type="text"
            className={st(classes.inputEditTask)}
          />
        ) : typeColumn === "position" ? (
          <input
            onChange={handleOnChangeInputEdit}
            name={typeColumn}
            value={position}
            type="text"
            className={st(classes.inputEditTask)}
          />
        ) : typeColumn === "office" ? (
          <select
            name={typeColumn}
            value={office}
            className={st(classes.selectEditTask)}
            onChange={handleOnChangeInputEdit}
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
            onChange={handleOnChangeInputEdit}
            name={typeColumn}
            value={salary}
            type="text"
            className={st(classes.inputEditTask)}
          />
        ) : typeColumn === "start date" ? (
          <DatePicker
            selected={start_date}
            onChange={(date: Date) =>
              setInputEdit({ ...inputEdit, start_date: date })
            }
            // onKeyDown={handleKeyDow}
            name={typeColumn}
            showPopperArrow={false}
            dateFormat="yyyy/MM/dd"
            className={st(classes.inputEditTask)}
          />
        ) : typeColumn === "extn" ? (
          <input
            onChange={handleOnChangeInputEdit}
            name={typeColumn}
            value={extn}
            type="text"
            className={st(classes.inputEditTask)}
          />
        ) : typeColumn === "status" ? (
          <select
            name={typeColumn}
            value={status}
            className={st(classes.selectEditTask)}
            onChange={handleOnChangeInputEdit}
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
