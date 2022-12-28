import { Provider } from "react-redux";
import store from "../../store/store";
import Products from "./Products";

describe("Products.cy.tsx", () => {
  it("show mount", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <Products />
      </Provider>
    );
  });

  it("show mount with keyword search", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <Products />
      </Provider>
    );
    cy.get('[data-hook="input-search"]')
      .focus({})
      .type("dada")
      .trigger("keydown", { key: "Enter" })
      .clear()
      .type("123456");
    cy.get('[data-hook="icon-search"]').click();
    cy.get('[data-hook="icon-delete-keyword"]').click();
  });

  it("show mount with onCick filter data", () => {
    cy.viewport("macbook-15");
    cy.mount(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    cy.get('[data-hook="btn-filter"]').click();
    cy.get('[data-hook="input-name"]').focus().type("dadawd");
    cy.get('[data-hook="select-office"]')
      .select(2)
      .should("have.value", "Sydney");
    cy.wait(2000);
    cy.get('[data-hook="apply-filter"]').click();
    cy.get('[data-hook="delete-keyword-name"]').click();
    cy.wait(2000);
    cy.get('[data-hook="delete-keyword-office"]').click();
  });

  it("show mount with onClick action columns", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    cy.get('[data-hook="action-select"]').trigger("click");
    cy.wait(2000);
    cy.get('[data-hook="action-select"]').trigger("click");
    cy.wait(1000);
    cy.get('[data-hook="action-select"]').trigger("click");

    cy.get('[data-hook="menu-action"]').trigger("click");
  });

  it("show mount change value page", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <Products />
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

  it("show mount onClick paginate", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    cy.get('[data-hook="previous"]').click();
    cy.get('[data-hook="next"]').click();
    cy.get('[data-hook="value-page"]')
      .clear()
      .type("2")
      .trigger("keydown", { key: "Enter" });
  });

  it("show mount onClick column check", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    cy.get('[data-hook="action-closesave"]').invoke("show").trigger("click");
  });
});
