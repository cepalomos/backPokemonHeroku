const axios = require("axios");
const { Type } = require("../db.js");

async function getTypesApi() {
  let types = await axios("https://pokeapi.co/api/v2/type")
    .then(({ data: { results: typesApi } }) =>
      typesApi.map(({ name }) => ({ name }))
    )
    .catch((error) => {
      throw new Error(error);
    });
  return types;
}
async function saveDbType(arr) {
  let types = await Type.bulkCreate(arr);
  return types;
}
async function searchDbTypes() {
  let types = await Type.findAll();
  return types;
}

module.exports = {
  getTypesApi,
  saveDbType,
  searchDbTypes,
};
