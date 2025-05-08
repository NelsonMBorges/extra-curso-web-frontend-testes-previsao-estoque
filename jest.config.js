const { criarProduto } = require("../src/index");

test("Criação de um produto", () => {
    const produto = criarProduto("Celular", 1500, 10);
    expect(produto.nome).toBe("Celular");
    expect(produto.preco).toBe(1500);
    expect(produto.estoque).toBe(10);
});