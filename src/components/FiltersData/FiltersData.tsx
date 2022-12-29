import { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./DatePicker.scss";
import { useDispatch, useSelector } from "react-redux";
import { Magento_Page, filtersData } from "../../store/magentoPageGridReducer";
import {
  columnDataLenght,
  getPaginatedData,
} from "../ColumnPageType/ColumnPageType";
import _ from "lodash";
import { st, classes } from "./FiltersData.st.css";
import OutsideClickHandler from "react-outside-click-handler";

const FiltersData = () => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );

  const currentPage = data.currentPage;
  const sizeData = data.valueChange;
  let tasks: any = data.data.tasks;
  let objFilters = data.objFilters;
  const typeArr = data.typeArr;

  tasks =
    typeArr === "DATA_SET_LENGTH"
      ? columnDataLenght(tasks, sizeData)
      : getPaginatedData(tasks, currentPage, sizeData);

  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [startDate, setStartDate] = useState<any>();
  const [idFrom, setIdFrom] = useState("");
  const [idTo, setIdTo] = useState("");
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [status, setStatus] = useState("");

  const hanldeShow = () => {
    setIsShow(!isShow);
  };

  objFilters = {
    idFrom: {
      keyWord: "idFrom",
      value: !idFrom ? "" : idFrom,
    },
    idTo: { keyWord: "idTo", value: !idTo ? "" : idTo },
    name: { keyWord: "name", value: !name ? "" : name },
    office: { keyWord: "office", value: !office ? "" : office },
    status: { keyWord: "status", value: !status ? "" : status },
    start_date: {
      keyWord: "start_date",
      value:
        startDate !== "Invalid date"
          ? ""
          : moment(startDate).format("yyyy/MM/DD"),
    },
  };

  const handleCancel = () => {
    setStartDate("");
    setIdFrom("");
    setIdTo("");
    setName("");
    setOffice("");
    setStatus("");
    setIsShow(false);
  };

  const hanleFilterData = () => {
    dispatch(filtersData(objFilters));
    setIsShow(false);
    setStartDate("");
    setIdFrom("");
    setIdTo("");
    setName("");
    setOffice("");
    setStatus("");
  };

  const handleOutsideClick = () => {
    setIsShow(false);
  };

  return (
    <div className={st(classes.root)}>
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <button
          className={st(classes.btnFilter, { isShow })}
          onClick={hanldeShow}
          data-hook="btn-filter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-funnel-fill"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
          </svg>
          Filters
        </button>

        <div className={st(classes.FilterData, { isShow })}>
          <div className={st(classes.itemFilter)}>
            <h4>Id</h4>
            <div>
              <label htmlFor="">From</label>{" "}
              <input
                type="text"
                name="id"
                className={st(classes.inputFilter)}
                value={idFrom}
                onChange={(e) => setIdFrom(e.target.value)}
                data-hook="input-idfrom"
              />
              <label htmlFor="">To</label>{" "}
              <input
                type="text"
                name=""
                className={st(classes.inputFilter)}
                value={idTo}
                onChange={(e) => setIdTo(e.target.value)}
              />
            </div>
          </div>
          <div className={st(classes.itemFilter)}>
            <h4>name</h4>
            <input
              type="text"
              name="name"
              className={st(classes.inputFilter)}
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-hook="input-name"
            />
          </div>
          <div className={st(classes.itemFilter)}>
            <h4>office</h4>
            <select
              name="office"
              value={office}
              className={st(classes.selectEditTask)}
              onChange={(e) => setOffice(e.target.value)}
              data-hook="select-office"
            >
              <option>...</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Sydney">Sydney</option>
              <option value="London">London</option>
              <option value="Singapore">Singapore</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Edinburgh">Edinburgh</option>
              <option value="New York">New York</option>
            </select>
          </div>
          <div className={st(classes.itemFilter)}>
            <h4>start_date</h4>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
            />
          </div>
          <div className={st(classes.itemFilter)}>
            <h4>status</h4>
            <select
              name="status"
              value={status}
              className={st(classes.selectEditTask)}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>...</option>
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          </div>
          <div className={st(classes.itemFilter)}>
            <button className={st(classes.cancel)} onClick={handleCancel}>
              Cancel
            </button>
            <button
              className={st(classes.apply)}
              onClick={hanleFilterData}
              data-hook="apply-filter"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default FiltersData;
