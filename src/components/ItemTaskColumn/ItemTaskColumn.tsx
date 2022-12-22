import { useState } from "react";
import { st, classes } from "./ItemTaskColumn.st.css";
import EditDataTask from "../EditDataTask";
import {
  Magento_Page,
  checkIsEdit,
  checkIsEditTask,
  checkboxTask,
  editTask,
} from "../../store/magentoPageGridReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
type ItemTaskColumnProps = { task: any; typeColumn: string; column: any };

const ItemTaskColumn = ({ task, typeColumn, column }: ItemTaskColumnProps) => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const [isShow, setIsShow] = useState(false);
  let tasks = data.data.tasks;
  const lengtaskIsEdit = _.size(
    _.filter(tasks, (task) => task.isEdit === true)
  );

  let isEditTask = data.isEditTask;
  const dispatch = useDispatch();
  const handleClickEdit = (id: number, isEdit: boolean) => {
    setIsShow(!isShow);
    if (id) {
      if (lengtaskIsEdit > 0) {
        dispatch(checkIsEdit({ id, isEdit: false }));
      } else {
        dispatch(checkIsEdit({ id, isEdit: true }));
        dispatch(checkboxTask({ id, isSelected: !isEdit }));
      }
    }
  };

  const handleEdittask = (id: number, inputEdit: {}) => [
    dispatch(editTask({ id, inputEdit })),
  ];

  const handleCheckIsEdit = (id: number) => {
    // dispatch(checkIsEditTask(true));
    dispatch(checkIsEdit({ id, isEdit: true }));
  };

  return (
    <div className={st(classes.root)}>
      {task.isEdit ? (
        <div>
          <EditDataTask
            typeColumn={typeColumn}
            task={task}
            key={task.id}
            column={column}
            handleEdittask={handleEdittask}
          />
          <div>
            <button
              onClick={() =>
                dispatch(checkIsEdit({ id: task.id, isEdit: false }))
              }
            >
              Cancel
            </button>
            <button
              onClick={() =>
                dispatch(checkIsEdit({ id: task.id, isEdit: false }))
              }
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div
          className={st(classes.taskItem)}
          onClick={() => handleClickEdit(task.id, task.isEdit)}
        >
          <>{typeColumn === "id" && task.id}</>
          <>{typeColumn === "name" && task.name}</>
          <>{typeColumn === "position" && task.position}</>
          <>{typeColumn === "office" && task.office}</>
          <>{typeColumn === "salary" && task.salary}</>
          <>
            {typeColumn === "start date" &&
              moment(task.start_date).format("yyyy/MM/DD")}
          </>
          <>{typeColumn === "extn" && task.extn}</>
          <>{typeColumn === "status" && task.status}</>
        </div>
      )}
    </div>
  );
};

export default ItemTaskColumn;
