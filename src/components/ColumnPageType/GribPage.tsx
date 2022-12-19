import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { st, classes } from "./ColumnPageType.st.css";
import { initialData } from "../../constants";
import _ from "lodash";
import { useSelector } from "react-redux";
export type ColumnPageTypeProps = {
  column: {
    id: string;
    title: string;
    tasks: {
      id: string;
      name: string;
      position: string;
      salary: string;
      start_date: string;
      office: string;
      extn: string;
      status: string;
      selected: boolean;
    }[];
  };
  index?: any;
  typeColumn: string;
};
const ColumnPageType = ({ column, index, typeColumn }: ColumnPageTypeProps) => {
  let data = useSelector((state: any) => state.magentopage);
  let tasks = data?.data?.tasks;
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={st(classes.root)}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <p className={st(classes.titleColumn)} {...provided.dragHandleProps}>
            {column.title}
          </p>
          {_.map(tasks, (task, index) => (
            <div className={st(classes.itemColumn)} key={index}>
              <>{typeColumn === "id" && task.id}</>
              <>{typeColumn === "name" && task.name}</>
              <>{typeColumn === "position" && task.position}</>
              <>{typeColumn === "office" && task.office}</>
              <>{typeColumn === "salary" && task.salary}</>
              <>{typeColumn === "start date" && task.start_date}</>
              <>{typeColumn === "extn" && task.extn}</>
              <>{typeColumn === "status" && task.status}</>
              {/* <>{typeColumn === "position" && task.position}</> */}
            </div>
          ))}
        </div>
      )}
    </Draggable>
  );
};

export default ColumnPageType;
