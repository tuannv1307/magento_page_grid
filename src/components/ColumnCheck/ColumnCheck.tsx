import { useEffect, useState } from "react";
import { initialData } from "../../constants";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  checkboxTask,
  checkboxTaskAll,
  checkboxTaskAllBypage,
  DeleteTask,
  Magento_Page,
  setIsAction,
} from "../../store/magentoPageGridReducer";
import { st, classes } from "./ColumnCheck.st.css";
import {
  columnDataLenght,
  getPaginatedData,
  searchFilters,
} from "../ColumnPageType/ColumnPageType";
import OutsideClickHandler from "react-outside-click-handler";

const ColumnCheck = () => {
  let data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  let tasks: any = data.data.tasks;
  let sizeData = data.valueChange;
  let typeArr = data.typeArr;
  let currentPage = data.currentPage;
  let searchData = data.searchData;
  let isCheckedAllByPage = data.isCheckedAllByPage;
  tasks = searchFilters(tasks, searchData);

  const lengthTask = _.size(_.filter(tasks, (task) => task.selected === true));
  let taskByLength;
  let taskbyPaginate;

  const handleShow = () => {
    setIsShow(!isShow);
  };
  const handleCheckbox = (id: number) => {
    if (id) {
      dispatch(checkboxTask({ id }));
    }
  };

  const checkedAll = _.every(data.data.tasks, ["selected", true]);

  const checkedAllByPage = _.every(columnDataLenght(tasks, sizeData), [
    "selected",
    true,
  ]);

  const handleCheckboxAll = () => {
    if (checkedAll) {
      dispatch(checkboxTaskAll({ checkedAll: false }));
    } else {
      dispatch(checkboxTaskAll({ checkedAll: true }));
    }
  };

  tasks =
    typeArr === "DATA_SET_LENGTH"
      ? columnDataLenght(tasks, sizeData)
      : getPaginatedData(tasks, currentPage, sizeData);

  const handleCheckAllOnPage = () => {
    if (isCheckedAllByPage) {
      dispatch(
        checkboxTaskAllBypage({ isCheckedAllByPage: !isCheckedAllByPage })
      );
      tasks = _.map(tasks, (task) => ({
        ...task,
        selected: isCheckedAllByPage,
      }));
    } else {
      dispatch(
        checkboxTaskAllBypage({ isCheckedAllByPage: !isCheckedAllByPage })
      );
      tasks = _.map(tasks, (task) => ({
        ...task,
        selected: isCheckedAllByPage,
      }));
      //  console.log(tasks);
    }
  };
  useEffect(() => {
    handleCheckAllOnPage();
  }, []);
  console.log(
    "🚀 ~ file: ColumnCheck.tsx:66 ~ handleCheckAllByPage ~ checkedAllByPage",
    isCheckedAllByPage
  );
  const handleoutsideClick = () => {
    setIsShow(false);
  };

  console.log(tasks);
  //console.log(handleCheckAllByPage());
  return (
    <div className={st(classes.root)}>
      <OutsideClickHandler onOutsideClick={handleoutsideClick}>
        <p className={st(classes.titleColumn)}>
          {checkedAll && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="currentColor"
              className={st(classes.svgCheckAll, "bi bi-check-lg")}
              viewBox="0 0 16 16"
              onClick={handleCheckboxAll}
            >
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
            </svg>
          )}
          {lengthTask > 0 && checkedAll === false && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className={st(classes.svgDash, "bi bi-dash")}
              viewBox="0 0 16 16"
              onClick={handleCheckboxAll}
            >
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="18"
            fill="currentColor"
            className={st(classes.svgSuare, "bi bi-square-fill")}
            viewBox="0 0 16 16"
            onClick={handleCheckboxAll}
          >
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
          </svg>

          <button onClick={handleShow}>
            {isShow ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-caret-up-fill"
                viewBox="0 0 16 16"
              >
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            )}
          </button>
          {isShow && (
            <ul className={st(classes.actionMenu)}>
              {!checkedAll && (
                <li
                  onClick={() =>
                    dispatch(checkboxTaskAll({ checkedAll: true }))
                  }
                >
                  SelectAll
                </li>
              )}

              {lengthTask > 0 && (
                <li
                  onClick={() =>
                    dispatch(checkboxTaskAll({ checkedAll: false }))
                  }
                >
                  Deselect All
                </li>
              )}
              <li onClick={handleCheckAllOnPage}>Select All on This Page</li>
              <li>Deselect All on This Page</li>
            </ul>
          )}
        </p>
      </OutsideClickHandler>

      {tasks.length > 0 &&
        _.map(tasks, (task: any, index) => (
          <div
            className={st(classes.itemColumn)}
            key={index}
            onClick={() => handleCheckbox(task.id)}
          >
            {task.selected ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                className="bi bi-check-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                className="bi bi-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              </svg>
            )}
          </div>
        ))}
    </div>
  );
};

export default ColumnCheck;
