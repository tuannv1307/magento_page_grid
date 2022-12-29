import { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import {
  Magento_Page,
  resetColumns,
  setDisableSelectColumn,
  setDisplayColumn,
} from "../../store/magentoPageGridReducer";
import { st, classes } from "./HideShowColumns.st.css";

const HideShowColumns = () => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const [isShowColums, setIsShowColumns] = useState(false);
  const dispatch = useDispatch();
  const columnOrder = data.data.columnOrder;
  const columns: any = data.data.columns;
  let disableSelect = data.disableSelect;

  const columnDisplay = _.filter(
    columns,
    (column: { disPlay: boolean }) => column?.disPlay === true
  );

  const lengthDisplayColumn = _.size(columnDisplay);

  useEffect(() => {
    if (lengthDisplayColumn === 1) {
      disableSelect = true;
    } else {
      disableSelect = false;
    }
    dispatch(setDisableSelectColumn(disableSelect));
  }, [lengthDisplayColumn]);

  const numbeColumns = _.size(columnOrder);

  const handleShow = () => {
    setIsShowColumns(!isShowColums);
  };

  const handleClickChangeDisplay = (id: string) => {
    if (id) {
      if (
        lengthDisplayColumn > 1 ||
        (lengthDisplayColumn === 1 && !_.find(columnDisplay, { id }))
      )
        dispatch(setDisplayColumn({ id }));
    }
  };

  const handleClickOutside = () => {
    setIsShowColumns(false);
  };

  return (
    <div className={st(classes.root, { isShowColums })}>
      <OutsideClickHandler onOutsideClick={handleClickOutside}>
        <button
          className={st(classes.btnColumns)}
          onClick={handleShow}
          data-hook="btn-columns"
        >
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
          <div className={st(classes.dropDownShowColumns)} data-hook="columns">
            <div className={st(classes.dropDownHeader)}>
              {lengthDisplayColumn} out of {numbeColumns} visible
            </div>
            <div className={st(classes.dropDownContent, { numbeColumns })}>
              {_.map(
                columns,
                (
                  column: { id: string; title: string; disPlay: boolean },
                  index
                ) => (
                  <div
                    className={st(classes.cloumnShowHide, { disableSelect })}
                    key={index}
                    onClick={() => handleClickChangeDisplay(column.id)}
                    data-hook="hideshow-columns"
                  >
                    {column.disPlay ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
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
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      </svg>
                    )}

                    <label
                    //  htmlFor={index}
                    >
                      {column.title}
                    </label>
                  </div>
                )
              )}
            </div>
            <div className={st(classes.dropDownAction)}>
              <div className={st(classes.reset)}>
                <button
                  onClick={() => dispatch(resetColumns())}
                  data-hook="btn-reset"
                >
                  Reset
                </button>
              </div>
              <div className={st(classes.cancel)}>
                <button
                  onClick={() => setIsShowColumns(false)}
                  data-hook="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default HideShowColumns;
