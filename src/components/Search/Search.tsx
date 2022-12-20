import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  Magento_Page,
  searchDataByInput,
  setBtnPrevAndNext,
  setCurrentPage,
  setDisableSelectColumn,
  setDisplayColumn,
} from "../../store/magentoPageGridReducer";

import { st, classes } from "./Search.st.css";

const Search = () => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  let searchData = data.searchData;
  const [inputSearch, setInputSearch] = useState(searchData);
  const dispatch = useDispatch();

  const columnOrder = data.data.columnOrder;
  let columns = data.data.columns;
  let disableSelect = data.disableSelect;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };
  const handleKeySearch = (e: KeyboardEvent) => {
    console.log(e);

    if (e.key === "Enter") {
      dispatch(searchDataByInput(inputSearch));
    }
  };
  const handleClickSearch = () => {
    dispatch(searchDataByInput(inputSearch));
  };
  const handleDeleteKeyWord = () => {
    dispatch(searchDataByInput(""));
    setInputSearch("");
  };
  return (
    <div className={st(classes.root, { searchData: searchData.length > 0 })}>
      <input
        type="text"
        value={inputSearch}
        placeholder="Search by keyword"
        className={st(classes.inputSearch)}
        onChange={handleChange}
        onKeyDown={handleKeySearch}
      />
      <svg
        onClick={handleClickSearch}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className={st(classes.svgSearch, "bi bi-search")}
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
      {searchData.length > 0 && (
        <div className={st(classes.keyWordSeacrh)}>
          <div className={st(classes.title)}>Active filters:</div>
          <div className={st(classes.keyword)}>
            Keyword: {searchData}
            <svg
              onClick={handleDeleteKeyWord}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={st(classes.deleteKeyword, "bi bi-x-circle-fill")}
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </div>
          <div className={st(classes.clearAll)}>
            <span onClick={handleDeleteKeyWord}>Clear all</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
