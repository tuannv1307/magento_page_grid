import { Provider } from "react-redux";
import store from "../../store/store";
import ColumnPageType from "./ColumnPageType";

describe("ColumnPageType.cy.tsx", () => {
  it("show mount data-info", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <ColumnPageType />
      </Provider>
    );
  });
});
