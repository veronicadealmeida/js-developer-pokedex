const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const detailsModal = document.getElementById('pokemonListDetails');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" ontouch="requestDetail(${
    pokemon.number
  })" onclick='requestDetail(${pokemon.number})'">
            <span class="number">#${('000' + pokemon.number).slice(-3)}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function requestDetail(pokemonNumber) {
  pokeApi.getPokemonDetailForModal(pokemonNumber).then((pokemonDetail = []) => {
    detailsModal.innerHTML = `
    <div id="my-modal" class="detail" onblur="fechar()">
        <div class="top ${pokemonDetail.type}">
            <div class="headDetail" >
                
                
                <div ${pokemonDetail.type}">
                    <span class="numberDetail">#${(
                      '000' + pokemonDetail.number
                    ).slice(-3)}</span>
                </div>
                
                <div class="typesDetail">
                    <span class="nameDetail">${pokemonDetail.name}</span>

                    <ol id="types">
                        ${pokemonDetail.types
                          .map(
                            (type) => `<li class="type ${type}">${type}</li>`
                          )
                          .join('')}
                    </ol>
                </div>
            </div>
            <div>                
                <div class="imageDetail">
                    <img src="${pokemonDetail.photo}" alt="${
      pokemonDetail.name
    }">
                </div>
            </div>
        </div>

        <div id="info" class="info">
       <div class="about">
            <ul>
                <li>HP</li>
                <li>Attack</li>
                <li>Defense</li>
                <li>Sp. Atk.</li>
                <li>Sp. Def.</li>
                <li>Speed</li>
                <li>Total</li>
            </ul>
        </div>
        <div class="about-value">
            <ul>
                <li>${pokemonDetail.statValueHp}</li>
                <li>${pokemonDetail.statValueAtk}</li>
                <li>${pokemonDetail.statValueDef}</li>
                <li>${pokemonDetail.statValueSatk}</li>
                <li>${pokemonDetail.statValueSdef}</li>
                <li>${pokemonDetail.statValueSpd}</li>
                <li>${pokemonDetail.total}</li>

            </ul>
        </div>
        </div>
    </div>
    `;
  });
}

loadPokemonItens(offset, limit); //Função chamada para carregar os primeiros 10 cards

// Função para carregar mais pokemons ao clicar no botão loadMore
loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

// window.addEventListener('mouseup', function (event) {
//   var pol = document.getElementById('my-modal');
//   if (event.target != pol && event.target.parentNode != pol) {
//     pol.style.display = 'none';
//   }
// });

document.addEventListener('click', function (e) {
  //verifica se o alvo do seu clique está sendo o modal ou um botão
  if (e.target != document.getElementById('my-modal')) {
    fecharModalLancamento();
  }
});

function fecharModalLancamento() {
  document.getElementById('my-modal').style.display = 'none';
}
