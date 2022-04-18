const { verificar } = require("../validacionAdapter/validacionPost");

class Validacion {
  async postValidacion(req, res, next) {
    try {
      const { data } = req.body;
      const error = await verificar(data);
      if (error.length) return res.status(400).send(error);
      next();
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Validacion;
