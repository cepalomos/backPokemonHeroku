const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

async function getApiPokemon() {
  try {
    const {
      data: { results: mid, next },
    } = await axios("https://pokeapi.co/api/v2/pokemon");
    const {
      data: { results: final },
    } = await axios(next);
    const datos = [...mid, ...final];
    const pokemons = await Promise.all(
      datos.map(({ url }) => {
        return new Promise((resolve, reject) => {
          axios(url)
            .then(
              ({
                data: {
                  id,
                  name,
                  types: typesApi,
                  sprites: {
                    other: {
                      dream_world: { front_default: imagen },
                    },
                  },
                },
              }) => {
                const types = typesApi.map((el) => el.type.name);
                resolve({ id, name, types, imagen });
              }
            )
            .catch((error) => reject(error));
        });
      })
    );
    return pokemons;
  } catch (error) {
    throw new Error(error);
  }
}

async function getDbPokemon() {
  try {
    let pokemons = await Pokemon.findAll({
      attributes: ["id", "name","attack"],
      include: {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    pokemons = pokemons.map(({id,name,attack,types})=>({id,name,attack,types: types.map(typo=>typo.name)}));
    return pokemons;
  } catch (error) {
    throw new Error(error);
  }
}

async function getApiName(name){
    try {
        let {data,status} = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if(status === 200){
            const {id,name,height,weight,stats,types:typesApi,sprites:{other:{dream_world:{front_default:image}}}} = data;
            const [lifeApi,attackApi,defenseApi,,,speedApi] = stats;
            const types = typesApi.map(el=>el.type.name);
            const {base_stat:life} = lifeApi;
            const {base_stat:attack} = attackApi;
            const {base_stat:defense} = defenseApi;
            const {base_stat:speed} = speedApi;
            return {id,name,height,weight,life,attack,defense,speed,types,image};
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

async function getDbName(name){
    try {
        let pokemon = await Pokemon.findOne({ where: { name: name.toLowerCase() },include: {
            model: Type,
            attributes: ["name"],
            through: { attributes: [] },
          } })
          if(pokemon) {
            const {id,name,life,attack,defense,speed,weight,height,types:typesIni} = pokemon;
            const types = typesIni.map(type=>type.name);
            return ({id,name,life,attack,defense,speed,weight,height,types});
          };
          return null;
    } catch (error) {
        throw new Error(error);
    }
}

async function getDbId(id){
    try {
        let pokemon = await Pokemon.findByPk(id,{ include: {
            model: Type,
            attributes: ["name"],
            through: { attributes: [] },
          } })
          if(pokemon) return pokemon;
          return null;
    } catch (error) {
        throw new Error(error);
    }
}

async function getApiId(id){
    try {
        let {data,status} = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if(status === 200){
            const {id,name,height,weight,stats,types:typesApi,sprites:{other:{dream_world:{front_default:image}}}} = data;
            const [lifeApi,attackApi,defenseApi,,,speedApi] = stats;
            const types = typesApi.map(el=>el.type.name);
            const {base_stat:life} = lifeApi;
            const {base_stat:attack} = attackApi;
            const {base_stat:defense} = defenseApi;
            const {base_stat:speed} = speedApi;
            return {id,name,height,weight,life,attack,defense,speed,types,image};
        }
        return null;
    } catch (error) {
        throw new Error(error);
    }
}

async function savePokemonDb(data){
    const [pokemonData,typeData] = data;
    try {
    await Pokemon.create(pokemonData).then(pokemon=>pokemon.addType(typeData));
        return true;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getApiPokemon, getDbPokemon,getApiName,getDbName,getApiId,getDbId,savePokemonDb };
