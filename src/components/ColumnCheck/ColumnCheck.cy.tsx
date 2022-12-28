import { Provider } from "react-redux";
import store from "../../store/store";
import ColumnCheck from "./ColumnCheck";

describe("ColumnCheck.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("show mount", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <ColumnCheck />
      </Provider>
    );
  });

  it("show mount onClick", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <ColumnCheck />
      </Provider>
    );

    cy.get('[data-hook="action-closesave"]').invoke("show").trigger("click");
  });
});
