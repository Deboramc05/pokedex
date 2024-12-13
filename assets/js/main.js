const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const detailPokemon = document.getElementById('detailPokemon');

const maxRecord = 151;
const limit = 10;
let offset = 0;

let namePokemon = '';

function loadPokemonItems(offset, limit) {

   pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map((pokemon) => `
         <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.order}</span>
            <span class="name" id="pokemonPokedex"><a href="pokemonDetail.html">${pokemon.name}</a></span>
      
            <div class="detail">
               <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
               </ol>
      
               <img
                  src="${pokemon.photo}"
                  alt="${pokemon.name}">
            </div>
         </li>
      `).join('');

      pokemonList.innerHTML += newHtml;
   });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
   offset += limit;

   const qtdRecordsWithNextPage = offset + limit;

   if (qtdRecordsWithNextPage >= maxRecord) {
      const newLimit = maxRecord - offset;
      loadPokemonItems(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
   } else {
      loadPokemonItems(offset, limit);
   }
});

function loadPokemonDetails(pokemonName) {

   window.open('pokemonDetail.html', '_parent');
   const pokemonPokedex = document.getElementById('pokemonPokedex');

   pokemonPokedex.addEventListener('click', () => {
      pokeApi.getPokemons(pokemonName).then((pokemons = []) => {
         const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
               <span class="number">#${pokemon.order}</span>
               <span class="name">${pokemon.name})</span>
         
               <div class="detail">
                  <ol class="types">
                     ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                  </ol>
         
                  <img
                     src="${pokemon.photo}"
                     alt="${pokemon.name}">
               </div>
            </li>
         `).join('');
   
         detailPokemon.innerHTML += newHtml;
      });
   })
}

