import { Provider } from "react-redux";
import store from "../../store/store";
import ColumnPageType from "./ColumnPageType";

let column = {
  id: "1",
  title: "abc",
  disPlay: true,
};

describe("ColumnPageType.cy.tsx", () => {
  it("show mount data-info", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <ColumnPageType column={column} index={"1"} typeColumn={"name"} />
      </Provider>
    );
  });
});
