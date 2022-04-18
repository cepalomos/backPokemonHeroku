const {
  searchDbTypes,
  getTypesApi,
  saveDbType,
} = require("../adapter/type.js");

class Types {
  async getTypes(req, res, next) {
    try {
      const types = await searchDbTypes();
      if (!types.length) {
        const typesApi = await getTypesApi();
        const data = await saveDbType(typesApi);
        res.status(200).json(data);
      } else {
        res.json(types);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Types;
