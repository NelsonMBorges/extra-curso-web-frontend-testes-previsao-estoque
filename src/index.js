// Função para criar um produto
function criarProduto(nome, preco, estoqueInicial) {
  return { nome, preco, estoque: estoqueInicial, vendas: [] };
}

// Função para vender produtos por um dia e atualizar o estoque
function venderDia(produto, quantidade) {
  if (produto.estoque >= quantidade) {
      produto.estoque -= quantidade;
      produto.vendas.push(quantidade);
      console.log(`${quantidade} unidade(s) vendidas de ${produto.nome}.`);
  } else {
      console.log(`Estoque insuficiente para vender ${quantidade} unidade(s) de ${produto.nome}.`);
  }
}

// Função para calcular dias até estoque zerar com base na média de vendas
function diasAteEstoqueZerado(produto) {
  if (produto.vendas.length === 0) return "Sem histórico de vendas.";
  
  const mediaVendas = produto.vendas.reduce((acc, val) => acc + val, 0) / produto.vendas.length;
  return produto.estoque > 0 ? Math.ceil(produto.estoque / mediaVendas) : 0;
}

// Função para adicionar um produto à loja
function adicionarProdutoNaLoja(loja, produto) {
  loja.push(produto);
}

// Função para verificar qual produto está mais próximo de esgotar o estoque
function produtoMaisProximoDeEsgotar(loja) {
  return loja.reduce((menor, produto) => {
      const dias = diasAteEstoqueZerado(produto);
      return dias < menor.dias ? { produto, dias } : menor;
  }, { produto: null, dias: Infinity });
}


// Função para sugerir uma quantidade de reabastecimento com base no histórico de vendas
function sugerirReabastecimento(produto) {
  const mediaVendas = produto.vendas.length > 0 ? 
      produto.vendas.reduce((acc, val) => acc + val, 0) / produto.vendas.length : 1;
  return Math.ceil(mediaVendas * 10); // Sugestão de reabastecimento para 10 dias
}


// Função para simular vendas por 30 dias
function simularVendasPor30Dias(produto) {
  for (let i = 0; i < 30; i++) {
      venderDia(produto, Math.floor(Math.random() * 5)); // Venda aleatória entre 0 e 4 unidades por dia
  }
}


// Função para simular as vendas para todos os produtos da loja
function simularVendasNaLoja(loja) {
  loja.forEach(produto => simularVendasPor30Dias(produto));
}


module.exports = {
  criarProduto,
  venderDia,
  diasAteEstoqueZerado,
  adicionarProdutoNaLoja,
  produtoMaisProximoDeEsgotar,
  sugerirReabastecimento,
  simularVendasNaLoja,
};
