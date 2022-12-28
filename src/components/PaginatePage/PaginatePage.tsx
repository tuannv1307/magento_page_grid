import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import {
  Magento_Page,
  setBtnPrevAndNext,
  setCurrentPage,
} from "../../store/magentoPageGridReducer";
import {
  fiterDataByKeyword,
  searchFilters,
} from "../ColumnPageType/ColumnPageType";
import { st, classes } from "./PaginatePage.st.css";

const PaginatePage = () => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  const dispatch = useDispatch();
  let currentPage = data.currentPage;

  const [currentPageP, setCurrentPageP] = useState(_.toString(currentPage));

  let tasks: any = data.data.tasks;

  const searchData = data.searchData;

  const objFilters = data.objFilters;

  const valueChangePage = data.valueChange;

  useEffect(() => {
    setCurrentPageP(_.toString(currentPage));
  }, [currentPage]);

  let disabledPrev = data.disabledPrev;

  let disabledNext = data.disabledNext;

  if (_.some(objFilters, (obj: any) => obj.value !== "")) {
    tasks = fiterDataByKeyword(tasks, objFilters);
  }

  if (searchData !== "") {
    tasks = searchFilters(tasks, searchData);
  }

  const handleChangeCurrentPage = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageP(e.target.value);
  };

  const lengthData = _.size(tasks);

  let numberPage = Math.ceil(lengthData / valueChangePage);

  const handleKeyDowSetCurrentPage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (
        _.toNumber(currentPageP) > numberPage ||
        _.toNumber(currentPageP) <= 0 ||
        currentPageP === "" ||
        _.isNaN(_.toNumber(currentPageP)) === true
      ) {
        setCurrentPageP("1");
        dispatch(setCurrentPage(1));
      } else {
        dispatch(setCurrentPage(_.toNumber(currentPageP)));
      }
    }
  };

  const handleClickBtnPrevAndNext = (type: string) => {
    if (!disabledPrev) {
      if (type === "PREVIOUS") {
        if (currentPage === 1) {
          return;
        }
        currentPage = currentPage - 1;
        dispatch(setCurrentPage(currentPage));
      }
    }
    if (!disabledNext) {
      if (type === "NEXT") {
        if (currentPage === numberPage) {
          return;
        }
        currentPage = currentPage + 1;
        dispatch(setCurrentPage(currentPage));
      }
    }
  };

  if (lengthData === 0) {
    numberPage = 1;
  }

  useEffect(() => {
    disabledPrev = currentPage === 1 ? true : false;
    disabledNext =
      currentPage === numberPage ? true : false || numberPage === 0;
    dispatch(setBtnPrevAndNext({ disabledPrev, disabledNext }));
  }, [currentPage, numberPage]);

  const handleOutsideClick = () => {
    if (
      _.toNumber(currentPageP) > numberPage ||
      _.toNumber(currentPageP) <= 0 ||
      currentPageP === "" ||
      _.isNaN(_.toNumber(currentPageP)) === true
    ) {
      setCurrentPageP("1");
      dispatch(setCurrentPage(1));
    } else if (_.toNumber(currentPageP) !== currentPage) {
      dispatch(setCurrentPage(_.toNumber(currentPageP)));
    }
  };

  return (
    <div className={st(classes.root)}>
      <div className={st(classes.dataTablesPaginate)}>
        <button
          className={st(classes.actionPaginate, { disabledPrev })}
          data-hook="previous"
          onClick={() => handleClickBtnPrevAndNext("PREVIOUS")}
        >
          <svg
            className={st(classes.svgPrev)}
            viewBox="0 0 18 18"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M-7.14 11.145a.5.5 0 010 .707l-3.646 3.648 3.646 3.647a.5.5 0 11-.707.707L-12.2 15.5l4.353-4.355a.5.5 0 01.707 0zM11.987 13.93a.75.75 0 11-1.06 1.06L5.438 9.497l5.488-5.492a.75.75 0 011.06 1.061L7.561 9.498l4.426 4.431z"></path>
          </svg>
        </button>
        <span>
          <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            <input
              data-hook="value-page"
              type="text"
              className={st(classes.inputPaginate)}
              value={currentPageP}
              onChange={handleChangeCurrentPage}
              onKeyDown={handleKeyDowSetCurrentPage}
            />
          </OutsideClickHandler>
        </span>
        <span className={st(classes.maxPageData)}>of {numberPage} </span>
        <button
          className={st(classes.actionPaginate, { disabledNext })}
          data-hook="next"
          onClick={() => handleClickBtnPrevAndNext("NEXT")}
        >
          <svg
            className={st(classes.svgNext)}
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path d="M8.22083109,4 C8.51380539,3.70718788 8.9886791,3.70731936 9.28149122,4.00029365 L17.2763084,12 L9.28047689,19.9997063 C8.98766478,20.2926806 8.51279106,20.2928121 8.21981676,20 C7.92684246,19.7071879 7.92671099,19.2323142 8.21952311,18.9393399 L15.1555752,12 L8.22053744,5.06066013 C7.92772532,4.76768583 7.92785679,4.29281212 8.22083109,4 Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaginatePage;
