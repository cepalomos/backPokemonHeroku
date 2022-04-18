const Types = require('../controllers/type');
const types = new Types();
const {Router} = require('express');
const router = Router();

router.get('/',types.getTypes);

module.exports = router;
