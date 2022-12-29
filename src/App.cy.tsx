import App from "./App";

describe("App.cy.tsx", () => {
  it("show mount", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
  });

  it("show mount with keyword search", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
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
    cy.mount(<App />);
    cy.get('[data-hook="btn-filter"]').click();
    cy.get('[data-hook="input-name"]').focus().type("dadawd");
    cy.get('[data-hook="select-office"]')
      .select(2)
      .should("have.value", "Sydney");
    cy.wait(1000);
    cy.get('[data-hook="apply-filter"]').click();
    cy.get('[data-hook="delete-keyword-name"]').click();
    cy.wait(1000);
    cy.get('[data-hook="delete-keyword-office"]').click();
  });

  it("show mount with onClick hide and show colums ", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.get('[data-hook="btn-columns"]').click();
    cy.wait(1000);
    cy.get('[data-hook="btn-cancel"]').invoke("show").click();
    cy.wait(1000);
    cy.get('[data-hook="btn-columns"]').click();
    cy.get('[data-hook="hideshow-columns"]').eq(5).click();
    cy.get('[data-hook="hideshow-columns"]').eq(1).click();
    cy.wait(1000);
    cy.get('[data-hook="btn-reset"]').click();
  });

  it("show mount with onClick actions", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.get('[data-hook="action-select"]').trigger("click");
    cy.wait(1000);
    cy.get('[data-hook="action-select"]').trigger("click");
    cy.wait(1000);
    cy.get('[data-hook="action-select"]').trigger("click");
    cy.get('[data-hook="menu-action"]').trigger("click");
    cy.wait(1000);
    cy.get('[data-hook="btn-ok-modal"]').click();
    cy.get('[data-hook="item-check"]').eq(2).click({ multiple: true });
    cy.get('[data-hook="action-select"]').trigger("click");
    cy.wait(1000);
    cy.get('[data-hook="menu-action"] li').eq(0).trigger("click");
    cy.wait(1000);
    cy.get('[data-hook="btn-ok-modal"]').click();
  });

  it("show mount change value page", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.get('[data-hook="input-change-length"]')
      .clear()
      .type("40")
      .trigger("keydown", { key: "Enter" })
      .clear()
      .type("dawddd")
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="btn-toggle-menu"]').click();
    cy.get('[data-hook="btn-value"]').click();
    cy.wait(1000);
    cy.get('[data-hook="btn-toggle-menu"]').click();
    cy.get('[data-hook="btn-customs"]').click();
    cy.get('[data-hook="input-customs"]').type("37");
    cy.get('[data-hook="btn-customs-edit"]').click();
  });

  it("show mount onClick paginate", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.get('[data-hook="previous"]').click();
    cy.get('[data-hook="next"]').click();
    cy.get('[data-hook="value-page"]')
      .clear()
      .type("2")
      .trigger("keydown", { key: "Enter" });
    cy.get('[data-hook="value-page"]')
      .clear()
      .type("dawd")
      .trigger("keydown", { key: "Enter" });
  });

  it("show mount onClick column check", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.get('[data-hook="action-closesave"]').trigger("click");
    cy.get('[data-hook="action-menu-check"] li').eq(0).trigger("click");
    cy.get('[data-hook="action-closesave"]').trigger("click");
    cy.get('[data-hook="action-menu-check"] li').eq(0).trigger("click");
    cy.get('[data-hook="action-closesave"]').trigger("click");
    cy.get('[data-hook="action-menu-check"] li').eq(1).trigger("click");
    cy.get('[data-hook="action-closesave"]').trigger("click");
    cy.get('[data-hook="action-menu-check"] li').eq(1).trigger("click");
    cy.get('[data-hook="item-check"]').eq(5).click({ multiple: true });
    cy.get('[data-hook="item-check"]').eq(7).click({ multiple: true });
    cy.get('[data-hook="item-check"]').eq(10).click({ multiple: true });
  });

  it("show mount onClick column actions", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.get('[data-hook="btn-show-column-action"]').eq(7).click();
    cy.get('[data-hook="item-actions"]').eq(0).click();
    cy.get('[data-hook="btn-show-column-action"]').eq(7).click();
    cy.get('[data-hook="item-actions"]').eq(1).click();
  });

  it("show mount dbClick", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.get('[data-hook="task-item"]').eq(5).dblclick({ multiple: true });
    cy.get('[data-hook="input-edit"]').eq(0).type("dawdawd");
    cy.get('[data-hook="input-edit"]').eq(1).type("123");
    cy.get('[data-hook="input-edit"]').eq(2).type("323");
    cy.get('[data-hook="select-value-office"]').select(4);
    cy.get('[data-hook="select-value-status"]').select(1);
    cy.get('[ data-hook="btn-save"]').click();
  });

  it("show mount dbClick with edit multi", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.get('[data-hook="task-item"]').eq(5).dblclick({ multiple: true });
    cy.get('[data-hook="item-check"]').eq(6).click({ multiple: true });
    cy.get('[data-hook="input-name"]').eq(1).focus().type("aaa");
    cy.get('[data-hook="input-position"]').type("bbb");
    cy.get('[data-hook="input-status"]').select(2);
    cy.get('[data-hook="btn-apply"]').click();
    cy.get('[data-hook="btn-save-edit"]').click();
  });

  it.only("show mount sort", () => {
    cy.viewport("macbook-15");
    cy.mount(<App />);
    cy.get('[data-hook="title"]').eq(4).click();
  });
});
