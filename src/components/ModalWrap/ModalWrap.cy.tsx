import { Provider } from "react-redux";
import store from "../../store/store";
import ModalWrap from "./ModalWrap";

describe("ViewLength.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("show mount", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <ModalWrap />
      </Provider>
    );
  });

  it("show mount modal", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <ModalWrap />
      </Provider>
    );

    cy.get('[data-hook="modal"]').invoke("show");
  });
});
