import EditDataTask from "../EditDataTask";
import {
  Magento_Page,
  Tasks,
  checkIsEdit,
  checkboxOnlyTask,
  checkboxTask,
  setArrayEditDataTask,
  editTask,
} from "../../store/magentoPageGridReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
import { st, classes } from "./ItemTaskColumn.st.css";
import {
  columnDataLenght,
  getPaginatedData,
} from "../ColumnPageType/ColumnPageType";
import { useState } from "react";

type ItemTaskColumnProps = {
  task: Tasks;
  typeColumn: string;
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

  const handleChangeValues = (id: number, value: any) => {
    const arrInputEdit: Tasks[] = [];
    _.each(tasks, (taskEdit) => {
      if (taskEdit.id === id) {
        arrInputEdit.push({
          ...task,
          ...value,
        });
      } else arrInputEdit.push(taskEdit);
    });
    console.log(arrInputEdit);
    //dispatch(setArrayEditDataTask({ arrInputEdit }));
  };
  const [isEditTask, setIsEditTask] = useState(false);
  const handledbClick = () => {};

  const handleClickEdit = (id: number, isEdit: boolean) => {
    if (id) {
      if (lenghtIsEdit > 0) {
        dispatch(checkIsEdit({ id, isEdit: false }));
      } else {
        dispatch(checkIsEdit({ id, isEdit: true }));
        dispatch(checkboxTask({ id, isSelected: !isEdit }));
        dispatch(checkboxOnlyTask({ id }));
        setIsEditTask(true);
      }
    }
  };
  const handleCloseTask = () => {
    setIsEditTask(false);
  };
  let arrayEditDataTask = data.arrayEditDataTask;
  const handleSaveTask = () => {
    dispatch(editTask({ arrayEditDataTask }));
    setIsEditTask(false);
  };
  return (
    <div className={st(classes.root)}>
      {isEditTask ? (
        lenghtIsEdit > 0 && (
          <div className={st(classes.editTask)}>
            {_.map(
              _.filter(tasks, (task) => task.isEdit === true),
              (task) => (
                <EditDataTask
                  typeColumn={typeColumn}
                  task={task}
                  key={task.id}
                  handleChangeValues={handleChangeValues}
                />
              )
            )}

            <div className={st(classes.actionClose)}>
              <button
                onClick={() => handleCloseTask()}
                className={st(classes.cancel)}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveTask()}
                className={st(classes.save)}
              >
                Save
              </button>
            </div>
          </div>
        )
      ) : (
        <div
          className={st(classes.taskItem)}
          onDoubleClick={() => handleClickEdit(task.id, task.isEdit)}
        >
          <>{typeColumn === "id" && task.id}</>
          <>{typeColumn === "name" && task.name}</>
          <>{typeColumn === "position" && task.position}</>
          <>{typeColumn === "office" && task.office}</>
          <>{typeColumn === "salary" && task.salary}</>
          <>
            {typeColumn === "start_date" &&
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
