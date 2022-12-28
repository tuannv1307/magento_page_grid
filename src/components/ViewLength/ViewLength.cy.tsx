import { Provider } from "react-redux";
import store from "../../store/store";
import ViewLength from "./ViewLength";

describe("ViewLength.cy.tsx", () => {
  it("show mount", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <ViewLength />
      </Provider>
    );
  });

  it("show mount change value", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <ViewLength />
      </Provider>
    );
    cy.get('[data-hook="input-change-length"]')
      .clear()
      .type("40")
      .trigger("keydown", { key: "Enter" })
      .clear()
      .type("dawddd")
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="btn-toggle-menu"]').click();
    cy.get('[data-hook="btn-value"]').click();
    cy.wait(2000);
    cy.get('[data-hook="btn-toggle-menu"]').click();
    cy.get('[data-hook="btn-customs"]').click();
    cy.get('[data-hook="input-customs"]').type("37");
    cy.get('[data-hook="btn-customs-edit"]').click();
  });
});
