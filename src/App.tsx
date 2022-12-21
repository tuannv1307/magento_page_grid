import { useEffect, ChangeEvent } from "react";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
import store from "./store/store";
import {
  Magento_Page,
  getDataColumns,
  getPrevDataColumns,
} from "./store/magentoPageGridReducer";
import Nav from "./components/Nav/Nav";
import Products from "./components/Products/Products";
import Header from "./components/Header/Header";
import { st, classes } from "./App.st.css";
import "./globals.st.css";
import { initialData } from "./constants";
import ModalWrap from "./components/ModalWrap/ModalWrap";

function App() {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const isShowModal = data.isShowModal;
  const dispatch = useDispatch();

  const localPage: any = localStorage.getItem("MAGENTO_PAGE");

  const columnsData = JSON.parse(localPage);

  const localPrevData: any = localStorage.getItem("PREV_DATA_COLUMNS");

  const PrevData = JSON.parse(localPrevData);

  useEffect(() => {
    if (columnsData) {
      dispatch(getDataColumns(columnsData));
    } else {
      dispatch(getDataColumns(initialData));
    }
    if (PrevData) {
      dispatch(getPrevDataColumns(PrevData));
    } else {
      dispatch(getPrevDataColumns(initialData.columns));
    }
  }, [dispatch]);
  return (
    <div className={st(classes.root)} data-hook="app">
      <ModalWrap />
      <Header />
      <Nav />
      <Products />
    </div>
  );
}

function AppProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppProvider;
