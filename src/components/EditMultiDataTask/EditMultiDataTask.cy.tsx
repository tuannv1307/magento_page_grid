import { Provider } from "react-redux";
import store from "../../store/store";
import EditMultiDataTask from "./EditMultiDataTask";

describe("EditMultiDataTask.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("show mount ", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <EditMultiDataTask typeColumn={"name"} />
        <EditMultiDataTask typeColumn={"position"} />
      </Provider>
    );
  });

  it("show mount onChange input", () => {
    cy.viewport("macbook-15");

    cy.mount(
      <Provider store={store}>
        <EditMultiDataTask typeColumn={"name"} />
        <EditMultiDataTask typeColumn={"position"} />
      </Provider>
    );

    cy.get('[data-hook="input-name"]').type("dawdaw").wait(2000).clear();
    cy.get('[data-hook="input-position"]').type("dawdaw");
  });
});
