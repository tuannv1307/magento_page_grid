import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type Magento_Page = {
  prevDataColumns: {};
  data: {
    tasks?: {
      id: string | number;
      name: string;
      position: string;
      salary: string;
      start_date: string;
      office: string;
      extn: string;
      status: string;
      selected: boolean;
      isAction: boolean;
      isEdit: boolean;
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
  isSort: boolean;
  sortName: string;
  isShowModal: boolean;
  isItemTaskSelectd: boolean;
  titleModal: string;
  contentModal: string;
  isCheckedAllByPage: boolean;
  nameStatus: string;
  isEditTask: boolean;
  isCheckOnPage: boolean;
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
    action: PayloadAction<{ id: number }>
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
    action: PayloadAction<{ id: number }>
  ) => void;
  DeleteTask: (
    state: Magento_Page,
    action: PayloadAction<{ id: number }>
  ) => void;
  checkboxTask: (
    state: Magento_Page,
    action: PayloadAction<{ id: number; isSelected: boolean }>
  ) => void;
  checkboxTaskAll: (
    state: Magento_Page,
    action: PayloadAction<{ checkedAll: boolean }>
  ) => void;

  checkboxTaskAllBypage: (
    state: Magento_Page,
    action: PayloadAction<{ isCheckedAllByPage: boolean }>
  ) => void;

  sortDesc: (
    state: Magento_Page,
    action: PayloadAction<{ nameSort: string }>
  ) => void;

  sortAsc: (
    state: Magento_Page,
    action: PayloadAction<{ nameSort: string }>
  ) => void;

  changeIsSort: (
    state: Magento_Page,
    action: PayloadAction<{ isSort: boolean }>
  ) => void;

  changeName: (
    state: Magento_Page,
    action: PayloadAction<{ nameSort: string }>
  ) => void;

  setShowModal: (
    state: Magento_Page,
    action: PayloadAction<{
      isShowModal: boolean;
      isItemTaskSelectd: boolean;
      titleModal: string;
      contentModal: string;
    }>
  ) => void;

  clearSelected: (state: Magento_Page) => void;

  changeStatusTask: (
    state: Magento_Page,
    action: PayloadAction<{ nameStatus: string }>
  ) => void;
  checkIsEdit: (
    state: Magento_Page,
    action: PayloadAction<{ id: number; isEdit: boolean }>
  ) => void;

  editTask: (
    state: Magento_Page,
    action: PayloadAction<{
      id: number;
      inputEdit: {};
    }>
  ) => void;

  checkIsEditTask: (
    state: Magento_Page,
    action: PayloadAction<boolean>
  ) => void;

  checkOnPage: (state: Magento_Page, action: PayloadAction<boolean>) => void;
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
  isSort: false,
  sortName: "id",
  isShowModal: false,
  isItemTaskSelectd: false,
  titleModal: "",
  contentModal: "",

  isCheckedAllByPage: false,
  nameStatus: "enable" || "disable",
  isEditTask: false,
  isCheckOnPage: false,
};

export type TicTacToeActionPayload = {};

const MagentoPageSlice = createSlice<Magento_Page, Actions>({
  name: "magentopage",
  initialState: initialData as Magento_Page,
  reducers: {
    getDataColumns: (state, action) => {
      state.data = action.payload;
      state.data.tasks = _.map(state.data.tasks, (task) => ({
        ...task,
        id: _.toNumber(task.id),
      }));

      // const sort = _.sortBy(state.data.tasks, [state.sortName]);

      // state.data.tasks = _.cloneDeep(sort);
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
      if (_.size(state.data.tasks) < state.valueChange) {
        state.currentPage = 1;
      }
      state.typeArr = "DATA_SET_LENGTH";
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
    checkboxTask: (state, action) => {
      let { id, isSelected } = action.payload;

      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.id === id ? { ...task, selected: isSelected } : task
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
      state = _.cloneDeep(state);
    },

    checkboxTaskAll: (state, action) => {
      let { checkedAll } = action.payload;
      state.data.tasks = _.map(state.data.tasks, (task) => ({
        ...task,
        selected: checkedAll,
      }));
      state.data.tasks = _.cloneDeep(state.data.tasks);
      state = _.cloneDeep(state);
    },

    checkboxTaskAllBypage: (state, action) => {
      let { isCheckedAllByPage } = action.payload;
      state.isCheckedAllByPage = isCheckedAllByPage;
      state = _.cloneDeep(state);
    },

    sortDesc: (state, action) => {
      const {
        payload: { nameSort },
      } = action;
      let sort = _.sortBy(state.data.tasks, [nameSort]);
      sort = _.reverse(sort);

      state.data.tasks = _.cloneDeep(sort);
      state = _.cloneDeep(state);
    },

    sortAsc: (state, action) => {
      let {
        payload: { nameSort },
      } = action;

      const sort = _.sortBy(state.data.tasks, [nameSort]);

      state.data.tasks = _.cloneDeep(sort);
      state = _.cloneDeep(state);
    },

    changeIsSort: (state, action) => {
      const {
        payload: { isSort },
      } = action;
      state.isSort = isSort;
      state = _.cloneDeep(state);
    },

    changeName: (state, action) => {
      const {
        payload: { nameSort },
      } = action;
      state.isSort = true;
      state.sortName = nameSort;
      state = _.cloneDeep(state);
    },

    setShowModal: (state, action) => {
      const {
        payload: { isShowModal, isItemTaskSelectd, titleModal, contentModal },
      } = action;
      state.isItemTaskSelectd = isItemTaskSelectd;
      state.titleModal = titleModal;
      state.contentModal = contentModal;
      state.isShowModal = isShowModal;
      state = _.cloneDeep(state);
    },

    clearSelected: (state) => {
      state.data.tasks = _.filter(
        state.data.tasks,
        (task) => task.selected === false
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
      state = _.cloneDeep(state);
    },

    changeStatusTask: (state, action) => {
      let { nameStatus } = action.payload;

      state.nameStatus = nameStatus;
      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.selected === true ? { ...task, status: nameStatus } : task
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
      state = _.cloneDeep(state);
    },

    checkIsEdit: (state, action) => {
      let { id, isEdit } = action.payload;

      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.id === id ? { ...task, isEdit: isEdit } : task
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
      state = _.cloneDeep(state);
    },

    editTask: (state, action) => {
      let { id, inputEdit } = action.payload;

      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.id === id
          ? {
              ...task,
              inputEdit,
            }
          : task
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
      state = _.cloneDeep(state);
    },

    checkIsEditTask: (state, action) => {
      let isEditTask = action.payload;

      state.isEditTask = isEditTask;
    },

    checkOnPage: (state, action) => {
      let isCheckOnPage = action.payload;

      state.isCheckOnPage = isCheckOnPage;
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
  checkboxTask,
  checkboxTaskAll,
  sortDesc,
  sortAsc,
  changeIsSort,
  changeName,
  setShowModal,
  clearSelected,
  checkboxTaskAllBypage,
  changeStatusTask,
  checkIsEdit,
  editTask,
  checkIsEditTask,
  checkOnPage,
} = MagentoPageSlice.actions;

export default MagentoPageSlice.reducer;
