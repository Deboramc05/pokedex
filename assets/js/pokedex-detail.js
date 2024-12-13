document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    console.log("ID do Pokémon recebido:", pokemonId);  // Adicionando log

    if (pokemonId) {
        getPokemonById(pokemonId);
    }

    const input = document.querySelector("#pokemon-search");
    const container = document.querySelector(".container");
    const pokemonIdElement = document.querySelector(".container .info .pokemon-id");
    const pokemonNameElement = document.querySelector(".container .info .pokemon-name");
    const pokemonImg = document.querySelector(".container .info img");
    const pokeType = document.querySelector(".container .info .pokemon-types");
    const pokeStats = document.querySelector(".container .info .stats");
    const pokemonDescription = document.querySelector(".container .info .pokemon-description");

    const typeColor = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    function getPokemonById(id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        console.log("URL da API:", url);  // Adicionando log para depuração
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Pokémon não encontrado');
                }
                return res.json();
            })
            .then(data => {
                console.log("Dados do Pokémon recebidos:", data);  // Adicionando log
                renderPokemon(data);
            })
            .catch(err => {
                console.error("Erro ao buscar Pokémon:", err);
                alert("Pokémon não encontrado!");
            });
    }

    function getPokemonDescription(name) {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}/`;
        console.log("URL da API para descrição:", url);  // Adicionando log
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Descrição do Pokémon não encontrada');
                }
                return res.json();
            })
            .then(data => {
                const description = data.flavor_text_entries.find(
                    entry => entry.language.name === "en"
                ).flavor_text;
                pokemonDescription.innerHTML = description.replace(/\f/g, ' ');
            })
            .catch(err => {
                console.error("Erro ao buscar descrição do Pokémon:", err);
                pokemonDescription.innerHTML = "Descrição não encontrada.";
            });
    }

    function renderPokemon(data) {
        const sprite = data.sprites.other.dream_world.front_default || data.sprites.front_default || 'default-image.png';
        const name = data.name;
        const pokeId = data.id;
        const themeColor = typeColor[data.types[0].type.name];

        pokemonImg.src = sprite;
        pokemonNameElement.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
        pokemonIdElement.innerHTML = "#" + String(pokeId).padStart(3, '0');
        getPokemonTypes(data.types);
        styleCard(themeColor);
        getPokemonStats(data.stats);
        getPokemonDescription(name); 
    }

    function getPokemonTypes(types) {
        pokeType.innerHTML = '';
        types.forEach((typ) => {
            let span = document.createElement("span");
            span.innerHTML = typ.type.name.charAt(0).toUpperCase() + typ.type.name.slice(1);
            span.classList.add("types-style");
            span.style.backgroundColor = typeColor[typ.type.name];
            pokeType.appendChild(span);
        });
    }

    function styleCard(color) {
        container.style.background = color;
    }

    function getPokemonStats(stats) {
        pokeStats.innerHTML = '';
        stats.forEach((stat) => {
            let statElem = document.createElement("div");
            let statElemName = document.createElement("span");
            let statElemValue = document.createElement("span");

            statElemName.innerHTML = stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1);
            statElemValue.innerHTML = stat.base_stat;

            statElem.appendChild(statElemName);
            statElem.appendChild(statElemValue);

            statElem.classList.add("stat-elem");
            statElemName.classList.add("stat-name");
            statElemValue.classList.add("stat-value");

            pokeStats.appendChild(statElem);
        });
    }

    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            getPokemonById(input.value);
        }
    });
});
