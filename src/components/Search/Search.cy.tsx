import { Provider } from "react-redux";
import store from "../../store/store";
import Search from "./Search";

describe("Search.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("show mount", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <Search />
      </Provider>
    );
  });

  it("show mount with keyword search", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    cy.get('[data-hook="input-search"]')
      .type("dada")
      .trigger("keydown", { key: "Enter" })
      .clear()
      .type("123456");
    cy.get('[data-hook="icon-search"]').click();

    cy.get('[data-hook="icon-delete-keyword"]').click();
  });
});
