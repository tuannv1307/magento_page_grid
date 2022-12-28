import { Provider } from "react-redux";
import store from "../../store/store";
import HideShowColumns from "./HideShowColumns";

describe("HideShowColumns.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("show mount", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <HideShowColumns />
      </Provider>
    );
  });

  it("show mount with onClick", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <HideShowColumns />
      </Provider>
    );
    cy.get('[data-hook="btn-columns"]').click();
    cy.get('[data-hook="btn-reset"]').invoke("show").click({ force: true });
    cy.wait(2000);
    cy.get('[data-hook="btn-cancel"]').invoke("show").click();
  });
});
