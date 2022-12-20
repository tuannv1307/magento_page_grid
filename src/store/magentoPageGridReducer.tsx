import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type Magento_Page = {
  prevDataColumns: {};
  data: {
    tasks?: {
      id: string;
      name: string;
      position: string;
      salary: string;
      start_date: string;
      office: string;
      extn: string;
      status: string;
      selected: boolean;
      isAction: boolean;
    }[];
    columns?: {
      // "column-1": {
      //   id: string;
      //   title: string;
      //   tasks: {
      //     id: string;
      //     name: string;
      //     position: string;
      //     salary: string;
      //     start_date: string;
      //     office: string;
      //     extn: string;
      //     status: string;
      //     selected: boolean;
      //   }[];
      // };
      // "column-2": {
      //   id: string;
      //   title: string;
      //   tasks: {
      //     id: string;
      //     name: string;
      //     position: string;
      //     salary: string;
      //     start_date: string;
      //     office: string;
      //     extn: string;
      //     status: string;
      //     selected: boolean;
      //   }[];
      // };
      // "column-3": {
      //   id: string;
      //   title: string;
      //   tasks: {
      //     id: string;
      //     name: string;
      //     position: string;
      //     salary: string;
      //     start_date: string;
      //     office: string;
      //     extn: string;
      //     status: string;
      //     selected: boolean;
      //   }[];
      // };
      // "column-4": {
      //   id: string;
      //   title: string;
      //   tasks: {
      //     id: string;
      //     name: string;
      //     position: string;
      //     salary: string;
      //     start_date: string;
      //     office: string;
      //     extn: string;
      //     status: string;
      //     selected: boolean;
      //   }[];
      // };
      // "column-5": {
      //   id: string;
      //   title: string;
      //   tasks: {
      //     id: string;
      //     name: string;
      //     position: string;
      //     salary: string;
      //     start_date: string;
      //     office: string;
      //     extn: string;
      //     status: string;
      //     selected: boolean;
      //   }[];
      // };
      // "column-6": {
      //   id: string;
      //   title: string;
      //   tasks: {
      //     id: string;
      //     name: string;
      //     position: string;
      //     salary: string;
      //     start_date: string;
      //     office: string;
      //     extn: string;
      //     status: string;
      //     selected: boolean;
      //   }[];
      // };
      // "column-7": {
      //   id: string;
      //   title: string;
      //   tasks: {
      //     id: string;
      //     name: string;
      //     position: string;
      //     salary: string;
      //     start_date: string;
      //     office: string;
      //     extn: string;
      //     status: string;
      //     selected: boolean;
      //   }[];
      // };
      // "column-8": {
      //   id: string;
      //   title: string;
      //   tasks: {
      //     id: string;
      //     name: string;
      //     position: string;
      //     salary: string;
      //     start_date: string;
      //     office: string;
      //     extn: string;
      //     status: string;
      //     selected: boolean;
      //   }[];
      // };
    };
    columnOrder?: string[];
  };
  valueChange: number;
  currentPage: number;
  typeArr: string;
  disabledPrev: boolean;
  disabledNext: boolean;
  disableSelect: boolean;
  searchData: string;
};

export type Actions = {
  getDataColumns: (state: Magento_Page, action: PayloadAction<{}>) => void;
  getPrevDataColumns: (state: Magento_Page, action: PayloadAction<{}>) => void;
  sortColumnsOrder: (
    state: Magento_Page,
    action: PayloadAction<string[]>
  ) => void;
  changeViewLengthData: (
    state: Magento_Page,
    action: PayloadAction<number>
  ) => void;
  setCurrentPage: (state: Magento_Page, action: PayloadAction<number>) => void;
  setBtnPrevAndNext: (
    state: Magento_Page,
    action: PayloadAction<{ disabledPrev: boolean; disabledNext: boolean }>
  ) => void;
  setDisplayColumn: (
    state: Magento_Page,
    action: PayloadAction<{ id: string }>
  ) => void;
  setDisableSelectColumn: (
    state: Magento_Page,
    action: PayloadAction<boolean>
  ) => void;
  searchDataByInput: (
    state: Magento_Page,
    action: PayloadAction<string>
  ) => void;
  resetColumns: (state: Magento_Page) => void;
  setIsAction: (
    state: Magento_Page,
    action: PayloadAction<{ id: string }>
  ) => void;
  DeleteTask: (
    state: Magento_Page,
    action: PayloadAction<{ id: string }>
  ) => void;
};

const initialData: Magento_Page = {
  prevDataColumns: {},
  data: {
    tasks: [],
    columns: {},
    columnOrder: [],
  },
  valueChange: 20,
  currentPage: 1,
  typeArr: "DATA_SET_LENGTH",
  disabledPrev: false,
  disabledNext: false,
  disableSelect: false,
  searchData: "",
};

export type TicTacToeActionPayload = {};

const MagentoPageSlice = createSlice<Magento_Page, Actions>({
  name: "magentopage",
  initialState: initialData as Magento_Page,
  reducers: {
    getDataColumns: (state, action) => {
      state.data = action.payload;
      state.data = _.cloneDeep(state.data);
      localStorage.setItem("MAGENTO_PAGE", JSON.stringify(state.data));
    },

    getPrevDataColumns: (state, action) => {
      state.prevDataColumns = action.payload;

      localStorage.setItem(
        "PREV_DATA_COLUMNS",
        JSON.stringify(state.prevDataColumns)
      );
    },

    sortColumnsOrder: (state, action) => {
      state.data.columnOrder = action.payload;
      state.data.columnOrder = _.cloneDeep(state.data.columnOrder);

      state.data = _.cloneDeep(state.data);
      localStorage.setItem("MAGENTO_PAGE", JSON.stringify(state.data));
    },

    changeViewLengthData: (state, action) => {
      let valueChange = action.payload;

      state.valueChange = valueChange;
      state.valueChange = _.cloneDeep(state.valueChange);
      state.currentPage = 1;
      state = _.cloneDeep(state);
      // localStorage.setItem("MAGENTO_PAGE", JSON.stringify(state.data));
      localStorage.setItem(
        "MAGENTO_PAGE_VALUE",
        JSON.stringify(state.valueChange)
      );
    },

    setCurrentPage: (state, action) => {
      let currentPage = action.payload;

      state.currentPage = currentPage;
      state.typeArr = "DATA_SET_PAGINATE";

      state = _.cloneDeep(state);
    },

    setBtnPrevAndNext: (state, action) => {
      const {
        payload: { disabledPrev, disabledNext },
      } = action;
      state.disabledPrev = disabledPrev;
      state.disabledNext = disabledNext;
      state = _.cloneDeep(state);
    },

    setDisplayColumn: (state, action) => {
      let { id } = action.payload;
      _.map(state.data.columns, (column: any) =>
        column.id === id ? (column.disPlay = !column.disPlay) : column.disPlay
      );
      state.data.columns = _.cloneDeep(state.data.columns);
      // state.prevDataColumns.push(_.cloneDeep(state.data));
      localStorage.setItem("MAGENTO_PAGE", JSON.stringify(state.data));
      state = _.cloneDeep(state);
    },

    setDisableSelectColumn: (state, action) => {
      let disableSelect = action.payload;
      state.disableSelect = disableSelect;
      state = _.cloneDeep(state);
    },

    searchDataByInput: (state, action) => {
      let searchData = action.payload;
      state.searchData = searchData;
      state = _.cloneDeep(state);
    },

    resetColumns: (state) => {
      state.data.columns = state.prevDataColumns;
      state.data.columns = _.cloneDeep(state.data.columns);
      localStorage.setItem("MAGENTO_PAGE", JSON.stringify(state.data));
      state = _.cloneDeep(state);
    },

    setIsAction: (state, action) => {
      let { id } = action.payload;

      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.id === id ? { ...task, isAction: !task.isAction } : task
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
      state = _.cloneDeep(state);
    },
    DeleteTask: (state, action) => {
      let { id } = action.payload;

      state.data.tasks = _.filter(state.data.tasks, (task) => task.id !== id);
      state.data.tasks = _.cloneDeep(state.data.tasks);
      state = _.cloneDeep(state);
    },
  },
  extraReducers: {},
});

export const {
  getDataColumns,
  getPrevDataColumns,
  sortColumnsOrder,
  changeViewLengthData,
  setCurrentPage,
  setBtnPrevAndNext,
  setDisplayColumn,
  setDisableSelectColumn,
  searchDataByInput,
  resetColumns,
  setIsAction,
  DeleteTask,
} = MagentoPageSlice.actions;

export default MagentoPageSlice.reducer;
