describe("Login - Casos de Teste", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/login.html");
  });

  it("TC1 - Login com credenciais válidas", () => {
    cy.get("#email").type("admin@admin.com");
    cy.get("#senha").type("admin@123");
    cy.get("#btn-entrar").click();
    cy.url().should("include", "/produtos.html?teste=123");
  });

  it("TC2 - Login com e-mail inválido", () => {
    cy.get("#email").type("invalido@gmail.com");
    cy.get("#senha").type("admin@123");
    cy.get("#btn-entrar").click();

    cy.get(".alert").should("contain", "E-mail ou senha inválidos");
  });

  it("TC3 - Login com senha inválida", () => {
    cy.get("#email").type("admin@admin.com");
    cy.get("#senha").type("senhaerrada");
    cy.get("#btn-entrar").click();

    cy.get(".alert").should("contain", "E-mail ou senha inválidos");
  });

  it("TC4 - Campos obrigatórios vazios", () => {
    cy.get("#btn-entrar").click();
    cy.get(".alert").should("contain", "Informe usuário e senha, os campos não podem ser brancos.");
  });

  it("TC5 - Fechar alerta de erro", () => {
    cy.get("#btn-entrar").click();
    cy.get(".alert").should("be.visible");
    cy.get(".alert .close").click();
    cy.get(".alert").should("not.be.visible");
  });
});
