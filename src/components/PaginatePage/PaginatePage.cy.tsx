import { Provider } from "react-redux";
import store from "../../store/store";
import PaginatePage from "./PaginatePage";

describe("App.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("show mount", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <PaginatePage />
      </Provider>
    );
  });

  it("show mount onClick", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <PaginatePage />
      </Provider>
    );

    cy.get('[data-hook="previous"]').click();
    cy.get('[data-hook="next"]').click();
    cy.get('[data-hook="value-page"]')
      .clear()
      .type("2")
      .trigger("keydown", { key: "Enter" });
  });
});
