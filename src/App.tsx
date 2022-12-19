import { useEffect, ChangeEvent } from "react";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
import store from "./store/store";
import { Magento_Page, getDataColumns } from "./store/magentoPageGridReducer";
import Nav from "./components/Nav/Nav";
import Products from "./components/Products/Products";
import Header from "./components/Header/Header";
import { st, classes } from "./App.st.css";
import "./globals.st.css";
import { initialData } from "./constants";

function App() {
  const dispatch = useDispatch();

  const local: any = localStorage.getItem("MAGENTO_PAGE");

  const columnsData = JSON.parse(local);

  useEffect(() => {
    if (columnsData) {
      dispatch(getDataColumns(columnsData));
    } else {
      dispatch(getDataColumns(initialData));
    }
  }, [dispatch]);
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
