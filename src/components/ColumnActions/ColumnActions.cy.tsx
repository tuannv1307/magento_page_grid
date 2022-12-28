import { Provider } from "react-redux";
import store from "../../store/store";
import ColumnActions from "./ColumnActions";

let column = {
  id: "1",
  title: "name",
};

describe("ColumnActions.cy.tsx", () => {
  it("show mount", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <ColumnActions column={column} index={"1"} typeColumn="name" />
      </Provider>
    );
  });
});
