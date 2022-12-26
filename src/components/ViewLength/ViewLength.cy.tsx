import { Provider } from "react-redux";
import store from "../../store/store";
import ViewLength from "./ViewLength";

describe("ViewLength.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("show mount data-info", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <ViewLength />
      </Provider>
    );
  });
});
