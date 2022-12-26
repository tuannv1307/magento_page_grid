import EditDataTask from "../EditDataTask";
import {
  Magento_Page,
  Tasks,
  checkIsEdit,
  checkboxOnlyTask,
  checkboxTask,
} from "../../store/magentoPageGridReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
import { st, classes } from "./ItemTaskColumn.st.css";

type ItemTaskColumnProps = {
  task: Tasks;
  typeColumn: string;
};

const ItemTaskColumn = ({ task, typeColumn }: ItemTaskColumnProps) => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  let tasks = data.data.tasks;
  const lenghtIsEdit = _.size(_.filter(tasks, (task) => task.isEdit === true));

  const dispatch = useDispatch();

  const handleClickEdit = (id: number, isEdit: boolean) => {
    if (id) {
      if (lenghtIsEdit > 0) {
        dispatch(checkIsEdit({ id, isEdit: false }));
      } else {
        dispatch(checkIsEdit({ id, isEdit: true }));
        dispatch(checkboxTask({ id, isSelected: !isEdit }));
        dispatch(checkboxOnlyTask({ id }));
      }
    }
  };

  return (
    <div className={st(classes.root)}>
      {task?.isEdit ? (
        <div>
          <EditDataTask typeColumn={typeColumn} task={task} key={task.id} />
        </div>
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
