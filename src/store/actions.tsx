import type { PayloadAction } from "@reduxjs/toolkit";
import type { Magento_Page, Tasks } from "./magentoPageGridReducer";

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
    action: PayloadAction<{ id?: string }>
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
    action: PayloadAction<{ id?: number }>
  ) => void;

  DeleteTask: (
    state: Magento_Page,
    action: PayloadAction<{ id?: number }>
  ) => void;

  checkboxTask: (
    state: Magento_Page,
    action: PayloadAction<{ id?: number; isSelected?: boolean }>
  ) => void;

  checkboxOnlyTask: (
    state: Magento_Page,
    action: PayloadAction<{ id?: number }>
  ) => void;

  checkboxOnlyAction: (
    state: Magento_Page,
    action: PayloadAction<{ id?: number }>
  ) => void;

  checkboxTaskAll: (
    state: Magento_Page,
    action: PayloadAction<{ checkedAll?: boolean }>
  ) => void;

  checkCloseIsEditTaskAll: (state: Magento_Page) => void;

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
    action: PayloadAction<{ id?: number; isEdit?: boolean }>
  ) => void;

  openEditTask: (state: Magento_Page) => void;

  checkOnPage: (
    state: Magento_Page,
    action: PayloadAction<{
      tasks: Tasks[];
    }>
  ) => void;
  filtersData: (state: Magento_Page, action: PayloadAction<any>) => void;

  inputEditMultiTask: (
    state: Magento_Page,
    action: PayloadAction<{
      nameEditMul: string;
      positionEditMul: string;
      salaryEditMul: string;
      start_dateEditMul: string;
      officeEditMul: string;
      extnEditMul: string;
      statusEditMul: string;
    }>
  ) => void;

  editInputMultiTask: (
    state: Magento_Page,
    action: PayloadAction<{
      nameAllColumn: string;
      positionAllColumn: string;
      salaryAllColumn: string;
      start_dateAllColumn: string;
      officeAllColumn: string;
      extnAllColumn: string;
      statusAllColumn: string;
    }>
  ) => void;

  changeTask: (
    state: Magento_Page,
    action: PayloadAction<{ id?: number; keyName?: string; value?: string }>
  ) => void;

  saveChange: (state: Magento_Page) => void;
};
