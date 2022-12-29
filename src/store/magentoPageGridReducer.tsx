import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import type { Actions } from "./actions";

export type Tasks = {
  id?: number;
  name?: string;
  position?: string;
  salary?: string;
  start_date?: string;
  office?: string;
  extn?: string;
  status?: string;
  selected?: boolean;
  isAction?: boolean;
  isEdit?: boolean;
};

export type Magento_Page = {
  prevDataColumns: {};
  data: {
    tasks?: Tasks[];
    columns?: {};
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
  nameAllColumn: string;
  positionAllColumn: string;
  salaryAllColumn: string;
  start_dateAllColumn: string;
  officeAllColumn: string;
  extnAllColumn: string;
  statusAllColumn: string;
  nameEditMul: string;
  positionEditMul: string;
  salaryEditMul: string;
  start_dateEditMul: string;
  officeEditMul: string;
  extnEditMul: string;
  statusEditMul: string;
  objFilters: {};
  currentEditTaks: Tasks[];
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
  nameAllColumn: "",
  positionAllColumn: "",
  salaryAllColumn: "",
  start_dateAllColumn: "",
  officeAllColumn: "",
  extnAllColumn: "",
  statusAllColumn: "",
  nameEditMul: "",
  positionEditMul: "",
  salaryEditMul: "",
  start_dateEditMul: "",
  officeEditMul: "",
  extnEditMul: "",
  statusEditMul: "",
  objFilters: {
    idFrom: {
      keyWord: "idFrom",
      value: "",
    },
    idTo: {
      keyWord: "idTo",
      value: "",
    },
    name: {
      keyWord: "name",
      value: "",
    },
    office: {
      keyWord: "office",
      value: "",
    },

    start_date: {
      keyWord: "start_date",
      value: "",
    },
    status: {
      keyWord: "status",
      value: "",
    },
  },
  currentEditTaks: [],
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
      state.typeArr = "DATA_SET_LENGTH";
      localStorage.setItem(
        "MAGENTO_PAGE_VALUE",
        JSON.stringify(state.valueChange)
      );
    },

    setCurrentPage: (state, action) => {
      let currentPage = action.payload;
      state.currentPage = currentPage;
      state.typeArr = "DATA_SET_PAGINATE";
    },

    setBtnPrevAndNext: (state, action) => {
      const {
        payload: { disabledPrev, disabledNext },
      } = action;
      state.disabledPrev = disabledPrev;
      state.disabledNext = disabledNext;
    },

    setDisplayColumn: (state, action) => {
      let { id } = action.payload;

      _.map(state.data.columns, (column: any) =>
        column.id === id ? (column.disPlay = !column.disPlay) : column.disPlay
      );
      state.data.columns = _.cloneDeep(state.data.columns);
      localStorage.setItem("MAGENTO_PAGE", JSON.stringify(state.data));
    },

    setDisableSelectColumn: (state, action) => {
      let disableSelect = action.payload;
      state.disableSelect = disableSelect;
    },

    searchDataByInput: (state, action) => {
      let searchData = action.payload;
      state.searchData = searchData;
      state.currentPage = 1;
    },

    resetColumns: (state) => {
      state.data.columns = state.prevDataColumns;
      state.data.columns = _.cloneDeep(state.data.columns);
      localStorage.setItem("MAGENTO_PAGE", JSON.stringify(state.data));
    },

    setIsAction: (state, action) => {
      let { id } = action.payload;
      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.id === id ? { ...task, isAction: !task.isAction } : task
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
    },

    DeleteTask: (state, action) => {
      let { id } = action.payload;
      state.data.tasks = _.filter(state.data.tasks, (task) => task.id !== id);
      state.data.tasks = _.cloneDeep(state.data.tasks);
    },

    checkboxTask: (state, action) => {
      let { id, isSelected } = action.payload;
      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.id === id ? { ...task, selected: isSelected } : task
      );
    },

    checkboxOnlyTask: (state, action) => {
      let { id } = action.payload;
      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.id === id
          ? { ...task, selected: true }
          : { ...task, selected: false }
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
    },

    checkboxOnlyAction: (state, action) => {
      let { id } = action.payload;
      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.id === id
          ? { ...task, isAction: true }
          : { ...task, isAction: false }
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
    },

    checkboxTaskAll: (state, action) => {
      let { checkedAll } = action.payload;
      state.data.tasks = _.map(state.data.tasks, (task) => ({
        ...task,
        selected: checkedAll,
      }));
      state.data.tasks = _.cloneDeep(state.data.tasks);
    },

    checkCloseIsEditTaskAll: (state) => {
      state.data.tasks = _.map(state.data.tasks, (task) => ({
        ...task,
        isEdit: false,
      }));
      state.data.tasks = _.cloneDeep(state.data.tasks);
    },

    sortDesc: (state, action) => {
      const {
        payload: { nameSort },
      } = action;
      let sort = _.sortBy(state.data.tasks, [nameSort]);
      sort = _.reverse(sort);
      state.data.tasks = _.cloneDeep(sort);
    },

    sortAsc: (state, action) => {
      let {
        payload: { nameSort },
      } = action;
      const sort = _.sortBy(state.data.tasks, [nameSort]);
      state.data.tasks = _.cloneDeep(sort);
    },

    changeIsSort: (state, action) => {
      const {
        payload: { isSort },
      } = action;
      state.isSort = isSort;
    },

    changeName: (state, action) => {
      const {
        payload: { nameSort },
      } = action;
      state.isSort = true;
      state.sortName = nameSort;
    },

    setShowModal: (state, action) => {
      const {
        payload: { isShowModal, isItemTaskSelectd, titleModal, contentModal },
      } = action;
      state.isItemTaskSelectd = isItemTaskSelectd;
      state.titleModal = titleModal;
      state.contentModal = contentModal;
      state.isShowModal = isShowModal;
    },

    clearSelected: (state) => {
      state.data.tasks = _.filter(
        state.data.tasks,
        (task) => task.selected === false
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
    },

    changeStatusTask: (state, action) => {
      let { nameStatus } = action.payload;
      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.selected === true ? { ...task, status: nameStatus } : task
      );
      state.data.tasks = _.cloneDeep(state.data.tasks);
    },

    checkIsEdit: (state, action) => {
      let { id, isEdit } = action.payload;
      let newTask = _.cloneDeep(state.data.tasks);
      state.data.tasks = _.map(newTask, (task) =>
        task.id === id ? { ...task, isEdit: isEdit, selected: isEdit } : task
      );

      if (!_.isUndefined(id)) {
        const currentEdit = _.find(
          _.cloneDeep(state.data.tasks),
          (task) => task.id === id
        );

        if (isEdit && currentEdit) {
          let newEditTasks = _.cloneDeep(state.currentEditTaks);
          newEditTasks.push(currentEdit);

          state.currentEditTaks = newEditTasks;
        } else state.currentEditTaks = [];
      }
    },

    openEditTask: (state) => {
      state.data.tasks = _.map(state.data.tasks, (task) =>
        task.selected === true
          ? {
              ...task,
              isEdit: true,
            }
          : task
      );
    },

    checkOnPage: (state, action) => {
      let { tasks } = action.payload;
      state.data.tasks = tasks;
    },

    filtersData: (state, action) => {
      let objFilters = action.payload;
      state.objFilters = objFilters;
    },

    inputEditMultiTask: (state, action) => {
      const {
        nameEditMul,
        positionEditMul,
        salaryEditMul,
        start_dateEditMul,
        officeEditMul,
        extnEditMul,
        statusEditMul,
      } = action.payload;

      state.nameEditMul = nameEditMul;
      state.positionEditMul = positionEditMul;
      state.salaryEditMul = salaryEditMul;
      state.start_dateEditMul = start_dateEditMul;
      state.officeEditMul = officeEditMul;
      state.extnEditMul = extnEditMul;
      state.statusEditMul = statusEditMul;
    },

    editInputMultiTask: (state, action) => {
      const {
        nameAllColumn,
        positionAllColumn,
        salaryAllColumn,
        start_dateAllColumn,
        officeAllColumn,
        extnAllColumn,
        statusAllColumn,
      } = action.payload;

      state.nameAllColumn = nameAllColumn;
      state.positionAllColumn = positionAllColumn;
      state.salaryAllColumn = salaryAllColumn;
      state.start_dateAllColumn = start_dateAllColumn;
      state.officeAllColumn = officeAllColumn;
      state.extnAllColumn = extnAllColumn;
      state.statusAllColumn = statusAllColumn;

      const currentTaks = _.cloneDeep(state.currentEditTaks);

      state.currentEditTaks = _.map(currentTaks, (taskEdit) => ({
        ...taskEdit,
        name: nameAllColumn !== "" ? nameAllColumn : taskEdit.name,
        position:
          positionAllColumn !== "" ? positionAllColumn : taskEdit.position,
        salary: salaryAllColumn !== "" ? salaryAllColumn : taskEdit.salary,
        start_date:
          start_dateAllColumn !== ""
            ? start_dateAllColumn
            : taskEdit.start_date,
        office: officeAllColumn !== "" ? officeAllColumn : taskEdit.office,
        extn: extnAllColumn !== "" ? extnAllColumn : taskEdit.extn,
        status: statusAllColumn !== "" ? statusAllColumn : taskEdit.status,
      }));
    },

    changeTask: (state, action) => {
      const keyname = action.payload.keyName;
      let currentEdit: any = _.find(_.cloneDeep(state.data.tasks), {
        id: action.payload.id,
      });

      if (_.find(state.currentEditTaks, { id: action.payload.id })) {
        currentEdit = _.find(state.currentEditTaks, { id: action.payload.id });
      }

      let newEditTasks = _.cloneDeep(state.currentEditTaks);
      currentEdit[`${keyname}`] = action.payload.value;

      newEditTasks = _.filter(
        newEditTasks,
        (task) => task.id !== action.payload.id
      );

      newEditTasks.push(currentEdit);
      state.currentEditTaks = newEditTasks;
    },

    saveChange: (state) => {
      if (_.size(state.currentEditTaks) > 1) {
        let newTasks: Tasks[] = [];
        _.forEach(_.cloneDeep(state.data.tasks), (task) => {
          let newTask = { ...task };
          _.forEach(_.cloneDeep(state.currentEditTaks), (currentEdit) => {
            if (task.id === currentEdit.id) {
              newTask = {
                ...currentEdit,
              };
            }
          });
          newTasks.push(newTask);
        });

        state.data.tasks = newTasks;
      } else {
        const newObj = _.cloneDeep(state.currentEditTaks[0]);
        const newTask = _.map(_.cloneDeep(state.data.tasks), (task) =>
          task.id === newObj.id
            ? { ..._.cloneDeep(state.currentEditTaks[0]), isEdit: false }
            : task
        );
        state.data.tasks = newTask;
      }
      state.currentEditTaks = [];
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
  checkboxOnlyTask,
  checkboxOnlyAction,
  checkboxTaskAll,
  checkCloseIsEditTaskAll,
  sortDesc,
  sortAsc,
  changeIsSort,
  changeName,
  setShowModal,
  clearSelected,
  changeStatusTask,
  checkIsEdit,
  openEditTask,
  checkOnPage,
  filtersData,
  inputEditMultiTask,
  editInputMultiTask,
  changeTask,
  saveChange,
} = MagentoPageSlice.actions;

export default MagentoPageSlice.reducer;
