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
      {/* <div className={st(classes.dataTablesInfo)} data-hook="data-info">
        Showing {startIndex + 1} to {endIndex} of {lengthData} entries
      </div>
      <div className={st(classes.dataTablesPaginate)}>
        <a
          className={st(classes.paginateButton, { disabledPrev })}
          onClick={() => handleClickBtnPrevAndNext("PREVIOUS")}
          data-hook="previous"
        >
          Previous
        </a>
        <span>
          {arrBtnPage &&
            _.map(arrBtnPage, (item, index) => (
              <a
                className={st(classes.paginateButton, {
                  curentBtn: item === currentPage,
                })}
                onClick={() => handleClickBtn(item)}
                key={index}
                data-hook="btn-item-page"
              >
                {item}
              </a>
            ))}
        </span>
        <a
          className={st(classes.paginateButton, { disabledNext })}
          onClick={() => handleClickBtnPrevAndNext("NEXT")}
          data-hook="next"
        >
          Next
        </a>
      </div> */}
    </div>
  );
};

export default PaginatePage;
