const { getApiPokemon, getDbPokemon,getApiName,getDbName,getApiId,getDbId, savePokemonDb} = require("../adapter/pokemon.js");

class Pokemon {
  async getPokemon(req, res, next) {
      const {name} = req.query;
    try {
        if(name){
            let dataDb = await getDbName(name);
            if(dataDb) return res.json(dataDb);
            let dataApi = await getApiName(name);
            if(dataApi) return res.json(dataApi);
            throw new Error(({status:404,message:"no encontrado"}));
        }
      let pokemonsApi = await getApiPokemon();
      let pokemonsDb = await getDbPokemon();
      let pokemons = [...pokemonsApi, ...pokemonsDb];
      res.status(200).json(pokemons);
    } catch (error) {
        console.error(error.status);
      next(error);
    }
  }
  async getPokemonId(req,res,next) {
      try {
        const {id} = req.params;
        if(/^\d\d?$/.test(id)){
          const data = await getApiId(id);
          if (data) return res.json(data);
          throw new Error({status:404,message:"no encontrado"});
        }else{
          const dataBd = await getDbId(id);
          if(dataBd) return res.json(dataBd);
          throw new Error({status:404,message:"no encontrado"});
        }
      } catch (error) {
          next(error);
      }
  }

  async postPokemon(req,res,next) {
      const {data} = req.body;
      try {
        if(await savePokemonDb(data)) return res.sendStatus(201);
        throw new Error('Error al crear');
      } catch (error) {
          next(error);
      }
  }
}


module.exports = Pokemon;
