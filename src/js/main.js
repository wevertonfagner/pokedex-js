const pokemonList = document.querySelector("#pokemonList");
const loadMoreButton = document.querySelector("#loadMoreButton");
const pokemonElement = document.querySelector('.pokemons');
const popup = document.querySelector('.popup-wrapper');

pokemonElement.addEventListener('click', () => {
popup.style.display = 'block'

})

popup.addEventListener('click', event => {
  const classNameOfClickedElement = event.target.classList[0]
  const classNames = ['popup-close', 'popup-wrapper']
  const shouldClosepoup = classNames.some(className => className === classNameOfClickedElement)

  if(shouldClosepoup){ 
  popup.style.display = 'none'
  }
})

// Cria os elementos HTML
var titulo = document.createElement("h1");
var nome = document.createElement("p");
var tipo = document.createElement("p");
var habilidade = document.createElement("p");

// Adiciona o conteúdo aos elementos
titulo.innerText = Pokemon.type;
nome.innerText = "Nome: Pikachu";
tipo.innerText = "Tipo: Elétrico";
habilidade.innerText = "Habilidade: Choque do Trovão";

// Encontra o elemento com a classe desejada e adiciona os novos elementos a ele
var classeAlvo = document.querySelector(".popup-content");
classeAlvo.appendChild(titulo);
classeAlvo.appendChild(nome);
classeAlvo.appendChild(tipo);
classeAlvo.appendChild(habilidade);


const maxRecords = 151;
const limit = 12;
let offset = 0;

function convertPokemonToLi(pokemon) {
  
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
        <div class="popup-wrapper">
        <div class="popup">
          <div class = "popup-close">X</div>
              <div class="popup-content">
              <h1>Informações do Pokemon</h1>
              <p>Nome: Pikachu</p>
              <p>Tipo: Elétrico</p>
              <p>Habilidade: Choque do Trovão</p>
            </div>
          </div>
      </div>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });

  
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = qtdRecordNextPage - maxRecords;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
