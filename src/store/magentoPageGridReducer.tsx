import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type Magento_Page = {
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
};

export type Actions = {
  getDataColumns: (state: Magento_Page, action: PayloadAction<{}>) => void;
  sortColumnsOrder: (
    state: Magento_Page,
    action: PayloadAction<string[]>
  ) => void;
  changeViewLengthData: (
    state: Magento_Page,
    action: PayloadAction<number>
  ) => void;
};

const initialData: Magento_Page = {
  data: {
    tasks: [],
    columns: {},
    columnOrder: [],
  },
  valueChange: 20,
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

    sortColumnsOrder: (state, action) => {
      state.data.columnOrder = action.payload;
      state.data.columnOrder = _.cloneDeep(state.data.columnOrder);
      state.data = _.cloneDeep(state.data);
      localStorage.setItem("MAGENTO_PAGE", JSON.stringify(state.data));
    },

    changeViewLengthData: (state, action) => {
      let valueChange = action.payload;
      // if (valueChange === NaN) {
      //   valueChange = 20;
      // }
      state.valueChange = valueChange;
      state.valueChange = _.cloneDeep(state.valueChange);
      state = _.cloneDeep(state);
      localStorage.setItem("MAGENTO_PAGE", JSON.stringify(state.data));
      localStorage.setItem(
        "MAGENTO_PAGE_VALUE",
        JSON.stringify(state.valueChange)
      );
    },
  },
  extraReducers: {},
});

export const { getDataColumns, sortColumnsOrder, changeViewLengthData } =
  MagentoPageSlice.actions;

export default MagentoPageSlice.reducer;
