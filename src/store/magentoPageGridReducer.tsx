import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type Magento_Page = {
  data: {
    id?: string;
    name?: string;
    position?: string;
    office?: string;
    extn?: string;
    salary?: string;
    start_date?: string;
  }[];
};

export type Actions = {
  getData: (state: any, action: any) => void;
};

const initialData: Magento_Page = {
  data: [],
};

export type TicTacToeActionPayload = {};

const dataTablesSlice = createSlice<Magento_Page, Actions>({
  name: "datatable",
  initialState: initialData as Magento_Page,
  reducers: {
    getData: (state, action) => {},
  },
  extraReducers: {},
});

export const { getData } = dataTablesSlice.actions;

export default dataTablesSlice.reducer;
