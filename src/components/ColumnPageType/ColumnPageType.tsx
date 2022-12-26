import { Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  Magento_Page,
  Tasks,
  changeIsSort,
  changeName,
  sortAsc,
  sortDesc,
} from "../../store/magentoPageGridReducer";
import ItemTaskColumn from "../ItemTaskColumn";
import EditMultiDataTask from "../EditMultiDataTask";
import { st, classes } from "./ColumnPageType.st.css";
import { useState } from "react";

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
    disPlay: boolean;
  };
  index: string;
  typeColumn: string;
};

export const columnDataLenght = (arr: Tasks[], sizeData?: number) => {
  return _.slice(arr, 0, sizeData);
};

export const getPaginatedData = (
  arr: Tasks[],
  currentPage: number,
  sizeData: number
) => {
  const startIndex = currentPage * sizeData - sizeData;
  const endIndex = startIndex + sizeData;
  return _.slice(arr, startIndex, endIndex);
};

export const searchFilters = (arr: Tasks[], searchData: string) => {
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
          .indexOf(searchData.toLowerCase()) > -1) ||
      (task.status &&
        task.status.toString().toLowerCase().indexOf(searchData.toLowerCase()) >
          -1)
    );
  });
};

export const fiterDataByKeyword = (arr: Tasks[], objFilters: any) => {
  let keywordName: string,
    keywordOffice: string,
    keywordStartDate: string,
    keywordNameStatus: string;
  let keyIdFrom;
  let keyIdTo;

  _.map(objFilters, (obj) => {
    if (obj.keyWord === "idFrom") {
      keyIdFrom = obj.value;
    }
    if (obj.keyWord === "idTo") {
      keyIdTo = obj.value;
    }
    if (obj.keyWord === "name") {
      keywordName = obj.value;
    }
    if (obj.keyWord === "office") {
      keywordOffice = obj.value;
    }
    if (obj.keyWord === "start_date") {
      keywordStartDate = obj.value;
    }

    if (obj.keyWord === "status") {
      keywordNameStatus = obj.value;
    }
  });

  if (keyIdFrom && !keyIdTo) {
    arr = arr;
  }

  if (!keyIdFrom && keyIdTo && keyIdTo <= _.size(arr)) {
    arr = _.slice(arr, 0, _.toNumber(keyIdTo));
  }

  if (keyIdFrom && keyIdTo && keyIdTo <= _.size(arr)) {
    arr = _.slice(arr, _.toNumber(keyIdFrom - 1), _.toNumber(keyIdTo));
  }

  return _.filter(arr, (task) => {
    return (
      task.name.toString().toLowerCase().indexOf(keywordName.toLowerCase()) >
        -1 &&
      task.office
        .toString()
        .toLowerCase()
        .indexOf(keywordOffice.toLowerCase()) > -1 &&
      task.start_date
        .toString()
        .toLowerCase()
        .indexOf(keywordStartDate.toLowerCase()) > -1 &&
      task.status
        .toString()
        .toLowerCase()
        .indexOf(keywordNameStatus.toLowerCase()) > -1
    );
  });
};

const ColumnPageType = ({ column, index, typeColumn }: ColumnPageTypeProps) => {
  let data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  const dispatch = useDispatch();
  let tasks: any = data.data.tasks;
  const sizeData = data.valueChange;
  const typeArr = data.typeArr;
  const currentPage = data.currentPage;
  const searchData = data.searchData;
  const isSorted = data.isSort;
  const sortName = data.sortName;
  const objFilters: any = data.objFilters;

  if (_.some(objFilters, (obj) => obj.value !== "")) {
    tasks = fiterDataByKeyword(tasks, objFilters);
  }
  if (searchData !== "") {
    tasks = searchFilters(tasks, searchData);
  }

  tasks =
    typeArr === "DATA_SET_LENGTH"
      ? columnDataLenght(tasks, sizeData)
      : getPaginatedData(tasks, currentPage, sizeData);

  const handleClickIsSort = (type: string) => {
    let isSort;
    if (sortName === type) {
      isSort = !isSorted;
    } else {
      isSort = false;
    }
    let nameSort = type;

    dispatch(changeName({ nameSort }));
    dispatch(changeIsSort({ isSort }));
    if (isSort === false) {
      dispatch(sortAsc({ nameSort }));
    } else if (isSort === true) {
      dispatch(sortDesc({ nameSort }));
    }
  };

  const lenghtIsEdit = _.size(_.filter(tasks, (task) => task.isEdit === true));

  return (
    <Draggable draggableId={column.id} index={_.toNumber(index)}>
      {(provided, snapshot) => (
        <div
          className={st(classes.root, {
            typeColumn,
            sortName: sortName === column.title,
          })}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <span
            className={st(classes.titleColumn, { isSorted })}
            {...provided.dragHandleProps}
            onClick={() => handleClickIsSort(typeColumn)}
          >
            {column.title}
            <span>
              {sortName === column.title && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                  />
                </svg>
              )}
            </span>
            <svg
              xmlns="http:www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          </span>

          {lenghtIsEdit > 1 && <EditMultiDataTask typeColumn={typeColumn} />}
          <div className={st(classes.content)}>
            {tasks.length > 0 &&
              _.map(
                tasks,
                (task: Tasks) => (
                  // task.selected ? (
                  // <>

                  <ItemTaskColumn
                    task={task}
                    typeColumn={typeColumn}
                    key={task.id}
                  />

                  // </>
                  // ) : (
                )
                //)
              )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ColumnPageType;
