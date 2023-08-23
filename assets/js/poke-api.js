const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon(); // cria um novo objeto com a class Pokemon
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name); // Mapeia a array types em uma nova array somente com os nomes dos tipos
  const [type] = types; // Desestrutura a array em uma variavel
  pokemon.types = types; // Atribui as variaveis como propriedades do objeto que sera criado
  pokemon.type = type;

  const skills = pokeDetail.abilities.map(
    (skillsSlot) => skillsSlot.ability.name
  ); // Mapeia a array abilities em uma nova array somente com os nomes das habilidades
  const [skill1, skill2 = 'not have 2nd skill'] = skills; // desestrutura a array em duas variaveis para armazenar a skill1 e skill 2 do pokemon requisitado a API
  pokemon.skill1 = skill1; // Atribui as variaveis como propriedades do objeto que sera criado
  pokemon.skill2 = skill2;

  const statsValues = pokeDetail.stats.map((statsSlot) => statsSlot.base_stat); //Mapeia a array stats em uma nova array somente com os atributos base_stats
  const [
    statValueHp,
    statValueAtk,
    statValueDef,
    statValueSatk,
    statValueSdef,
    statValueSpd,
  ] = statsValues; // desestrutura a array em 6 variaveis representando os atributos do pokemon

  pokemon.statValueHp = statValueHp; // Atribui as variaveis como propriedades do objeto que sera criado
  pokemon.statValueAtk = statValueAtk;
  pokemon.statValueDef = statValueDef;
  pokemon.statValueSatk = statValueSatk;
  pokemon.statValueSdef = statValueSdef;
  pokemon.statValueSpd = statValueSpd;
  pokemon.total =
    statValueAtk + statValueDef + statValueSatk + statValueSdef + statValueSpd;

  return pokemon; // Retorna o objeto criado
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getPokemonDetail = async (pokemon) => {
  const response = await fetch(pokemon.url);
  const pokeDetail = await response.json();
  return convertPokeApiDetailToPokemon(pokeDetail);
};

pokeApi.getPokemonDetailForModal = async (pokemonNumber) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;
  const response = await fetch(url);
  const pokeDetail = await response.json();
  const pokemonDetail = convertPokeApiDetailToPokemon(pokeDetail);

  openModal(); //Abrir o modal depois que os detalhes forem carregados

  return pokemonDetail;
};
