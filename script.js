let listaDecompras = [];

const formAdicionar = document.getElementById("formAdicionar");
const inputItem = document.getElementById("novoItem");
const inputQtd = document.getElementById("quantidade");
const selectCat = document.getElementById("categoria");
const btnBaixar = document.getElementById("baixar");

const categorias = [
  "Limpeza","Grãos","Proteínas","Temperos Secos",
  "Temperos Verdes","Legumes","Laticínios",
  "Complementos de Cozimento","Outros"
];

// Renderiza os itens numerados por categoria
function renderLista() {
  document.querySelectorAll("#listas ul").forEach(ul => ul.innerHTML = "");

  categorias.forEach(cat => {
    let contador = 0;
    listaDecompras.forEach(obj => {
      if (obj.categoria === cat) {
        contador++;
        const li = document.createElement("li");
        li.textContent = `${contador}. ${obj.nome} - Qtd: ${obj.quantidade}`;
        document.getElementById(cat).appendChild(li);
      }
    });
  });
}

// Adicionar item
formAdicionar.addEventListener("submit", e => {
  e.preventDefault();
  const nome = inputItem.value.trim();
  const quantidade = parseInt(inputQtd.value);
  const categoria = selectCat.value;

  if (nome && quantidade > 0 && categoria) {
    listaDecompras.push({ nome, quantidade, categoria });
    renderLista();
    formAdicionar.reset();
    selectCat.selectedIndex = 0;
  }
});

// Baixar lista em arquivo .txt
btnBaixar.addEventListener("click", () => {
  const conteudo = listaDecompras
    .map(obj => `${obj.nome} - Qtd: ${obj.quantidade} (Categoria: ${obj.categoria})`)
    .join("\n");
  const blob = new Blob([conteudo], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "lista-de-compras.txt";
  a.click();

  URL.revokeObjectURL(url);
});
