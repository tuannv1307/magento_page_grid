import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { changeViewLengthData } from "../../store/magentoPageGridReducer";
import { st, classes } from "./ViewLength.st.css";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const ViewLength = () => {
  let data = useSelector((state: any) => state.magentopage);

  let valueChange = data?.valueChange;
  const [isShow, setIsShow] = useState(false);
  const [isShowCustoms, setIsShowCustoms] = useState(false);
  const [inputValue, setInputValue] = useState(_.toString(valueChange));
  const [inputValueEdit, setInputValueEdit] = useState("");

  const dispatch = useDispatch();

  const handleShow = () => {
    setTimeout(() => {
      setIsShow(!isShow);
      setIsShowCustoms(false);
    }, 200);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!inputValue || !_.isNaN(inputValue)) {
        setInputValue("20");
        dispatch(changeViewLengthData(20));
      } else {
        dispatch(changeViewLengthData(_.toNumber(inputValue)));
      }
    }
  };

  const handleClick = (e: any) => {
    setInputValue(e.target.value);
    dispatch(changeViewLengthData(_.toNumber(e.target.value)));
    setTimeout(() => {
      setIsShow(!isShow);
    }, 200);
  };

  const handleCustoms = () => {
    setIsShowCustoms(true);
  };

  const handleChangeValueEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValueEdit(e.target.value);
  };

  const handleKeyDowEdit = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!inputValueEdit || !_.isNaN(inputValueEdit)) {
        dispatch(changeViewLengthData(20));
        setInputValue("20");
        setIsShow(false);
      } else {
        dispatch(changeViewLengthData(_.toNumber(inputValueEdit)));
        setInputValue(inputValueEdit);
        setIsShow(false);
        setInputValueEdit("");
      }
    }
  };

  const handleOutSideClickInput = () => {
    if (!inputValue || !_.isNaN(inputValue)) {
      setInputValue("20");
      dispatch(changeViewLengthData(20));
    } else if (inputValue) {
      dispatch(changeViewLengthData(_.toNumber(inputValue)));
    }
  };

  const handleClickEdit = () => {
    if (!inputValueEdit || !_.isNaN(inputValueEdit)) {
      setInputValue("20");

      dispatch(changeViewLengthData(20));
      setIsShow(false);
    } else {
      dispatch(changeViewLengthData(_.toNumber(inputValueEdit)));
      setInputValue(inputValueEdit);
      setIsShow(false);
      setInputValueEdit("");
    }
  };

  const handleOutsideCustomsEdit = () => {
    // if (!inputValueEdit) {
    //   setIsShow(false);
    // } else {
    //   dispatch(changeViewLengthData(_.toNumber(inputValueEdit)));
    //   setInputValue(inputValueEdit);
    //   setIsShow(false);
    //   setInputValueEdit("");
    // }
    handleClickEdit();
  };

  const handleOutSideClick = () => {
    setIsShow(false);
  };

  return (
    <div className={st(classes.root)}>
      <OutsideClickHandler onOutsideClick={handleOutSideClick}>
        <div className={st(classes.selectMenu)}>
          <div className={st(classes.selectValue)}>
            <OutsideClickHandler onOutsideClick={handleOutSideClickInput}>
              <input
                value={inputValue}
                type="text"
                className={st(classes.valueSelect)}
                onChange={handleChangeValue}
                onKeyDown={handleKeyDown}
              />
            </OutsideClickHandler>
          </div>

          <button
            className={st(classes.seclectMenuToggle)}
            onClick={handleShow}
          >
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
        </div>

        {isShow && (
          <div className={st(classes.seclectMenuItems)}>
            <ul>
              <li>
                <button value={20} onClick={handleClick}>
                  20
                </button>
              </li>
              <li>
                <button value={30} onClick={handleClick}>
                  30
                </button>
              </li>
              <li>
                <button value={50} onClick={handleClick}>
                  50
                </button>
              </li>
              <li>
                <button value={100} onClick={handleClick}>
                  100
                </button>
              </li>
              <li>
                <button value={200} onClick={handleClick}>
                  200
                </button>
              </li>
              <li>
                {isShowCustoms ? (
                  <div className={st(classes.selectItemEdit)}>
                    <OutsideClickHandler
                      onOutsideClick={handleOutsideCustomsEdit}
                    >
                      <input
                        type="text"
                        className={st(classes.inputCustoms)}
                        onChange={handleChangeValueEdit}
                        onKeyDown={handleKeyDowEdit}
                        value={inputValueEdit}
                        autoFocus
                      />
                    </OutsideClickHandler>
                    <button
                      className={st(classes.btnCustomsEdit)}
                      onClick={() => handleClickEdit()}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="30"
                        height="30"
                      >
                        <path d="M17.2928932,13 L5,13 L5,12 L17.2928932,12 L13.1452179,7.86036606 C12.9499557,7.66510391 12.9499557,7.34852142 13.1452179,7.15325928 C13.34048,6.95799713 13.6570625,6.95799713 13.8523247,7.15325928 L19.2071068,12.5 L13.8523247,17.8553162 C13.6570625,18.0505783 13.34048,18.0505783 13.1452179,17.8553162 C12.9499557,17.660054 12.9499557,17.3434715 13.1452179,17.1482094 L17.2928932,13 Z"></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    className={st(classes.btnCustoms)}
                    onClick={handleCustoms}
                  >
                    Customs
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default ViewLength;
