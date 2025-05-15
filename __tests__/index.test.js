const { criarProduto, venderDia, diasAteEstoqueZerado } = require("../src/index");

test("Criação de um produto", () => {
    const produto = criarProduto("Celular", 1500, 10);
    expect(produto.nome).toBe("Celular");
    expect(produto.preco).toBe(1500);
    expect(produto.estoque).toBe(10);
});

test("Vender produtos reduz corretamente o estoque", () => {
    const produto = criarProduto("Celular", 1500, 10);
    venderDia(produto, 3);
    expect(produto.estoque).toBe(7);
});

test("Verifica dias até estoque zerar corretamente", () => {
    const produto = criarProduto("Notebook", 3000, 20);
    venderDia(produto, 5);
    venderDia(produto, 5);
    expect(diasAteEstoqueZerado(produto)).toBeGreaterThan(0);
});

test("Não permite vender mais do que o estoque disponível", () => {
    const produto = criarProduto("Fone de Ouvido", 200, 2);
    venderDia(produto, 5);
    expect(produto.estoque).toBe(2); // O estoque não pode ser reduzido
});

test("Calcula corretamente dias até estoque zerar quando o histórico de vendas está vazio", () => {
    const produto = criarProduto("Tablet", 2500, 10);
    expect(diasAteEstoqueZerado(produto)).toBe("Sem histórico de vendas.");
});