import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../store/magentoPageGridReducer";

import { st, classes } from "./PaginatePage.st.css";

const PaginatePage = () => {
  // const data: Data_Tables = useSelector(
  //   (state: { datatable: Data_Tables }) => state.datatable
  // );
  // const dispatch = useDispatch();
  // let dataTable = data?.data;
  // const lengthData = dataTable?.length;
  // const sizeData = data?.sizeData;
  // const disabledPrev = data?.disabledPrev;
  // const disabledNext = data?.disabledNext;
  // let currentPage = data?.currentPage;
  // let arrBtnPage = data?.arrBtnPage;
  // let startIndex = currentPage * sizeData - sizeData;
  // const endIndex = Math.min(startIndex + sizeData, lengthData);

  // const handleClickBtn = (item: number) => {
  //   dispatch(setCurrentPage({ currentPage: item }));
  // };

  // const handleClickBtnPrevAndNext = (type: string) => {
  //   if (!disabledPrev) {
  //     if (type === "PREVIOUS") {
  //       if (currentPage === 1) {
  //         return;
  //       }
  //       currentPage = currentPage - 1;
  //       dispatch(setCurrentPage({ currentPage }));
  //     }
  //   }
  //   if (!disabledNext) {
  //     if (type === "NEXT") {
  //       if (currentPage === 6) {
  //         return;
  //       }
  //       currentPage = currentPage + 1;
  //       dispatch(setCurrentPage({ currentPage }));
  //     }
  //   }
  // };

  return (
    <div className={st(classes.root)}>
      <div className={st(classes.dataTablesPaginate)}>
        <button className={st(classes.actionPrevious)} data-hook="previous">
          <svg viewBox="0 0 18 18" fill="currentColor" width="18" height="18">
            <path d="M-7.14 11.145a.5.5 0 010 .707l-3.646 3.648 3.646 3.647a.5.5 0 11-.707.707L-12.2 15.5l4.353-4.355a.5.5 0 01.707 0zM11.987 13.93a.75.75 0 11-1.06 1.06L5.438 9.497l5.488-5.492a.75.75 0 011.06 1.061L7.561 9.498l4.426 4.431z"></path>
          </svg>
        </button>
        <span>
          <input type="text" className={st(classes.inputPaginate)} />
        </span>
        <button className={st(classes.actionNext)} data-hook="next">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M8.22083109,4 C8.51380539,3.70718788 8.9886791,3.70731936 9.28149122,4.00029365 L17.2763084,12 L9.28047689,19.9997063 C8.98766478,20.2926806 8.51279106,20.2928121 8.21981676,20 C7.92684246,19.7071879 7.92671099,19.2323142 8.21952311,18.9393399 L15.1555752,12 L8.22053744,5.06066013 C7.92772532,4.76768583 7.92785679,4.29281212 8.22083109,4 Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaginatePage;
