import _, { hasIn } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  Magento_Page,
  resetColumns,
  setBtnPrevAndNext,
  setCurrentPage,
  setDisableSelectColumn,
  setDisplayColumn,
} from "../../store/magentoPageGridReducer";

import { st, classes } from "./HideShowColumns.st.css";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

const HideShowColumns = () => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  const dispatch = useDispatch();

  const columnOrder = data.data.columnOrder;
  let columns = data.data.columns;
  let disableSelect = data.disableSelect;

  const lengthDisplayColumn = _.size(
    _.filter(columns, (column: any) => column?.disPlay === true)
  );

  useEffect(() => {
    if (lengthDisplayColumn === 1) {
      disableSelect = true;
    } else {
      disableSelect = false;
    }
    dispatch(setDisableSelectColumn(disableSelect));
  }, [lengthDisplayColumn]);

  const numbeColumns = _.size(columnOrder);

  const [isShowColums, setIsShowColumns] = useState(false);

  const handleShow = () => {
    setIsShowColumns(!isShowColums);
  };

  const handleClickChangeDisplay = (id: any) => {
    if (id) {
      dispatch(setDisplayColumn({ id }));
    }
  };
  console.log(
    "🚀 ~ file: HideShowColumns.tsx:18 ~ HideShowColumns ~ data",
    data
  );
  return (
    <div className={st(classes.root, { isShowColums })}>
      <button className={st(classes.btnColumns)} onClick={handleShow}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-gear-fill"
            viewBox="0 0 16 16"
          >
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
          </svg>
        </span>
        Columns
        <span>
          {isShowColums ? (
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
        </span>
      </button>
      {isShowColums && (
        <div className={st(classes.dropDownShowColumns)}>
          <div className={st(classes.dropDownHeader)}>
            {lengthDisplayColumn} out of {numbeColumns} visible
          </div>
          <div className={st(classes.dropDownContent, { numbeColumns })}>
            {
              // _.map(columnOrder, (columnId) =>
              _.map(columns, (column: any, index) => (
                <div
                  className={st(classes.cloumnShowHide, { disableSelect })}
                  key={index}
                  onClick={() => handleClickChangeDisplay(column.id)}
                >
                  <input
                    type="checkbox"
                    //id={index}
                    checked={column.disPlay}
                    onChange={() => console.log(column.id)}
                  />
                  <label
                  //  htmlFor={index}
                  >
                    {column.title}
                  </label>
                </div>
              ))
              // )
            }
          </div>
          <div className={st(classes.dropDownAction)}>
            <div className={st(classes.reset)}>
              <button onClick={() => dispatch(resetColumns())}>Reset</button>
            </div>
            <div className={st(classes.cancel)}>
              <button onClick={() => setIsShowColumns(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HideShowColumns;
