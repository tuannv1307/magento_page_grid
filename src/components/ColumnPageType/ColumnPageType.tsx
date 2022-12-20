import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { st, classes } from "./ColumnPageType.st.css";
import { initialData } from "../../constants";
import _ from "lodash";
import { useSelector } from "react-redux";
import type { Magento_Page } from "../../store/magentoPageGridReducer";
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

export const columnDataLenght = (
  arr?: {
    id: string;
    name: string;
    position: string;
    salary: string;
    start_date: string;
    office: string;
    extn: string;
    status: string;
    selected: boolean;
  }[],
  sizeData?: number
) => {
  return _.slice(arr, 0, sizeData);
};

export const getPaginatedData = (
  arr: any,
  currentPage: number,
  sizeData: number
) => {
  const startIndex = currentPage * sizeData - sizeData;
  const endIndex = startIndex + sizeData;
  return _.slice(arr, startIndex, endIndex);
};

export const searchFilters = (arr: any[], searchData: string) => {
  return _.filter(arr, (task) => {
    return (
      (task.name &&
        task.name.toString().toLowerCase().indexOf(searchData.toLowerCase()) >
          -1) ||
      (task.position &&
        task.position
          .toString()
          .toLowerCase()
          .indexOf(searchData.toLowerCase()) > -1) ||
      (task.office &&
        task.office.toString().toLowerCase().indexOf(searchData.toLowerCase()) >
          -1) ||
      (task.salary &&
        task.salary.toString().toLowerCase().indexOf(searchData.toLowerCase()) >
          -1) ||
      (task.extn &&
        task.extn.toString().toLowerCase().indexOf(searchData.toLowerCase()) >
          -1) ||
      (task.start_date &&
        task.start_date
          .toString()
          .toLowerCase()
          .indexOf(searchData.toLowerCase()) > -1)
    );
  });
};

const ColumnPageType = ({ column, index, typeColumn }: ColumnPageTypeProps) => {
  let data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  let tasks: any = data.data.tasks;
  let sizeData = data.valueChange;
  let typeArr = data.typeArr;
  let currentPage = data.currentPage;
  let searchData = data.searchData;
  tasks = searchFilters(tasks, searchData);

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
          {tasks.length > 0 ? (
            _.map(
              typeArr === "DATA_SET_LENGTH"
                ? columnDataLenght(tasks, sizeData)
                : getPaginatedData(tasks, currentPage, sizeData),
              (task: any, index) => (
                <div className={st(classes.itemColumn)} key={index}>
                  <>{typeColumn === "id" && task.id}</>
                  <>{typeColumn === "name" && task.name}</>
                  <>{typeColumn === "position" && task.position}</>
                  <>{typeColumn === "office" && task.office}</>
                  <>{typeColumn === "salary" && task.salary}</>
                  <>{typeColumn === "start date" && task.start_date}</>
                  <>{typeColumn === "extn" && task.extn}</>
                  <>{typeColumn === "status" && task.status}</>
                </div>
              )
            )
          ) : (
            <div>We couldn't find any records.</div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ColumnPageType;
