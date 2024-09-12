document.addEventListener('DOMContentLoaded', () => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const tbody = document.getElementById('produtos');

  function carregarProdutos() {
    tbody.innerHTML = '';
    if (carrinho.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center">O carrinho está vazio.</td></tr>';
      return;
    }

    carrinho.forEach(item => {
      fetch(`http://localhost:3000/produtos/${item.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao carregar o produto');
          }
          return response.json();
        })
        .then(produto => {
          tbody.innerHTML += `
              <tr>
                  <td>
                      <figure class="media">
                          <div class="img-wrap">
                              <img src="${produto.srcImg}" class="img-thumbnail">
                          </div>
                          <figcaption class="media-body" style="margin-top: 20px;">
                              <h6 class="title text-truncate">${produto.titulo}</h6>
                          </figcaption>
                      </figure>
                  </td>
                  <td>
                      <input type="number" value="${item.quantidade}" min="1" max="10" class="form-control" onchange="alterarQuantidade(this, ${produto.id})">
                  </td>
                  <td>
                      <div class="price-wrap">
                          <var class="price">R$ ${(produto.preco * item.quantidade).toFixed(2)}</var>
                      </div>
                  </td>
                  <td class="text-right">
                      <button class="btn btn-outline-danger" onclick="remover(${produto.id})">Remover</button>
                  </td>
              </tr>
          `;
        })
        .catch(error => console.error('Erro ao carregar produto:', error));
    });
  }

  function alterarQuantidade(el, id) {
    const quantidade = Number(el.value);
    const item = carrinho.find(item => item.id === id);
    if (item) {
      item.quantidade = quantidade;
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      carregarProdutos(); // Atualiza a exibição
    }
  }

  function remover(id) {
    const index = carrinho.findIndex(item => item.id === id);
    if (index !== -1) {
      carrinho.splice(index, 1);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      carregarProdutos(); // Atualiza a exibição
    }
  }

  window.alterarQuantidade = alterarQuantidade;
  window.remover = remover;

  carregarProdutos();

});
