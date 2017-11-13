var express = require('express');
var bug_controller = require('../controllers/bugController');
var router = express.Router();

router.post('/api/bugs',bug_controller.bug_save_post);
router.get('/api/bugs',bug_controller.bug_select_get);
router.get('/api/bugs/:id',bug_controller.bug_find_get);
router.put('/api/bugs/:id',bug_controller.bug_update_put);


module.exports = router;