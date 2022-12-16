import App from "./App";

describe("App.cy.tsx", () => {
  // beforeEach(() => {
  //   cy.wait(1000);
  // });

  it("is true", () => {
    cy.viewport(1000, 1000);
    expect(true).to.be.true;
  });

  it("show mount", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
  });

  it("show mount with select length data", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);

    cy.wait(1000);

    cy.get('[data-hook="seclect-length-data"]')
      .select(1)
      .should("have.value", 25)
      .wait(1000)
      .select(0);
  });

  it("show mount with input search", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);

    cy.wait(1000);

    cy.get('[data-hook="input-search"]')
      .type("b")
      .wait(1000)
      .type("a")
      .wait(1000)
      .type("a")
      .wait(1000)
      .clear();
  });

  it("show mount with sorting", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);

    cy.wait(1000);

    cy.get('[data-hook="sorting"]').eq(0).wait(1000).click().wait(1000).click();
    cy.get('[data-hook="sorting"]').eq(1).wait(1000).click().wait(1000).click();
    cy.get('[data-hook="sorting"]').eq(2).wait(1000).click().wait(1000).click();
    cy.get('[data-hook="sorting"]').eq(3).wait(1000).click().wait(1000).click();
    cy.get('[data-hook="sorting"]').eq(4).wait(1000).click().wait(1000).click();
  });

  it("show mount with click show salary ", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);

    cy.wait(1000);

    cy.get('[data-hook="dtrControl"]')
      .eq(0)
      .wait(1000)
      .click()
      .wait(1000)
      .click()
      .wait(1000);
  });

  it("show mount with doubleClick edit input", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);

    cy.wait(1000);

    cy.get('[data-hook="dtrControl"]').eq(0).wait(1000).dblclick().wait(1000);
    cy.get('[data-hook="input-edit"]')
      .eq(1)
      .focus()
      .type("123tuan")
      .trigger("keydown", { key: "Enter" });
  });
  it("show mount click paginate with next ", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.wait(1000);
    cy.get('[data-hook="next"]')
      .contains("Next")
      .trigger("click")
      .wait(1000)
      .trigger("click")
      .wait(1000)
      .trigger("click")
      .wait(1000)
      .trigger("click")
      .wait(1000)
      .trigger("click");

    cy.wait(1000);
  });
  it("show mount click paginate with  previous", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.wait(1000);
    cy.get('[data-hook="btn-item-page"]').eq(5).click();

    cy.wait(1000);

    cy.get('[data-hook="previous"]')
      .contains("Previous")
      .trigger("click")
      .wait(1000)
      .trigger("click")
      .wait(1000)
      .trigger("click")
      .wait(1000)
      .trigger("click")
      .wait(1000)
      .trigger("click");
    cy.wait(1000);
  });

  it("show mount click paginate with btn-item-page", () => {
    cy.viewport("macbook-15");

    cy.mount(<App />);

    cy.wait(1000);

    cy.get('[data-hook="btn-item-page"]').eq(1).click();
    cy.wait(1000);
    cy.get('[data-hook="btn-item-page"]').eq(3).click();
    cy.wait(1000);
    cy.get('[data-hook="btn-item-page"]').eq(5).click();
    cy.wait(1000);
    cy.get('[data-hook="btn-item-page"]').eq(2).click();
    cy.wait(1000);
    cy.get('[data-hook="btn-item-page"]').eq(4).click();
    cy.wait(1000);
    cy.get('[data-hook="btn-item-page"]').eq(0).click();
  });
});
