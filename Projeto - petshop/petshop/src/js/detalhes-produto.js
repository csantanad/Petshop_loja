
function fornecerIdCard() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function fornecerDadosCard() {
  const id = fornecerIdCard();
  console.log(id);
  const res = await fetch(`http://localhost:3000/produtos/${id}`);
  const produto = await res.json();
  const divContainer = document.querySelector(".detalhes");

  divContainer.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${produto.srcImg}" alt="Imagem do Produto" class="img-fluid rounded">
            </div>
            <div class="col-md-6" style="display: flex; flex-direction: column; justify-content: center; ">
                <h2>${produto.titulo}</h2>
                <p class="lead" style="margin-left: 10px; text-align: justify;">${produto.descricao}</p>

                <h3>Preço:</h3>
                <p class="lead" style="margin-left: 10px; color: rgb(179, 154, 13);"><strong>R$ ${produto.preco}</strong></p>
                <hr>

                <button id="add-to-cart" class="btn btn-primary" style="width: 200px; background-color: rgb(243, 210, 20); border: none;">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;
  document.getElementById("add-to-cart").addEventListener("click", () => adicionarAoCarrinho(produto));
}
function adicionarAoCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  const produtoExistente = carrinho.find(item => item.id === produto.id);

  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    carrinho.push({ id: produto.id, quantidade: 1 });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  alert(`${produto.titulo} foi adicionado ao carrinho.`);
}
fornecerDadosCard();