class Componente extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const div = document.createElement("div");
    div.className = 'card-product';
    div.innerHTML = `
      <style>      
        .card-product{
          box-shadow: 0 1px 10px rgba(0, 0, 0, 0.288);
          border-radius: 10px;
          width: 210px;
          height: 320px;
          padding: 10px;
          margin: 0px 30px 40px 30px;
        }
        
        .card-product > a > img {
          width: 190px;
          height: 165px;
        }
        
        .card-product h2{
          font-size: 18px;
          margin-top: 20px;
          text-align: center;
          transition: 0.3s all;
        }
        
        .card-product h2:hover{
          cursor: pointer;
          color: #666666;
        }
        
        .card-product p{
          text-align: center;
          margin-top: 10px;
          margin-bottom: 10px;
          font-weight: 600;
          color: rgb(179, 154, 13);
          border-bottom: 1px solid rgba(0, 0, 0, 0.178);
        }
        
        .card-product button{
          border: none;
          border-radius: 7px;
          background-color: rgb(243, 210, 20);
          color: white;
          margin-left: 13px;
          transition: 0.2s;
        }
        
        .card-product button:hover{
          background-color: rgb(218, 185, 3);
        }
      </style>

      <a href="mercadoria.index.html?id=${this.getAttribute('id')}">
        <img src="${this.getAttribute('srcImg')}" alt="">
      </a>
      <div>
        <h2>${this.getAttribute('titulo')}</h2>
        <p>R$ ${this.getAttribute('preco')}</p>
      </div>
    `;
    this.appendChild(div);
  }
}

customElements.define("card-compra", Componente);

fetch("http://localhost:3000/produtos")
  .then((res) => res.json())
  .then((json) => renderizar(json));

function renderizar(produtos) {
  const section = document.querySelector(".products");

  produtos.forEach((produto) => {
    const cardCompra = document.createElement("card-compra");

    cardCompra.setAttribute("id", produto.id);
    cardCompra.setAttribute("titulo", produto.titulo);
    cardCompra.setAttribute("srcImg", produto.srcImg);
    cardCompra.setAttribute("preco", produto.preco);
    cardCompra.setAttribute("descricao", produto.descricao);

    section.appendChild(cardCompra);
  });
}