import { Provider } from "react-redux";
import store from "../../store/store";
import ItemTaskColumn from "./ItemTaskColumn";

let task: any = {
  id: "1",
  name: "Tiger Nixon",
  position: "System Architect",
  salary: "320,800",
  start_date: "2011/04/25",
  office: "Edinburgh",
  extn: "5421",
  status: "enable",
  selected: false,
  isAction: false,
  isEdit: false,
};

let task1: any = {
  id: "2",
  name: "Garrett Winters",
  position: "Accountant",
  salary: "170,750",
  start_date: "2011/07/25",
  office: "Tokyo",
  extn: "8422",
  status: "enable",
  selected: false,
  isAction: false,
  isEdit: false,
};

describe("ItemTaskColumn.cy.tsx", () => {
  it("show mount", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <ItemTaskColumn task={task} typeColumn="name" />
        <ItemTaskColumn task={task1} typeColumn="position" />
      </Provider>
    );
  });

  it("show mount data-info", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <ItemTaskColumn task={task} typeColumn="name" />
        <ItemTaskColumn task={task1} typeColumn="position" />
      </Provider>
    );
  });
});
