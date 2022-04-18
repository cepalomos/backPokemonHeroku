const {Router} = require('express');
const router = Router();
const Pokemon = require('../controllers/pokemon');
const Validacion = require('../middleware/validacionControllers/validacionPost');
const validacion = new Validacion();
const pokemon = new Pokemon();


router.route("/").get(pokemon.getPokemon).post(validacion.postValidacion,pokemon.postPokemon)
router.get('/:id',pokemon.getPokemonId);


module.exports=router;