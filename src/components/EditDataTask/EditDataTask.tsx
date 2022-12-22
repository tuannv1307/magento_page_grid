import React, { useState } from "react";
import { st, classes } from "./EditDataTask.st.css";
import { useDispatch } from "react-redux";
import { checkIsEdit, editTask } from "../../store/magentoPageGridReducer";
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

  const dispatch = useDispatch();
  let { name, position, office, salary, start_date, extn, status } = inputEdit;

  const handleOnChangeInputEdit = (e: any) => {
    setInputEdit({ ...inputEdit, [e.target.name]: e.target.value });
  };

  const handleEdit = (id: number) => {
    if (id) {
      let inputEdit = {
        name,
        position,
        office,
        salary,
        start_date: _.toString(start_date),
        extn,
        status,
      };
      console.log(
        "🚀 ~ file: EditDataTask.tsx:56 ~ handleEdit ~ inputEdit",
        inputEdit
      );
      dispatch(checkIsEdit({ id, isEdit: true }));
      handleEdittask(id, inputEdit);
    }
  };
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
          <input
            onChange={handleOnChangeInputEdit}
            name={typeColumn}
            value={office}
            type="text"
            className={st(classes.inputEditTask)}
          />
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
