import { useEffect, ChangeEvent } from "react";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
import store from "./store/store";

import { st, classes } from "./App.st.css";
import "./globals.st.css";
import { getData } from "./store/magentoPageGridReducer";
import { dataSet } from "./constants";
import PaginatePage from "./components/PaginatePage/PaginatePage";
import Nav from "./components/Nav/Nav";
import Products from "./components/Products/Products";
import Header from "./components/Header/Header";

function App() {
  // const data: Data_Tables = useSelector(
  //   (state: { datatable: Data_Tables }) => state.datatable
  // );
  const dispatch = useDispatch();

  return (
    <div className={st(classes.root)} data-hook="app">
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
