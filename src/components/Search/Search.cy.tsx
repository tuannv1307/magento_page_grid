import { Provider } from "react-redux";
import store from "../../store/store";
import Search from "./Search";

describe("Search.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("show mount data-info", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <Search />
      </Provider>
    );
  });
});
