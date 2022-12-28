import { Provider } from "react-redux";
import store from "../../store/store";
import FiltersData from "./FiltersData";

describe("FiltersData.cy.tsx", () => {
  it("show mount", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <FiltersData />
      </Provider>
    );
  });

  it("show mount with onCick", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <FiltersData />
      </Provider>
    );
    cy.get('[data-hook="btn-filter"]').click();
    cy.get('[data-hook="input-name"]').focus().type("dadawd");
    cy.get('[data-hook="select-office"]')
      .select(2)
      .should("have.value", "Sydney");
    cy.wait(2000);
    cy.get('[data-hook="apply-filter"]').click();
  });
});
