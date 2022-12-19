import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  changeViewLengthData,
  sortColumnsOrder,
} from "../../store/magentoPageGridReducer";
import { st, classes } from "./ViewLength.st.css";
import { ChangeEvent, KeyboardEvent, useState } from "react";

const ViewLength = () => {
  let data = useSelector((state: any) => state.magentopage);
  console.log("🚀 ~ file: ViewLength.tsx:9 ~ ViewLength ~ data", data);
  let valueChange = data?.valueChange;
  const [isShow, setIsShow] = useState(false);
  const [inputValue, setInputValue] = useState(valueChange);

  let columns = data.data.columns;
  let columnOrder = data.data.columnOrder;
  let tasks = data.data.tasks;

  const dispatch = useDispatch();
  const handleShow = () => {
    setTimeout(() => {
      setIsShow(!isShow);
    }, 200);
  };
  const handleBlur = () => {
    // setTimeout(() => {
    //   setIsShow(false);
    // }, 200);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Enter") {
      dispatch(changeViewLengthData(_.toNumber(inputValue)));
    }
  };

  const handleClick = (e: any) => {
    setInputValue(e.target.value);
    dispatch(changeViewLengthData(_.toNumber(e.target.value)));
    setTimeout(() => {
      setIsShow(!isShow);
    }, 200);
  };
  return (
    <div className={st(classes.root)}>
      <div className={st(classes.selectMenu)}>
        <div className={st(classes.selectValue)}>
          <input
            value={inputValue}
            type="text"
            className={st(classes.valueSelect)}
            onChange={handleChangeValue}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          className={st(classes.seclectMenuToggle)}
          onClick={handleShow}
          onBlur={handleBlur}
        >
          {isShow ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12,6.93933983 L20.0303301,14.9696699 C20.3232233,15.2625631 20.3232233,15.7374369 20.0303301,16.0303301 C19.7640635,16.2965966 19.3473998,16.3208027 19.0537883,16.1029482 L18.9696699,16.0303301 L12,9.061 L5.03033009,16.0303301 C4.76406352,16.2965966 4.34739984,16.3208027 4.05378835,16.1029482 L3.96966991,16.0303301 C3.70340335,15.7640635 3.6791973,15.3473998 3.89705176,15.0537883 L3.96966991,14.9696699 L12,6.93933983 Z"></path>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M3.96966991,7.96966991 C4.23593648,7.70340335 4.65260016,7.6791973 4.94621165,7.89705176 L5.03033009,7.96966991 L12,14.939 L18.9696699,7.96966991 C19.2359365,7.70340335 19.6526002,7.6791973 19.9462117,7.89705176 L20.0303301,7.96966991 C20.2965966,8.23593648 20.3208027,8.65260016 20.1029482,8.94621165 L20.0303301,9.03033009 L12,17.0606602 L3.96966991,9.03033009 C3.6767767,8.73743687 3.6767767,8.26256313 3.96966991,7.96966991 Z"></path>
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
              <button className={st(classes.btnCustoms)}>Customs</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewLength;
