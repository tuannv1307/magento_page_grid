import App from "./App";

describe("App.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("show mount", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
  });
});
