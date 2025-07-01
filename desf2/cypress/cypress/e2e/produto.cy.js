describe("Testes da tela de produtos", () => {

  const abrirModal = () => {
    cy.get("#btn-adicionar").click();
    cy.get("#btn-adicionar").click();
  };

  const preencherProduto = (produto) => {
    cy.get("#codigo").type(produto.codigo);
    cy.get("#nome").type(produto.nome);
    cy.get("#quantidade").type(produto.quantidade);
    cy.get("#valor").type(produto.valor);
    cy.get("#data").type(produto.data);
  };

  const salvarProduto = () => {
    cy.get("#btn-salvar").click();
    cy.get("#btn-salvar").click();
  };

  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/produtos.html?teste=123");
  });

  it("TC1 - Exibe o modal ao clicar no botão 'Criar'", () => {
    abrirModal();
    cy.get("#cadastro-produto").should("be.visible");
  });

  it("TC2 - Valida alerta ao tentar salvar com campos vazios", () => {
    abrirModal();
    salvarProduto();
    cy.get(".alert-danger")
      .should("be.visible")
      .and("contain", "Todos os campos são obrigatórios");
  });

  it("TC3 - Adiciona um produto válido à tabela", () => {
    abrirModal();
    preencherProduto({
      codigo: "001",
      nome: "Mouse",
      quantidade: "10",
      valor: "99.90",
      data: "2025-06-25"
    });
    salvarProduto();

    cy.get("table tbody tr").should("have.length.at.least", 1);
    cy.get("table tbody tr:last-child td").eq(0).should("contain", "001");
    cy.get("table tbody tr:last-child td").eq(1).should("contain", "Mouse");
  });

  it("TC4 - Fecha o modal ao clicar no botão 'Sair'", () => {
    abrirModal();
    cy.get("#cadastro-produto").should("be.visible");

    cy.get("#btn-sair").click();
    cy.get("#btn-sair").click();

    cy.get("#cadastro-produto").should("not.be.visible");
  });

});
