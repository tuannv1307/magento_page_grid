import { Provider } from "react-redux";
import store from "../../store/store";
import ActionsSelect from "./ActionsSelect";

describe("ActionsSelect.cy.tsx", () => {
  it("show mount ", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <ActionsSelect />
      </Provider>
    );
  });

  it("show mount with onClick", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <ActionsSelect />
      </Provider>
    );

    cy.get('[data-hook="action-select"]').trigger("click");
    cy.wait(2000);
    cy.get('[data-hook="action-select"]').trigger("click");
    cy.wait(1000);
    cy.get('[data-hook="action-select"]').trigger("click");
    cy.get('[data-hook="menu-action"]').trigger("click");
  });
});
